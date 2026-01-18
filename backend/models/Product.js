const { query } = require('../config/database');

class Product {
    // 获取所有产品
    static async findAll(category = null) {
        let sql = 'SELECT * FROM products WHERE is_active = TRUE';
        const params = [];

        if (category && category !== 'all') {
            sql += ' AND category = ?';
            params.push(category);
        }

        sql += ' ORDER BY product_id';

        return await query(sql, params);
    }

    // 获取特色产品
    static async findFeatured() {
        const sql = 'SELECT * FROM products WHERE is_featured = TRUE AND is_active = TRUE ORDER BY product_id';
        return await query(sql);
    }

    // 根据ID获取产品
    static async findById(productId) {
        const sql = 'SELECT * FROM products WHERE product_id = ? AND is_active = TRUE';
        const results = await query(sql, [productId]);
        return results[0];
    }

    // 搜索产品
    static async search(keyword) {
        const sql = `
            SELECT * FROM products
            WHERE is_active = TRUE
            AND (name LIKE ? OR description LIKE ?)
            ORDER BY product_id
        `;
        const searchTerm = `%${keyword}%`;
        return await query(sql, [searchTerm, searchTerm]);
    }

    // 更新库存
    static async updateStock(productId, quantity) {
        const sql = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?';
        await query(sql, [quantity, productId]);
        return true;
    }

    // 检查库存
    static async checkStock(productId, requiredQuantity) {
        const sql = 'SELECT stock_quantity FROM products WHERE product_id = ?';
        const results = await query(sql, [productId]);

        if (results.length === 0) return false;

        return results[0].stock_quantity >= requiredQuantity;
    }
}

module.exports = Product;
