@echo off
setlocal

echo ==================================================
echo Creating Project: Market Booking (CKLab Style)
echo Structure: Flat (All files in root)
echo ==================================================

:: 1. สร้างโฟลเดอร์โปรเจกต์
set "PROJECT_NAME=MarketBooking_CKStyle"
if not exist "%PROJECT_NAME%" mkdir "%PROJECT_NAME%"
cd "%PROJECT_NAME%"

:: 2. สร้างไฟล์ HTML (รวมทั้งหมดไว้ที่ Root)
echo Creating HTML files...
type nul > index.html
type nul > register.html
type nul > search.html
type nul > map.html
type nul > summary.html
type nul > payment.html
type nul > history.html
type nul > receipt.html
type nul > dashboard.html
type nul > review.html

:: 3. สร้างไฟล์ CSS (รวมทั้งหมดไว้ที่ Root)
echo Creating CSS files...
type nul > main.css
type nul > auth.css
type nul > booking.css
type nul > staff.css

:: 4. สร้างไฟล์ JS (รวมทั้งหมดไว้ที่ Root)
echo Creating JS files...
type nul > mock-db.js
type nul > auth.js
type nul > map.js
type nul > timer.js
type nul > staff.js

:: 5. สร้างโฟลเดอร์ Assets (สำหรับเก็บรูป)
echo Creating Assets folder...
if not exist "assets" mkdir "assets"
if not exist "assets\slips" mkdir "assets\slips"

:: 6. สร้างไฟล์ README และ .gitignore (Optional)
echo Creating Doc files...
(
echo # Market Booking System
echo.
echo This project uses a flat file structure similar to CKLab.
echo All HTML, CSS, and JS files are located in the root directory.
) > README.md

(
echo assets/slips/*
echo *.log
echo .DS_Store
) > .gitignore

echo ==================================================
echo Success! Created project at: %CD%
echo ==================================================
pause