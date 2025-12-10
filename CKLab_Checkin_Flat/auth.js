// auth.js

// ตรวจสอบสถานะการ Login (ใช้แปะหัวหน้า Admin ทุกหน้า)
function requireAuth() {
    if (!localStorage.getItem('ck_admin_logged')) {
        window.location.href = 'login.html';
    }
}

// ฟังก์ชัน Login
function attemptLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    // ตรวจสอบรหัสผ่าน (Hardcode สำหรับ Demo)
    if (u === 'admin' && p === '1234') {
        localStorage.setItem('ck_admin_logged', 'true');
        window.location.href = 'dashboard.html';
    } else {
        // แสดงข้อความแจ้งเตือน
        if (errorMsg) {
            errorMsg.innerText = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
            errorMsg.style.display = 'block';
        } else {
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    }
}

// ฟังก์ชัน Logout
function logout() {
    localStorage.removeItem('ck_admin_logged');
    window.location.href = 'login.html';
}

// ตรวจสอบการกด Enter ที่ช่อง Password
document.addEventListener('DOMContentLoaded', () => {
    const passInput = document.getElementById('password');
    if (passInput) {
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') attemptLogin();
        });
    }
});