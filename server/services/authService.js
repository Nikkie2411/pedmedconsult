const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
    constructor(sheetsService) {
        this.sheetsService = sheetsService;
        this.jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
    }

    /**
     * Đăng nhập với username/password
     */
    async login(username, password) {
        try {
            // Tìm user trong Users sheet (doctors)
            const doctors = await this.sheetsService.getUsers();
            const doctor = doctors.find(u => u.username === username && u.status === 'active');
            
            if (doctor) {
                const isValidPassword = await bcrypt.compare(password, doctor.password);
                if (isValidPassword) {
                    // Cập nhật lastLogin
                    await this.sheetsService.updateUserLastLogin(doctor.id);
                    
                    const token = this.generateToken({
                        id: doctor.id,
                        username: doctor.username,
                        department: doctor.department,
                        role: 'doctor'
                    });
                    
                    return {
                        success: true,
                        token,
                        user: {
                            id: doctor.id,
                            username: doctor.username,
                            department: doctor.department,
                            role: 'doctor'
                        }
                    };
                }
            }

            // Tìm user trong Pharmacists sheet
            const pharmacists = await this.sheetsService.getPharmacists();
            const pharmacist = pharmacists.find(p => p.username === username && p.status === 'active');
            
            if (pharmacist) {
                const isValidPassword = await bcrypt.compare(password, pharmacist.password);
                if (isValidPassword) {
                    // Cập nhật lastLogin
                    await this.sheetsService.updatePharmacistLastLogin(pharmacist.id);
                    
                    const token = this.generateToken({
                        id: pharmacist.id,
                        username: pharmacist.username,
                        fullName: pharmacist.fullName,
                        departments: pharmacist.departments,
                        role: 'pharmacist'
                    });
                    
                    return {
                        success: true,
                        token,
                        user: {
                            id: pharmacist.id,
                            username: pharmacist.username,
                            fullName: pharmacist.fullName,
                            departments: pharmacist.departments,
                            role: 'pharmacist'
                        }
                    };
                }
            }

            return {
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            };

        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Lỗi hệ thống đăng nhập'
            };
        }
    }

    /**
     * Tạo JWT token
     */
    generateToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
    }

    /**
     * Verify JWT token
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            return null;
        }
    }

    /**
     * Hash password
     */
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    /**
     * Tạo tài khoản khoa (doctor)
     */
    async createDepartmentAccount(data) {
        try {
            const { username, password, department } = data;
            
            // Check xem username đã tồn tại chưa
            const existingUsers = await this.sheetsService.getUsers();
            if (existingUsers.find(u => u.username === username)) {
                return {
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại'
                };
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);
            
            // Tạo user mới
            const newUser = {
                id: `DEPT_${username.toUpperCase()}`,
                username,
                password: hashedPassword,
                department,
                role: 'doctor',
                status: 'active',
                createdDate: new Date().toISOString().split('T')[0],
                lastLogin: null
            };

            await this.sheetsService.createUser(newUser);
            
            return {
                success: true,
                message: 'Tạo tài khoản khoa thành công',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    department: newUser.department
                }
            };

        } catch (error) {
            console.error('Create department account error:', error);
            return {
                success: false,
                message: 'Lỗi tạo tài khoản khoa'
            };
        }
    }

    /**
     * Tạo tài khoản dược sĩ
     */
    async createPharmacistAccount(data) {
        try {
            const { username, password, fullName, phone, departments, title } = data;
            
            // Check xem username đã tồn tại chưa
            const existingPharmacists = await this.sheetsService.getPharmacists();
            if (existingPharmacists.find(p => p.username === username)) {
                return {
                    success: false,
                    message: 'Tên đăng nhập đã tồn tại'
                };
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);
            
            // Generate ID
            const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const count = existingPharmacists.length + 1;
            const id = `PHARM_${timestamp}_${count.toString().padStart(3, '0')}`;
            
            // Tạo pharmacist mới
            const newPharmacist = {
                id,
                username,
                password: hashedPassword,
                fullName,
                phone,
                departments: Array.isArray(departments) ? departments.join(',') : departments,
                role: 'pharmacist',
                title: title || 'Dược sĩ',
                status: 'active',
                createdDate: new Date().toISOString().split('T')[0],
                lastLogin: null
            };

            await this.sheetsService.createPharmacist(newPharmacist);
            
            return {
                success: true,
                message: 'Tạo tài khoản dược sĩ thành công',
                user: {
                    id: newPharmacist.id,
                    username: newPharmacist.username,
                    fullName: newPharmacist.fullName,
                    departments: newPharmacist.departments
                }
            };

        } catch (error) {
            console.error('Create pharmacist account error:', error);
            return {
                success: false,
                message: 'Lỗi tạo tài khoản dược sĩ'
            };
        }
    }

    /**
     * Đổi mật khẩu
     */
    async changePassword(userId, oldPassword, newPassword, userType = 'doctor') {
        try {
            let user;
            if (userType === 'doctor') {
                const users = await this.sheetsService.getUsers();
                user = users.find(u => u.id === userId);
            } else {
                const pharmacists = await this.sheetsService.getPharmacists();
                user = pharmacists.find(p => p.id === userId);
            }

            if (!user) {
                return {
                    success: false,
                    message: 'Không tìm thấy người dùng'
                };
            }

            // Verify old password
            const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isValidOldPassword) {
                return {
                    success: false,
                    message: 'Mật khẩu cũ không đúng'
                };
            }

            // Hash new password
            const hashedNewPassword = await this.hashPassword(newPassword);
            
            // Update password
            if (userType === 'doctor') {
                await this.sheetsService.updateUserPassword(userId, hashedNewPassword);
            } else {
                await this.sheetsService.updatePharmacistPassword(userId, hashedNewPassword);
            }

            return {
                success: true,
                message: 'Đổi mật khẩu thành công'
            };

        } catch (error) {
            console.error('Change password error:', error);
            return {
                success: false,
                message: 'Lỗi đổi mật khẩu'
            };
        }
    }
}

module.exports = AuthService;
