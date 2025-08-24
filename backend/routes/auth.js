const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

let sheetsService;

// Initialize auth service with sheets service
function initAuthService(sheets) {
    sheetsService = sheets;
}

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Username và password là bắt buộc' 
            });
        }

        // Get user from Google Sheets
        const user = await sheetsService.getUserByUsername(username);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Tên đăng nhập hoặc mật khẩu không đúng' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                error: 'Tên đăng nhập hoặc mật khẩu không đúng' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                role: user.role,
                department: user.department 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                department: user.department,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi server khi đăng nhập' 
        });
    }
});

// Verify token endpoint
router.post('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: 'Token không được cung cấp' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get fresh user data
        const user = await sheetsService.getUserByUsername(decoded.username);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'User không tồn tại' 
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                department: user.department,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ 
            success: false, 
            error: 'Token không hợp lệ' 
        });
    }
});

module.exports = { router, initAuthService };
