// --- CONFIG & MOCK DATA ---
const DEFAULT_CONFIG = { labName: "CKLab", announcement: "ยินดีต้อนรับสู่ CKLab" };

const MOCK_USERS_API = {
    "66123456": { name: "นายสมชาย ใจดี", faculty: "คณะวิศวกรรมศาสตร์", year: "3", level: "ปริญญาตรี" },
    "66987654": { name: "น.ส.สมหญิง รักเรียน", faculty: "คณะวิทยาศาสตร์", year: "2", level: "ปริญญาตรี" }
};

const DEFAULT_COMPUTERS = [
    { id: 1, name: "PC-01", status: "available", software: [1, 2, 4] },
    { id: 2, name: "PC-02", status: "available", software: [1] },
    { id: 3, name: "PC-03", status: "maintenance", software: [] },
    { id: 4, name: "PC-04", status: "in_use", software: [1, 3], currentUser: "นายสมชาย (Demo)", startTime: Date.now() - 3600000 }
];

const DEFAULT_SOFTWARE = [
    { id: 1, name: "Microsoft Office", version: "2021" },
    { id: 2, name: "Python", version: "3.11" },
    { id: 3, name: "Adobe Photoshop", version: "2024" }
];

// --- LOCAL STORAGE DATABASE ---
const DB = {
    getData: (key, def) => JSON.parse(localStorage.getItem(key)) || def,
    setData: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    
    // Core Data
    getPCs: () => DB.getData('ck_pcs', DEFAULT_COMPUTERS),
    savePCs: (data) => DB.setData('ck_pcs', data),
    getSoft: () => DB.getData('ck_soft', DEFAULT_SOFTWARE),
    saveSoft: (data) => DB.setData('ck_soft', data),
    getLogs: () => DB.getData('ck_logs', []),
    saveLog: (log) => {
        let logs = DB.getLogs();
        logs.push({ ...log, timestamp: new Date().toISOString() });
        DB.setData('ck_logs', logs);
    },
    
    // Session Management
    getSession: () => JSON.parse(localStorage.getItem('ck_session')),
    setSession: (data) => localStorage.setItem('ck_session', JSON.stringify(data)),
    clearSession: () => localStorage.removeItem('ck_session')
};

// Helper function
function updatePCStatus(pcId, status, user = null) {
    let pcs = DB.getPCs();
    let pc = pcs.find(p => p.id == pcId);
    if (pc) {
        pc.status = status;
        pc.currentUser = user;
        pc.startTime = (status === 'in_use') ? Date.now() : null;
        DB.savePCs(pcs);
    }
}