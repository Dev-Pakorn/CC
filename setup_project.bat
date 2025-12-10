@echo off
setlocal
chcp 65001 > nul

:: --- 1. ตั้งชื่อโปรเจกต์ ---
set "PROJECT_NAME=CKLab_Project"

echo ==================================================
echo [CKLab] Creating Project Structure...
echo Project Name: %PROJECT_NAME%
echo ==================================================

:: --- 2. สร้างโฟลเดอร์หลัก ---
if not exist "%PROJECT_NAME%" (
    mkdir "%PROJECT_NAME%"
    echo [OK] Created root directory: %PROJECT_NAME%
) else (
    echo [INFO] Directory %PROJECT_NAME% already exists.
)

cd "%PROJECT_NAME%"

:: --- 3. สร้างโฟลเดอร์ย่อย (Assets) ---
if not exist "css" mkdir "css"
echo [OK] Created folder: css

if not exist "js" mkdir "js"
echo [OK] Created folder: js

:: --- 4. สร้างไฟล์ HTML (User Interface) ---
echo.
echo [Creating HTML Files - User Side]
type nul > index.html && echo   - Created: index.html
type nul > checkin.html && echo   - Created: checkin.html
type nul > usage.html && echo   - Created: usage.html
type nul > feedback.html && echo   - Created: feedback.html

:: --- 5. สร้างไฟล์ HTML (Admin Interface) ---
echo.
echo [Creating HTML Files - Admin Side]
type nul > login.html && echo   - Created: login.html
type nul > dashboard.html && echo   - Created: dashboard.html
type nul > manage_pc.html && echo   - Created: manage_pc.html
type nul > manage_soft.html && echo   - Created: manage_soft.html
type nul > config.html && echo   - Created: config.html
type nul > report.html && echo   - Created: report.html

:: --- 6. สร้างไฟล์ CSS ---
echo.
echo [Creating CSS Files]
type nul > css\main.css && echo   - Created: css\main.css
type nul > css\user.css && echo   - Created: css\user.css
type nul > css\admin.css && echo   - Created: css\admin.css
type nul > css\auth.css && echo   - Created: css\auth.css

:: --- 7. สร้างไฟล์ JavaScript ---
echo.
echo [Creating JS Files]
type nul > js\mock-db.js && echo   - Created: js\mock-db.js (Core)
type nul > js\auth.js && echo   - Created: js\auth.js
type nul > js\user.js && echo   - Created: js\user.js
type nul > js\timer.js && echo   - Created: js\timer.js
type nul > js\admin.js && echo   - Created: js\admin.js
type nul > js\report.js && echo   - Created: js\report.js

echo.
echo ==================================================
echo [SUCCESS] Project created at: %CD%
echo ==================================================
echo Press any key to exit...
pause > nul