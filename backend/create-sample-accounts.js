/**
 * Script tạo tài khoản mẫu cho hệ thống
 */

require('dotenv').config();
const bcrypt = require('bcrypt');

const createSampleAccounts = async () => {
    try {
        console.log('🔐 Tạo tài khoản mẫu cho PedMedConsult...\n');

        const AuthService = require('./services/authService');
        const sheetsService = require('./services/googleSheetsService');
        
        // Initialize services
        await sheetsService.initialize();
        const authService = new AuthService(sheetsService);

        // Sample password
        const samplePassword = '123456';

        // Department accounts (Doctor accounts)
        const departmentAccounts = [
            { username: 'sicu', department: 'Khoa Hồi sức cấp cứu' },
            { username: 'nhi', department: 'Khoa Nhi tổng quát' },
            { username: 'timMach', department: 'Khoa Tim mạch' },
            { username: 'thanKinh', department: 'Khoa Thần kinh' },
            { username: 'noiTiet', department: 'Khoa Nội tiết' },
            { username: 'nhiemKhuan', department: 'Khoa Nhiễm khuẩn' },
            { username: 'ngoai', department: 'Khoa Ngoại' }
        ];

        console.log('👨‍⚕️ Tạo tài khoản khoa (Bác sĩ)...');
        for (const account of departmentAccounts) {
            try {
                const result = await authService.createDepartmentAccount({
                    username: account.username,
                    password: samplePassword,
                    department: account.department
                });
                
                if (result.success) {
                    console.log(`✅ ${account.username} - ${account.department}`);
                } else {
                    console.log(`⚠️  ${account.username}: ${result.message}`);
                }
            } catch (error) {
                console.log(`❌ ${account.username}: ${error.message}`);
            }
        }

        // Pharmacist accounts
        const pharmacistAccounts = [
            {
                username: 'pharmacist1',
                fullName: 'DS. Nguyễn Thị A',
                phone: '0901234567',
                departments: ['Khoa Hồi sức cấp cứu', 'Khoa Nhi tổng quát'],
                title: 'Dược sĩ chuyên khoa II'
            },
            {
                username: 'pharmacist2',
                fullName: 'DS. Lê Văn B',
                phone: '0901234568',
                departments: ['Khoa Tim mạch', 'Khoa Thần kinh'],
                title: 'Dược sĩ chuyên khoa I'
            },
            {
                username: 'pharmacist3',
                fullName: 'DS. Trần Thị C',
                phone: '0901234569',
                departments: ['Khoa Nội tiết', 'Khoa Nhiễm khuẩn', 'Khoa Ngoại'],
                title: 'Dược sĩ'
            }
        ];

        console.log('\n💊 Tạo tài khoản dược sĩ...');
        for (const account of pharmacistAccounts) {
            try {
                const result = await authService.createPharmacistAccount({
                    username: account.username,
                    password: samplePassword,
                    fullName: account.fullName,
                    phone: account.phone,
                    departments: account.departments,
                    title: account.title
                });
                
                if (result.success) {
                    console.log(`✅ ${account.username} - ${account.fullName}`);
                } else {
                    console.log(`⚠️  ${account.username}: ${result.message}`);
                }
            } catch (error) {
                console.log(`❌ ${account.username}: ${error.message}`);
            }
        }

        console.log('\n🎉 Tạo tài khoản mẫu hoàn thành!');
        console.log('\n📋 Danh sách tài khoản:');
        console.log('\n👨‍⚕️ Bác sĩ (theo khoa):');
        departmentAccounts.forEach(account => {
            console.log(`   ${account.username} - ${account.department}`);
        });
        
        console.log('\n💊 Dược sĩ:');
        pharmacistAccounts.forEach(account => {
            console.log(`   ${account.username} - ${account.fullName}`);
        });
        
        console.log(`\n🔑 Mật khẩu chung: ${samplePassword}`);
        console.log('\n🌐 Có thể đăng nhập tại: http://localhost:3000');

    } catch (error) {
        console.error('❌ Lỗi tạo tài khoản mẫu:', error.message);
        console.error('\n🔧 Kiểm tra:');
        console.error('1. Google Sheets đã được setup với đúng cấu trúc');
        console.error('2. Environment variables đã được cấu hình');
        console.error('3. Kết nối internet ổn định');
    }
};

// Chạy script
if (require.main === module) {
    createSampleAccounts();
}

module.exports = createSampleAccounts;
