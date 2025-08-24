# Google Cloud Console Setup Guide

## 🔧 Bước 1: Tạo Google Cloud Project

### 1.1 Truy cập Google Cloud Console
- Mở: https://console.cloud.google.com/
- Đăng nhập với Google Account của bạn

### 1.2 Tạo Project mới
1. Click "Select a project" ở top bar
2. Click "New Project" 
3. **Project name**: `PedMedConsult`
4. **Project ID**: `pedmedconsult-[số-ngẫu-nhiên]` (sẽ tự tạo)
5. Click "Create"

### 1.3 Enable APIs
Sau khi project được tạo:

1. **Vào APIs & Services > Library**
2. **Enable Google Sheets API**:
   - Search "Google Sheets API"
   - Click vào result đầu tiên
   - Click "Enable"

3. **Enable Google Drive API**:
   - Search "Google Drive API" 
   - Click vào result đầu tiên
   - Click "Enable"

## 🔐 Bước 2: Tạo Service Account

### 2.1 Tạo Service Account
1. **Vào APIs & Services > Credentials**
2. **Click "Create Credentials" > "Service Account"**
3. **Service account details**:
   - Service account name: `pedmed-service`
   - Service account ID: `pedmed-service` (auto-filled)
   - Description: `Service account for PedMedConsult TDM system`
4. **Click "Create and Continue"**

### 2.2 Assign Roles (Optional)
- Có thể skip step này vì chúng ta sẽ share sheets directly
- Click "Continue"

### 2.3 Grant Users Access (Optional)
- Có thể skip step này
- Click "Done"

## 🗝️ Bước 3: Tạo Private Key

### 3.1 Download Private Key
1. **Trong Credentials page, tìm Service Account vừa tạo**
2. **Click vào service account name**
3. **Vào tab "Keys"**
4. **Click "Add Key" > "Create new key"**
5. **Chọn "JSON" format**
6. **Click "Create"**
7. **File JSON sẽ được download automatically**

### 3.2 Lấy thông tin từ file JSON
Mở file JSON vừa download, tìm 2 thông tin này:

```json
{
  "type": "service_account",
  "project_id": "pedmedconsult-xxx",
  "private_key_id": "xxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "pedmed-service@pedmedconsult-xxx.iam.gserviceaccount.com",
  "client_id": "xxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robots/v1/metadata/x509/pedmed-service%40pedmedconsult-xxx.iam.gserviceaccount.com"
}
```

**Cần lấy:**
- `client_email` (GOOGLE_SERVICE_ACCOUNT_EMAIL)
- `private_key` (GOOGLE_PRIVATE_KEY)

## 📊 Bước 4: Share Google Sheets

### 4.1 Mở Google Sheets
- Link sheets của bạn: https://docs.google.com/spreadsheets/d/16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY/edit

### 4.2 Share với Service Account
1. **Click "Share" button (top right)**
2. **Thêm email**: `pedmed-service@pedmedconsult-xxx.iam.gserviceaccount.com`
   - Thay `xxx` bằng project ID thực tế
3. **Chọn permission**: "Editor"
4. **Uncheck "Notify people"** (vì đây là service account)
5. **Click "Share"**

## ⚙️ Bước 5: Cập nhật Environment Variables

Cập nhật file `.env` trong server:

```env
# Google Sheets API Configuration  
GOOGLE_SHEETS_ID=16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY
GOOGLE_SERVICE_ACCOUNT_EMAIL=pedmed-service@pedmedconsult-xxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**⚠️ Lưu ý về GOOGLE_PRIVATE_KEY:**
- Phải có dấu ngoặc kép bao quanh
- Giữ nguyên `\n` trong key
- Không xóa `-----BEGIN PRIVATE KEY-----` và `-----END PRIVATE KEY-----`

## ✅ Bước 6: Test kết nối

Chạy test script:

```bash
cd server
node -e "
const service = require('./services/googleSheetsService');
service.healthCheck().then(result => {
  console.log('✅ Google Sheets connected:', result);
}).catch(err => {
  console.error('❌ Connection failed:', err.message);
});
"
```

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **"Access denied"**
   - ✅ Check: Service account email đã được share chưa?
   - ✅ Check: Permission level là "Editor"?

2. **"Invalid JWT"**
   - ✅ Check: Private key format đúng chưa?
   - ✅ Check: Có dấu ngoặc kép bao quanh private key?

3. **"API not enabled"**
   - ✅ Check: Google Sheets API đã enable chưa?
   - ✅ Check: Google Drive API đã enable chưa?

4. **"Sheets not found"**
   - ✅ Check: GOOGLE_SHEETS_ID đúng chưa?
   - ✅ Check: Sheets có public hoặc đã share chưa?

## 📞 Support Commands

```bash
# Test API health
curl http://localhost:5002/api/health

# Test database connection
node -e "require('./services/googleSheetsService').healthCheck().then(console.log)"

# Test create request
curl -X POST http://localhost:5002/api/requests \
  -H "Content-Type: application/json" \
  -d '{"patientName":"Test Patient","drugName":"Vancomycin"}'
```
