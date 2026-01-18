const { query } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    // 创建新用户
    static async create(userData) {
        const { username, email, password, full_name, phone, address } = userData;

        // 加密密码
        const password_hash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (username, email, password_hash, full_name, phone, address)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const result = await query(sql, [username, email, password_hash, full_name, phone, address]);
        return result.insertId;
    }

    // 根据用户名查找用户
    static async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ? AND is_active = TRUE';
        const results = await query(sql, [username]);
        return results[0];
    }

    // 根据邮箱查找用户
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ? AND is_active = TRUE';
        const results = await query(sql, [email]);
        return results[0];
    }

    // 根据ID查找用户
    static async findById(userId) {
        const sql = 'SELECT user_id, username, email, full_name, phone, address, created_at FROM users WHERE user_id = ? AND is_active = TRUE';
        const results = await query(sql, [userId]);
        return results[0];
    }

    // 验证密码
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // 更新用户信息
    static async update(userId, userData) {
        const { full_name, phone, address, email } = userData;

        const sql = `
            UPDATE users
            SET full_name = ?, phone = ?, address = ?, email = ?
            WHERE user_id = ?
        `;

        await query(sql, [full_name, phone, address, email, userId]);
        return true;
    }

    // 修改密码
    static async changePassword(userId, newPassword) {
        const password_hash = await bcrypt.hash(newPassword, 10);

        const sql = 'UPDATE users SET password_hash = ? WHERE user_id = ?';
        await query(sql, [password_hash, userId]);
        return true;
    }

    // 检查用户名是否存在
    static async usernameExists(username) {
        const sql = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
        const results = await query(sql, [username]);
        return results[0].count > 0;
    }

    // 检查邮箱是否存在
    static async emailExists(email) {
        const sql = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
        const results = await query(sql, [email]);
        return results[0].count > 0;
    }
}

module.exports = User;
