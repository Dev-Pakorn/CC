@echo off
setlocal

:: ตั้งชื่อโปรเจกต์
set "PROJECT_NAME=CKLab_Checkin_Flat"

echo ==================================================
echo Creating Project: %PROJECT_NAME%
echo Structure: Flat (Optimized for CKLab)
echo ==================================================

:: 1. สร้างโฟลเดอร์หลัก
if not exist "%PROJECT_NAME%" mkdir "%PROJECT_NAME%"
cd "%PROJECT_NAME%"

:: 2. สร้างไฟล์ HTML (User & Admin Flows)
echo [1/5] Creating HTML files...
type nul > index.html
type nul > checkin.html
type nul > usage.html
type nul > feedback.html
type nul > login.html
type nul > dashboard.html
type nul > report.html

:: 3. สร้างไฟล์ CSS (Styles)
echo [2/5] Creating CSS files...
type nul > main.css
type nul > user.css
type nul > admin.css
type nul > auth.css

:: 4. สร้างไฟล์ JavaScript (Logic)
echo [3/5] Creating JS files...
type nul > mock-db.js
type nul > auth.js
type nul > user.js
type nul > timer.js
type nul > admin.js
type nul > report.js

:: 5. สร้างโฟลเดอร์ Assets
echo [4/5] Creating Assets folder...
if not exist "assets" mkdir "assets"

:: 6. สร้าง README.md พร้อมคำอธิบาย
echo [5/5] Creating Documentation...
(
echo # CKLab Check-in System (Flat Structure)
echo.
echo This project uses a flat file structure for easy prototyping.
echo.
echo ## Files Overview
echo ### HTML
echo - index.html : User Identification / Home
echo - checkin.html : User Select Status & Confirm
echo - usage.html : Timer Screen
echo - feedback.html : Rating Screen
echo - login.html : Admin Login
echo - dashboard.html : Admin Main Control
echo - report.html : Stats & Logs
echo.
echo ### CSS
echo - main.css : Global styles
echo - user.css : Kiosk specific styles
echo - admin.css : Dashboard specific styles
echo - auth.css : Login forms styles
echo.
echo ### JavaScript
echo - mock-db.js : Simulated Database ^(Load this first^)
echo - auth.js : Login logic
echo - user.js : User flow logic
echo - timer.js : Timer functionality
echo - admin.js : Monitor ^& Manage logic
echo - report.js : Chart.js ^& CSV Export logic
) > README.md

echo ==================================================
echo Success! Project created at: 
echo %CD%
echo ==================================================
pause