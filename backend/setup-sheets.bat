@echo off
echo ========================================
echo    PedMedConsult Google Sheets Setup
echo ========================================
echo.

echo 📋 Buoc 1: Kiem tra cau hinh...
node test-sheets-connection.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ Ket noi Google Sheets that bai!
    echo 🔧 Vui long kiem tra:
    echo    1. SPREADSHEET_ID trong file .env
    echo    2. Google Service Account credentials
    echo    3. Quyen truy cap Google Sheets
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Ket noi thanh cong!
echo.

echo 📋 Buoc 2: Populate du lieu mau...
node populate-sample-data.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ Populate du lieu that bai!
    echo 🔧 Kiem tra cau truc Google Sheets
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Setup hoan thanh!
echo.
echo 🎉 Google Sheets da san sang su dung!
echo 🌐 Hay test webapp tai: http://localhost:3000
echo.
pause
