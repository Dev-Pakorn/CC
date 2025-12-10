// js/auth.js
function requireAuth() {
    if (!localStorage.getItem('ck_admin_logged')) {
        window.location.href = 'login.html';
    }
}

function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === '1234') {
        localStorage.setItem('ck_admin_logged', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('รหัสผ่านไม่ถูกต้อง (admin/1234)');
    }
}

function logout() {
    localStorage.removeItem('ck_admin_logged');
    window.location.href = 'login.html';
}