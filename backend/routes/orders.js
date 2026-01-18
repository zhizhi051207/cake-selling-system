const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

// 所有订单路由都需要认证
router.post('/', authenticateToken, OrderController.createOrder);
router.get('/', authenticateToken, OrderController.getUserOrders);
router.get('/stats', authenticateToken, OrderController.getOrderStats);
router.get('/:id', authenticateToken, OrderController.getOrderDetail);
router.put('/:id/cancel', authenticateToken, OrderController.cancelOrder);

module.exports = router;
