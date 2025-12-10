// js/user.js

// --- 1. INDEX PAGE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // โหลดรายชื่อ PC ใส่ Simulation Bar (เฉพาะหน้า Index)
    const simSelect = document.getElementById('simPC');
    if (simSelect) {
        DB.getPCs().forEach(p => {
            simSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.status})</option>`;
        });
        
        // ถ้ามี Session ค้างอยู่ ให้เด้งไปหน้า Usage ทันที
        if(DB.getSession()) window.location.href = 'usage.html';
    }
});

function switchTab(type, btn) {
    document.getElementById('formInternal').style.display = type === 'internal' ? 'block' : 'none';
    document.getElementById('formExternal').style.display = type === 'external' ? 'block' : 'none';
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function checkInternal() {
    const id = document.getElementById('intId').value;
    const user = MOCK_USERS_API[id];
    if(user) {
        // บันทึกข้อมูลชั่วคราวเพื่อส่งไปหน้า Checkin
        localStorage.setItem('temp_user', JSON.stringify({ ...user, id }));
        window.location.href = 'checkin.html';
    } else {
        alert('ไม่พบข้อมูล (Hint: ลองใช้รหัส 66123456)');
    }
}

function checkExternal() {
    const name = document.getElementById('extName').value;
    const org = document.getElementById('extOrg').value;
    if(name && org) {
        localStorage.setItem('temp_user', JSON.stringify({ name, faculty: org, type: 'external' }));
        window.location.href = 'checkin.html';
    } else alert('กรุณากรอกข้อมูลให้ครบ');
}

// --- 2. CHECKIN PAGE LOGIC ---
function loadConfirmPage() {
    const u = JSON.parse(localStorage.getItem('temp_user'));
    if(!u) window.location.href = 'index.html';
    document.getElementById('showName').innerText = u.name;
    document.getElementById('showFac').innerText = u.faculty || '-';
}

function confirmStart() {
    const u = JSON.parse(localStorage.getItem('temp_user'));
    
    // Simulation: สุ่มเลือกเครื่องว่าง (หรือดึงจาก Simulation Bar ถ้ามีการส่งค่ามา)
    // ในที่นี้เราจะสมมติว่า User นั่งเครื่องแรกที่ว่าง
    let pcs = DB.getPCs();
    let freePC = pcs.find(p => p.status === 'available');
    
    if(!freePC) return alert('ขณะนี้เครื่องเต็มทุกเครื่อง');

    // 1. อัปเดตสถานะเครื่อง
    updatePCStatus(freePC.id, 'in_use', u.name);
    
    // 2. สร้าง Session จริง
    DB.setSession({ ...u, pcId: freePC.id, startTime: Date.now() });
    
    // 3. บันทึก Log
    DB.saveLog({ action: 'Check-in', user: u.name, pcId: freePC.id, faculty: u.faculty });
    
    // 4. ไปหน้า Usage
    window.location.href = 'usage.html';
}

// --- 3. FEEDBACK LOGIC ---
function submitFeedback(rating) {
    const s = DB.getSession();
    if(s) {
        updatePCStatus(s.pcId, 'available');
        DB.saveLog({ action: 'Check-out', user: s.name, pcId: s.pcId, rating: rating, faculty: s.faculty });
        DB.clearSession();
    }
    alert('ขอบคุณที่ใช้บริการ');
    window.location.href = 'index.html';
}