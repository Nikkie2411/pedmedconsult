# 👥 Hướng dẫn Quản lý Tài khoản PedMedConsult

## 🔐 Hệ thống Authentication

### Kiến trúc
```
Firebase Auth (Mật khẩu) ↔ Google Sheets (Profile)
     ↓                           ↓
 Email + Password            Email + Profile Info
```

### Tại sao không lưu mật khẩu trong Sheets?
✅ **Bảo mật cao**: Firebase Auth có mã hóa enterprise-grade  
✅ **Compliance**: Tuân thủ các chuẩn bảo mật quốc tế  
✅ **Features**: Reset password, 2FA, email verification tự động  
✅ **Separation of Concerns**: Auth service riêng biệt với data storage  

---

## 📝 Cách tạo tài khoản mới

### Bước 1: Tạo tài khoản Firebase (Quản trị viên)
```javascript
// Trong Firebase Console hoặc qua Admin SDK
await admin.auth().createUser({
  email: 'doctor@hospital.com',
  password: 'temporary_password_123',
  displayName: 'BS. Nguyễn Văn A'
});
```

### Bước 2: Thêm profile vào Google Sheets
**Thêm vào Users Sheet:**
```
| id      | email              | fullName         | department | role   | status |
|---------|-------------------|------------------|------------|--------|--------|
| USER_001| doctor@hospital.com| BS. Nguyễn Văn A | Nhi khoa   | doctor | active |
```

### Bước 3: Gửi thông tin cho user
📧 **Email template:**
```
Tài khoản PedMedConsult đã được tạo:
- URL: https://pedmedconsult.web.app
- Email: doctor@hospital.com  
- Mật khẩu tạm: temporary_password_123
- Vui lòng đổi mật khẩu sau lần đăng nhập đầu tiên
```

---

## 🏥 Quy trình triển khai thực tế

### Cho Bệnh viện Nhi Trung ương
1. **Thu thập danh sách**: Lấy danh sách bác sĩ/dược sĩ cần tài khoản
2. **Batch import**: Tạo hàng loạt tài khoản Firebase
3. **Setup profiles**: Import profiles vào Google Sheets
4. **Training**: Đào tạo sử dụng hệ thống
5. **Go-live**: Triển khai chính thức

### Template Import (Excel → Sheets)
```csv
email,fullName,department,role,phone,title
doctor1@vnch.gov.vn,BS. Nguyễn Văn A,Nhi khoa,doctor,0901234567,Bác sĩ chuyên khoa II
doctor2@vnch.gov.vn,BS. Trần Thị B,ICU Nhi,doctor,0901234568,Bác sĩ chuyên khoa I
pharmacist1@vnch.gov.vn,DS. Lê Văn C,Dược,pharmacist,0901234569,Dược sĩ chuyên khoa I
```

---

## 🔧 Scripts tự động (Development)

### Script tạo tài khoản demo
```bash
# Chạy script tạo demo accounts
cd server
node scripts/create-demo-accounts.js
```

### API endpoint tạo tài khoản (Admin only)
```javascript
POST /api/admin/create-user
{
  "email": "newuser@hospital.com",
  "fullName": "BS. Tên Mới", 
  "department": "Nhi khoa",
  "role": "doctor"
}
```

---

## 📊 Dashboard quản lý

### Thống kê tài khoản
- 👥 Tổng số users active
- 🔐 Users chưa đổi mật khẩu  
- 📅 Lần đăng nhập cuối
- 🏥 Phân bố theo khoa phòng

### Báo cáo bảo mật
- 🚨 Tài khoản inactive > 30 ngày
- 🔒 Tài khoản cần reset password
- 📧 Email verification status

---

## ❓ FAQ

### Q: Làm sao reset mật khẩu cho user?
**A:** Sử dụng Firebase Console → Authentication → Users → Reset Password

### Q: User quên mật khẩu thì sao?
**A:** Họ click "Forgot Password" trên login page, Firebase tự động gửi email reset

### Q: Có thể import hàng loạt không?
**A:** Có, sử dụng Firebase Admin SDK + script automation

### Q: Làm sao deactivate user?
**A:** 
1. Firebase Console: Disable user account
2. Google Sheets: Đổi status thành "inactive"

### Q: Có log đăng nhập không?
**A:** Có, Firebase Analytics + custom logging trong backend

---

## 🚀 Next Steps

### Phase 1: Manual Setup (Hiện tại)
- [x] ✅ Firebase Auth integration
- [x] ✅ Google Sheets profile storage  
- [x] ✅ Manual account creation

### Phase 2: Admin Interface (Upcoming)
- [ ] 🔄 Admin dashboard cho quản lý users
- [ ] 🔄 Bulk import từ Excel/CSV
- [ ] 🔄 User activity monitoring

### Phase 3: Enterprise Features (Future)
- [ ] 📋 LDAP/AD integration
- [ ] 🔐 Single Sign-On (SSO)
- [ ] 📊 Advanced analytics
- [ ] 🤖 Auto-provisioning

---

## 📞 Support

**Technical Issues:**
- 📧 Email: pedmedvn.nch@gmail.com
- 🐛 GitHub Issues: https://github.com/Nikkie2411/pedmedconsult/issues

**Account Management:**
- 🏥 Liên hệ IT Support bệnh viện
- 📋 Request form: [Internal Hospital Process]
