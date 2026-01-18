// 结算页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!isLoggedIn()) {
        alert('请先登录后再结算');
        window.location.href = 'login.html?return=checkout.html';
        return;
    }

    checkCartEmpty();
    displayOrderSummary();
    setupCheckoutForm();
    prefillUserInfo();
});

// 检查购物车是否为空
function checkCartEmpty() {
    const items = cart.getItems();
    if (items.length === 0) {
        alert('购物车是空的！');
        window.location.href = 'products.html';
    }
}

// 显示订单摘要
function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const items = cart.getItems();

    orderItemsContainer.innerHTML = items.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>数量: ${item.quantity}</small>
            </div>
            <div>¥${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    updateOrderSummary();
}

// 更新订单摘要
function updateOrderSummary() {
    const subtotal = cart.getTotal();
    const shipping = 20;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `¥${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `¥${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `¥${total.toFixed(2)}`;
}

// 设置结算表单
function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 获取表单数据
        const formData = {
            customer_name: document.getElementById('name').value,
            customer_phone: document.getElementById('phone').value,
            customer_email: document.getElementById('email').value,
            delivery_address: document.getElementById('address').value,
            payment_method: document.querySelector('input[name="payment"]:checked').value,
            order_notes: document.getElementById('notes').value,
            items: cart.getItems()
        };

        // 验证表单
        if (!formData.customer_name || !formData.customer_phone || !formData.delivery_address) {
            alert('请填写所有必填项！');
            return;
        }

        // 禁用提交按钮
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        try {
            // 调用后端 API 创建订单
            const result = await createOrder(formData);

            if (result.success) {
                // 清空购物车
                cart.clearCart();

                // 显示成功消息并跳转到订单页面
                alert('订单提交成功！感谢您的购买。');
                window.location.href = 'orders.html';
            } else {
                alert(result.message || '订单提交失败，请重试');
                submitBtn.disabled = false;
                submitBtn.textContent = '提交订单';
            }
        } catch (error) {
            console.error('提交订单错误:', error);
            alert('订单提交失败，请检查网络连接');
            submitBtn.disabled = false;
            submitBtn.textContent = '提交订单';
        }
    });
}

// 预填充用户信息
async function prefillUserInfo() {
    const user = await fetchCurrentUser();

    if (user) {
        if (user.full_name) {
            document.getElementById('name').value = user.full_name;
        }
        if (user.phone) {
            document.getElementById('phone').value = user.phone;
        }
        if (user.email) {
            document.getElementById('email').value = user.email;
        }
        if (user.address) {
            document.getElementById('address').value = user.address;
        }
    }
}
