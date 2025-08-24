// populate-users-sheet.js
// Script để tạo tài khoản mẫu trong Google Sheets

const { GoogleSpreadsheet } = require('google-spreadsheet');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

async function populateUsersSheet() {
    try {
        console.log('🔗 Connecting to Google Sheets...');
        const doc = new GoogleSpreadsheet(SHEET_ID);
        
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        
        await doc.loadInfo();
        console.log('📄 Sheet Title:', doc.title);
        
        // Tìm hoặc tạo sheet Users
        let usersSheet = doc.sheetsByTitle['Users'];
        if (!usersSheet) {
            console.log('📝 Creating Users sheet...');
            usersSheet = await doc.addSheet({ 
                title: 'Users',
                headerValues: ['username', 'password', 'role', 'department', 'fullName', 'email', 'phone', 'status', 'createdAt']
            });
        } else {
            console.log('📋 Found existing Users sheet');
            // Set headers if not exist
            await usersSheet.setHeaderRow(['username', 'password', 'role', 'department', 'fullName', 'email', 'phone', 'status', 'createdAt']);
        }
        
        // Tạo tài khoản mẫu
        const sampleAccounts = [
            // Bác sĩ - tài khoản chung theo khoa
            {
                username: 'sicu',
                password: await bcrypt.hash('sicu123', 10),
                role: 'doctor',
                department: 'SICU',
                fullName: 'Bác sĩ SICU',
                email: 'sicu@hospital.com',
                phone: '0901234567',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                username: 'nhi',
                password: await bcrypt.hash('nhi123', 10),
                role: 'doctor',
                department: 'Nhi khoa',
                fullName: 'Bác sĩ Nhi khoa',
                email: 'nhi@hospital.com',
                phone: '0901234568',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                username: 'timMach',
                password: await bcrypt.hash('timMach123', 10),
                role: 'doctor',
                department: 'Tim Mạch',
                fullName: 'Bác sĩ Tim Mạch',
                email: 'timmach@hospital.com',
                phone: '0901234569',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            // Dược sĩ - tài khoản riêng
            {
                username: 'duocSi1',
                password: await bcrypt.hash('duocSi123', 10),
                role: 'pharmacist',
                department: 'Dược',
                fullName: 'DS. Nguyễn Văn A',
                email: 'duocsi1@hospital.com',
                phone: '0901234570',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                username: 'duocSi2',
                password: await bcrypt.hash('duocSi456', 10),
                role: 'pharmacist',
                department: 'Dược',
                fullName: 'DS. Trần Thị B',
                email: 'duocsi2@hospital.com',
                phone: '0901234571',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                username: 'duocSi3',
                password: await bcrypt.hash('duocSi789', 10),
                role: 'pharmacist',
                department: 'Dược',
                fullName: 'DS. Lê Văn C',
                email: 'duocsi3@hospital.com',
                phone: '0901234572',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        
        // Xóa dữ liệu cũ (trừ header)
        await usersSheet.clear(2);
        
        // Thêm tài khoản mẫu
        console.log('👥 Adding sample accounts...');
        await usersSheet.addRows(sampleAccounts);
        
        console.log('✅ Successfully populated Users sheet with sample accounts:');
        sampleAccounts.forEach(account => {
            console.log(`   - ${account.username} (${account.role} - ${account.department})`);
        });
        
        console.log('\n🔗 Google Sheets URL:');
        console.log(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

if (require.main === module) {
    populateUsersSheet();
}

module.exports = { populateUsersSheet };
