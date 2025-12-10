// js/admin.js

// --- 1. DASHBOARD (MONITOR) ---
function renderMonitor() {
    const grid = document.getElementById('monitorGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    DB.getPCs().forEach(p => {
        let color = p.status === 'in_use' ? 'in_use' : (p.status === 'available' ? 'available' : 'maintenance');
        let userTxt = p.currentUser ? `<small class="d-block mt-2 bg-dark bg-opacity-25 px-1 rounded">${p.currentUser}</small>` : '';
        let btn = p.status === 'in_use' ? `<button onclick="forceOut(${p.id})" class="btn btn-light btn-sm text-danger fw-bold mt-2 w-100">Force Out</button>` : '';
        
        grid.innerHTML += `
        <div class="col-6 col-md-3">
            <div class="pc-box ${color} p-3 mb-3">
                <h4 class="m-0">${p.name}</h4>
                <span class="badge mt-1 bg-white text-dark">${p.status}</span>
                ${userTxt} ${btn}
            </div>
        </div>`;
    });
}

function forceOut(id) {
    if(confirm('ยืนยันบังคับออกจากระบบ?')) {
        updatePCStatus(id, 'available');
        renderMonitor();
    }
}

// --- 2. MANAGE PC ---
function renderPCTable() {
    const tb = document.getElementById('pcTable');
    if(!tb) return;
    tb.innerHTML = '';
    
    DB.getPCs().forEach(p => {
        tb.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td><b>${p.name}</b></td>
            <td><span class="badge bg-secondary">${p.status}</span></td>
            <td>
                <button onclick="delPC(${p.id})" class="btn btn-sm btn-outline-danger">ลบ</button>
            </td>
        </tr>`;
    });
}

function addPC() {
    const name = prompt("ชื่อเครื่องใหม่ (เช่น PC-05):");
    if(name) {
        let pcs = DB.getPCs();
        pcs.push({ id: Date.now(), name, status: 'available' });
        DB.savePCs(pcs);
        renderPCTable();
    }
}

function delPC(id) {
    if(confirm('ลบเครื่องนี้?')) {
        let pcs = DB.getPCs().filter(p => p.id != id);
        DB.savePCs(pcs);
        renderPCTable();
    }
}

// --- 3. CONFIG ---
function loadConfig() {
    const c = DB.getData('ck_config', { name: '', announce: '' });
    if(c && document.getElementById('confName')) {
        document.getElementById('confName').value = c.name;
        document.getElementById('confAnnounce').value = c.announce;
    }
}

function saveConfig() {
    const data = {
        name: document.getElementById('confName').value,
        announce: document.getElementById('confAnnounce').value
    };
    DB.setData('ck_config', data);
    alert('บันทึกการตั้งค่าเรียบร้อย');
}