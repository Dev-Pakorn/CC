// Load simulation PC list
document.addEventListener('DOMContentLoaded', () => {
    const pcs = DB.getPCs();
    const sel = document.getElementById('simPC');
    if(sel) pcs.forEach(p => sel.innerHTML += `<option value="${p.id}">${p.name} (${p.status})</option>`);
    
    // Redirect if session exists
    if(DB.getSession() && !location.href.includes('usage.html')) {
        window.location.href = 'usage.html';
    }
});

function showForm(type, btn) {
    document.getElementById('formInternal').style.display = type === 'internal' ? 'block' : 'none';
    document.getElementById('formExternal').style.display = type === 'external' ? 'block' : 'none';
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function checkInternal() {
    const id = document.getElementById('intId').value;
    if(MOCK_USERS_API[id]) {
        // Save temp data to localStorage to pass to next page
        localStorage.setItem('temp_user', JSON.stringify({ ...MOCK_USERS_API[id], type: 'internal' }));
        window.location.href = 'checkin.html';
    } else {
        alert('ไม่พบข้อมูล (ลองใช้รหัส 66123456)');
    }
}

function checkExternal() {
    const name = document.getElementById('extName').value;
    const org = document.getElementById('extOrg').value;
    if(name && org) {
        localStorage.setItem('temp_user', JSON.stringify({ name, faculty: org, type: 'external' }));
        window.location.href = 'checkin.html';
    } else alert('กรุณากรอกข้อมูล');
}

function loadConfirmPage() {
    const u = JSON.parse(localStorage.getItem('temp_user'));
    if(!u) window.location.href = 'index.html';
    document.getElementById('showName').innerText = u.name;
    document.getElementById('showDetail').innerText = u.faculty || '-';
}

function confirmStart() {
    const u = JSON.parse(localStorage.getItem('temp_user'));
    // ในสถานการณ์จริง pcId จะมาจากเครื่องที่นั่งอยู่ หรือ URL param
    // แต่ใน Simulation นี้เราต้องย้อนกลับไปเอาค่าจาก index.html หรือตั้งค่าจำลอง
    // เพื่อความง่ายใน Demo นี้ ให้สุ่มเครื่องว่าง หรือใช้ค่า Default
    let pcs = DB.getPCs();
    let pcId = pcs.find(p => p.status === 'available')?.id; 
    
    if(!pcId) return alert('ไม่มีเครื่องว่างในขณะนี้');

    updatePCStatus(pcId, 'in_use', u.name);
    DB.setSession({ ...u, pcId, startTime: Date.now() });
    DB.saveLog({ action: 'Check-in', user: u.name, pcId, faculty: u.faculty });
    window.location.href = 'usage.html';
}