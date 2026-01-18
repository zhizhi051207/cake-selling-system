const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// 公开路由
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// 需要认证的路由
router.get('/me', authenticateToken, AuthController.getCurrentUser);
router.put('/profile', authenticateToken, AuthController.updateProfile);

module.exports = router;
