const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                error: 'Không có token xác thực',
                code: 'NO_TOKEN' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            error: 'Token không hợp lệ',
            code: 'INVALID_TOKEN' 
        });
    }
};

// Middleware kiểm tra role admin
const adminRequired = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            error: 'Cần quyền admin',
            code: 'ADMIN_REQUIRED' 
        });
    }
    next();
};

// Middleware kiểm tra role pharmacist
const pharmacistRequired = (req, res, next) => {
    if (req.user.role !== 'pharmacist') {
        return res.status(403).json({ 
            error: 'Cần quyền dược sĩ',
            code: 'PHARMACIST_REQUIRED' 
        });
    }
    next();
};

// Middleware kiểm tra role doctor
const doctorRequired = (req, res, next) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ 
            error: 'Cần quyền bác sĩ',
            code: 'DOCTOR_REQUIRED' 
        });
    }
    next();
};

module.exports = {
    authMiddleware,
    adminRequired,
    pharmacistRequired,
    doctorRequired
};
