# PedMedConsult Database Structure

## Google Sheets Structure

### 1. **Users Sheet** (Bác sĩ)
Lưu thông tin tài khoản đăng nhập của các bác sĩ theo khoa phòng

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | User ID (auto-generated) | Yes | USER_001 |
| email | Email | Email đăng nhập | Yes | doctor@hospital.com |
| name | Text | Họ tên bác sĩ | Yes | BS. Nguyễn Văn A |
| department | Text | Khoa phòng | Yes | Nhi khoa |
| role | Text | Vai trò | Yes | doctor |
| phone | Text | Số điện thoại | No | 0901234567 |
| pharmacistIds | Text | DS phụ trách (nhiều ID, phân cách bằng dấu phẩy) | No | PHARM_001,PHARM_002 |
| createdDate | Date | Ngày tạo tài khoản | Yes | 2025-08-24 |
| status | Text | Trạng thái tài khoản | Yes | active |

### 2. **Pharmacists Sheet** (Dược sĩ)
Lưu thông tin tài khoản và phạm vi phụ trách của dược sĩ

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Pharmacist ID (auto-generated) | Yes | PHARM_001 |
| email | Email | Email đăng nhập | Yes | pharmacist@hospital.com |
| name | Text | Họ tên dược sĩ | Yes | DS. Trần Thị B |
| phone | Text | Số điện thoại | Yes | 0901234568 |
| departments | Text | Khoa phòng phụ trách (nhiều khoa, phân cách bằng dấu phẩu) | Yes | Nhi khoa,Sơ sinh |
| role | Text | Vai trò | Yes | pharmacist |
| createdDate | Date | Ngày tạo tài khoản | Yes | 2025-08-24 |
| status | Text | Trạng thái tài khoản | Yes | active |

### 3. **Patients Sheet** (Bệnh nhân)
Lưu thông tin bệnh nhân và yêu cầu TDM chính

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Request ID (auto-generated) | Yes | REQ_001 |
| createdDate | Date | Ngày khởi tạo | Yes | 2025-08-24 |
| department | Text | Khoa | Yes | Nhi khoa |
| patientName | Text | Tên bệnh nhân | Yes | Nguyễn Văn A |
| patientCode | Text | Mã bệnh nhân | Yes | BN001 |
| gender | Text | Giới tính | Yes | Nam |
| dob | Date | Ngày sinh | Yes | 2020-01-15 |
| weight | Number | Cân nặng (kg) | No | 15.5 |
| height | Number | Chiều cao (cm) | No | 100 |
| ageDays | Number | Tuổi (ngày) | No | 1800 |
| isICU | Boolean | ICU | No | true |
| isNewborn | Boolean | Sơ sinh | No | false |
| gestationalAge | Number | Tuổi thai (tuần) | No | 38 |
| correctedAge | Number | Tuổi hiệu chỉnh (tuần) | No | 40 |
| birthWeight | Number | Cân nặng khi sinh (kg) | No | 3.2 |
| isObese | Boolean | Béo phì | No | false |
| hasCancer | Boolean | Ung thư | No | false |
| creatinine | Number | Giá trị Creatinine (mg/dL) | No | 1.2 |
| creatinineDate | Date | Ngày đo Creatinine | No | 2025-08-24 |
| creatinineTime | Time | Giờ đo Creatinine | No | 08:30 |
| bun | Number | BUN (mg/dL) | No | 20 |
| clinicalHistory | Text | Tiền sử bệnh lý | No | Tiền sử viêm phổi |
| drugName | Text | Thuốc cần TDM | Yes | Vancomycin |
| indication | Text | Chỉ định | No | Nhiễm khuẩn huyết |
| doctorName | Text | Họ tên bác sĩ | Yes | BS. Lê Văn C |
| doctorPhone | Text | SĐT bác sĩ | Yes | 0901234569 |
| doctorEmail | Email | Email bác sĩ | Yes | doctor2@hospital.com |
| createdBy | Email | Email người tạo | Yes | doctor@hospital.com |
| assignedPharmacist | Text | Dược sĩ được phân công | No | DS. Trần Thị B |
| additionalInfo | Text | Thông tin bổ sung | No | Bệnh nhân có dị ứng penicillin |
| status | Text | Trạng thái | Yes | Chờ trả lời |
| pharmacistResponse | Text | Phản hồi của dược sĩ | No | Khuyến nghị giảm liều... |
| responseDate | Date | Ngày trả lời | No | 2025-08-25 |
| responseBy | Text | Dược sĩ trả lời | No | DS. Trần Thị B |

