/**
 * Script để populate dữ liệu mẫu vào Google Sheets
 * Chạy sau khi đã tạo Google Sheets với đúng cấu trúc
 */

require('dotenv').config();

const populateSampleData = async () => {
    try {
        console.log('🌱 Đang populate dữ liệu mẫu vào Google Sheets...\n');

        const sheetsService = require('./services/googleSheetsService');

        // Sample data for Users
        const sampleUsers = [
            {
                id: 'USER_20250824_001',
                email: 'doctor1@hospital.com',
                fullName: 'BS. Nguyễn Văn A',
                department: 'Nhi khoa',
                role: 'doctor',
                phone: '0901234567',
                title: 'Bác sĩ chuyên khoa II',
                pharmacistIds: 'PHARM_20250824_001',
                createdDate: '2025-08-24',
                lastLogin: '2025-08-24 10:30:00',
                status: 'active'
            },
            {
                id: 'USER_20250824_002',
                email: 'doctor2@hospital.com', 
                fullName: 'BS. Lê Thị B',
                department: 'Khoa Tim mạch',
                role: 'doctor',
                phone: '0901234568',
                title: 'Bác sĩ chuyên khoa I',
                pharmacistIds: 'PHARM_20250824_002',
                createdDate: '2025-08-24',
                lastLogin: '2025-08-24 11:00:00',
                status: 'active'
            }
        ];

        // Sample data for Pharmacists
        const samplePharmacists = [
            {
                id: 'PHARM_20250824_001',
                email: 'pharmacist1@hospital.com',
                fullName: 'DS. Nguyễn Thị D',
                phone: '0901234570',
                departments: 'Nhi khoa,Khoa Tim mạch',
                role: 'pharmacist',
                title: 'Dược sĩ chuyên khoa II',
                createdDate: '2025-08-24',
                lastLogin: '2025-08-24 09:00:00',
                status: 'active'
            },
            {
                id: 'PHARM_20250824_002',
                email: 'pharmacist2@hospital.com',
                fullName: 'DS. Lê Văn E', 
                phone: '0901234571',
                departments: 'Khoa Thần kinh,Khoa Nội tiết',
                role: 'pharmacist',
                title: 'Dược sĩ chuyên khoa I',
                createdDate: '2025-08-24',
                lastLogin: '2025-08-24 09:30:00',
                status: 'active'
            }
        ];

        // Sample data for Departments
        const sampleDepartments = [
            { id: 'DEPT_001', name: 'Nhi khoa', description: 'Khoa Nhi - Bệnh viện Nhi Trung ương', status: 'active' },
            { id: 'DEPT_002', name: 'Khoa Tim mạch', description: 'Khoa Tim mạch Nhi', status: 'active' },
            { id: 'DEPT_003', name: 'Khoa Thần kinh', description: 'Khoa Thần kinh Nhi', status: 'active' },
            { id: 'DEPT_004', name: 'Khoa Nội tiết', description: 'Khoa Nội tiết Nhi', status: 'active' },
            { id: 'DEPT_005', name: 'Khoa Nhiễm khuẩn', description: 'Khoa Nhiễm khuẩn Nhi', status: 'active' },
            { id: 'DEPT_006', name: 'Khoa Hồi sức cấp cứu', description: 'Phòng chăm sóc tích cực nhi (PICU)', status: 'active' },
            { id: 'DEPT_007', name: 'Khoa Ngoại', description: 'Khoa Ngoại Nhi', status: 'active' },
            { id: 'DEPT_008', name: 'Khoa Nhi tổng quát', description: 'Khoa Nhi tổng quát', status: 'active' }
        ];

        // Sample data for TDM Drugs
        const sampleDrugs = [
            { id: 'DRUG_001', name: 'Vancomycin', category: 'Kháng sinh', therapeuticRange: '10-20 mg/L', toxicLevel: '>20 mg/L', status: 'active' },
            { id: 'DRUG_002', name: 'Gentamicin', category: 'Kháng sinh aminoglycoside', therapeuticRange: '5-10 mg/L', toxicLevel: '>10 mg/L', status: 'active' },
            { id: 'DRUG_003', name: 'Amikacin', category: 'Kháng sinh aminoglycoside', therapeuticRange: '15-25 mg/L', toxicLevel: '>25 mg/L', status: 'active' },
            { id: 'DRUG_004', name: 'Digoxin', category: 'Thuốc tim mạch', therapeuticRange: '1-2 ng/mL', toxicLevel: '>2 ng/mL', status: 'active' },
            { id: 'DRUG_005', name: 'Phenytoin', category: 'Thuốc chống động kinh', therapeuticRange: '10-20 mg/L', toxicLevel: '>20 mg/L', status: 'active' },
            { id: 'DRUG_006', name: 'Carbamazepine', category: 'Thuốc chống động kinh', therapeuticRange: '4-12 mg/L', toxicLevel: '>12 mg/L', status: 'active' },
            { id: 'DRUG_007', name: 'Valproic acid', category: 'Thuốc chống động kinh', therapeuticRange: '50-100 mg/L', toxicLevel: '>100 mg/L', status: 'active' },
            { id: 'DRUG_008', name: 'Theophylline', category: 'Thuốc hen suyễn', therapeuticRange: '10-20 mg/L', toxicLevel: '>20 mg/L', status: 'active' },
            { id: 'DRUG_009', name: 'Cyclosporine', category: 'Thuốc ức chế miễn dịch', therapeuticRange: '100-400 ng/mL', toxicLevel: '>400 ng/mL', status: 'active' },
            { id: 'DRUG_010', name: 'Tacrolimus', category: 'Thuốc ức chế miễn dịch', therapeuticRange: '5-20 ng/mL', toxicLevel: '>20 ng/mL', status: 'active' }
        ];

        // Populate data
        console.log('👥 Thêm Users...');
        for (const user of sampleUsers) {
            try {
                await sheetsService.createUser(user);
                console.log(`✅ Added user: ${user.fullName}`);
            } catch (error) {
                console.log(`⚠️  User ${user.fullName}: ${error.message}`);
            }
        }

        console.log('\n💊 Thêm Pharmacists...');
        for (const pharmacist of samplePharmacists) {
            try {
                await sheetsService.createPharmacist(pharmacist);
                console.log(`✅ Added pharmacist: ${pharmacist.fullName}`);
            } catch (error) {
                console.log(`⚠️  Pharmacist ${pharmacist.fullName}: ${error.message}`);
            }
        }

        console.log('\n🏥 Thêm Departments...');
        for (const dept of sampleDepartments) {
            try {
                await sheetsService.createDepartment(dept);
                console.log(`✅ Added department: ${dept.name}`);
            } catch (error) {
                console.log(`⚠️  Department ${dept.name}: ${error.message}`);
            }
        }

        console.log('\n💉 Thêm TDM Drugs...');
        for (const drug of sampleDrugs) {
            try {
                await sheetsService.createDrug(drug);
                console.log(`✅ Added drug: ${drug.name}`);
            } catch (error) {
                console.log(`⚠️  Drug ${drug.name}: ${error.message}`);
            }
        }

        console.log('\n🎉 Populate dữ liệu mẫu hoàn thành!');
        console.log('\n📊 Tổng kết:');
        console.log(`👥 Users: ${sampleUsers.length} records`);
        console.log(`💊 Pharmacists: ${samplePharmacists.length} records`);
        console.log(`🏥 Departments: ${sampleDepartments.length} records`);
        console.log(`💉 Drugs: ${sampleDrugs.length} records`);

    } catch (error) {
        console.error('❌ Lỗi khi populate dữ liệu:', error.message);
        console.error('\n🔧 Kiểm tra:');
        console.error('1. Google Sheets đã được tạo với đúng cấu trúc');
        console.error('2. Service account có quyền Editor');
        console.error('3. Tên các sheet tabs đúng: Users, Pharmacists, Departments, TDMDrugs');
    }
};

// Chạy script
if (require.main === module) {
    populateSampleData();
}

module.exports = populateSampleData;
