// ตรวจสอบ Login
if(!localStorage.getItem('ck_admin_logged')) window.location.href = 'login.html';

let chartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // ตั้งค่าวันที่ Default (วันนี้)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dStart').value = today;
    document.getElementById('dEnd').value = today;
    
    // โหลดข้อมูลครั้งแรก
    renderReport();
});

function renderReport() {
    const logs = DB.getLogs();
    const start = document.getElementById('dStart').value;
    const end = document.getElementById('dEnd').value;
    const fac = document.getElementById('filterFac').value;
    const type = document.getElementById('filterType').value;

    // 1. กรองข้อมูล (Filter Logic)
    const filtered = logs.filter(log => {
        const logDate = log.timestamp.split('T')[0];
        
        // Filter Date
        if (start && logDate < start) return false;
        if (end && logDate > end) return false;
        
        // Filter Faculty
        if (fac && log.faculty !== fac) return false;
        
        // Filter User Type (ถ้ามี field type ใน log ถ้าไม่มีข้ามไป)
        // (ใน Mock DB ปัจจุบันอาจจะยังไม่มี field type ใน logs ชัดเจน แต่ใส่เผื่อไว้)
        // if (type && log.userType !== type) return false;

        return true;
    });

    // 2. เตรียมข้อมูลสำหรับกราฟ (Group by Faculty)
    // นับเฉพาะ Action 'Check-in' เพื่อดูจำนวนครั้งการเข้าใช้
    const stats = {};
    filtered.forEach(log => {
        if(log.action === 'Check-in') {
            const key = log.faculty || 'ไม่ระบุ';
            stats[key] = (stats[key] || 0) + 1;
        }
    });

    const labels = Object.keys(stats);
    const data = Object.values(stats);

    // 3. วาดกราฟ (Chart.js)
    const ctx = document.getElementById('usageChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy(); // ลบกราฟเก่าก่อนวาดใหม่
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.length ? labels : ['ไม่มีข้อมูล'],
            datasets: [{
                label: 'จำนวนการเข้าใช้งาน (ครั้ง)',
                data: data.length ? data : [0],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            },
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'สรุปยอดผู้ใช้งานแยกตามหน่วยงาน' }
            }
        }
    });

    // 4. แสดงข้อมูลในตาราง (Table Logic)
    const tbody = document.getElementById('logTableBody');
    tbody.innerHTML = '';

    // เรียงลำดับล่าสุดขึ้นก่อน และตัดมาแสดงแค่ 100 รายการ
    const displayLogs = filtered.slice().reverse().slice(0, 100);

    displayLogs.forEach(log => {
        const timeStr = new Date(log.timestamp).toLocaleString('th-TH');
        const pcName = DB.getPCs().find(p => p.id == log.pcId)?.name || `PC-${log.pcId}`;
        
        // Badge สีสถานะ
        const actionBadge = log.action === 'Check-in' 
            ? '<span class="badge bg-success">เข้าใช้งาน</span>' 
            : '<span class="badge bg-secondary">ออก/ประเมิน</span>';
        
        const ratingStar = log.rating ? `⭐ ${log.rating}` : '-';

        tbody.innerHTML += `
            <tr>
                <td class="text-center"><small>${timeStr}</small></td>
                <td>${log.user || 'Unknown'}</td>
                <td class="text-center">${actionBadge}</td>
                <td class="text-center">${pcName}</td>
                <td><small>${log.faculty || '-'}</small></td>
                <td class="text-center">${ratingStar}</td>
            </tr>
        `;
    });
}

function exportCSV() {
    const logs = DB.getLogs();
    if (logs.length === 0) return alert('ไม่มีข้อมูลให้ Export');

    // Header CSV
    let csvContent = "Timestamp,Action,User,Faculty,PC_ID,Rating\n";

    logs.forEach(row => {
        // จัดการเรื่องเครื่องหมายจุลภาคในข้อมูล (Escape commas)
        const clean = (text) => text ? `"${text.toString().replace(/"/g, '""')}"` : "";
        
        csvContent += `${row.timestamp},${row.action},${clean(row.user)},${clean(row.faculty)},${row.pcId},${row.rating || ''}\n`;
    });

    // สร้างไฟล์ CSV และดาวน์โหลด (รองรับภาษาไทยด้วย BOM \uFEFF)
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cklab_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}