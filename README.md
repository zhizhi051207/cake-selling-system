# 蛋糕销售系统 (Cake Selling System)

一个简单而完整的蛋糕在线销售系统，使用纯 HTML、CSS 和 JavaScript 构建。

## 项目结构

```
cake-selling-system/
│
├── index.html              # 主页
├── products.html           # 产品列表页
├── cart.html              # 购物车页
├── checkout.html          # 结算页
│
├── css/
│   └── style.css          # 全局样式
│
├── js/
│   ├── products-data.js   # 产品数据
│   ├── cart.js            # 购物车管理
│   ├── main.js            # 主页功能
│   ├── products.js        # 产品页功能
│   ├── cart-page.js       # 购物车页功能
│   └── checkout.js        # 结算页功能
│
└── images/                # 图片文件夹（可添加实际图片）
```

## 功能特性

### 1. 主页 (index.html)
- 欢迎横幅
- 展示特色产品
- 显示店铺特色（优质食材、手工制作、快速配送）

### 2. 产品页面 (products.html)
- 显示所有产品
- 按分类筛选（全部、生日蛋糕、婚礼蛋糕、纸杯蛋糕、特色蛋糕）
- 产品卡片展示（图片、名称、描述、价格）
- 添加到购物车功能

### 3. 购物车页面 (cart.html)
- 显示购物车中的所有商品
- 调整商品数量（增加/减少）
- 删除商品
- 显示订单摘要（小计、配送费、总计）
- 继续购物或前往结算

### 4. 结算页面 (checkout.html)
- 填写配送信息（姓名、电话、邮箱、地址）
- 选择支付方式（微信支付、支付宝、货到付款）
- 添加订单备注
- 显示订单摘要
- 提交订单

## 技术特点

- **纯前端实现**：无需后端服务器，可直接在浏览器中运行
- **本地存储**：使用 localStorage 保存购物车和订单数据
- **响应式设计**：适配桌面和移动设备
- **用户友好**：添加商品时显示通知提示
- **数据持久化**：刷新页面后购物车数据不丢失

## 如何使用

1. **直接打开**：
   - 在浏览器中打开 `index.html` 文件即可开始使用

2. **使用本地服务器**（推荐）：
   ```bash
   # 使用 Python 3
   python -m http.server 8000

   # 或使用 Node.js 的 http-server
   npx http-server
   ```
   然后在浏览器中访问 `http://localhost:8000`

## 产品数据

系统包含 15 种预设蛋糕产品：
- 生日蛋糕：经典草莓、巧克力慕斯、卡通造型等
- 婚礼蛋糕：三层婚礼蛋糕、浪漫玫瑰蛋糕
- 纸杯蛋糕：彩虹、香草、巧克力口味
- 特色蛋糕：芒果千层、抹茶红豆、提拉米苏等

## 自定义

### 添加新产品
编辑 `js/products-data.js` 文件，在 `products` 数组中添加新产品：

```javascript
{
    id: 16,
    name: "新产品名称",
    category: "birthday", // birthday, wedding, cupcake, special
    price: 188,
    description: "产品描述",
    image: "🎂", // 可以使用 emoji 或图片路径
    featured: false // 是否在首页展示
}
```

### 修改样式
编辑 `css/style.css` 文件来自定义颜色、字体和布局。

主要颜色变量：
```css
:root {
    --primary-color: #ff6b9d;      /* 主色调 */
    --secondary-color: #c44569;    /* 次要色调 */
    --text-color: #333;            /* 文字颜色 */
    --light-bg: #fff5f8;           /* 浅色背景 */
}
```

### 添加真实图片
1. 将图片放入 `images/` 文件夹
2. 在 `products-data.js` 中修改 `image` 属性为图片路径：
   ```javascript
   image: "images/cake1.jpg"
   ```
3. 在 CSS 中调整 `.product-image` 样式

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

需要支持 ES6+ 和 localStorage。

## 未来改进

- [ ] 添加用户登录/注册功能
- [ ] 订单历史查看
- [ ] 产品搜索功能
- [ ] 产品评价系统
- [ ] 后端集成（数据库、支付接口）
- [ ] 管理员后台

## 许可证

本项目仅供学习和演示使用。

## 作者

使用 Claude Code 创建
