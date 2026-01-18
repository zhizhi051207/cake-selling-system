const Product = require('../models/Product');

class ProductController {
    // 获取所有产品
    static async getAllProducts(req, res) {
        try {
            const category = req.query.category;
            const products = await Product.findAll(category);

            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error('获取产品列表错误:', error);
            res.status(500).json({
                success: false,
                message: '获取产品列表失败'
            });
        }
    }

    // 获取特色产品
    static async getFeaturedProducts(req, res) {
        try {
            const products = await Product.findFeatured();

            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error('获取特色产品错误:', error);
            res.status(500).json({
                success: false,
                message: '获取特色产品失败'
            });
        }
    }

    // 获取单个产品
    static async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: '产品不存在'
                });
            }

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('获取产品详情错误:', error);
            res.status(500).json({
                success: false,
                message: '获取产品详情失败'
            });
        }
    }

    // 搜索产品
    static async searchProducts(req, res) {
        try {
            const keyword = req.query.q;

            if (!keyword) {
                return res.status(400).json({
                    success: false,
                    message: '请提供搜索关键词'
                });
            }

            const products = await Product.search(keyword);

            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            console.error('搜索产品错误:', error);
            res.status(500).json({
                success: false,
                message: '搜索产品失败'
            });
        }
    }
}

module.exports = ProductController;
