// 购物车页面功能
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    setupCheckoutButton();
});

// 显示购物车商品
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.querySelector('.cart-content');

    const items = cart.getItems();

    if (items.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">¥${item.price}</p>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeCartItem(${item.id})">删除</button>
                </div>
            </div>
            <div class="cart-item-total">
                <strong>¥${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// 更新商品数量
function updateItemQuantity(productId, quantity) {
    cart.updateQuantity(productId, quantity);
    displayCartItems();
}

// 移除购物车商品
function removeCartItem(productId) {
    if (confirm('确定要删除这个商品吗？')) {
        cart.removeItem(productId);
        displayCartItems();
    }
}

// 更新购物车摘要
function updateCartSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `¥${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `¥${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `¥${total.toFixed(2)}`;
}

// 设置结算按钮
function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const items = cart.getItems();
            if (items.length === 0) {
                alert('购物车是空的！');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
}
