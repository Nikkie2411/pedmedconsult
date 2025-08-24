# Hướng Dẫn Quản Trị Hệ Thống PedMedConsult

## 🏥 Tổng quan
Hệ thống tư vấn TDM dành cho Bệnh viện Nhi Trung ương đã được triển khai và sẵn sàng đưa vào sử dụng.

## 🌐 URLs Hệ Thống
- **Frontend**: https://pedmedconsult.web.app
- **Backend**: https://pedmedconsult.onrender.com

## 🔐 Hệ Thống Xác Thực

### Kiến trúc
- **Firebase Authentication**: Xử lý đăng nhập/mật khẩu
- **Google Sheets**: Lưu trữ thông tin hồ sơ người dùng

### Google Sheets Structure
- **Users Sheet**: Bác sĩ (email, name, department, role)
- **Pharmacists Sheet**: Dược sĩ (email, name, specialization, role)
- **Passwords**: KHÔNG lưu trong Sheets (Firebase xử lý)

## 👥 Quản Lý Tài Khoản

### 1. Tạo Tài Khoản Mới

#### Sử dụng API Endpoint:
```bash
POST https://pedmedconsult.onrender.com/api/admin/create-user
```

#### Body Request:
```json
{
  "email": "doctor@hospital.vn",
  "password": "SecurePassword123",
  "displayName": "BS. Nguyễn Văn A",
  "role": "doctor",
  "department": "Khoa Nhi",
  "specialization": "Pediatric Cardiology" // Chỉ cho Pharmacist
}
```

#### Sử dụng Script:
```bash
cd server
node scripts/create-demo-accounts.js
```

### 2. Danh Sách Roles

#### Doctors (role: "doctor"):
- Tạo yêu cầu tư vấn TDM
- Xem kết quả tư vấn
- Quản lý bệnh nhân

#### Pharmacists (role: "pharmacist"):
- Xem tất cả yêu cầu TDM
- Thực hiện tư vấn
- Gửi kết quả và khuyến nghị

#### Admins (role: "admin"):
- Quản lý người dùng
- Tạo tài khoản mới
- Xem tất cả dữ liệu

### 3. Departments

#### Các Khoa hiện có:
- Khoa Tim mạch
- Khoa Thần kinh
- Khoa Nội tiết
- Khoa Nhiễm khuẩn
- Khoa Hồi sức cấp cứu
- Khoa Ngoại
- Khoa Nhi tổng quát

## 📊 Google Sheets Management

### Cấu trúc Sheets:
1. **Patients**: Thông tin bệnh nhân
2. **Requests**: Yêu cầu tư vấn TDM
3. **Doses**: Liều lượng thuốc
4. **Concentrations**: Nồng độ thuốc
5. **Users**: Danh sách bác sĩ
6. **Pharmacists**: Danh sách dược sĩ

### Thêm User mới vào Sheets:
1. Mở Google Sheets
2. Chọn tab "Users" hoặc "Pharmacists"
3. Thêm dòng mới với thông tin:
   - Email
   - Name
   - Department/Specialization
   - Role

## 🚀 Triển Khai Sản Xuất

### Bước 1: Cấu hình Google Sheets
1. Tạo Google Sheet mới
2. Sao chép cấu trúc từ template
3. Cập nhật SPREADSHEET_ID trong .env

### Bước 2: Cấu hình Firebase
1. Tạo Firebase project
2. Bật Authentication với Email/Password
3. Cấu hình Hosting
4. Cập nhật config trong client

### Bước 3: Deploy Backend
1. Deploy lên Render
2. Cấu hình environment variables
3. Test API endpoints

### Bước 4: Deploy Frontend
1. Build production: `npm run build`
2. Deploy: `firebase deploy`

## 🔧 Environment Variables

### Backend (.env):
```
SPREADSHEET_ID=your_google_sheets_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
EMAIL_USER=notification@hospital.vn
EMAIL_PASS=app_password
USE_REAL_SHEETS=true
```

### Frontend (.env):
```
REACT_APP_API_URL=https://pedmedconsult.onrender.com
REACT_APP_FIREBASE_CONFIG={"apiKey":"..."}
```

## 📝 Quy Trình Sử Dụng

### Cho Bác Sĩ:
1. Đăng nhập bằng email/password
2. Tạo hồ sơ bệnh nhân
3. Gửi yêu cầu tư vấn TDM
4. Nhận kết quả qua email

### Cho Dược Sĩ:
1. Đăng nhập hệ thống
2. Xem danh sách yêu cầu
3. Phân tích và tư vấn
4. Gửi khuyến nghị

## 🛡️ Bảo Mật

### Thực hành tốt:
- Mật khẩu mạnh (8+ ký tự, số, chữ hoa/thường)
- Thường xuyên thay đổi mật khẩu
- Không chia sẻ thông tin đăng nhập
- Log out sau khi sử dụng

### Quyền truy cập:
- Doctors: Chỉ xem data của khoa mình
- Pharmacists: Xem tất cả yêu cầu
- Admins: Toàn quyền hệ thống

## 📞 Hỗ Trợ Kỹ Thuật

### Liên hệ:
- Email: support@pedmedconsult.com
- Phone: +84 xxx xxx xxx

### Báo lỗi:
1. Chụp màn hình lỗi
2. Ghi chú thời gian xảy ra
3. Mô tả các bước dẫn đến lỗi
4. Gửi email báo cáo

## 📈 Monitoring

### Health Check:
- API: `GET /api/health`
- Database: `GET /api/health/database`

### Logs:
- Backend logs: Render dashboard
- Frontend errors: Browser console
- Database: Google Sheets activity

---

*Hệ thống đã sẵn sàng triển khai tại Bệnh viện Nhi Trung ương* 🏥
