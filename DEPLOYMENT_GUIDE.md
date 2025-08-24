# Hướng dẫn Deploy PedMedConsult

## 🚀 Deploy Backend lên Render

### Bước 1: Chuẩn bị code
1. Đảm bảo file `index.js` đã được tạo từ `hybrid-server.js`
2. Kiểm tra `package.json` có đúng `"main": "index.js"` và `"start": "node index.js"`

### Bước 2: Deploy lên Render
1. **Tạo tài khoản Render**: https://render.com
2. **Connect GitHub**: Liên kết tài khoản GitHub của bạn
3. **Tạo Web Service**:
   - Click "New" → "Web Service"
   - Connect repository chứa project này
   - Cài đặt:
     - **Name**: `pedmedconsult-backend`
     - **Environment**: `Node`
     - **Region**: `Singapore` (gần Việt Nam nhất)
     - **Branch**: `main` hoặc `master`
     - **Root Directory**: `PedMedConsult/server`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Environment Variables** (quan trọng):
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-firebase-app.web.app
   GOOGLE_SHEETS_ID=16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY
   GOOGLE_SERVICE_ACCOUNT_EMAIL=pedmed-vnch@vietanhprojects.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmHsBnPlUvWL/E\nvR7DkGoghU3cMjyWyHpSU2qo96ojxRYfZIzVZiD1etN85unX9dO9IzCM1LkDz06V\nvem9bn/9zV0fT68n4vnuKPQJT6ZQDR6WVwnq7ThpU9iI/uk4BPADENGU9YkXUUIZ\ntUapc6rHYGfAtFRuAdr6t1VDJYnYq/3L6GrzEWwaCqgBAin86szwtxgyITZQI0tL\nwSChvkx4J0ZqY/dMHGUTZQU86EVNyDQVZ6uXv7vlpmn6PKNF5zHzgzmf8xXaPzmt\nIWROnHHG8wXeh8xL6f2s7bLslchkSCJatbF55uUcY+4dNzvFRwTn7HFlerN2O4at\nbLCchvtXAgMBAAECggEABqnzI/EfL7AKuVSw2D2B1F4kmnG1doMCTS0leTO+MoMk\neQvqjmDzb4WG2FrXBJ/K56pytyONbHaze1RL/Rpirga/9pKWvy3ewswHxhvY2xs7\nn+JL9o2flrITXKOFLYcdLbJOBgC3iCTtVuSruf522lqmrtdND8CpTSdvlyr5VaS3\n/CH4RvctDlO7V0cNo//cvg4G6e1y7cXzTFG6ofoo0MZmUER0fOUJfwLhD1Jj6R6x\n0ySk+WpusJqxsRosR0P9rb7dRhUY7wmZNE8Lffh7ZHM4ZvksormlWZ1SCAg/UEyd\nOsk+2gW1BFitV1LsjOXBR7onyIpuwWihxPbq163V6QKBgQDl2hJjQDBcChMeikjz\ngpdvOezFn/2vfpw1vgQFn1N43WWQSMXhQk7n+guA5ihE0RrwCsfk3ZIHZ2raCORN\nBBT5nRNR+22ERy0DU9emF+yPG1fAbaQLanLGt/uf+OiCKwZLWdwUkUsk3W7HHJqO\nKbqpqmnuNUvqkmWiZ5b5PFVSmwKBgQC5BKJIp4oauYSqkgwvRFSoNtyI6Sg28vBv\n/TsdLii6ld3xE2xZ3/o+SYOTgoZuLfBD9b1236Dj0GFQqyaKgUiiTsn5qYyT/ulK\ng7gvp4w17tVSRpKUla4giP0DuhnQcYwV91u95I/FHAeWNHzAUjHgmQATuRJSfzV/\nPIRtNwkX9QKBgQDj6Kpo3WHWMWsp0iZpxiiP8hizEGQEGn+bzlDAnm2vH6AwQ+hp\n5kzFOisj4ZM2QTz7nUT9yzGbw9CwZzawowaFR1m75Zl/GvAoJ39hwsEeWRdWx6Bs\nbV1na1DGG5G4WB8CohRWFIc1A5dvOQ6LPhdHWqF0wEYJTqYWNa7+bPORVwKBgAcG\n1wb9XfBf5Vr5Cv9sj+6Hjt6gREe5+Em4i1szWpajhHdYboAHUqC0+AtNJL/gfMSH\n+7cdDSY5zshah68w88o+Rct2lgE06DVNRVyB94BA3tcuGPkNqjxQF5PhqINTHKfk\n6hYPLSqmQt+AhNBlDsHh7a/SEpERhb2cVcc0FONVAoGBAKJyDSHZFiyXjxd5DeOo\nQYlzJJGxDkZIeZKOgVDAUWgl+aGoBPTbwHN4Ad8h5vCS2ct7f1If+yzRRvB5uhBd\n2KidfAWyIjdHponE6wKvRuqRRmIA2bD7pwwIy+iFaVS5A8WT3W8nlrKYPLXGEako\n7rSoUOPJR3G4jzmWZEvT34mY\n-----END PRIVATE KEY-----\n
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

