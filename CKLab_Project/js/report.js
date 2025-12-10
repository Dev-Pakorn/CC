// js/report.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Chart
    const logs = DB.getLogs();
    const ctx = document.getElementById('chart').getContext('2d');
    
    // Group Data by Faculty (Check-in only)
    const stats = {};
    logs.forEach(l => {
        if(l.action === 'Check-in') {
            const fac = l.faculty || 'Other';
            stats[fac] = (stats[fac] || 0) + 1;
        }
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(stats),
            datasets: [{
                label: 'จำนวนการเข้าใช้งาน',
                data: Object.values(stats),
                backgroundColor: '#0d6efd'
            }]
        }
    });

    // 2. Render Table
    const tbody = document.getElementById('logBody');
    logs.slice().reverse().slice(0, 50).forEach(l => {
        tbody.innerHTML += `
        <tr>
            <td>${l.timestamp.slice(0,19).replace('T', ' ')}</td>
            <td>${l.user}</td>
            <td>${l.action}</td>
            <td>${l.faculty || '-'}</td>
        </tr>`;
    });
});