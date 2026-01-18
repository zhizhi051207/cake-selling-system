// 产品页面功能
document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    setupFilters();
});

let currentCategory = 'all';

// 加载所有产品
function loadAllProducts() {
    displayProducts(getAllProducts());
}

// 显示产品
function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">没有找到产品</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">¥${product.price}</span>
                    <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                        加入购物车
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 设置过滤器
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的 active 类
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // 添加 active 类到当前按钮
            this.classList.add('active');

            // 获取分类并过滤产品
            const category = this.getAttribute('data-category');
            currentCategory = category;

            const filteredProducts = getProductsByCategory(category);
            displayProducts(filteredProducts);
        });
    });
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        'birthday': '生日蛋糕',
        'wedding': '婚礼蛋糕',
        'cupcake': '纸杯蛋糕',
        'special': '特色蛋糕'
    };
    return categories[category] || category;
}
