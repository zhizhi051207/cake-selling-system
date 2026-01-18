// 主页功能
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
});

// 加载特色产品
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = getFeaturedProducts();

    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
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
