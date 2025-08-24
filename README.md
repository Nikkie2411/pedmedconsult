# PedMedConsult - Ứng dụng Tư vấn TDM Nhi khoa

## 📋 Mô tả
Ứng dụng web hỗ trợ tư vấn Therapeutic Drug Monitoring (TDM) cho bệnh nhi, kết nối bác sĩ và dược sĩ lâm sàng.

## 🏗️ Kiến trúc
- **Frontend**: React.js + Firebase Authentication
- **Backend**: Node.js + Express
- **Database**: Google Sheets API
- **Email**: NodeMailer
- **Deployment**: Frontend (Firebase), Backend (Render)

## 📁 Cấu trúc Project
```
PedMedConsult/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Node.js backend  
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── package.json
├── DEPLOYMENT_GUIDE.md
└── README.md
```

## 🚀 Hướng dẫn chạy Local

### Backend
```bash
cd server
npm install
npm start
```

### Frontend  
```bash
cd client
npm install
npm start
```

## 🌐 Deploy Production
Xem chi tiết trong [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔧 Features
- ✅ Đăng nhập/đăng ký bác sĩ
- ✅ Tạo yêu cầu tư vấn TDM
- ✅ Dashboard thống kê
- ✅ Quản lý bệnh nhân
- ✅ Gửi email thông báo
- ✅ Kết nối Google Sheets

## 👥 Đối tượng sử dụng
- **Bác sĩ**: Tạo yêu cầu tư vấn TDM
- **Dược sĩ lâm sàng**: Phản hồi tư vấn
- **Quản trị viên**: Theo dõi hệ thống

## 📞 Liên hệ
- Email: pedmedvn.nch@gmail.com
- Project: TDM Consultation System
