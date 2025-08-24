/**
 * Script để setup cấu trúc Google Sheets cho PedMedConsult
 * Chạy script này trong Google Apps Script hoặc sử dụng Google Sheets API
 */

const SHEET_STRUCTURES = {
    'Patients': [
        'id', 'patientCode', 'patientName', 'dateOfBirth', 'gender', 
        'weight', 'height', 'department', 'ward', 'bedNumber', 
        'diagnosis', 'allergies', 'createdDate', 'createdBy'
    ],
    
    'Requests': [
        'id', 'patientId', 'patientCode', 'patientName', 'drugName',
        'indication', 'dosage', 'frequency', 'route', 'startDate',
        'samplingDate', 'samplingTime', 'lastDoseTime', 'renalFunction',
        'hepaticFunction', 'comorbidities', 'concomitantMeds', 'clinicalQuestion',
        'requestingDoctor', 'doctorEmail', 'doctorPhone', 'department',
        'status', 'assignedPharmacist', 'pharmacistResponse', 'responseDate',
        'responseBy', 'priority', 'createdDate', 'updatedDate'
    ],
    
    'Doses': [
        'id', 'requestId', 'patientId', 'drugName', 'doseAmount',
        'doseUnit', 'administrationTime', 'administrationDate', 'route',
        'notes', 'recordedBy', 'createdDate'
    ],
    
    'Concentrations': [
        'id', 'requestId', 'patientId', 'drugName', 'concentrationValue',
        'concentrationUnit', 'sampleType', 'samplingDate', 'samplingTime',
        'labResultDate', 'referenceRange', 'interpretation', 'notes',
        'recordedBy', 'createdDate'
    ],
    
    'Users': [
        'id', 'email', 'displayName', 'role', 'department',
        'speciality', 'phoneNumber', 'isActive', 'lastLogin',
        'createdDate', 'permissions'
    ],
    
    'Pharmacists': [
        'id', 'email', 'fullName', 'department', 'specialization',
        'phoneNumber', 'workSchedule', 'maxCaseLoad', 'currentCaseLoad',
        'expertise', 'isAvailable', 'priority', 'lastAssigned', 'createdDate'
    ]
};

/**
 * Tạo cấu trúc sheets trong Google Sheets
 * Để sử dụng: Copy code này vào Google Apps Script
 */
function setupSheetsStructure() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    Object.keys(SHEET_STRUCTURES).forEach(sheetName => {
        console.log(`Setting up sheet: ${sheetName}`);
        
        // Tạo sheet mới hoặc lấy sheet hiện có
        let sheet;
        try {
            sheet = spreadsheet.getSheetByName(sheetName);
            if (!sheet) {
                sheet = spreadsheet.insertSheet(sheetName);
            }
        } catch (e) {
            sheet = spreadsheet.insertSheet(sheetName);
        }
        
        // Clear existing content
        sheet.clear();
        
        // Thêm headers
        const headers = SHEET_STRUCTURES[sheetName];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        
        // Format headers
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#4285f4');
        headerRange.setFontColor('white');
        
        // Auto-resize columns
        sheet.autoResizeColumns(1, headers.length);
        
        // Freeze header row
        sheet.setFrozenRows(1);
        
        console.log(`✅ Sheet ${sheetName} setup complete`);
    });
    
    console.log('🎉 All sheets setup complete!');
}

/**
 * Thêm dữ liệu mẫu để test
 */
function addSampleData() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Sample patients
    const patientsSheet = spreadsheet.getSheetByName('Patients');
    const samplePatients = [
        [1, 'BN001', 'Nguyễn Văn A', '2020-01-15', 'Nam', 15, 100, 'Nhi khoa', 'A1', '01', 'Nhiễm khuẩn', 'Không', '2025-08-24', 'BS. Nguyễn'],
        [2, 'BN002', 'Trần Thị B', '2019-05-20', 'Nữ', 18, 105, 'Nhi khoa', 'A2', '02', 'Viêm phổi', 'Penicillin', '2025-08-24', 'BS. Trần'],
        [3, 'BN003', 'Lê Văn C', '2022-03-10', 'Nam', 12, 95, 'Nhi khoa', 'B1', '03', 'Suy tim', 'Không', '2025-08-24', 'BS. Lê']
    ];
    patientsSheet.getRange(2, 1, samplePatients.length, samplePatients[0].length).setValues(samplePatients);
    
    // Sample pharmacists
    const pharmacistsSheet = spreadsheet.getSheetByName('Pharmacists');
    const samplePharmacists = [
        [1, 'duocsi1@hospital.com', 'Dược sĩ Nguyễn Văn X', 'Nhi khoa', 'TDM Nhi', '0901234567', 'T2-T6: 7h-16h', 10, 3, 'Vancomycin, Digoxin', true, 1, '2025-08-24 08:00', '2025-08-20'],
        [2, 'duocsi2@hospital.com', 'Dược sĩ Trần Thị Y', 'Tim mạch', 'TDM Tim mạch', '0907654321', 'T2-T6: 8h-17h', 8, 2, 'Digoxin, Warfarin', true, 2, '2025-08-24 09:00', '2025-08-20']
    ];
    pharmacistsSheet.getRange(2, 1, samplePharmacists.length, samplePharmacists[0].length).setValues(samplePharmacists);
    
    // Sample users
    const usersSheet = spreadsheet.getSheetByName('Users');
    const sampleUsers = [
        [1, 'doctor1@hospital.com', 'BS. Nguyễn Văn D', 'Doctor', 'Nhi khoa', 'Nhi tim mạch', '0912345678', true, '2025-08-24 10:00', '2025-08-20', 'CREATE_REQUEST,VIEW_REQUESTS'],
        [2, 'duocsi1@hospital.com', 'DS. Nguyễn Văn X', 'Pharmacist', 'Dược', 'TDM', '0901234567', true, '2025-08-24 08:00', '2025-08-20', 'VIEW_REQUESTS,RESPOND_REQUESTS'],
        [3, 'admin@hospital.com', 'Quản trị viên', 'Admin', 'IT', 'Hệ thống', '0909999999', true, '2025-08-24 07:00', '2025-08-20', 'ALL_PERMISSIONS']
    ];
    usersSheet.getRange(2, 1, sampleUsers.length, sampleUsers[0].length).setValues(sampleUsers);
    
    console.log('✅ Sample data added successfully!');
}

// Export for Node.js usage
if (typeof module !== 'undefined') {
    module.exports = {
        SHEET_STRUCTURES,
        setupSheetsStructure,
        addSampleData
    };
}
