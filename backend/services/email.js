const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) return;

        try {
            this.transporter = nodemailer.createTransporter({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // Verify connection
            await this.transporter.verify();
            console.log('📧 Email service initialized successfully');
            this.isInitialized = true;
        } catch (error) {
            console.error('❌ Failed to initialize email service:', error);
            throw error;
        }
    }

    async sendNewRequestNotification(requestData, pharmacistEmails) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const subject = `[${process.env.APP_NAME}] Yêu cầu tư vấn TDM mới - ${requestData.patientName}`;
        
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1976d2;">Yêu cầu tư vấn TDM mới</h2>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Thông tin bệnh nhân:</h3>
                    <p><strong>Tên:</strong> ${requestData.patientName}</p>
                    <p><strong>Mã BN:</strong> ${requestData.patientCode}</p>
                    <p><strong>Khoa:</strong> ${requestData.department}</p>
                    <p><strong>Thuốc TDM:</strong> ${requestData.tdmDrug}</p>
                    <p><strong>Ngày tạo:</strong> ${requestData.createdDate}</p>
                </div>

                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Thông tin bác sĩ yêu cầu:</h3>
                    <p><strong>Họ tên:</strong> ${requestData.doctorName}</p>
                    <p><strong>SĐT:</strong> ${requestData.doctorPhone}</p>
                    <p><strong>Email:</strong> ${requestData.doctorEmail}</p>
                </div>

                <p style="color: #666;">
                    Vui lòng đăng nhập vào hệ thống để xem chi tiết và trả lời yêu cầu tư vấn.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.APP_URL}" 
                       style="background-color: #1976d2; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Xem yêu cầu
                    </a>
                </div>

                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    Email này được gửi tự động từ hệ thống ${process.env.APP_NAME}
                </p>
            </div>
        `;

        const promises = pharmacistEmails.map(email => 
            this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: htmlContent
            })
        );

        return await Promise.all(promises);
    }

    async sendResponseNotification(requestData, response, pharmacistName) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const subject = `[${process.env.APP_NAME}] Kết quả tư vấn TDM - ${requestData.patientName}`;
        
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4caf50;">Kết quả tư vấn TDM</h2>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Thông tin bệnh nhân:</h3>
                    <p><strong>Tên:</strong> ${requestData.patientName}</p>
                    <p><strong>Mã BN:</strong> ${requestData.patientCode}</p>
                    <p><strong>Khoa:</strong> ${requestData.department}</p>
                    <p><strong>Thuốc TDM:</strong> ${requestData.tdmDrug}</p>
                </div>

                <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Kết quả tư vấn:</h3>
                    <div style="white-space: pre-wrap; line-height: 1.6;">${response}</div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                    <p><strong>Dược sĩ tư vấn:</strong> ${pharmacistName}</p>
                    <p><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
                </div>

                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    Email này được gửi tự động từ hệ thống ${process.env.APP_NAME}
                </p>
            </div>
        `;

        return await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: requestData.doctorEmail,
            subject: subject,
            html: htmlContent
        });
    }
}

module.exports = new EmailService();
