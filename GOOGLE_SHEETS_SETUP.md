# 📋 Hướng Dẫn Setup Google Sheets cho PedMedConsult

## 🚀 Bước 1: Tạo Google Sheet mới

1. **Truy cập**: https://sheets.google.com
2. **Tạo mới**: Nhấn "+ Tạo trang tính trống"
3. **Đặt tên**: "PedMedConsult Database"

## 📑 Bước 2: Tạo các Sheet tabs

Tạo 7 sheet tabs với tên sau (click dấu + ở cuối):

1. **Users** (Bác sĩ)
2. **Pharmacists** (Dược sĩ)  
3. **Patients** (Bệnh nhân & Yêu cầu TDM)
4. **Doses** (Liều dùng)
5. **Concentrations** (Nồng độ)
6. **Departments** (Khoa phòng)
7. **TDMDrugs** (Thuốc TDM)

## 🏗️ Bước 3: Setup từng Sheet

### 1️⃣ Sheet "Users" (Bác sĩ Profile)

**Dòng 1 - Headers (Row 1):**
```
id | email | fullName | department | role | phone | title | pharmacistIds | createdDate | lastLogin | status
```

**Copy paste vào A1:**
```
id	email	fullName	department	role	phone	title	pharmacistIds	createdDate	lastLogin	status
```

**Dòng 2 - Dữ liệu mẫu:**
```
USER_001	doctor@hospital.com	BS. Nguyễn Văn A	Nhi khoa	doctor	0901234567	Bác sĩ chuyên khoa II	PHARM_001,PHARM_002	2025-08-24	2025-08-24 10:30:00	active
```

---

### 2️⃣ Sheet "Pharmacists" (Dược sĩ Profile)

**Dòng 1 - Headers:**
```
id	email	fullName	phone	departments	role	title	createdDate	lastLogin	status
```

**Dòng 2 - Dữ liệu mẫu:**
```
PHARM_001	pharmacist@hospital.com	DS. Trần Thị B	0901234568	Nhi khoa,Sơ sinh	pharmacist	Dược sĩ chuyên khoa I	2025-08-24	2025-08-24 10:30:00	active
```

---

### 3️⃣ Sheet "Patients" (Bệnh nhân & Yêu cầu TDM)

**Dòng 1 - Headers:**
```
id	createdDate	department	patientName	patientCode	gender	dob	weight	height	ageDays	isICU	isNewborn	gestationalAge	correctedAge	birthWeight	isObese	hasCancer	creatinine	creatinineDate	creatinineTime	bun	clinicalHistory	drugName	indication	doctorName	doctorPhone	doctorEmail	createdBy	assignedPharmacist	additionalInfo	status	pharmacistResponse	responseDate	responseBy
```

**Dòng 2 - Dữ liệu mẫu:**
```
REQ_001	2025-08-24	Nhi khoa	Nguyễn Văn A	BN001	Nam	2020-01-15	15.5	100	1800	TRUE	FALSE	38	40	3.2	FALSE	FALSE	1.2	2025-08-24	08:30	20	Tiền sử viêm phổi	Vancomycin	Nhiễm khuẩn huyết	BS. Lê Văn C	0901234569	doctor2@hospital.com	doctor@hospital.com	DS. Trần Thị B	Bệnh nhân có dị ứng penicillin	Chờ trả lời			
```

---

### 4️⃣ Sheet "Doses" (Liều dùng)

**Dòng 1 - Headers:**
```
id	requestId	singleDose	interval	infusionTime	date	time	doseNumber	createdDate
```

**Dòng 2 - Dữ liệu mẫu:**
```
DOSE_001	REQ_001	250	8	30	2025-08-24	08:00	1	2025-08-24T10:30:00
```

---

### 5️⃣ Sheet "Concentrations" (Nồng độ)

**Dòng 1 - Headers:**
```
id	requestId	level	unit	date	time	type	notes	createdDate
```

**Dòng 2 - Dữ liệu mẫu:**
```
CONC_001	REQ_001	15.2	mg/L	2025-08-24	16:00	Peak	Đo sau liều thứ 3	2025-08-24T16:30:00
```

---

### 6️⃣ Sheet "Departments" (Khoa phòng)

