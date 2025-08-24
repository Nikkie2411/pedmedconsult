const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

class GoogleSheetsService {
    constructor() {
        this.doc = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            if (this.isInitialized) return;

            // Initialize the JWT auth
            const serviceAccountAuth = new JWT({
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            // Initialize the sheet
            this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAccountAuth);
            await this.doc.loadInfo();
            
            console.log('📊 Connected to Google Sheets:', this.doc.title);
            this.isInitialized = true;
            
            // Initialize sheets if they don't exist
            await this.initializeSheets();
        } catch (error) {
            console.error('❌ Failed to initialize Google Sheets:', error);
            throw error;
        }
    }

    async initializeSheets() {
        const requiredSheets = [
            { name: 'Patients', headers: ['id', 'createdDate', 'department', 'patientName', 'patientCode', 'gender', 'dob', 'weight', 'height', 'isIcu', 'isNewborn', 'gestationalAge', 'birthWeight', 'isObese', 'isCancer', 'tdmDrug', 'creatinineValue', 'creatinineDateTime', 'doctorName', 'doctorPhone', 'doctorEmail', 'status', 'pharmacistResponse', 'responseDate'] },
            { name: 'Doses', headers: ['id', 'patientId', 'amount', 'interval', 'duration', 'dateTime', 'createdAt'] },
            { name: 'Concentrations', headers: ['id', 'patientId', 'value', 'dateTime', 'createdAt'] },
            { name: 'Users', headers: ['id', 'email', 'name', 'department', 'role', 'pharmacistIds', 'createdAt'] },
            { name: 'Pharmacists', headers: ['id', 'email', 'name', 'phone', 'departments', 'createdAt'] }
        ];

        for (const sheetConfig of requiredSheets) {
            let sheet = this.doc.sheetsByTitle[sheetConfig.name];
            
            if (!sheet) {
                console.log(`📋 Creating sheet: ${sheetConfig.name}`);
                sheet = await this.doc.addSheet({
                    title: sheetConfig.name,
                    headerValues: sheetConfig.headers
                });
            } else {
                // Ensure headers are set
                await sheet.loadHeaderRow();
                if (sheet.headerValues.length === 0) {
                    await sheet.setHeaderRow(sheetConfig.headers);
                }
            }
        }
    }

    async getSheet(sheetName) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        const sheet = this.doc.sheetsByTitle[sheetName];
        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }
        
        await sheet.loadHeaderRow();
        return sheet;
    }

    async addRow(sheetName, data) {
        const sheet = await this.getSheet(sheetName);
        return await sheet.addRow(data);
    }

    async getRows(sheetName, options = {}) {
        const sheet = await this.getSheet(sheetName);
        return await sheet.getRows(options);
    }

    async updateRow(sheetName, rowIndex, data) {
        const sheet = await this.getSheet(sheetName);
        const rows = await sheet.getRows();
        if (rows[rowIndex]) {
            Object.assign(rows[rowIndex], data);
            await rows[rowIndex].save();
            return rows[rowIndex];
        }
        throw new Error('Row not found');
    }

    async findRowsByField(sheetName, field, value) {
        const rows = await this.getRows(sheetName);
        return rows.filter(row => row[field] === value);
    }
}

module.exports = new GoogleSheetsService();
