// API 基础 URL
const API_BASE_URL = 'http://localhost:3000/api';

// 认证相关函数

// 用户注册
async function register(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.success) {
            // 保存 token 和用户信息
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify({
                userId: data.data.userId,
                username: data.data.username,
                email: data.data.email,
                full_name: data.data.full_name
            }));
        }

        return data;
    } catch (error) {
        console.error('注册错误:', error);
        return { success: false, message: '网络错误，请稍后重试' };
    }
}

// 用户登录
async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // 保存 token 和用户信息
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify({
                userId: data.data.userId,
                username: data.data.username,
                email: data.data.email,
                full_name: data.data.full_name
            }));
        }

        return data;
    } catch (error) {
        console.error('登录错误:', error);
        return { success: false, message: '网络错误，请稍后重试' };
    }
}

// 用户登出
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// 检查是否已登录
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
}

// 获取当前用户信息
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// 获取 token
function getToken() {
    return localStorage.getItem('token');
}

// 获取当前用户详细信息（从服务器）
async function fetchCurrentUser() {
    try {
        const token = getToken();
        if (!token) return null;

        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            // 更新本地存储的用户信息
            localStorage.setItem('user', JSON.stringify(data.data));
            return data.data;
        }

        return null;
    } catch (error) {
        console.error('获取用户信息错误:', error);
        return null;
    }
}

// 更新用户信息
async function updateUserProfile(userData) {
    try {
        const token = getToken();
        if (!token) {
            return { success: false, message: '请先登录' };
        }

        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.success) {
            // 刷新用户信息
            await fetchCurrentUser();
        }

        return data;
    } catch (error) {
        console.error('更新用户信息错误:', error);
        return { success: false, message: '网络错误，请稍后重试' };
    }
}

// 需要认证的 API 请求
async function authenticatedFetch(url, options = {}) {
    const token = getToken();

    if (!token) {
        window.location.href = 'login.html?return=' + encodeURIComponent(window.location.pathname);
        throw new Error('未登录');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    // 如果返回 401，说明 token 过期或无效
    if (response.status === 401) {
        logout();
        throw new Error('登录已过期，请重新登录');
    }

    return response;
}

// 更新导航栏显示
function updateNavbar() {
    const user = getCurrentUser();
    const navMenu = document.querySelector('.nav-menu');

    if (!navMenu) return;

    // 移除已存在的用户菜单
    const existingUserMenu = navMenu.querySelector('.user-menu');
    if (existingUserMenu) {
        existingUserMenu.remove();
    }

    if (user) {
        // 已登录，显示用户菜单
        const userMenuItem = document.createElement('li');
        userMenuItem.className = 'user-menu';
        userMenuItem.innerHTML = `
            <a href="orders.html">我的订单</a>
        `;
        navMenu.appendChild(userMenuItem);

        const logoutMenuItem = document.createElement('li');
        logoutMenuItem.innerHTML = `
            <a href="#" onclick="logout(); return false;">退出 (${user.username})</a>
        `;
        navMenu.appendChild(logoutMenuItem);
    } else {
        // 未登录，显示登录/注册链接
        const loginMenuItem = document.createElement('li');
        loginMenuItem.innerHTML = `
            <a href="login.html">登录</a>
        `;
        navMenu.appendChild(loginMenuItem);

        const registerMenuItem = document.createElement('li');
        registerMenuItem.innerHTML = `
            <a href="register.html">注册</a>
        `;
        navMenu.appendChild(registerMenuItem);
    }
}

// 页面加载时更新导航栏
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbar);
} else {
    updateNavbar();
}
