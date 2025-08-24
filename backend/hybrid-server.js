const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Determine which service to use based on environment
const USE_REAL_SHEETS = process.env.USE_REAL_SHEETS === 'true';

let sheetsService;
let emailService;

if (USE_REAL_SHEETS) {
    console.log('🔗 Using REAL Google Sheets and Email services');
    sheetsService = require('./services/googleSheetsService');
    emailService = require('./services/emailService');
} else {
    console.log('🔧 Using MOCK Google Sheets and Email services');
    const MockGoogleSheetsService = require('./services/mockGoogleSheetsService');
    sheetsService = new MockGoogleSheetsService();
    emailService = require('./services/mockEmailService');
}

// Initialize services
async function initializeServices() {
    try {
        if (USE_REAL_SHEETS) {
            await sheetsService.initialize();
            console.log('✅ Real Google Sheets service initialized');
        } else {
            await sheetsService.initialize();
            console.log('✅ Mock Google Sheets service initialized');
        }
    } catch (error) {
        console.error('❌ Failed to initialize services:', error.message);
        if (USE_REAL_SHEETS) {
            console.log('🔄 Falling back to mock services...');
            const MockGoogleSheetsService = require('./services/mockGoogleSheetsService');
            sheetsService = new MockGoogleSheetsService();
            emailService = require('./services/mockEmailService');
            await sheetsService.initialize();
            console.log('✅ Fallback to mock services successful');
        }
    }
}

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'PedMedConsult Server is running',
        mode: USE_REAL_SHEETS ? 'PRODUCTION' : 'DEVELOPMENT',
        services: {
            sheets: USE_REAL_SHEETS ? 'Google Sheets API' : 'Mock Data',
            email: USE_REAL_SHEETS ? 'Real Email' : 'Mock Email'
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health/database', async (req, res) => {
    try {
        const dbHealth = await sheetsService.healthCheck();
        res.json({
            status: 'OK',
            database: dbHealth,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            database: { error: error.message },
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/patients', async (req, res) => {
    try {
        const department = req.query.department;
        const patients = await sheetsService.getPatients(department !== 'all' ? department : null);
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Không thể lấy danh sách bệnh nhân' });
    }
});

app.get('/api/requests', async (req, res) => {
    try {
        const filters = {};
        if (req.query.status) filters.status = req.query.status;
        if (req.query.department) filters.department = req.query.department;
        if (req.query.assignedPharmacist) filters.assignedPharmacist = req.query.assignedPharmacist;
        
        const requests = await sheetsService.getRequests(filters);
        
        res.json({
            success: true,
            data: requests,
            count: requests.length
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy danh sách yêu cầu'
        });
    }
});

app.post('/api/requests', async (req, res) => {
    try {
        const requestData = req.body;
        console.log('📝 Creating new TDM request:', requestData.patientName, '-', requestData.drugName);
        
        // Save to database
        const savedRequest = await sheetsService.createRequest(requestData);
        console.log('✅ Saved request to database:', savedRequest.id);
        
        // Find assigned pharmacist
        const pharmacists = await sheetsService.getPharmacists({
            department: requestData.department,
            isAvailable: true
        });
        
        if (pharmacists.length > 0) {
            const assignedPharmacist = pharmacists[0]; // Simple assignment logic
            
            // Send email notification
            try {
                const emailResult = await emailService.notifyPharmacistNewRequest(
                    assignedPharmacist.email,
                    savedRequest
                );
                
                if (emailResult.success) {
                    console.log('📧 Email notification sent to pharmacist successfully');
                } else {
                    console.error('📧 Failed to send email notification:', emailResult.error);
                }
            } catch (emailError) {
                console.error('📧 Email service error:', emailError);
            }
        }
        
        res.status(201).json({
            success: true,
            requestId: savedRequest.id,
            message: 'Yêu cầu TDM đã được tạo thành công',
            data: savedRequest
        });
        
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Không thể tạo yêu cầu TDM' 
        });
    }
});

app.put('/api/requests/:requestId/response', async (req, res) => {
    try {
        const { requestId } = req.params;
        const { response, pharmacistName } = req.body;
        
        console.log(`💊 Pharmacist ${pharmacistName} responding to request ${requestId}`);
        
        // Update request in database
        const updateResult = await sheetsService.updateRequestResponse(requestId, response, pharmacistName);
        console.log('✅ Updated request response in database');
        
        // Get request data for email notification
        const requests = await sheetsService.getRequests({});
        const requestData = requests.find(r => r.id == requestId) || {
            id: requestId,
            patientName: 'Unknown Patient',
            patientCode: 'Unknown',
            drugName: 'Unknown Drug',
            doctorEmail: 'doctor@hospital.com'
        };
        
        // Send email notification to doctor
        try {
            const emailResult = await emailService.notifyDoctorResponse(
                requestData.doctorEmail,
                requestData,
                response,
                pharmacistName
            );
            
            if (emailResult.success) {
                console.log('📧 Response email sent to doctor successfully');
            } else {
                console.error('📧 Failed to send response email:', emailResult.error);
            }
        } catch (emailError) {
            console.error('📧 Email service error:', emailError);
        }
        
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

// Static routes
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

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
    try {
        const { type, email } = req.body;
        
        const testRequestData = {
            id: 'TEST001',
            patientName: 'Bệnh nhân Test',
            patientCode: 'TEST001',
            drugName: 'Vancomycin',
            doctorName: 'BS. Test Doctor',
            doctorEmail: email,
        };
        
        let result;
        if (type === 'pharmacist') {
            result = await emailService.notifyPharmacistNewRequest(email, testRequestData);
        } else if (type === 'doctor') {
            const testResponse = 'Đây là test response từ dược sĩ.';
            result = await emailService.notifyDoctorResponse(email, testRequestData, testResponse, 'DS. Test Pharmacist');
        } else {
            return res.status(400).json({ error: 'Invalid email type' });
        }
        
        res.json({
            success: result.success,
            message: 'Test email sent successfully',
            error: result.error
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Không thể gửi test email' 
        });
    }
});

// Initialize services and start server
initializeServices().then(() => {
    app.listen(PORT, () => {
        console.log('🚀 PedMedConsult Server running on port', PORT);
        console.log('📊 Health check: http://localhost:' + PORT + '/api/health');
        console.log('🔧 Mode:', USE_REAL_SHEETS ? 'PRODUCTION (Real APIs)' : 'DEVELOPMENT (Mock Data)');
        console.log('💡 To switch to real APIs, set USE_REAL_SHEETS=true in .env');
    });
}).catch((error) => {
    console.error('❌ Failed to initialize server:', error);
    process.exit(1);
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
