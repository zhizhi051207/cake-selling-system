const express = require('express');
const cors = require('cors');
const { testConnection, config } = require('./config/database');

// 导入路由
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

// 中间件
app.use(cors({
    origin: config.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 请求日志中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: '服务器运行正常',
        timestamp: new Date().toISOString()
    });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '请求的资源不存在'
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 启动服务器
const PORT = config.SERVER_PORT || 3000;

async function startServer() {
    try {
        // 测试数据库连接
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('❌ 无法连接到数据库，请检查配置');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log('=================================');
            console.log('🎂 蛋糕销售系统后端服务器');
            console.log('=================================');
            console.log(`✅ 服务器运行在: http://localhost:${PORT}`);
            console.log(`✅ 环境: ${config.NODE_ENV || 'development'}`);
            console.log(`✅ 数据库: ${config.DB_NAME}`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('❌ 启动服务器失败:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
