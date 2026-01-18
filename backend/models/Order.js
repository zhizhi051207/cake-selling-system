const { query, transaction } = require('../config/database');

class Order {
    // 创建新订单
    static async create(orderData) {
        return await transaction(async (connection) => {
            const {
                user_id,
                customer_name,
                customer_phone,
                customer_email,
                delivery_address,
                payment_method,
                order_notes,
                items,
                subtotal,
                shipping_fee,
                total_amount
            } = orderData;

            // 生成订单号
            const order_number = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

            // 插入订单
            const orderSql = `
                INSERT INTO orders (
                    user_id, order_number, customer_name, customer_phone, customer_email,
                    delivery_address, payment_method, order_notes, subtotal, shipping_fee, total_amount
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [orderResult] = await connection.execute(orderSql, [
                user_id, order_number, customer_name, customer_phone, customer_email,
                delivery_address, payment_method, order_notes, subtotal, shipping_fee, total_amount
            ]);

            const order_id = orderResult.insertId;

            // 插入订单详情
            const itemSql = `
                INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            for (const item of items) {
                await connection.execute(itemSql, [
                    order_id,
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.price * item.quantity
                ]);
            }

            return { order_id, order_number };
        });
    }

    // 获取用户的所有订单
    static async findByUserId(userId, limit = 50, offset = 0) {
        const sql = `
            SELECT
                o.*,
                COUNT(oi.order_item_id) as item_count
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.order_id
            ORDER BY o.order_date DESC
            LIMIT ? OFFSET ?
        `;

        return await query(sql, [userId, limit, offset]);
    }

    // 获取订单详情
    static async findById(orderId, userId = null) {
        let sql = `
            SELECT o.*, u.username, u.email as user_email
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE o.order_id = ?
        `;

        const params = [orderId];

        if (userId) {
            sql += ' AND o.user_id = ?';
            params.push(userId);
        }

        const results = await query(sql, params);
        return results[0];
    }

    // 获取订单项目
    static async getOrderItems(orderId) {
        const sql = `
            SELECT oi.*, p.image_url
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = ?
        `;

        return await query(sql, [orderId]);
    }

    // 更新订单状态
    static async updateStatus(orderId, status) {
        const sql = 'UPDATE orders SET order_status = ? WHERE order_id = ?';
        await query(sql, [status, orderId]);
        return true;
    }

    // 取消订单
    static async cancel(orderId, userId) {
        const sql = `
            UPDATE orders
            SET order_status = 'cancelled'
            WHERE order_id = ? AND user_id = ? AND order_status = 'pending'
        `;

        const result = await query(sql, [orderId, userId]);
        return result.affectedRows > 0;
    }

    // 获取订单统计
    static async getStatsByUserId(userId) {
        const sql = `
            SELECT
                COUNT(*) as total_orders,
                SUM(CASE WHEN order_status = 'completed' THEN 1 ELSE 0 END) as completed_orders,
                SUM(CASE WHEN order_status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
                SUM(CASE WHEN order_status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders,
                SUM(CASE WHEN order_status = 'completed' THEN total_amount ELSE 0 END) as total_spent
            FROM orders
            WHERE user_id = ?
        `;

        const results = await query(sql, [userId]);
        return results[0];
    }
}

module.exports = Order;
