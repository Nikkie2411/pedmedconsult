const generateId = (type) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const timeStr = now.getTime().toString().slice(-3); // Last 3 digits of timestamp
    
    const prefixes = {
        user: 'USER',
        pharmacist: 'PHARM', 
        request: 'REQ',
        dose: 'DOSE',
        concentration: 'CONC',
        department: 'DEPT',
        drug: 'DRUG'
    };
    
    const prefix = prefixes[type] || 'GEN';
    
    if (type === 'department' || type === 'drug') {
        return `${prefix}_${timeStr}`;
    }
    
    return `${prefix}_${dateStr}_${timeStr}`;
};

const generateDateTime = () => {
    return new Date().toISOString();
};

const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
};

const formatTime = (time) => {
    if (!time) return '';
    return time.slice(0, 5); // HH:MM format
};

const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    return new Date(dateTime).toISOString();
};

module.exports = {
    generateId,
    generateDateTime,
    formatDate,
    formatTime,
    formatDateTime
};
