// Render Monitor
function renderMonitor() {
    const grid = document.getElementById('monitorGrid');
    if(grid) {
        grid.innerHTML = '';
        DB.getPCs().forEach(p => {
            let bg = p.status === 'in_use' ? 'bg-danger' : (p.status === 'available' ? 'bg-success' : 'bg-secondary');
            grid.innerHTML += `
                <div class="col-md-3">
                    <div class="card text-white ${bg} p-3 text-center">
                        <h4>${p.name}</h4>
                        <p>${p.status}</p>
                        <small>${p.currentUser || '-'}</small>
                        ${p.status === 'in_use' ? `<button onclick="forceOut(${p.id})" class="btn btn-sm btn-light mt-2 text-danger">Force Out</button>` : ''}
                    </div>
                </div>
            `;
        });
    }
    renderTable();
}

function renderTable() {
    const tb = document.getElementById('pcTable');
    if(tb) {
        tb.innerHTML = '';
        DB.getPCs().forEach(p => {
            tb.innerHTML += `
                <tr>
                    <td>${p.id}</td><td>${p.name}</td>
                    <td><span class="badge bg-secondary">${p.status}</span></td>
                    <td><button onclick="delPC(${p.id})" class="btn btn-sm btn-outline-danger">Del</button></td>
                </tr>
            `;
        });
    }
}

function forceOut(id) { if(confirm('ยืนยัน Force Out?')) { updatePCStatus(id, 'available'); renderMonitor(); } }
function delPC(id) { if(confirm('ลบเครื่องนี้?')) { DB.savePCs(DB.getPCs().filter(x=>x.id!=id)); renderMonitor(); } }
function addPC() {
    const name = prompt("ชื่อเครื่องใหม่:");
    if(name) {
        let pcs = DB.getPCs();
        pcs.push({ id: Date.now(), name, status: 'available', software: [] });
        DB.savePCs(pcs);
        renderMonitor();
    }
}

// Auto Refresh
renderMonitor();
setInterval(renderMonitor, 2000);