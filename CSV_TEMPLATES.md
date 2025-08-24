# CSV Template Files cho Google Sheets Import

## Tạo các file CSV để import vào Google Sheets

### 1. users.csv
```csv
id,email,fullName,department,role,phone,title,pharmacistIds,createdDate,lastLogin,status
USER_001,doctor1@hospital.com,BS. Nguyễn Văn A,Nhi khoa,doctor,0901234567,Bác sĩ chuyên khoa II,PHARM_001,2025-08-24,2025-08-24 10:30:00,active
USER_002,doctor2@hospital.com,BS. Lê Thị B,Khoa Tim mạch,doctor,0901234568,Bác sĩ chuyên khoa I,PHARM_002,2025-08-24,2025-08-24 11:00:00,active
USER_003,doctor3@hospital.com,BS. Trần Văn C,Khoa Thần kinh,doctor,0901234569,Bác sĩ,PHARM_001,2025-08-24,2025-08-24 11:30:00,active
```

### 2. pharmacists.csv
```csv
id,email,fullName,phone,departments,role,title,createdDate,lastLogin,status
PHARM_001,pharmacist1@hospital.com,DS. Nguyễn Thị D,0901234570,"Nhi khoa,Khoa Tim mạch",pharmacist,Dược sĩ chuyên khoa II,2025-08-24,2025-08-24 09:00:00,active
PHARM_002,pharmacist2@hospital.com,DS. Lê Văn E,0901234571,"Khoa Thần kinh,Khoa Nội tiết",pharmacist,Dược sĩ chuyên khoa I,2025-08-24,2025-08-24 09:30:00,active
PHARM_003,pharmacist3@hospital.com,DS. Trần Thị F,0901234572,"Khoa Nhiễm khuẩn,Khoa Hồi sức cấp cứu",pharmacist,Dược sĩ,2025-08-24,2025-08-24 10:00:00,active
```

### 3. departments.csv
```csv
id,name,description,status
DEPT_001,Nhi khoa,Khoa Nhi - Bệnh viện Nhi Trung ương,active
DEPT_002,Khoa Tim mạch,Khoa Tim mạch Nhi,active
DEPT_003,Khoa Thần kinh,Khoa Thần kinh Nhi,active
DEPT_004,Khoa Nội tiết,Khoa Nội tiết Nhi,active
DEPT_005,Khoa Nhiễm khuẩn,Khoa Nhiễm khuẩn Nhi,active
DEPT_006,Khoa Hồi sức cấp cứu,Phòng chăm sóc tích cực nhi (PICU),active
DEPT_007,Khoa Ngoại,Khoa Ngoại Nhi,active
DEPT_008,Khoa Nhi tổng quát,Khoa Nhi tổng quát,active
```

### 4. tdmdrugs.csv
```csv
id,name,category,therapeuticRange,toxicLevel,status
DRUG_001,Vancomycin,Kháng sinh,10-20 mg/L,>20 mg/L,active
DRUG_002,Gentamicin,Kháng sinh aminoglycoside,5-10 mg/L,>10 mg/L,active
DRUG_003,Amikacin,Kháng sinh aminoglycoside,15-25 mg/L,>25 mg/L,active
DRUG_004,Digoxin,Thuốc tim mạch,1-2 ng/mL,>2 ng/mL,active
DRUG_005,Phenytoin,Thuốc chống động kinh,10-20 mg/L,>20 mg/L,active
DRUG_006,Carbamazepine,Thuốc chống động kinh,4-12 mg/L,>12 mg/L,active
DRUG_007,Valproic acid,Thuốc chống động kinh,50-100 mg/L,>100 mg/L,active
DRUG_008,Theophylline,Thuốc hen suyễn,10-20 mg/L,>20 mg/L,active
DRUG_009,Cyclosporine,Thuốc ức chế miễn dịch,100-400 ng/mL,>400 ng/mL,active
DRUG_010,Tacrolimus,Thuốc ức chế miễn dịch,5-20 ng/mL,>20 ng/mL,active
```

### 5. patients.csv (Template trống)
```csv
id,createdDate,department,patientName,patientCode,gender,dob,weight,height,ageDays,isICU,isNewborn,gestationalAge,correctedAge,birthWeight,isObese,hasCancer,creatinine,creatinineDate,creatinineTime,bun,clinicalHistory,drugName,indication,doctorName,doctorPhone,doctorEmail,createdBy,assignedPharmacist,additionalInfo,status,pharmacistResponse,responseDate,responseBy
```

### 6. doses.csv (Template trống)
```csv
id,requestId,singleDose,interval,infusionTime,date,time,doseNumber,createdDate
```

### 7. concentrations.csv (Template trống)
```csv
id,requestId,level,unit,date,time,type,notes,createdDate
```

## Hướng dẫn sử dụng CSV files:

1. **Copy nội dung CSV** từ file này
2. **Paste vào Google Sheets** trực tiếp
3. **Hoặc save thành .csv file** và import:
   - File → Import → Upload → Choose file
   - Separator type: Comma
   - Convert text to numbers: Yes

## Lưu ý formatting:
- **Date format**: YYYY-MM-DD
- **DateTime format**: YYYY-MM-DDTHH:MM:SS  
- **Boolean**: TRUE/FALSE (viết hoa)
- **Multiple values**: Phân cách bằng dấu phẩy (,)
