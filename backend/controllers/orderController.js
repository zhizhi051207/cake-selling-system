const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderController {
    // 创建订单
    static async createOrder(req, res) {
        try {
            const {
                customer_name,
                customer_phone,
                customer_email,
                delivery_address,
                payment_method,
                order_notes,
                items
            } = req.body;

            // 验证必填字段
            if (!customer_name || !customer_phone || !delivery_address || !payment_method || !items || items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: '请填写所有必填字段'
                });
            }

            // 计算订单金额
            let subtotal = 0;
            for (const item of items) {
                const product = await Product.findById(item.id);
                if (!product) {
                    return res.status(400).json({
                        success: false,
                        message: `产品 ${item.name} 不存在`
                    });
                }
                subtotal += product.price * item.quantity;
            }

            const shipping_fee = 20;
            const total_amount = subtotal + shipping_fee;

            // 创建订单
            const result = await Order.create({
                user_id: req.userId,
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
            });

            res.status(201).json({
                success: true,
                message: '订单创建成功',
                data: result
            });
        } catch (error) {
            console.error('创建订单错误:', error);
            res.status(500).json({
                success: false,
                message: '创建订单失败'
            });
        }
    }

    // 获取用户订单列表
    static async getUserOrders(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const orders = await Order.findByUserId(req.userId, limit, offset);

            res.json({
                success: true,
                data: {
                    orders,
                    page,
                    limit
                }
            });
        } catch (error) {
            console.error('获取订单列表错误:', error);
            res.status(500).json({
                success: false,
                message: '获取订单列表失败'
            });
        }
    }

    // 获取订单详情
    static async getOrderDetail(req, res) {
        try {
            const orderId = req.params.id;

            const order = await Order.findById(orderId, req.userId);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: '订单不存在'
                });
            }

            const items = await Order.getOrderItems(orderId);

            res.json({
                success: true,
                data: {
                    ...order,
                    items
                }
            });
        } catch (error) {
            console.error('获取订单详情错误:', error);
            res.status(500).json({
                success: false,
                message: '获取订单详情失败'
            });
        }
    }

    // 取消订单
    static async cancelOrder(req, res) {
        try {
            const orderId = req.params.id;

            const success = await Order.cancel(orderId, req.userId);

            if (!success) {
                return res.status(400).json({
                    success: false,
                    message: '无法取消该订单'
                });
            }

            res.json({
                success: true,
                message: '订单已取消'
            });
        } catch (error) {
            console.error('取消订单错误:', error);
            res.status(500).json({
                success: false,
                message: '取消订单失败'
            });
        }
    }

    // 获取订单统计
    static async getOrderStats(req, res) {
        try {
            const stats = await Order.getStatsByUserId(req.userId);

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('获取订单统计错误:', error);
            res.status(500).json({
                success: false,
                message: '获取订单统计失败'
            });
        }
    }
}

module.exports = OrderController;
