// 订单管理相关函数

// 创建订单
async function createOrder(orderData) {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        return await response.json();
    } catch (error) {
        console.error('创建订单错误:', error);
        return { success: false, message: '创建订单失败' };
    }
}

// 获取用户订单列表
async function getUserOrders(page = 1, limit = 10) {
    try {
        const response = await authenticatedFetch(
            `${API_BASE_URL}/orders?page=${page}&limit=${limit}`
        );

        return await response.json();
    } catch (error) {
        console.error('获取订单列表错误:', error);
        return { success: false, message: '获取订单列表失败' };
    }
}

// 获取订单详情
async function getOrderDetail(orderId) {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/orders/${orderId}`);
        return await response.json();
    } catch (error) {
        console.error('获取订单详情错误:', error);
        return { success: false, message: '获取订单详情失败' };
    }
}

// 取消订单
async function cancelOrder(orderId) {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
            method: 'PUT'
        });

        return await response.json();
    } catch (error) {
        console.error('取消订单错误:', error);
        return { success: false, message: '取消订单失败' };
    }
}

// 获取订单统计
async function getOrderStats() {
    try {
        const response = await authenticatedFetch(`${API_BASE_URL}/orders/stats`);
        return await response.json();
    } catch (error) {
        console.error('获取订单统计错误:', error);
        return { success: false, message: '获取订单统计失败' };
    }
}

// 订单页面初始化
document.addEventListener('DOMContentLoaded', async function() {
    // 检查是否在订单页面
    if (!document.getElementById('orders-list')) return;

    // 检查登录状态
    if (!isLoggedIn()) {
        window.location.href = 'login.html?return=orders.html';
        return;
    }

    await loadOrderStats();
    await loadOrders();
});

// 加载订单统计
async function loadOrderStats() {
    const statsContainer = document.getElementById('order-stats');
    if (!statsContainer) return;

    const result = await getOrderStats();

    if (result.success) {
        const stats = result.data;
        statsContainer.innerHTML = `
            <div class="stat-card">
                <h3>${stats.total_orders || 0}</h3>
                <p>总订单数</p>
            </div>
            <div class="stat-card">
                <h3>${stats.pending_orders || 0}</h3>
                <p>待处理订单</p>
            </div>
            <div class="stat-card">
                <h3>${stats.completed_orders || 0}</h3>
                <p>已完成订单</p>
            </div>
            <div class="stat-card">
                <h3>¥${parseFloat(stats.total_spent || 0).toFixed(2)}</h3>
                <p>累计消费</p>
            </div>
        `;
    }
}

// 加载订单列表
async function loadOrders() {
    const loadingElement = document.getElementById('loading');
    const ordersListElement = document.getElementById('orders-list');
    const emptyOrdersElement = document.getElementById('empty-orders');

    const result = await getUserOrders();

    loadingElement.style.display = 'none';

    if (result.success && result.data.orders.length > 0) {
        ordersListElement.style.display = 'flex';
        emptyOrdersElement.style.display = 'none';

        ordersListElement.innerHTML = result.data.orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-number">订单号: ${order.order_number}</div>
                        <div class="order-date">${formatDate(order.order_date)}</div>
                    </div>
                    <span class="order-status ${order.order_status}">${getStatusText(order.order_status)}</span>
                </div>

                <div class="order-items">
                    <div class="order-item">
                        <span>共 ${order.item_count} 件商品</span>
                    </div>
                    <div class="order-item">
                        <span>配送地址: ${order.delivery_address}</span>
                    </div>
                </div>

                <div class="order-footer">
                    <div class="order-total">总计: ¥${parseFloat(order.total_amount).toFixed(2)}</div>
                    <div class="order-actions">
                        <button class="btn btn-secondary btn-small" onclick="viewOrderDetail(${order.order_id})">查看详情</button>
                        ${order.order_status === 'pending' ?
                            `<button class="btn btn-primary btn-small" onclick="handleCancelOrder(${order.order_id})">取消订单</button>` :
                            ''}
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        ordersListElement.style.display = 'none';
        emptyOrdersElement.style.display = 'block';
    }
}

// 查看订单详情
async function viewOrderDetail(orderId) {
    const result = await getOrderDetail(orderId);

    if (result.success) {
        const order = result.data;
        const itemsHtml = order.items.map(item => `
            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                <span>${item.product_name} x ${item.quantity}</span>
                <span>¥${parseFloat(item.subtotal).toFixed(2)}</span>
            </div>
        `).join('');

        const detailHtml = `
            <div style="max-width: 500px;">
                <h3>订单详情</h3>
                <p><strong>订单号:</strong> ${order.order_number}</p>
                <p><strong>下单时间:</strong> ${formatDate(order.order_date)}</p>
                <p><strong>订单状态:</strong> ${getStatusText(order.order_status)}</p>
                <hr>
                <p><strong>收货人:</strong> ${order.customer_name}</p>
                <p><strong>联系电话:</strong> ${order.customer_phone}</p>
                <p><strong>配送地址:</strong> ${order.delivery_address}</p>
                <p><strong>支付方式:</strong> ${getPaymentMethodText(order.payment_method)}</p>
                ${order.order_notes ? `<p><strong>备注:</strong> ${order.order_notes}</p>` : ''}
                <hr>
                <h4>订单商品</h4>
                ${itemsHtml}
                <hr>
                <p><strong>小计:</strong> ¥${parseFloat(order.subtotal).toFixed(2)}</p>
                <p><strong>配送费:</strong> ¥${parseFloat(order.shipping_fee).toFixed(2)}</p>
                <p style="font-size: 1.2rem; color: var(--primary-color);"><strong>总计:</strong> ¥${parseFloat(order.total_amount).toFixed(2)}</p>
            </div>
        `;

        // 使用简单的 alert 显示（实际项目中可以使用模态框）
        const detailWindow = window.open('', '订单详情', 'width=600,height=800');
        detailWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>订单详情</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h3 { color: #ff6b9d; }
                    hr { border: none; border-top: 1px solid #eee; margin: 1rem 0; }
                </style>
            </head>
            <body>
                ${detailHtml}
            </body>
            </html>
        `);
    } else {
        alert('获取订单详情失败');
    }
}

// 取消订单
async function handleCancelOrder(orderId) {
    if (!confirm('确定要取消这个订单吗？')) {
        return;
    }

    const result = await cancelOrder(orderId);

    if (result.success) {
        alert('订单已取消');
        await loadOrderStats();
        await loadOrders();
    } else {
        alert(result.message || '取消订单失败');
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'pending': '待处理',
        'confirmed': '已确认',
        'preparing': '制作中',
        'delivering': '配送中',
        'completed': '已完成',
        'cancelled': '已取消'
    };
    return statusMap[status] || status;
}

// 获取支付方式文本
function getPaymentMethodText(method) {
    const methodMap = {
        'wechat': '微信支付',
        'alipay': '支付宝',
        'cash': '货到付款'
    };
    return methodMap[method] || method;
}
