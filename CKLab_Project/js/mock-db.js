// js/mock-db.js

// --- 1. MOCK DATA (ข้อมูลจำลอง) ---
const DEFAULT_PCS = [
    { id: 1, name: "PC-01", status: "available" },
    { id: 2, name: "PC-02", status: "available" },
    { id: 3, name: "PC-03", status: "maintenance" },
    { id: 4, name: "PC-04", status: "in_use", currentUser: "นายสมชาย (Demo)", startTime: Date.now() - 3600000 }
];

const MOCK_USERS_API = {
    "66123456": { name: "นายสมชาย ใจดี", faculty: "คณะวิศวกรรมศาสตร์", type: "internal" },
    "66987654": { name: "น.ส.สมหญิง รักเรียน", faculty: "คณะวิทยาศาสตร์", type: "internal" }
};

// --- 2. DATABASE MANAGER (LocalStorage) ---
const DB = {
    getData: (key, def) => JSON.parse(localStorage.getItem(key)) || def,
    setData: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    
    // จัดการข้อมูลเครื่อง PC
    getPCs: () => DB.getData('ck_pcs', DEFAULT_PCS),
    savePCs: (data) => DB.setData('ck_pcs', data),
    
    // จัดการ Logs
    getLogs: () => DB.getData('ck_logs', []),
    saveLog: (log) => {
        let logs = DB.getLogs();
        logs.push({ ...log, timestamp: new Date().toISOString() });
        DB.setData('ck_logs', logs);
    },

    // จัดการ Session (ข้อมูลผู้ใช้ที่กำลัง login)
    getSession: () => JSON.parse(localStorage.getItem('ck_session')),
    setSession: (data) => localStorage.setItem('ck_session', JSON.stringify(data)),
    clearSession: () => localStorage.removeItem('ck_session')
};

// Helper: อัปเดตสถานะ PC
function updatePCStatus(pcId, status, user = null) {
    let pcs = DB.getPCs();
    let pc = pcs.find(p => p.id == pcId);
    if (pc) {
        pc.status = status;
        pc.currentUser = user;
        pc.startTime = status === 'in_use' ? Date.now() : null;
        DB.savePCs(pcs);
    }
}