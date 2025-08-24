// Mock Google Sheets Service for development/testing
class MockGoogleSheetsService {
    constructor() {
        this.mockData = {
            patients: [
                { id: 1, patientCode: 'BN001', patientName: 'Nguyễn Văn A', dateOfBirth: '2020-01-15', gender: 'Nam', weight: 15, height: 100, department: 'Nhi khoa', ward: 'A1', bedNumber: '01', diagnosis: 'Nhiễm khuẩn', allergies: 'Không', createdDate: '2025-08-24', createdBy: 'BS. Nguyễn' },
                { id: 2, patientCode: 'BN002', patientName: 'Trần Thị B', dateOfBirth: '2019-05-20', gender: 'Nữ', weight: 18, height: 105, department: 'Nhi khoa', ward: 'A2', bedNumber: '02', diagnosis: 'Viêm phổi', allergies: 'Penicillin', createdDate: '2025-08-24', createdBy: 'BS. Trần' },
                { id: 3, patientCode: 'BN003', patientName: 'Lê Văn C', dateOfBirth: '2022-03-10', gender: 'Nam', weight: 12, height: 95, department: 'Nhi khoa', ward: 'B1', bedNumber: '03', diagnosis: 'Suy tim', allergies: 'Không', createdDate: '2025-08-24', createdBy: 'BS. Lê' }
            ],
            requests: [
                { id: 1, patientId: 1, patientCode: 'BN001', patientName: 'Nguyễn Văn A', drugName: 'Vancomycin', indication: 'Nhiễm khuẩn nặng', dosage: '15mg/kg', frequency: '12h', route: 'IV', startDate: '2025-08-23', samplingDate: '2025-08-24', samplingTime: '08:00', lastDoseTime: '20:00', renalFunction: 'Bình thường', hepaticFunction: 'Bình thường', comorbidities: 'Không', concomitantMeds: 'Không', clinicalQuestion: 'Điều chỉnh liều duy trì', requestingDoctor: 'BS. Nguyễn Văn D', doctorEmail: 'doctor1@hospital.com', doctorPhone: '0912345678', department: 'Nhi khoa', status: 'Chờ trả lời', assignedPharmacist: 'DS. Nguyễn Văn X', pharmacistResponse: '', responseDate: '', responseBy: '', priority: 'Cấp', createdDate: '2025-08-24', updatedDate: '2025-08-24' },
                { id: 2, patientId: 2, patientCode: 'BN002', patientName: 'Trần Thị B', drugName: 'Digoxin', indication: 'Suy tim', dosage: '5mcg/kg', frequency: '24h', route: 'PO', startDate: '2025-08-22', samplingDate: '2025-08-24', samplingTime: '06:00', lastDoseTime: '06:00', renalFunction: 'Giảm nhẹ', hepaticFunction: 'Bình thường', comorbidities: 'Suy tim', concomitantMeds: 'Furosemide', clinicalQuestion: 'Đánh giá nồng độ duy trì', requestingDoctor: 'BS. Trần Thị E', doctorEmail: 'doctor2@hospital.com', doctorPhone: '0987654321', department: 'Nhi khoa', status: 'Đã trả lời', assignedPharmacist: 'DS. Trần Thị Y', pharmacistResponse: 'Nồng độ trong khoảng điều trị. Tiếp tục liều hiện tại. Theo dõi chức năng thận.', responseDate: '2025-08-24', responseBy: 'DS. Trần Thị Y', priority: 'Thường', createdDate: '2025-08-23', updatedDate: '2025-08-24' }
            ],
            pharmacists: [
                { id: 1, email: 'duocsi1@hospital.com', fullName: 'Dược sĩ Nguyễn Văn X', department: 'Nhi khoa', specialization: 'TDM Nhi', phoneNumber: '0901234567', workSchedule: 'T2-T6: 7h-16h', maxCaseLoad: 10, currentCaseLoad: 3, expertise: 'Vancomycin, Digoxin', isAvailable: true, priority: 1, lastAssigned: '2025-08-24 08:00', createdDate: '2025-08-20' },
                { id: 2, email: 'duocsi2@hospital.com', fullName: 'Dược sĩ Trần Thị Y', department: 'Tim mạch', specialization: 'TDM Tim mạch', phoneNumber: '0907654321', workSchedule: 'T2-T6: 8h-17h', maxCaseLoad: 8, currentCaseLoad: 2, expertise: 'Digoxin, Warfarin', isAvailable: true, priority: 2, lastAssigned: '2025-08-24 09:00', createdDate: '2025-08-20' }
            ],
            users: [
                // Bác sĩ - tài khoản chung theo khoa
                { 
                    username: 'sicu', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // sicu123
                    role: 'doctor', 
                    department: 'SICU', 
                    fullName: 'Bác sĩ SICU', 
                    email: 'sicu@hospital.com', 
                    phone: '0901234567', 
                    status: 'active' 
                },
                { 
                    username: 'nhi', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // nhi123
                    role: 'doctor', 
                    department: 'Nhi khoa', 
                    fullName: 'Bác sĩ Nhi khoa', 
                    email: 'nhi@hospital.com', 
                    phone: '0901234568', 
                    status: 'active' 
                },
                { 
                    username: 'timMach', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // timMach123
                    role: 'doctor', 
                    department: 'Tim Mạch', 
                    fullName: 'Bác sĩ Tim Mạch', 
                    email: 'timmach@hospital.com', 
                    phone: '0901234569', 
                    status: 'active' 
                },
                // Dược sĩ - tài khoản riêng
                { 
                    username: 'duocSi1', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // duocSi123
                    role: 'pharmacist', 
                    department: 'Dược', 
                    fullName: 'DS. Nguyễn Văn A', 
                    email: 'duocsi1@hospital.com', 
                    phone: '0901234570', 
                    status: 'active' 
                },
                { 
                    username: 'duocSi2', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // duocSi456  
                    role: 'pharmacist', 
                    department: 'Dược', 
                    fullName: 'DS. Trần Thị B', 
                    email: 'duocsi2@hospital.com', 
                    phone: '0901234571', 
                    status: 'active' 
                },
                { 
                    username: 'duocSi3', 
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // duocSi789
                    role: 'pharmacist', 
                    department: 'Dược', 
                    fullName: 'DS. Lê Văn C', 
                    email: 'duocsi3@hospital.com', 
                    phone: '0901234572', 
                    status: 'active' 
                }
            ]
        };
        this.nextIds = {
            patients: 4,
            requests: 3,
            pharmacists: 3,
            users: 4
        };
    }

