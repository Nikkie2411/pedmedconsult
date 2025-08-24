const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing
const mockData = {
    patients: [
        { id: 1, patientCode: 'BN001', patientName: 'Nguyễn Văn A', dateOfBirth: '2020-01-15', department: 'Nhi khoa' },
        { id: 2, patientCode: 'BN002', patientName: 'Trần Thị B', dateOfBirth: '2019-05-20', department: 'Nhi khoa' },
        { id: 3, patientCode: 'BN003', patientName: 'Lê Văn C', dateOfBirth: '2022-03-10', department: 'Nhi khoa' }
    ],
    requests: [
        { 
            id: 1, 
            patientCode: 'BN001', 
            patientName: 'Nguyễn Văn A', 
            drugName: 'Vancomycin',
            status: 'Chờ trả lời',
            department: 'Nhi khoa',
            requestingDoctor: 'BS. Nguyễn',
            createdDate: '2025-08-24'
        },
        { 
            id: 2, 
            patientCode: 'BN002', 
            patientName: 'Trần Thị B', 
            drugName: 'Digoxin',
            status: 'Đã trả lời',
            department: 'Nhi khoa',
            requestingDoctor: 'BS. Trần',
            pharmacistResponse: 'Nồng độ trong khoảng điều trị. Tiếp tục liều hiện tại.',
            createdDate: '2025-08-23'
        }
    ]
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'PedMedConsult Simple Server is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/patients', (req, res) => {
    const department = req.query.department;
    let patients = mockData.patients;
    
    if (department && department !== 'all') {
        patients = patients.filter(p => p.department === department);
    }
    
    res.json(patients);
});

app.get('/api/requests', (req, res) => {
    const { status, department, assignedPharmacist } = req.query;
    let requests = [...mockData.requests];
    
    if (status) {
        requests = requests.filter(r => r.status === status);
    }
    if (department) {
        requests = requests.filter(r => r.department === department);
    }
    
    res.json({
        success: true,
        data: requests,
        count: requests.length
    });
});

app.post('/api/requests', (req, res) => {
    try {
        const requestData = req.body;
        console.log('📝 Creating new TDM request:', requestData.patientName, '-', requestData.drugName);
        
        const newRequest = {
            id: mockData.requests.length + 1,
            ...requestData,
            status: 'Chờ trả lời',
            createdDate: new Date().toISOString().split('T')[0]
        };
        
        mockData.requests.push(newRequest);
        
        res.status(201).json({
            success: true,
            requestId: newRequest.id,
            message: 'Yêu cầu TDM đã được tạo thành công',
            data: newRequest
        });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Không thể tạo yêu cầu TDM' 
        });
    }
});

app.put('/api/requests/:requestId/response', (req, res) => {
    try {
        const { requestId } = req.params;
        const { response, pharmacistName } = req.body;
        
        console.log(`💊 Pharmacist ${pharmacistName} responding to request ${requestId}`);
        
        const requestIndex = mockData.requests.findIndex(r => r.id == requestId);
        if (requestIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Không tìm thấy yêu cầu'
            });
        }
        
        mockData.requests[requestIndex] = {
            ...mockData.requests[requestIndex],
            status: 'Đã trả lời',
            pharmacistResponse: response,
            responseDate: new Date().toISOString().split('T')[0],
            responseBy: pharmacistName
        };
        
        res.json({
            success: true,
            message: 'Phản hồi đã được gửi thành công',
            data: {
                requestId,
                response,
                pharmacistName,
                responseDate: new Date().toISOString().split('T')[0]
            }
        });
        
    } catch (error) {
        console.error('Error sending response:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể gửi phản hồi'
        });
    }
});

app.get('/api/auth/departments', (req, res) => {
    res.json([
        'Nhi khoa',
        'Nội tiết', 
        'Tim mạch',
        'Thận',
        'Hồi sức cấp cứu',
        'Sơ sinh'
    ]);
});

app.get('/api/auth/tdm-drugs', (req, res) => {
    res.json([
        'Vancomycin',
        'Digoxin', 
        'Theophylline',
        'Phenytoin',
        'Carbamazepine',
        'Lithium'
    ]);
});

app.post('/api/auth/verify', (req, res) => {
    const { email } = req.body;
    
    // Mock user verification
    const mockUsers = {
        'doctor1@hospital.com': { role: 'Doctor', department: 'Nhi khoa', name: 'BS. Nguyễn Văn D' },
        'duocsi1@hospital.com': { role: 'Pharmacist', department: 'Dược', name: 'DS. Nguyễn Văn X' },
        'admin@hospital.com': { role: 'Admin', department: 'IT', name: 'Quản trị viên' }
    };
    
    const user = mockUsers[email];
    if (user) {
        res.json({
            success: true,
            user: { email, ...user }
        });
    } else {
        res.json({
            success: true,
            user: { email, role: 'Doctor', department: 'Nhi khoa', name: 'Bác sĩ mới' }
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 Simple PedMedConsult Server running on port', PORT);
    console.log('📊 Health check: http://localhost:' + PORT + '/api/health');
    console.log('🔧 Mode: Mock Data Testing');
});

// Handle process termination gracefully
process.on('SIGINT', () => {
    console.log('\n👋 Server shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Server shutting down gracefully...');
    process.exit(0);
});
