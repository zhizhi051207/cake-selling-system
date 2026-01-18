const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// 读取 application.properties 文件
function loadConfig() {
    const configPath = path.join(__dirname, 'application.properties');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    const config = {};
    configContent.split('\n').forEach(line => {
        line = line.trim();
        // 跳过注释和空行
        if (line.startsWith('#') || line === '') return;

        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            config[key.trim()] = valueParts.join('=').trim();
        }
    });

    return config;
}

// 加载配置
const config = loadConfig();

// 创建数据库连接池
const pool = mysql.createPool({
    host: config.DB_HOST || 'localhost',
    port: parseInt(config.DB_PORT) || 3306,
    user: config.DB_USER || 'root',
    password: config.DB_PASSWORD || '',
    database: config.DB_NAME || 'cake_selling_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// 测试数据库连接
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ 数据库连接成功');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
        return false;
    }
}

// 执行查询
async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('数据库查询错误:', error);
        throw error;
    }
}

// 执行事务
async function transaction(callback) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    query,
    transaction,
    testConnection,
    config
};
