// Mock Email Service for Development/Demo
class MockEmailService {
    constructor() {
        console.log('🔧 Mock Email Service initialized');
    }

    // Gửi email thông báo cho dược sĩ khi có yêu cầu mới
    async notifyPharmacistNewRequest(pharmacistEmail, requestData) {
        console.log('\n📧 [MOCK EMAIL] Notifying pharmacist about new request');
        console.log('To:', pharmacistEmail);
        console.log('Subject: Yêu cầu tư vấn TDM mới - Bệnh nhân', requestData.patientName);
        console.log('Request ID:', requestData.id);
        console.log('Patient:', requestData.patientName, '(' + requestData.patientCode + ')');
        console.log('Drug:', requestData.drugName);
        console.log('Doctor:', requestData.doctorName);
        console.log('Department:', requestData.department);
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return {
            success: true,
            message: 'Mock email sent to pharmacist successfully',
            emailId: 'mock_' + Date.now()
        };
    }

    // Gửi email thông báo cho bác sĩ khi dược sĩ đã trả lời
    async notifyDoctorResponse(doctorEmail, requestData, pharmacistResponse, pharmacistName) {
        console.log('\n📧 [MOCK EMAIL] Notifying doctor about pharmacist response');
        console.log('To:', doctorEmail);
        console.log('Subject: Phản hồi tư vấn TDM - Bệnh nhân', requestData.patientName);
        console.log('Request ID:', requestData.id);
        console.log('Patient:', requestData.patientName, '(' + requestData.patientCode + ')');
        console.log('Drug:', requestData.drugName);
        console.log('Pharmacist:', pharmacistName);
        console.log('Response:', pharmacistResponse);
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return {
            success: true,
            message: 'Mock email sent to doctor successfully',
            emailId: 'mock_' + Date.now()
        };
    }
}

const mockEmailService = new MockEmailService();

module.exports = mockEmailService;