### 4. **Doses Sheet** (Liều dùng)
Lưu chi tiết các liều thuốc đã sử dụng

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Dose ID (auto-generated) | Yes | DOSE_001 |
| requestId | Text | Request ID liên kết | Yes | REQ_001 |
| singleDose | Number | Liều 1 lần (mg) | Yes | 250 |
| interval | Number | Khoảng đưa liều (giờ) | Yes | 8 |
| infusionTime | Number | Thời gian truyền (phút) | Yes | 30 |
| date | Date | Ngày đưa liều | Yes | 2025-08-24 |
| time | Time | Giờ đưa liều | Yes | 08:00 |
| doseNumber | Number | Số thứ tự liều | Yes | 1 |
| createdDate | DateTime | Ngày tạo record | Yes | 2025-08-24T10:30:00 |

### 5. **Concentrations Sheet** (Nồng độ)
Lưu các kết quả đo nồng độ thuốc

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Concentration ID (auto-generated) | Yes | CONC_001 |
| requestId | Text | Request ID liên kết | Yes | REQ_001 |
| level | Number | Nồng độ | Yes | 15.2 |
| unit | Text | Đơn vị | Yes | mg/L |
| date | Date | Ngày đo | Yes | 2025-08-24 |
| time | Time | Giờ đo | Yes | 16:00 |
| type | Text | Loại nồng độ | No | Peak |
| notes | Text | Ghi chú | No | Đo sau liều thứ 3 |
| createdDate | DateTime | Ngày tạo record | Yes | 2025-08-24T16:30:00 |

### 6. **Departments Sheet** (Khoa phòng)
Danh mục các khoa phòng

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Department ID | Yes | DEPT_001 |
| name | Text | Tên khoa | Yes | Nhi khoa |
| description | Text | Mô tả | No | Khoa Nhi - Bệnh viện ABC |
| status | Text | Trạng thái | Yes | active |

### 7. **TDMDrugs Sheet** (Thuốc TDM)
Danh mục các thuốc cần theo dõi nồng độ

| Column | Type | Description | Required | Example |
|--------|------|-------------|----------|---------|
| id | Text | Drug ID | Yes | DRUG_001 |
| name | Text | Tên thuốc | Yes | Vancomycin |
| category | Text | Nhóm thuốc | No | Kháng sinh |
| therapeuticRange | Text | Khoảng nồng độ điều trị | No | 10-20 mg/L |
| toxicLevel | Text | Nồng độ độc | No | >20 mg/L |
| status | Text | Trạng thái | Yes | active |

## Relationships

- Users.pharmacistIds → Pharmacists.id (Many-to-Many)
- Patients.createdBy → Users.email (Many-to-One)
- Patients.assignedPharmacist → Pharmacists.name (Many-to-One)
- Doses.requestId → Patients.id (Many-to-One)
- Concentrations.requestId → Patients.id (Many-to-One)
- Users.department → Departments.name (Many-to-One)
- Patients.drugName → TDMDrugs.name (Many-to-One)

## Auto-generated IDs Format

- Users: USER_YYYYMMDD_###
- Pharmacists: PHARM_YYYYMMDD_###
- Patients: REQ_YYYYMMDD_###
- Doses: DOSE_YYYYMMDD_###
- Concentrations: CONC_YYYYMMDD_###
- Departments: DEPT_###
- TDMDrugs: DRUG_###

## Status Values

- **Users/Pharmacists**: active, inactive
- **Patients**: Chờ trả lời, Đã trả lời, Đã hủy
- **Departments/TDMDrugs**: active, inactive
