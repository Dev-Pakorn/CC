// ... (ส่วน Monitor และ Manage PC เดิม) ...

// --- 3. MANAGE SOFTWARE LOGIC (อัปเดตใหม่ รองรับ Modal) ---
let softModalInstance; // ตัวแปรเก็บ Modal Instance

function renderSoftTable() {
    const tb = document.getElementById('softTable');
    if(!tb) return;
    tb.innerHTML = '';
    
    DB.getSoft().forEach(s => {
        tb.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.version}</td>
            <td>
                <button onclick="openSoftModal(${s.id})" class="btn btn-sm btn-warning">แก้ไข</button>
                <button onclick="delSoft(${s.id})" class="btn btn-sm btn-outline-danger">ลบ</button>
            </td>
        </tr>`;
    });
}

function openSoftModal(id = null) {
    // กำหนดค่าลงในฟอร์ม
    const title = document.getElementById('softModalTitle');
    const inpId = document.getElementById('editSoftId');
    const inpName = document.getElementById('inpSoftName');
    const inpVer = document.getElementById('inpSoftVer');
    
    // ตรวจสอบว่าเปิด Modal ในหน้านี้ได้หรือไม่ (กัน Error หน้าอื่น)
    const modalEl = document.getElementById('modalSoft');
    if(!modalEl) return; 

    if(id) {
        // กรณีแก้ไข
        const s = DB.getSoft().find(item => item.id == id);
        if(s) {
            title.innerText = 'แก้ไขซอฟต์แวร์';
            inpId.value = s.id;
            inpName.value = s.name;
            inpVer.value = s.version;
        }
    } else {
        // กรณีเพิ่มใหม่
        title.innerText = 'เพิ่มซอฟต์แวร์ใหม่';
        inpId.value = '';
        inpName.value = '';
        inpVer.value = '';
    }

    // เปิด Modal ด้วย Bootstrap API
    softModalInstance = new bootstrap.Modal(modalEl);
    softModalInstance.show();
}

function saveSoft() {
    const id = document.getElementById('editSoftId').value;
    const name = document.getElementById('inpSoftName').value;
    const ver = document.getElementById('inpSoftVer').value;

    if(!name) return alert('กรุณากรอกชื่อซอฟต์แวร์');

    let softs = DB.getSoft();
    
    if(id) {
        // แก้ไขข้อมูลเดิม
        let s = softs.find(item => item.id == id);
        if(s) {
            s.name = name;
            s.version = ver;
        }
    } else {
        // เพิ่มข้อมูลใหม่
        const newId = softs.length > 0 ? Math.max(...softs.map(s => s.id)) + 1 : 1;
        softs.push({ id: newId, name: name, version: ver });
    }

    DB.saveSoft(softs);
    
    // ปิด Modal และรีโหลดตาราง
    if(softModalInstance) softModalInstance.hide();
    renderSoftTable();
}

function delSoft(id) {
    if(confirm('ยืนยันการลบซอฟต์แวร์นี้?')) {
        let softs = DB.getSoft().filter(s => s.id != id);
        DB.saveSoft(softs);
        renderSoftTable();
    }
}