5. **Deploy**: Click "Create Web Service"

### Bước 3: Lấy Backend URL
- Sau khi deploy thành công, bạn sẽ có URL dạng: `https://pedmedconsult-backend.onrender.com`
- Ghi chép URL này để cập nhật frontend

---

## 🔥 Deploy Frontend lên Firebase

### Bước 1: Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
```

### Bước 2: Cập nhật API URL trong Frontend
1. Mở file `client/src/services/apiService.js`
2. Thay đổi `BASE_URL` từ `http://localhost:5000` thành URL Render của bạn

### Bước 3: Build Frontend
```bash
cd client
npm run build
```

### Bước 4: Cấu hình Firebase
1. **Login Firebase**:
   ```bash
   firebase login
   ```

2. **Khởi tạo Firebase trong thư mục client**:
   ```bash
   cd client
   firebase init
   ```
   
   Chọn:
   - ✅ Hosting: Configure files for Firebase Hosting
   - ✅ Use existing project (hoặc create new project)
   - **Public directory**: `build`
   - **Configure as SPA**: `Yes`
   - **Set up automatic builds**: `No`

### Bước 5: Deploy
```bash
firebase deploy
```

### Bước 6: Cập nhật CORS
1. Sau khi có Firebase URL (dạng: `https://your-project.web.app`)
2. Cập nhật `FRONTEND_URL` trong Render Environment Variables
3. Redeploy backend service

---

## 🔧 Kiểm tra sau Deploy

### Test Backend
```bash
curl https://your-render-url.onrender.com/api/health
```

### Test Frontend
- Truy cập Firebase URL
- Kiểm tra login/register
- Test tạo consultation request

### Debug
- **Backend logs**: Xem trong Render Dashboard
- **Frontend logs**: F12 Developer Tools

---

## 📝 Checklist Deploy

### Backend (Render)
- [ ] Repository được push lên GitHub
- [ ] Web Service được tạo với đúng settings
- [ ] Environment Variables được set đầy đủ
- [ ] Build thành công (xem logs)
- [ ] Health check API hoạt động

### Frontend (Firebase)
- [ ] Firebase CLI được cài đặt
- [ ] API URL được cập nhật trong code
- [ ] Build frontend thành công
- [ ] Firebase project được init
- [ ] Deploy thành công
- [ ] Website hoạt động bình thường

### Final Steps
- [ ] CORS được cập nhật với Firebase URL
- [ ] Google Sheets API hoạt động
- [ ] Email notifications working
- [ ] End-to-end testing completed

---

## 🆘 Troubleshooting

### Backend không start
- Kiểm tra logs trong Render
- Đảm bảo Environment Variables đúng format
- Test Google Sheets connection

### Frontend không connect được Backend
- Kiểm tra CORS settings
- Verify API URL trong apiService.js
- Check network tab trong browser

### Google Sheets lỗi
- Verify Service Account permissions
- Check private key format (phải có \\n)
- Ensure Sheets API is enabled
