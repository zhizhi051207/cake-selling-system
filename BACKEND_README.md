# 蛋糕销售系统 - 后端部署指南

## 项目概述

这是一个完整的蛋糕在线销售系统，包含前端和后端。后端使用 Node.js + Express + MySQL 构建。

## 技术栈

### 后端
- Node.js
- Express.js
- MySQL 数据库
- JWT 认证
- bcrypt 密码加密

### 前端
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage

## 安装步骤

### 1. 安装 MySQL 数据库

确保你的系统已安装 MySQL 数据库（版本 5.7 或更高）。

### 2. 创建数据库和表

```bash
# 登录 MySQL
mysql -u root -p

# 执行 SQL 脚本创建数据库和表
source D:/Claude code project/cake-selling-system/sql/create_database.sql

# 插入初始产品数据
source D:/Claude code project/cake-selling-system/sql/insert_products.sql
```

或者直接在 MySQL 客户端中执行这两个 SQL 文件。

### 3. 配置数据库连接

编辑 `backend/config/application.properties` 文件，修改数据库连接信息：

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cake_selling_system
DB_USER=root
DB_PASSWORD=你的数据库密码

SERVER_PORT=3000
JWT_SECRET=修改为你自己的密钥
SESSION_SECRET=修改为你自己的密钥
```

**重要**: 请务必修改 `JWT_SECRET` 和 `SESSION_SECRET` 为你自己的随机字符串！

### 4. 安装后端依赖

```bash
cd backend
npm install
```

这将安装以下依赖：
- express - Web 框架
- mysql2 - MySQL 数据库驱动
- bcrypt - 密码加密
- jsonwebtoken - JWT 认证
- cors - 跨域支持

### 5. 启动后端服务器

```bash
# 开发模式（自动重启）
npm run dev

# 或生产模式
npm start
```

服务器将在 `http://localhost:3000` 启动。

### 6. 启动前端

在项目根目录下启动一个 HTTP 服务器：

```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server -p 8000
```

然后在浏览器中访问 `http://localhost:8000`

## 项目结构

```
cake-selling-system/
│
├── backend/                    # 后端代码
│   ├── config/                # 配置文件
│   │   ├── application.properties  # 应用配置
│   │   └── database.js        # 数据库配置
│   ├── controllers/           # 控制器
│   │   ├── authController.js  # 认证控制器
│   │   ├── orderController.js # 订单控制器
│   │   └── productController.js # 产品控制器
│   ├── models/                # 数据模型
│   │   ├── User.js           # 用户模型
│   │   ├── Order.js          # 订单模型
│   │   └── Product.js        # 产品模型
│   ├── routes/                # 路由
│   │   ├── auth.js           # 认证路由
│   │   ├── orders.js         # 订单路由
│   │   └── products.js       # 产品路由
│   ├── middleware/            # 中间件
│   │   └── auth.js           # 认证中间件
│   ├── package.json          # 依赖配置
│   └── server.js             # 服务器入口
│
├── sql/                       # SQL 脚本
│   ├── create_database.sql   # 创建数据库和表
│   └── insert_products.sql   # 插入初始数据
│
├── js/                        # 前端 JavaScript
│   ├── auth.js               # 认证功能
│   ├── orders.js             # 订单管理
│   ├── cart.js               # 购物车管理
│   ├── products-data.js      # 产品数据
│   ├── main.js               # 主页功能
│   ├── products.js           # 产品页功能
│   ├── cart-page.js          # 购物车页功能
│   └── checkout.js           # 结算功能
│
├── css/                       # 样式文件
│   └── style.css
│
├── index.html                 # 主页
├── products.html              # 产品页
├── cart.html                  # 购物车页
├── checkout.html              # 结算页
├── login.html                 # 登录页
├── register.html              # 注册页
└── orders.html                # 订单历史页
```

## API 接口文档

### 认证接口

