# Hệ Thống Xác Thực Mới - PedMedConsult

## 🔐 Kiến trúc xác thực

### Username/Password Authentication
- **Doctors**: Đăng nhập bằng tài khoản chung theo khoa (VD: sicu, nhi, timMach)
- **Pharmacists**: Đăng nhập bằng tài khoản riêng (VD: pharmacist1, pharmacist2)
- **Password**: Do admin cấp và quản lý

### Google Sheets Structure - Updated

#### 1. **Users Sheet** (Bác sĩ - Tài khoản theo khoa)
| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | Text | User ID | DEPT_SICU |
| username | Text | Tên đăng nhập | sicu |
| password | Text | Mật khẩu (hash) | $2b$10$... |
| department | Text | Khoa phòng | Khoa Hồi sức cấp cứu |
| role | Text | Vai trò | doctor |
| status | Text | Trạng thái | active |
| createdDate | Date | Ngày tạo | 2025-08-24 |
| lastLogin | DateTime | Lần đăng nhập cuối | 2025-08-24 10:30:00 |

#### 2. **Pharmacists Sheet** (Dược sĩ - Tài khoản cá nhân)
| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | Text | Pharmacist ID | PHARM_001 |
| username | Text | Tên đăng nhập | pharmacist1 |
| password | Text | Mật khẩu (hash) | $2b$10$... |
| fullName | Text | Họ tên đầy đủ | DS. Nguyễn Thị A |
| phone | Text | Số điện thoại | 0901234567 |
| departments | Text | Khoa phụ trách | Nhi khoa,SICU |
| role | Text | Vai trò | pharmacist |
| title | Text | Học hàm | Dược sĩ chuyên khoa I |
| status | Text | Trạng thái | active |
| createdDate | Date | Ngày tạo | 2025-08-24 |
| lastLogin | DateTime | Lần đăng nhập cuối | 2025-08-24 10:30:00 |

### Tài khoản mặc định

#### Doctors (theo khoa):
- **sicu** - Khoa Hồi sức cấp cứu
- **nhi** - Khoa Nhi tổng quát  
- **timMach** - Khoa Tim mạch
- **thanKinh** - Khoa Thần kinh
- **noiTiet** - Khoa Nội tiết
- **nhiemKhuan** - Khoa Nhiễm khuẩn
- **ngoai** - Khoa Ngoại

#### Pharmacists (cá nhân):
- **pharmacist1** - DS. Nguyễn Thị A
- **pharmacist2** - DS. Lê Văn B
- **pharmacist3** - DS. Trần Thị C

### Quy trình đăng nhập

1. **User nhập**: username + password
2. **Hệ thống check**: Users sheet hoặc Pharmacists sheet
3. **Verify password**: bcrypt compare
4. **Generate JWT**: Chứa username, role, department
5. **Return token**: Frontend lưu trong localStorage

### Tạo yêu cầu mới

1. **Doctor điền form** với:
   - Thông tin bệnh nhân
   - **Email bác sĩ** (tự điền)
   - **SĐT bác sĩ** (tự điền)
   - Thông tin thuốc TDM

2. **Hệ thống tự động**:
   - Lấy department từ JWT
   - Lấy username từ JWT
   - Tạo ID tự động

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/verify` - Verify token

### Users Management
- `POST /api/admin/create-department-account` - Tạo tài khoản khoa
- `POST /api/admin/create-pharmacist-account` - Tạo tài khoản dược sĩ
- `PUT /api/admin/change-password` - Đổi mật khẩu