    async initialize() {
        console.log('🔧 Mock Google Sheets Service initialized');
        return true;
    }

    async ensureInitialized() {
        // Mock service is always initialized
        return true;
    }

    // PATIENTS Operations
    async createPatient(patientData) {
        const newPatient = {
            id: this.nextIds.patients++,
            ...patientData,
            createdDate: new Date().toISOString().split('T')[0]
        };
        this.mockData.patients.push(newPatient);
        console.log('📝 Mock: Created patient', newPatient.patientCode);
        return newPatient;
    }

    async getPatients(department = null) {
        let patients = [...this.mockData.patients];
        if (department) {
            patients = patients.filter(p => p.department === department);
        }
        console.log(`📋 Mock: Retrieved ${patients.length} patients`);
        return patients;
    }

    // REQUESTS Operations
    async createRequest(requestData) {
        const newRequest = {
            id: this.nextIds.requests++,
            ...requestData,
            status: 'Chờ trả lời',
            pharmacistResponse: '',
            responseDate: '',
            responseBy: '',
            priority: requestData.priority || 'Thường',
            createdDate: new Date().toISOString().split('T')[0],
            updatedDate: new Date().toISOString().split('T')[0]
        };
        this.mockData.requests.push(newRequest);
        console.log('📝 Mock: Created request', newRequest.id, 'for drug', newRequest.drugName);
        return newRequest;
    }

    async getRequests(filters = {}) {
        let requests = [...this.mockData.requests];
        
        if (filters.status) {
            requests = requests.filter(r => r.status === filters.status);
        }
        if (filters.department) {
            requests = requests.filter(r => r.department === filters.department);
        }
        if (filters.assignedPharmacist) {
            requests = requests.filter(r => r.assignedPharmacist === filters.assignedPharmacist);
        }
        
        console.log(`📋 Mock: Retrieved ${requests.length} requests with filters:`, filters);
        return requests;
    }

    async updateRequestResponse(requestId, response, pharmacistName) {
        const requestIndex = this.mockData.requests.findIndex(r => r.id == requestId);
        if (requestIndex === -1) {
            throw new Error(`Request with ID ${requestId} not found`);
        }

        this.mockData.requests[requestIndex] = {
            ...this.mockData.requests[requestIndex],
            status: 'Đã trả lời',
            pharmacistResponse: response,
            responseDate: new Date().toISOString().split('T')[0],
            responseBy: pharmacistName,
            updatedDate: new Date().toISOString().split('T')[0]
        };

        console.log('✅ Mock: Updated request', requestId, 'response by', pharmacistName);
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
        let pharmacists = [...this.mockData.pharmacists];
        
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
        
        console.log(`👥 Mock: Retrieved ${pharmacists.length} pharmacists with filters:`, filters);
        return pharmacists;
    }

    // Users Operations
    async getUserByUsername(username) {
        const user = this.mockData.users.find(u => u.username === username && u.status === 'active');
        if (user) {
            console.log(`👤 Mock: Found user ${username} (${user.role})`);
            return user;
        }
        console.log(`❌ Mock: User ${username} not found`);
        return null;
    }

    async getAllUsers() {
        console.log(`👥 Mock: Retrieved ${this.mockData.users.length} users`);
        return this.mockData.users;
    }

    // Health check
    async healthCheck() {
        return {
            status: 'OK',
            mode: 'MOCK',
            sheetsConnected: 6,
            totalSheets: 6,
            spreadsheetTitle: 'Mock PedMedConsult Database',
            recordCounts: {
                patients: this.mockData.patients.length,
                requests: this.mockData.requests.length,
                pharmacists: this.mockData.pharmacists.length,
                users: this.mockData.users.length
            }
        };
    }
}

module.exports = MockGoogleSheetsService;
