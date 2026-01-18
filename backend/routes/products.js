const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// 产品路由（公开访问）
router.get('/', ProductController.getAllProducts);
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProductById);

module.exports = router;
