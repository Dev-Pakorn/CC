const session = DB.getSession();
if(!session) window.location.href = 'index.html';

document.getElementById('userName').innerText = session.name;
const pc = DB.getPCs().find(p => p.id == session.pcId);
document.getElementById('pcName').innerText = pc ? pc.name : 'Unknown PC';

setInterval(() => {
    const diff = Date.now() - session.startTime;
    const d = new Date(diff);
    document.getElementById('timer').innerText = d.toISOString().substr(11, 8);
}, 1000);

function checkOut() {
    window.location.href = 'feedback.html';
}