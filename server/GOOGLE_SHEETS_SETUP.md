# Google Sheets Setup Guide for PedMedConsult

## 📊 Cấu trúc Google Sheets cần thiết

Hệ thống PedMedConsult cần 6 sheets chính với cấu trúc như sau:

### 1. Sheet "Patients" - Thông tin bệnh nhân
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | patientCode | Mã bệnh nhân (BN001, BN002...) | Text |
| C | patientName | Tên bệnh nhân | Text |
| D | dateOfBirth | Ngày sinh (YYYY-MM-DD) | Date |
| E | gender | Giới tính (Nam/Nữ) | Text |
| F | weight | Cân nặng (kg) | Number |
| G | height | Chiều cao (cm) | Number |
| H | department | Khoa điều trị | Text |
| I | ward | Buồng/Khu | Text |
| J | bedNumber | Số giường | Text |
| K | diagnosis | Chẩn đoán | Text |
| L | allergies | Dị ứng thuốc | Text |
| M | createdDate | Ngày tạo (YYYY-MM-DD) | Date |
| N | createdBy | Người tạo | Text |

### 2. Sheet "Requests" - Yêu cầu tư vấn TDM
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | patientId | ID bệnh nhân | Number |
| C | patientCode | Mã bệnh nhân | Text |
| D | patientName | Tên bệnh nhân | Text |
| E | drugName | Tên thuốc TDM | Text |
| F | indication | Chỉ định sử dụng | Text |
| G | dosage | Liều dùng | Text |
| H | frequency | Tần suất dùng thuốc | Text |
| I | route | Đường dùng thuốc | Text |
| J | startDate | Ngày bắt đầu dùng thuốc | Date |
| K | samplingDate | Ngày lấy mẫu | Date |
| L | samplingTime | Giờ lấy mẫu | Time |
| M | lastDoseTime | Giờ liều cuối cùng | Time |
| N | renalFunction | Chức năng thận | Text |
| O | hepaticFunction | Chức năng gan | Text |
| P | comorbidities | Bệnh kèm theo | Text |
| Q | concomitantMeds | Thuốc phối hợp | Text |
| R | clinicalQuestion | Câu hỏi lâm sàng | Text |
| S | requestingDoctor | Bác sĩ yêu cầu | Text |
| T | doctorEmail | Email bác sĩ | Email |
| U | doctorPhone | SĐT bác sĩ | Text |
| V | department | Khoa | Text |
| W | status | Trạng thái (Chờ trả lời/Đã trả lời) | Text |
| X | assignedPharmacist | Dược sĩ phụ trách | Text |
| Y | pharmacistResponse | Phản hồi của dược sĩ | Text |
| Z | responseDate | Ngày trả lời | Date |
| AA | responseBy | Người trả lời | Text |
| BB | priority | Độ ưu tiên (Thường/Cấp/Khẩn cấp) | Text |
| CC | createdDate | Ngày tạo | Date |
| DD | updatedDate | Ngày cập nhật | Date |

### 3. Sheet "Doses" - Lịch sử liều dùng
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | requestId | ID yêu cầu | Number |
| C | patientId | ID bệnh nhân | Number |
| D | drugName | Tên thuốc | Text |
| E | doseAmount | Liều lượng | Number |
| F | doseUnit | Đơn vị liều | Text |
| G | administrationTime | Thời gian dùng thuốc | Time |
| H | administrationDate | Ngày dùng thuốc | Date |
| I | route | Đường dùng | Text |
| J | notes | Ghi chú | Text |
| K | recordedBy | Người ghi nhận | Text |
| L | createdDate | Ngày tạo | Date |

### 4. Sheet "Concentrations" - Nồng độ thuốc
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | requestId | ID yêu cầu | Number |
| C | patientId | ID bệnh nhân | Number |
| D | drugName | Tên thuốc | Text |
| E | concentrationValue | Giá trị nồng độ | Number |
| F | concentrationUnit | Đơn vị nồng độ | Text |
| G | sampleType | Loại mẫu (máu/huyết thanh/plasma) | Text |
| H | samplingDate | Ngày lấy mẫu | Date |
| I | samplingTime | Giờ lấy mẫu | Time |
| J | labResultDate | Ngày có kết quả | Date |
| K | referenceRange | Khoảng tham chiếu | Text |
| L | interpretation | Diễn giải (Thấp/Bình thường/Cao/Độc) | Text |
| M | notes | Ghi chú | Text |
| N | recordedBy | Người ghi nhận | Text |
| O | createdDate | Ngày tạo | Date |

