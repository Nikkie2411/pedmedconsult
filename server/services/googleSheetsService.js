const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Load environment variables
require('dotenv').config();

class GoogleSheetsService {
    constructor() {
        this.doc = null;
        this.sheets = {};
        this.isInitialized = false;
    }

    async initialize() {
        try {
            // Validate required environment variables
            if (!process.env.GOOGLE_SHEETS_ID) {
                throw new Error('GOOGLE_SHEETS_ID is not set in environment variables');
            }
            if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
                throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in environment variables');
            }
            if (!process.env.GOOGLE_PRIVATE_KEY) {
                throw new Error('GOOGLE_PRIVATE_KEY is not set in environment variables');
            }

            // Create JWT auth object
            const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
            const serviceAccountAuth = new JWT({
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: privateKey,
                scopes: [
                    'https://www.googleapis.com/auth/spreadsheets',
                    'https://www.googleapis.com/auth/drive.file',
                ],
            });

            // Initialize the sheet
            this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAccountAuth);
            await this.doc.loadInfo();

            // Load all sheets
            this.sheets = {
                patients: this.doc.sheetsByTitle[process.env.PATIENTS_SHEET_NAME || 'Patients'],
                requests: this.doc.sheetsByTitle[process.env.REQUESTS_SHEET_NAME || 'Requests'],
                doses: this.doc.sheetsByTitle[process.env.DOSES_SHEET_NAME || 'Doses'],
                concentrations: this.doc.sheetsByTitle[process.env.CONCENTRATIONS_SHEET_NAME || 'Concentrations'],
                users: this.doc.sheetsByTitle[process.env.USERS_SHEET_NAME || 'Users'],
                pharmacists: this.doc.sheetsByTitle[process.env.PHARMACISTS_SHEET_NAME || 'Pharmacists']
            };

