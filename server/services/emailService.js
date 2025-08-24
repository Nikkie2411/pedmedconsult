const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = this.createTransporter();
    }

    createTransporter() {
        // Sử dụng Gmail SMTP
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Email của bệnh viện
                pass: process.env.EMAIL_PASSWORD // App password của Gmail
            }
        });
    }

    // Gửi email thông báo cho dược sĩ khi có yêu cầu mới
    async notifyPharmacistNewRequest(pharmacistEmail, requestData) {
        const subject = `[PedMedConsult] Yêu cầu TDM mới - ${requestData.patientName}`;
        
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #2e7d32; color: white; padding: 20px; text-align: center;">
                    <h1>PedMedConsult</h1>
                    <p>Thông báo yêu cầu TDM mới</p>
                </div>
                
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #2e7d32;">Chi tiết yêu cầu</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Mã yêu cầu:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.id}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Ngày tạo:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.createdDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Khoa:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.department}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Bệnh nhân:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.patientName} (${requestData.patientCode})</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Giới tính:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.gender}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Ngày sinh:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.dob}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Thuốc TDM:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.drugName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Bác sĩ yêu cầu:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.doctorName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">SĐT bác sĩ:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.doctorPhone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email bác sĩ:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.doctorEmail}</td>
                        </tr>
                    </table>
                    
                    ${requestData.additionalInfo ? `
                        <h3 style="color: #2e7d32;">Thông tin bổ sung:</h3>
                        <p style="background-color: white; padding: 10px; border-radius: 5px;">${requestData.additionalInfo}</p>
                    ` : ''}
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3001'}" 
                           style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Xem chi tiết và tư vấn
                        </a>
                    </div>
                </div>
                
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>Email này được gửi tự động từ hệ thống PedMedConsult</p>
                    <p>Vui lòng không trả lời email này</p>
                </div>
            </div>
        `;

        return this.sendEmail(pharmacistEmail, subject, html);
    }

    // Gửi email kết quả tư vấn cho bác sĩ
    async notifyDoctorResponse(doctorEmail, requestData, response, pharmacistName) {
        const subject = `[PedMedConsult] Kết quả tư vấn TDM - ${requestData.patientName}`;
        
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #1976d2; color: white; padding: 20px; text-align: center;">
                    <h1>PedMedConsult</h1>
                    <p>Kết quả tư vấn TDM</p>
                </div>
                
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #1976d2;">Thông tin yêu cầu</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Mã yêu cầu:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.id}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Bệnh nhân:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.patientName} (${requestData.patientCode})</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Thuốc TDM:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${requestData.drugName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Dược sĩ tư vấn:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${pharmacistName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Ngày tư vấn:</td>
                            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleDateString('vi-VN')}</td>
                        </tr>
                    </table>
                    
                    <h2 style="color: #1976d2;">Kết quả tư vấn</h2>
                    <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #1976d2;">
                        <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; margin: 0;">${response}</pre>
                    </div>
                    
                    <div style="background-color: #e3f2fd; padding: 15px; margin-top: 20px; border-radius: 5px;">
                        <h3 style="color: #1976d2; margin-top: 0;">Lưu ý quan trọng:</h3>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Đây là tư vấn chuyên môn từ dược sĩ lâm sàng</li>
                            <li>Vui lòng xem xét tình trạng cụ thể của bệnh nhân khi áp dụng</li>
                            <li>Liên hệ trực tiếp với dược sĩ nếu cần thảo luận thêm</li>
                        </ul>
                    </div>
                </div>
                
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>Email này được gửi tự động từ hệ thống PedMedConsult</p>
                    <p>Vui lòng không trả lời email này</p>
                </div>
            </div>
        `;

        return this.sendEmail(doctorEmail, subject, html);
    }

    // Hàm gửi email chung
    async sendEmail(to, subject, html) {
        try {
            const mailOptions = {
                from: {
                    name: 'PedMedConsult System',
                    address: process.env.EMAIL_USER
                },
                to: to,
                subject: subject,
                html: html
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result.messageId);
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error.message };
        }
    }

    // Test email configuration
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('Email service is ready');
            return true;
        } catch (error) {
            console.error('Email service configuration error:', error);
            return false;
        }
    }
}

module.exports = new EmailService();