### 5. Sheet "Users" - Người dùng hệ thống
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | email | Email đăng nhập | Email |
| C | displayName | Tên hiển thị | Text |
| D | role | Vai trò (Doctor/Pharmacist/Admin) | Text |
| E | department | Khoa | Text |
| F | speciality | Chuyên khoa | Text |
| G | phoneNumber | Số điện thoại | Text |
| H | isActive | Hoạt động (TRUE/FALSE) | Boolean |
| I | lastLogin | Lần đăng nhập cuối | DateTime |
| J | createdDate | Ngày tạo tài khoản | Date |
| K | permissions | Quyền hạn | Text |

### 6. Sheet "Pharmacists" - Thông tin dược sĩ
| Cột | Tên cột | Mô tả | Kiểu dữ liệu |
|-----|---------|-------|--------------|
| A | id | ID tự động tăng | Number |
| B | email | Email | Email |
| C | fullName | Họ tên | Text |
| D | department | Khoa phụ trách | Text |
| E | specialization | Chuyên môn | Text |
| F | phoneNumber | Số điện thoại | Text |
| G | workSchedule | Lịch làm việc | Text |
| H | maxCaseLoad | Số ca tối đa/ngày | Number |
| I | currentCaseLoad | Số ca hiện tại | Number |
| J | expertise | Chuyên môn thuốc | Text |
| K | isAvailable | Có sẵn (TRUE/FALSE) | Boolean |
| L | priority | Độ ưu tiên phân công | Number |
| M | lastAssigned | Lần phân công cuối | DateTime |
| N | createdDate | Ngày tạo | Date |

## 🛠️ Cách setup nhanh

### Phương án 1: Sử dụng Google Apps Script (Khuyến nghị)

1. **Mở Google Sheets của bạn**: https://docs.google.com/spreadsheets/d/16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY/edit

2. **Vào Extensions > Apps Script**

3. **Xóa code mặc định và paste code từ file `/scripts/setup-sheets.js`**

4. **Save và chạy function `setupSheetsStructure()`**
   - Lần đầu sẽ yêu cầu authorization
   - Click "Review permissions" và cho phép access

5. **Chạy function `addSampleData()` để thêm dữ liệu mẫu**

6. **Kiểm tra kết quả**: Sẽ có 6 sheets với header đã format và dữ liệu mẫu

### Phương án 2: Tạo thủ công

1. **Tạo 6 sheets** với tên chính xác:
   - Patients
   - Requests  
   - Doses
   - Concentrations
   - Users
   - Pharmacists

2. **Thêm headers** theo bảng trên vào dòng đầu tiên của mỗi sheet

3. **Format headers**:
   - Font: Bold
   - Background: Blue (#4285f4)
   - Text color: White
   - Freeze row 1

4. **Thêm dữ liệu mẫu** để test

## 🔗 Cấu hình Service Account

### Bước 1: Google Cloud Console

1. **Truy cập**: https://console.cloud.google.com/

2. **Tạo project mới** hoặc chọn project hiện có

3. **Enable APIs**:
   - Google Sheets API
   - Google Drive API

4. **Tạo Service Account**:
   - IAM & Admin > Service Accounts
   - Create Service Account
   - Tên: `pedmed-service-account`

5. **Tạo Private Key**:
   - Vào Service Account vừa tạo
   - Keys tab > Add Key > Create new key
   - Chọn JSON format
   - Download file JSON

6. **Lấy thông tin từ file JSON**:
   ```json
   {
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "pedmed-service-account@your-project.iam.gserviceaccount.com"
   }
   ```

### Bước 2: Share Google Sheets

1. **Mở Google Sheets**

2. **Click "Share"**

3. **Thêm email Service Account** với quyền "Editor"
   - Email: `pedmed-service-account@your-project.iam.gserviceaccount.com`

4. **Send invitation**

### Bước 3: Cập nhật .env

```properties
GOOGLE_SHEETS_ID=16iTvaSTgkDM4Ci8WiqEFVBzv7UO7EZSmg6GZlmGd4zY
GOOGLE_SERVICE_ACCOUNT_EMAIL=pedmed-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## ✅ Test kết nối

Sau khi setup xong, test bằng cách:

```bash
cd server
node -e "
const service = require('./services/googleSheetsService');
service.healthCheck().then(result => {
  console.log('Health check result:', result);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
"
```

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **"No access to Google Sheets"**
   - Kiểm tra Service Account email đã được share chưa
   - Kiểm tra quyền Editor

2. **"Invalid private key"**
   - Kiểm tra GOOGLE_PRIVATE_KEY trong .env
   - Đảm bảo có dấu ngoặc kép và \\n đã đúng

3. **"Sheet not found"**
   - Kiểm tra tên sheets phải chính xác
   - Kiểm tra GOOGLE_SHEETS_ID

4. **"Auth error"**
   - Kiểm tra Google Sheets API đã enable chưa
   - Kiểm tra Service Account key còn hiệu lực

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs để xem error cụ thể
2. Google Cloud Console để xem API usage
3. File .env có đúng format không
4. Service Account có quyền trên Sheets không