            this.isInitialized = true;
            console.log('✅ Google Sheets initialized successfully');
            console.log(`📊 Spreadsheet: ${this.doc.title}`);
            
        } catch (error) {
            console.error('❌ Failed to initialize Google Sheets:', error);
            throw error;
        }
    }

    async ensureInitialized() {
        if (!this.isInitialized) {
            await this.initialize();
        }
    }

    // PATIENTS Operations
    async createPatient(patientData) {
        await this.ensureInitialized();
        const sheet = this.sheets.patients;
        
        const newRow = {
            id: await this.getNextId('patients'),
            patientCode: patientData.patientCode,
            patientName: patientData.patientName,
            dateOfBirth: patientData.dateOfBirth,
            gender: patientData.gender,
            weight: patientData.weight,
            height: patientData.height,
            department: patientData.department,
            ward: patientData.ward,
            bedNumber: patientData.bedNumber,
            diagnosis: patientData.diagnosis,
            allergies: patientData.allergies,
            createdDate: new Date().toISOString().split('T')[0],
            createdBy: patientData.createdBy
        };

        const addedRow = await sheet.addRow(newRow);
        return { id: newRow.id, ...patientData };
    }

    async getPatients(department = null) {
        await this.ensureInitialized();
        const sheet = this.sheets.patients;
        const rows = await sheet.getRows();
        
        let patients = rows.map(row => ({
            id: row.get('id'),
            patientCode: row.get('patientCode'),
            patientName: row.get('patientName'),
            dateOfBirth: row.get('dateOfBirth'),
            gender: row.get('gender'),
            weight: row.get('weight'),
            height: row.get('height'),
            department: row.get('department'),
            ward: row.get('ward'),
            bedNumber: row.get('bedNumber'),
            diagnosis: row.get('diagnosis'),
            allergies: row.get('allergies'),
            createdDate: row.get('createdDate'),
            createdBy: row.get('createdBy')
        }));

        if (department) {
            patients = patients.filter(p => p.department === department);
        }

        return patients;
    }

    // REQUESTS Operations
    async createRequest(requestData) {
        await this.ensureInitialized();
        const sheet = this.sheets.requests;
        
        const newRow = {
            id: await this.getNextId('requests'),
            patientId: requestData.patientId,
            patientCode: requestData.patientCode,
            patientName: requestData.patientName,
            drugName: requestData.drugName,
            indication: requestData.indication,
            dosage: requestData.dosage,
            frequency: requestData.frequency,
            route: requestData.route,
            startDate: requestData.startDate,
            samplingDate: requestData.samplingDate,
            samplingTime: requestData.samplingTime,
            lastDoseTime: requestData.lastDoseTime,
            renalFunction: requestData.renalFunction,
            hepaticFunction: requestData.hepaticFunction,
            comorbidities: requestData.comorbidities,
            concomitantMeds: requestData.concomitantMeds,
            clinicalQuestion: requestData.clinicalQuestion,
            requestingDoctor: requestData.requestingDoctor,
            doctorEmail: requestData.doctorEmail,
            doctorPhone: requestData.doctorPhone,
            department: requestData.department,
            status: 'Chờ trả lời',
            assignedPharmacist: requestData.assignedPharmacist,
            pharmacistResponse: '',
            responseDate: '',
            responseBy: '',
            priority: requestData.priority || 'Thường',
            createdDate: new Date().toISOString().split('T')[0],
            updatedDate: new Date().toISOString().split('T')[0]
        };

        await sheet.addRow(newRow);
        return { id: newRow.id, ...newRow };
    }

    async getRequests(filters = {}) {
        await this.ensureInitialized();
        const sheet = this.sheets.requests;
        const rows = await sheet.getRows();
        
        let requests = rows.map(row => ({
            id: row.get('id'),
            patientId: row.get('patientId'),
            patientCode: row.get('patientCode'),
            patientName: row.get('patientName'),
            drugName: row.get('drugName'),
            indication: row.get('indication'),
            dosage: row.get('dosage'),
            frequency: row.get('frequency'),
            route: row.get('route'),
            startDate: row.get('startDate'),
            samplingDate: row.get('samplingDate'),
            samplingTime: row.get('samplingTime'),
            lastDoseTime: row.get('lastDoseTime'),
            renalFunction: row.get('renalFunction'),
            hepaticFunction: row.get('hepaticFunction'),
            comorbidities: row.get('comorbidities'),
            concomitantMeds: row.get('concomitantMeds'),
            clinicalQuestion: row.get('clinicalQuestion'),
            requestingDoctor: row.get('requestingDoctor'),
            doctorEmail: row.get('doctorEmail'),
            doctorPhone: row.get('doctorPhone'),
            department: row.get('department'),
            status: row.get('status'),
            assignedPharmacist: row.get('assignedPharmacist'),
            pharmacistResponse: row.get('pharmacistResponse'),
            responseDate: row.get('responseDate'),
            responseBy: row.get('responseBy'),
            priority: row.get('priority'),
            createdDate: row.get('createdDate'),
            updatedDate: row.get('updatedDate')
        }));

        // Apply filters
        if (filters.status) {
            requests = requests.filter(r => r.status === filters.status);
        }
        if (filters.department) {
            requests = requests.filter(r => r.department === filters.department);
        }
        if (filters.assignedPharmacist) {
            requests = requests.filter(r => r.assignedPharmacist === filters.assignedPharmacist);
        }

        return requests;
    }

    async updateRequestResponse(requestId, response, pharmacistName) {
        await this.ensureInitialized();
        const sheet = this.sheets.requests;
        const rows = await sheet.getRows();
        
        const requestRow = rows.find(row => row.get('id') == requestId);
        if (!requestRow) {
            throw new Error(`Request with ID ${requestId} not found`);
        }

        requestRow.set('status', 'Đã trả lời');
        requestRow.set('pharmacistResponse', response);
        requestRow.set('responseDate', new Date().toISOString().split('T')[0]);
        requestRow.set('responseBy', pharmacistName);
        requestRow.set('updatedDate', new Date().toISOString().split('T')[0]);

        await requestRow.save();
        
        return {
            success: true,
            requestId,
            response,
            pharmacistName,
            responseDate: new Date().toISOString().split('T')[0]
        };
    }

    // PHARMACISTS Operations
    async getPharmacists(filters = {}) {
        await this.ensureInitialized();
        const sheet = this.sheets.pharmacists;
        const rows = await sheet.getRows();
        
        let pharmacists = rows.map(row => ({
            id: row.get('id'),
            email: row.get('email'),
            fullName: row.get('fullName'),
            department: row.get('department'),
            specialization: row.get('specialization'),
            phoneNumber: row.get('phoneNumber'),
            workSchedule: row.get('workSchedule'),
            maxCaseLoad: parseInt(row.get('maxCaseLoad')) || 0,
            currentCaseLoad: parseInt(row.get('currentCaseLoad')) || 0,
            expertise: row.get('expertise'),
            isAvailable: row.get('isAvailable') === 'true',
            priority: parseInt(row.get('priority')) || 1,
            lastAssigned: row.get('lastAssigned'),
            createdDate: row.get('createdDate')
        }));

        // Apply filters
        if (filters.department) {
            pharmacists = pharmacists.filter(p => p.department === filters.department);
        }
        if (filters.isAvailable !== undefined) {
            pharmacists = pharmacists.filter(p => p.isAvailable === filters.isAvailable);
        }
        if (filters.drugName) {
            pharmacists = pharmacists.filter(p => 
                p.expertise.toLowerCase().includes(filters.drugName.toLowerCase())
            );
        }

        return pharmacists;
    }

    // UTILITY Methods
    async getNextId(sheetName) {
        const sheet = this.sheets[sheetName];
        const rows = await sheet.getRows();
        
        if (rows.length === 0) {
            return 1;
        }
        
        const maxId = Math.max(...rows.map(row => parseInt(row.get('id')) || 0));
        return maxId + 1;
    }

    // Health check
    async healthCheck() {
        try {
            await this.ensureInitialized();
            return {
                status: 'OK',
                sheetsConnected: Object.keys(this.sheets).filter(key => this.sheets[key]).length,
                totalSheets: Object.keys(this.sheets).length,
                spreadsheetTitle: this.doc.title
            };
        } catch (error) {
            return {
                status: 'ERROR',
                error: error.message
            };
        }
    }
}

// Export singleton instance
const googleSheetsService = new GoogleSheetsService();
module.exports = googleSheetsService;