**Dòng 1 - Headers:**
```
id	name	description	status
```

**Dòng 2-8 - Dữ liệu mẫu:**
```
DEPT_001	Nhi khoa	Khoa Nhi - Bệnh viện ABC	active
DEPT_002	Khoa Tim mạch	Khoa Tim mạch Nhi	active
DEPT_003	Khoa Thần kinh	Khoa Thần kinh Nhi	active
DEPT_004	Khoa Nội tiết	Khoa Nội tiết Nhi	active
DEPT_005	Khoa Nhiễm khuẩn	Khoa Nhiễm khuẩn Nhi	active
DEPT_006	Khoa Hồi sức cấp cứu	PICU	active
DEPT_007	Khoa Nhi tổng quát	Khoa Nhi tổng quát	active
```

---

### 7️⃣ Sheet "TDMDrugs" (Thuốc TDM)

**Dòng 1 - Headers:**
```
id	name	category	therapeuticRange	toxicLevel	status
```

**Dòng 2-6 - Dữ liệu mẫu:**
```
DRUG_001	Vancomycin	Kháng sinh	10-20 mg/L	>20 mg/L	active
DRUG_002	Gentamicin	Kháng sinh	5-10 mg/L	>10 mg/L	active
DRUG_003	Digoxin	Tim mạch	1-2 ng/mL	>2 ng/mL	active
DRUG_004	Phenytoin	Chống động kinh	10-20 mg/L	>20 mg/L	active
DRUG_005	Carbamazepine	Chống động kinh	4-12 mg/L	>12 mg/L	active
```

## 🎨 Bước 4: Format cho đẹp

### Format Headers:
1. Chọn dòng 1 (headers) của mỗi sheet
2. **Bold**: Ctrl + B
3. **Background**: Màu xanh nhạt (#E3F2FD)
4. **Text Color**: Màu xanh đậm (#1565C0)
5. **Border**: Thêm viền

### Format Data:
1. Chọn toàn bộ data area
2. **Border**: Thêm viền cho tất cả cells
3. **Alignment**: Text align left, numbers align right

### Freeze Headers:
1. Click vào dòng 2 (dưới headers)
2. **View** → **Freeze** → **1 row**

## 🔗 Bước 5: Lấy Sheet ID

1. **Copy URL** của Google Sheet
2. **Lấy SPREADSHEET_ID** từ URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=0
   ```
3. **Cập nhật** vào file `.env`:
   ```
   SPREADSHEET_ID=your_spreadsheet_id_here
   ```

## 🔐 Bước 6: Chia sẻ quyền truy cập

1. **Nhấn "Share"** (góc phải trên)
2. **Add service account email**:
   ```
   service-account@pedmedconsult.iam.gserviceaccount.com
   ```
3. **Permission**: Editor
4. **Send**: Gửi lời mời

## ✅ Bước 7: Test kết nối

1. **Cập nhật SPREADSHEET_ID** trong `.env`
2. **Chạy test**:
   ```bash
   cd server
   node -e "
   require('dotenv').config();
   const service = require('./services/googleSheetsService');
   service.healthCheck().then(console.log).catch(console.error);
   "
   ```

## 📱 Bước 8: Setup mobile-friendly

1. **View** → **Protected sheets and ranges**
2. **Protect headers** (chỉ cho phép admin edit)
3. **Set data validation** cho các cột:
   - Status: dropdown list
   - Role: dropdown list  
   - Boolean fields: TRUE/FALSE

## 🚨 Lưu ý quan trọng:

1. **KHÔNG lưu mật khẩu** trong Google Sheets
2. **Email** phải unique trong Users và Pharmacists
3. **ID format** phải đúng: USER_YYYYMMDD_###
4. **Date format**: YYYY-MM-DD
5. **DateTime format**: YYYY-MM-DDTHH:MM:SS
6. **Boolean values**: TRUE/FALSE (viết hoa)

## 🔄 Backup & Recovery:

1. **File** → **Version history** → **See version history**
2. **Tự động backup** mỗi ngày
3. **Export backup**: File → Download → Excel (.xlsx)

---

🎉 **Hoàn thành!** Google Sheets đã sẵn sàng cho PedMedConsult Database!
