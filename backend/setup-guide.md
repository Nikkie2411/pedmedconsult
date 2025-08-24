# Hướng dẫn cấu hình PedMedConsult

## 1. Cấu hình Google Cloud & Sheets API

### Bước 1: Tạo Google Cloud Project
1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Ghi nhớ Project ID

### Bước 2: Enable APIs
1. Vào "APIs & Services" > "Library"
2. Tìm và enable:
   - Google Sheets API
   - Google Drive API

### Bước 3: Tạo Service Account
1. Vào "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Điền thông tin:
   - Name: `pedmed-service-account`
   - Description: `Service account for PedMedConsult app`
4. Click "Create and Continue"
5. Role: "Editor" (hoặc tạo custom role với quyền Sheets)
6. Click "Done"

### Bước 4: Tạo Private Key
1. Vào Service Account vừa tạo
2. Tab "Keys" > "Add Key" > "Create new key"
3. Chọn format "JSON"
4. Download file JSON

### Bước 5: Lấy Private Key
1. Mở file JSON đã download
2. Copy giá trị của field `"private_key"`
3. Paste vào file .env:
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### Bước 6: Copy Service Account Email
1. Từ file JSON, copy giá trị `"client_email"`
2. Cập nhật vào .env:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
```

## 2. Cấu hình Google Sheets

### Bước 1: Tạo Google Sheets
1. Tạo sheet mới hoặc sử dụng sheet có sẵn
2. Copy Sheet ID từ URL (phần giữa `/d/` và `/edit`)

### Bước 2: Share với Service Account
1. Click "Share" button trong Google Sheets
2. Add email service account
3. Cho quyền "Editor"
4. Click "Send"

### Bước 3: Tạo các sheet tabs
Tạo các tabs sau trong Google Sheets:
- Patients
- Requests  
- Doses
- Concentrations
- Users
- Pharmacists

## 3. Cấu hình Email

### Sử dụng Gmail App Password:
1. Bật 2-Factor Authentication cho Gmail
2. Tạo App Password:
   - Vào Gmail Settings > Security > 2-Step Verification
   - App passwords > Generate password
   - Copy password vào .env:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=generated_app_password
```

## 4. Test Configuration

Chạy test để kiểm tra cấu hình:
```bash
cd server
node test-workflow.js
```

## Troubleshooting

### Lỗi Google Sheets API:
- Kiểm tra Service Account có quyền truy cập sheet
- Verify APIs đã được enable
- Check Private Key format đúng

### Lỗi Email:
- Kiểm tra App Password đúng
- Verify 2FA đã bật
- Check email/password trong .env

### Lỗi JWT:
- Verify JWT_SECRET đủ dài và random
- Check syntax trong .env file
