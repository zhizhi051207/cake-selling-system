# 🎂 蛋糕销售系统 (Cake Selling System)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/mysql-%3E%3D5.7-blue.svg)](https://www.mysql.com/)

一个功能完整的蛋糕在线销售系统，采用前后端分离架构，支持用户注册登录、产品浏览、购物车管理、订单创建和查看等完整电商功能。

## ✨ 项目特点

- 🔐 **完整的用户认证系统** - JWT Token 认证，bcrypt 密码加密
- 🛒 **购物车管理** - 支持添加、修改、删除商品，数据持久化
- 📦 **订单管理** - 创建订单、查看历史、订单统计、取消订单
- 🎨 **响应式设计** - 适配桌面和移动设备
- 🔒 **安全可靠** - SQL 参数化查询、密码加密、JWT 认证
- 📊 **RESTful API** - 标准化的 API 设计
- 🗄️ **数据库设计规范** - 完整的外键约束和索引优化

## 🚀 功能特性

### 用户功能
- ✅ 用户注册和登录
- ✅ JWT Token 认证
- ✅ 用户信息管理
- ✅ 自动登录状态检查

### 产品功能
- ✅ 产品列表展示
- ✅ 产品分类筛选（生日蛋糕、婚礼蛋糕、纸杯蛋糕、特色蛋糕）
- ✅ 特色产品展示
- ✅ 产品详情查看

### 购物车功能
- ✅ 添加商品到购物车
- ✅ 修改商品数量
- ✅ 删除购物车商品
- ✅ 购物车数据持久化（localStorage）

### 订单功能
- ✅ 创建订单
- ✅ 查看订单历史
- ✅ 查看订单详情
- ✅ 取消订单
- ✅ 订单统计（总订单数、待处理、已完成、累计消费）

## 🛠️ 技术栈

### 后端
- **Node.js** (v18+) - JavaScript 运行环境
- **Express.js** (v4.x) - Web 应用框架
- **MySQL** (v5.7+) - 关系型数据库
- **JWT** (jsonwebtoken) - 用户认证
- **bcrypt** - 密码加密
- **CORS** - 跨域资源共享

### 前端
- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **JavaScript (ES6+)** - 交互逻辑
- **Fetch API** - HTTP 请求
- **LocalStorage** - 本地数据存储

## 📁 项目结构

```
cake-selling-system/
│
├── backend/                    # 后端代码
│   ├── config/                # 配置文件
│   │   ├── application.properties  # 应用配置
│   │   └── database.js        # 数据库连接
│   ├── controllers/           # 控制器
│   ├── models/                # 数据模型
│   ├── routes/                # 路由
│   ├── middleware/            # 中间件
│   └── server.js             # 服务器入口
│
├── sql/                       # SQL 脚本
│   ├── create_database.sql   # 创建数据库
│   └── insert_products.sql   # 初始数据
│
├── js/                        # 前端 JavaScript
├── css/                       # 样式文件
├── images/                    # 图片资源
│
├── index.html                 # 主页
├── products.html              # 产品页
├── cart.html                  # 购物车页
├── checkout.html              # 结算页
├── login.html                 # 登录页
├── register.html              # 注册页
└── orders.html                # 订单历史页
```

## 🚀 快速开始

### 前置要求

- Node.js (v18+)
- MySQL (v5.7+)
- npm 或 yarn

### 1. 克隆项目

```bash
git clone https://github.com/zhizhi051207/cake-selling-system.git
cd cake-selling-system
```

### 2. 创建数据库

```bash
mysql -u root -p < sql/create_database.sql
mysql -u root -p < sql/insert_products.sql
```

### 3. 配置数据库连接

编辑 `backend/config/application.properties`：

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cake_selling_system
DB_USER=root
DB_PASSWORD=你的数据库密码

SERVER_PORT=3000
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret-here
```

### 4. 安装并启动后端

```bash
cd backend
npm install
npm start
```

### 5. 启动前端

```bash
# 在项目根目录
python -m http.server 8000
```

### 6. 访问系统

浏览器打开：`http://localhost:8000`

## 📚 API 文档

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 产品接口
- `GET /api/products` - 获取所有产品
- `GET /api/products?category=birthday` - 按分类获取
- `GET /api/products/featured` - 获取特色产品

### 订单接口
- `POST /api/orders` - 创建订单
- `GET /api/orders` - 获取订单列表
- `GET /api/orders/:id` - 获取订单详情
- `PUT /api/orders/:id/cancel` - 取消订单

详细文档请查看 [BACKEND_README.md](BACKEND_README.md)

## 🗄️ 数据库设计

- **users** - 用户表
- **products** - 产品表
- **orders** - 订单表
- **order_items** - 订单详情表

## 📖 使用说明

1. **注册账号** - 填写用户信息
2. **登录系统** - 使用用户名和密码
3. **浏览产品** - 查看蛋糕列表
4. **添加购物车** - 选择心仪的蛋糕
5. **结算订单** - 填写配送信息
6. **查看订单** - 查看订单历史

## 🔒 安全性

- ✅ bcrypt 密码加密
- ✅ JWT Token 认证
- ✅ SQL 参数化查询
- ✅ CORS 跨域配置

## 🎨 自定义

### 添加新产品

编辑 `js/products-data.js`：

```javascript
{
    id: 16,
    name: "新产品名称",
    category: "birthday",
    price: 188,
    description: "产品描述",
    image: "🎂",
    featured: false
}
```

### 修改样式

编辑 `css/style.css`：

```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --text-color: #333;
    --light-bg: #fff5f8;
}
```

## 🔮 未来改进

- [ ] 产品图片上传功能
- [ ] 真实支付接口集成
- [ ] 邮件通知功能
- [ ] 管理员后台
- [ ] 产品评价系统
- [ ] 订单状态实时更新
- [ ] 数据分析和报表
- [ ] 优惠券系统
- [ ] 积分系统
- [ ] 产品搜索功能

## 📄 相关文档

- [后端详细文档](BACKEND_README.md)
- [快速启动指南](QUICKSTART.md)
- [项目总结](PROJECT_SUMMARY.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📜 许可证

本项目仅供学习和演示使用。

## 👨‍💻 作者

使用 [Claude Code](https://claude.com/claude-code) 创建

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
