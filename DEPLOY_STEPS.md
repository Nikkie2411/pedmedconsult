# Hướng dẫn Deploy chi tiết

## 🔧 Bước 1: Chuẩn bị Google Cloud

### 1.1 Tạo Google Cloud Project
1. Truy cập: https://console.cloud.google.com
2. Tạo project mới: `vietanhprojects`
3. Enable APIs:
   - Google Sheets API
   - Google Drive API

### 1.2 Tạo Service Account  
1. IAM & Admin → Service Accounts → Create Service Account
2. Name: `pedmed-vnch`
3. Email sẽ là: `pedmed-vnch@vietanhprojects.iam.gserviceaccount.com`
4. Role: Editor hoặc Sheets Editor
5. Create Key → JSON → Download file

### 1.3 Cấu hình Google Sheets
1. Tạo Google Sheets hoặc sử dụng existing: `16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY`
2. Share với service account email: `pedmed-vnch@vietanhprojects.iam.gserviceaccount.com`
3. Quyền: Editor
4. Tạo 6 sheets: Patients, Requests, Doses, Concentrations, Users, Pharmacists

## 🚀 Bước 2: Deploy Backend (Render)

### 2.1 Push code lên GitHub
```bash
cd PedMedConsult
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/yourusername/pedmedconsult.git
git push -u origin main
```

### 2.2 Deploy trên Render
1. Truy cập: https://render.com
2. Connect GitHub account
3. New → Web Service
4. Connect repository
5. Settings:
   - **Name**: `pedmedconsult-backend`
   - **Environment**: Node
   - **Region**: Singapore  
   - **Branch**: main
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Environment Variables trên Render
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-firebase-app.web.app
GOOGLE_SHEETS_ID=16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY
GOOGLE_SERVICE_ACCOUNT_EMAIL=pedmed-vnch@vietanhprojects.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n[PASTE YOUR PRIVATE KEY]\n-----END PRIVATE KEY-----
EMAIL_SERVICE=gmail
EMAIL_USER=pedmedvn.nch@gmail.com
EMAIL_PASSWORD=gqnk iwau xbgv cnnm
APP_NAME=PedMedConsult
APP_URL=https://your-firebase-app.web.app
JWT_SECRET=5255e3390bd5d884cc7aedf41b6aef553ffa2d26f07421c97f6979ee40cdb42d0d95ff6e1f11bd61ff767019b824385379f7271f7b8dd79207555a5d8257604b
PATIENTS_SHEET_NAME=Patients
REQUESTS_SHEET_NAME=Requests
DOSES_SHEET_NAME=Doses
CONCENTRATIONS_SHEET_NAME=Concentrations
USERS_SHEET_NAME=Users
PHARMACISTS_SHEET_NAME=Pharmacists
USE_REAL_SHEETS=true
```

### 2.4 Test Backend
Sau khi deploy, test API:
```
https://your-render-app.onrender.com/api/health
```

## 🔥 Bước 3: Deploy Frontend (Firebase)

### 3.1 Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
```

### 3.2 Cập nhật API URL
Sửa file `client/.env`:
```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

### 3.3 Build Frontend
```bash
cd client
npm run build
```

### 3.4 Firebase Setup
```bash
firebase login
firebase init

# Chọn:
# ✅ Hosting
# ✅ Use existing project hoặc create new
# Public directory: build
# Single-page app: Yes
# GitHub auto builds: No
```

### 3.5 Deploy
```bash
firebase deploy
```

## 🔄 Bước 4: Cập nhật CORS

Sau khi có Firebase URL, cập nhật `FRONTEND_URL` trong Render Environment Variables:
```
FRONTEND_URL=https://your-project.web.app
```

## ✅ Test End-to-End

1. **Backend**: https://your-render-app.onrender.com/api/health
2. **Frontend**: https://your-project.web.app
3. **Google Sheets**: Kiểm tra data được ghi vào sheets
4. **Email**: Test email notifications
