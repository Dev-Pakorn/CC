// js/timer.js
const session = DB.getSession();

// Security Check: ถ้าไม่มี session ให้กลับไปหน้าแรก
if(!session) {
    window.location.href = 'index.html';
} else {
    document.getElementById('userName').innerText = session.name;
    const pc = DB.getPCs().find(p => p.id == session.pcId);
    document.getElementById('pcName').innerText = pc ? pc.name : 'Unknown PC';

    // Start Timer
    setInterval(() => {
        const diff = Date.now() - session.startTime;
        const d = new Date(diff);
        document.getElementById('timer').innerText = d.toISOString().substr(11, 8);
    }, 1000);
}