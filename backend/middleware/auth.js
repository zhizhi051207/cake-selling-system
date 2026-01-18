const jwt = require('jsonwebtoken');
const { config } = require('../config/database');

// 验证 JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: '未提供认证令牌'
        });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: '无效的认证令牌'
            });
        }

        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    });
}

// 可选的认证中间件（token 可以不存在）
function optionalAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (!err) {
            req.userId = decoded.userId;
            req.username = decoded.username;
        }
        next();
    });
}

module.exports = {
    authenticateToken,
    optionalAuth
};