#### 用户注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "full_name": "测试用户",
  "phone": "13800138000",
  "address": "测试地址"
}
```

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

#### 获取当前用户信息
```
GET /api/auth/me
Authorization: Bearer <token>
```

### 产品接口

#### 获取所有产品
```
GET /api/products
GET /api/products?category=birthday
```

#### 获取特色产品
```
GET /api/products/featured
```

#### 获取单个产品
```
GET /api/products/:id
```

### 订单接口

#### 创建订单
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer_name": "张三",
  "customer_phone": "13800138000",
  "customer_email": "test@example.com",
  "delivery_address": "北京市朝阳区xxx",
  "payment_method": "wechat",
  "order_notes": "请尽快配送",
  "items": [
    {
      "id": 1,
      "name": "经典草莓蛋糕",
      "price": 168,
      "quantity": 2
    }
  ]
}
```

#### 获取用户订单列表
```
GET /api/orders
Authorization: Bearer <token>
```

#### 获取订单详情
```
GET /api/orders/:id
Authorization: Bearer <token>
```

#### 取消订单
```
PUT /api/orders/:id/cancel
Authorization: Bearer <token>
```

## 数据库表结构

### users - 用户表
- user_id (主键)
- username (用户名，唯一)
- email (邮箱，唯一)
- password_hash (密码哈希)
- full_name (姓名)
- phone (电话)
- address (地址)
- created_at (创建时间)
- updated_at (更新时间)
- is_active (是否激活)

### products - 产品表
- product_id (主键)
- name (产品名称)
- category (分类)
- price (价格)
- description (描述)
- image_url (图片URL)
- is_featured (是否特色)
- stock_quantity (库存数量)
- created_at (创建时间)
- updated_at (更新时间)
- is_active (是否激活)

### orders - 订单表
- order_id (主键)
- user_id (用户ID，外键)
- order_number (订单号，唯一)
- customer_name (客户姓名)
- customer_phone (客户电话)
- customer_email (客户邮箱)
- delivery_address (配送地址)
- payment_method (支付方式)
- order_notes (订单备注)
- subtotal (小计)
- shipping_fee (配送费)
- total_amount (总金额)
- order_status (订单状态)
- order_date (下单时间)
- updated_at (更新时间)

### order_items - 订单详情表
- order_item_id (主键)
- order_id (订单ID，外键)
- product_id (产品ID，外键)
- product_name (产品名称)
- product_price (产品价格)
- quantity (数量)
- subtotal (小计)

## 功能特性

### 用户功能
- ✅ 用户注册和登录
- ✅ JWT 认证
- ✅ 用户信息管理
- ✅ 密码加密存储

### 产品功能
- ✅ 产品列表展示
- ✅ 产品分类筛选
- ✅ 特色产品展示
- ✅ 产品详情查看

### 购物车功能
- ✅ 添加商品到购物车
- ✅ 修改商品数量
- ✅ 删除购物车商品
- ✅ 购物车数据持久化

### 订单功能
- ✅ 创建订单
- ✅ 查看订单历史
- ✅ 查看订单详情
- ✅ 取消订单
- ✅ 订单统计

## 安全性

- 密码使用 bcrypt 加密存储
- 使用 JWT 进行用户认证
- SQL 查询使用参数化防止注入
- CORS 配置限制跨域访问

## 常见问题

### 1. 数据库连接失败
- 检查 MySQL 服务是否启动
- 检查 `application.properties` 中的数据库配置
- 确认数据库用户名和密码正确

### 2. 端口被占用
- 修改 `application.properties` 中的 `SERVER_PORT`
- 或关闭占用端口的程序

### 3. CORS 错误
- 检查 `application.properties` 中的 `CORS_ORIGIN` 配置
- 确保前端和后端的端口配置正确

### 4. JWT 认证失败
- 检查 token 是否过期
- 确认 `JWT_SECRET` 配置正确
- 清除浏览器 localStorage 重新登录

## 开发建议

1. 开发时使用 `npm run dev` 启动后端，支持自动重启
2. 修改 `JWT_SECRET` 和 `SESSION_SECRET` 为强密码
3. 生产环境建议使用环境变量而不是配置文件
4. 定期备份数据库
5. 使用 HTTPS 保护用户数据

## 未来改进

- [ ] 添加产品图片上传功能
- [ ] 实现真实的支付接口
- [ ] 添加邮件通知功能
- [ ] 实现管理员后台
- [ ] 添加产品评价功能
- [ ] 实现订单状态实时更新
- [ ] 添加数据分析和报表

## 许可证

本项目仅供学习和演示使用。
