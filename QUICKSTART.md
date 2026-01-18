# 蛋糕销售系统 - 快速启动指南

## 🚀 快速开始（5分钟部署）

### 第一步：安装 MySQL 并创建数据库

1. 确保 MySQL 已安装并运行
2. 打开 MySQL 命令行或客户端工具
3. 执行以下命令：

```bash
mysql -u root -p < sql/create_database.sql
mysql -u root -p < sql/insert_products.sql
```

或者在 MySQL 客户端中：
```sql
source D:/Claude code project/cake-selling-system/sql/create_database.sql
source D:/Claude code project/cake-selling-system/sql/insert_products.sql
```

### 第二步：配置数据库连接

编辑 `backend/config/application.properties`：

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cake_selling_system
DB_USER=root
DB_PASSWORD=你的MySQL密码    # ⚠️ 修改这里

JWT_SECRET=your_secret_key_here_change_this    # ⚠️ 修改这里
SESSION_SECRET=your_session_secret_here        # ⚠️ 修改这里
```

### 第三步：安装后端依赖并启动

```bash
cd backend
npm install
npm start
```

看到以下信息表示启动成功：
```
=================================
🎂 蛋糕销售系统后端服务器
=================================
✅ 服务器运行在: http://localhost:3000
✅ 环境: development
✅ 数据库: cake_selling_system
=================================
```

### 第四步：启动前端

在新的终端窗口中，回到项目根目录：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

### 第五步：访问系统

在浏览器中打开：`http://localhost:8000`

## 📝 测试账号

系统启动后，你需要先注册一个账号。

### 注册新用户
1. 点击右上角"注册"
2. 填写注册信息
3. 注册成功后自动登录

### 测试流程
1. 浏览产品 → 添加到购物车
2. 查看购物车 → 修改数量
3. 结算 → 填写配送信息
4. 提交订单
5. 查看"我的订单"

## 🔧 常用命令

### 后端开发模式（自动重启）
```bash
cd backend
npm run dev
```

### 查看数据库
```bash
mysql -u root -p
use cake_selling_system;
show tables;
select * from users;
select * from orders;
```

## ⚠️ 常见问题

### 问题1：后端启动失败 - 数据库连接错误
**解决方案**：
- 检查 MySQL 是否运行：`mysql -u root -p`
- 检查 `application.properties` 中的密码是否正确
- 确认数据库 `cake_selling_system` 已创建

### 问题2：前端无法连接后端
**解决方案**：
- 确认后端已启动在 `http://localhost:3000`
- 检查浏览器控制台是否有 CORS 错误
- 确认 `js/auth.js` 中的 `API_BASE_URL` 正确

### 问题3：登录后无法创建订单
**解决方案**：
- 检查浏览器控制台是否有错误
- 确认 localStorage 中有 token
- 尝试退出重新登录

### 问题4：端口被占用
**解决方案**：
- 修改后端端口：编辑 `application.properties` 中的 `SERVER_PORT`
- 修改前端端口：使用 `python -m http.server 8080`

## 📊 数据库表说明

系统包含以下数据表：

- **users** - 用户表（存储用户信息）
- **products** - 产品表（15种蛋糕产品）
- **orders** - 订单表（订单主表）
- **order_items** - 订单详情表（订单商品明细）
- **cart** - 购物车表（数据库购物车，当前未使用）
- **user_sessions** - 会话表（用户登录会话）

## 🎯 核心功能

### ✅ 已实现
- 用户注册和登录（JWT认证）
- 产品浏览和分类筛选
- 购物车管理（LocalStorage）
- 订单创建和管理
- 订单历史查看
- 用户信息自动填充

### 🔜 可扩展功能
- 管理员后台
- 产品图片上传
- 真实支付接口
- 邮件通知
- 订单状态跟踪
- 产品评价系统

## 📁 项目结构

```
cake-selling-system/
├── backend/              # 后端 Node.js + Express
│   ├── config/          # 配置文件
│   ├── controllers/     # 控制器
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── middleware/      # 中间件
│   └── server.js        # 入口文件
├── sql/                 # SQL 脚本
├── js/                  # 前端 JavaScript
├── css/                 # 样式文件
└── *.html              # HTML 页面
```

## 🔐 安全提示

⚠️ **生产环境部署前必须修改**：
1. `JWT_SECRET` - JWT 密钥
2. `SESSION_SECRET` - 会话密钥
3. 数据库密码
4. 启用 HTTPS
5. 配置防火墙

## 📞 技术支持

如有问题，请检查：
1. `BACKEND_README.md` - 详细文档
2. 浏览器控制台错误信息
3. 后端服务器日志
4. MySQL 错误日志

---

**祝你使用愉快！** 🎂
