const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { config } = require('../config/database');

class AuthController {
    // 用户注册
    static async register(req, res) {
        try {
            const { username, email, password, full_name, phone, address } = req.body;

            // 验证必填字段
            if (!username || !email || !password || !full_name) {
                return res.status(400).json({
                    success: false,
                    message: '请填写所有必填字段'
                });
            }

            // 检查用户名是否已存在
            if (await User.usernameExists(username)) {
                return res.status(400).json({
                    success: false,
                    message: '用户名已存在'
                });
            }

            // 检查邮箱是否已存在
            if (await User.emailExists(email)) {
                return res.status(400).json({
                    success: false,
                    message: '邮箱已被注册'
                });
            }

            // 创建用户
            const userId = await User.create({
                username,
                email,
                password,
                full_name,
                phone,
                address
            });

            // 生成 JWT token
            const token = jwt.sign(
                { userId, username },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                success: true,
                message: '注册成功',
                data: {
                    userId,
                    username,
                    email,
                    full_name,
                    token
                }
            });
        } catch (error) {
            console.error('注册错误:', error);
            res.status(500).json({
                success: false,
                message: '注册失败，请稍后重试'
            });
        }
    }

    // 用户登录
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            // 验证必填字段
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: '请输入用户名和密码'
                });
            }

            // 查找用户
            const user = await User.findByUsername(username);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: '用户名或密码错误'
                });
            }

            // 验证密码
            const isValidPassword = await User.verifyPassword(password, user.password_hash);

            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: '用户名或密码错误'
                });
            }

            // 生成 JWT token
            const token = jwt.sign(
                { userId: user.user_id, username: user.username },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRES_IN }
            );

            res.json({
                success: true,
                message: '登录成功',
                data: {
                    userId: user.user_id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    token
                }
            });
        } catch (error) {
            console.error('登录错误:', error);
            res.status(500).json({
                success: false,
                message: '登录失败，请稍后重试'
            });
        }
    }

    // 获取当前用户信息
    static async getCurrentUser(req, res) {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: '用户不存在'
                });
            }

            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('获取用户信息错误:', error);
            res.status(500).json({
                success: false,
                message: '获取用户信息失败'
            });
        }
    }

    // 更新用户信息
    static async updateProfile(req, res) {
        try {
            const { full_name, phone, address, email } = req.body;

            await User.update(req.userId, {
                full_name,
                phone,
                address,
                email
            });

            res.json({
                success: true,
                message: '更新成功'
            });
        } catch (error) {
            console.error('更新用户信息错误:', error);
            res.status(500).json({
                success: false,
                message: '更新失败'
            });
        }
    }
}

module.exports = AuthController;
