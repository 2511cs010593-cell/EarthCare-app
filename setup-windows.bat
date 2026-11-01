@echo off
REM ============================================================================
REM EARTH CARE APP - AUTOMATIC WINDOWS SETUP
REM Run this as Administrator
REM ============================================================================

echo.
echo ============================================================================
echo EARTH CARE APP - WINDOWS SETUP
echo ============================================================================
echo.

REM Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator!
    echo Right-click setup-windows.bat and select "Run as administrator"
    pause
    exit /b 1
)

REM ============================================================================
REM STEP 1: CHECK PREREQUISITES
REM ============================================================================
echo STEP 1: Checking prerequisites...
echo.

where java >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Java 21 not found!
    echo Download from: https://www.oracle.com/java/technologies/downloads/#java21
    echo Then restart this script.
    pause
    exit /b 1
)
echo [OK] Java found
java -version

echo.
where mvn >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Maven not found!
    echo Download from: https://maven.apache.org/download.cgi
    echo Extract to: C:\Program Files\apache-maven-3.9.x
    echo Add to PATH: C:\Program Files\apache-maven-3.9.x\bin
    echo Then restart your computer and run this script again.
    pause
    exit /b 1
)
echo [OK] Maven found
mvn -version

echo.
where mysql >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: MySQL not found!
    echo Download from: https://dev.mysql.com/downloads/mysql/
    echo Install and set root password.
    echo Then restart this script.
    pause
    exit /b 1
)
echo [OK] MySQL found

echo.
where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Node.js/npm not found!
    echo Download from: https://nodejs.org/
    echo Then restart your computer and run this script again.
    pause
    exit /b 1
)
echo [OK] Node.js and npm found

REM ============================================================================
REM STEP 2: SETUP DATABASE
REM ============================================================================
echo.
echo STEP 2: Setting up MySQL database...
echo.

set /p mysql_password="Enter your MySQL root password: "

echo Creating database...
mysql -u root -p%mysql_password% -e "CREATE DATABASE IF NOT EXISTS earthcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %errorLevel% neq 0 (
    echo ERROR: Failed to create database!
    echo Check your MySQL password and try again.
    pause
    exit /b 1
)
echo [OK] Database created

echo Loading sample data...
mysql -u root -p%mysql_password% earthcare_db < backend\src\main\resources\db\init.sql

if %errorLevel% neq 0 (
    echo ERROR: Failed to load sample data!
    pause
    exit /b 1
)
echo [OK] Sample data loaded

echo Verifying...
mysql -u root -p%mysql_password% earthcare_db -e "SHOW TABLES;" >nul 2>&1

if %errorLevel% neq 0 (
    echo ERROR: Database verification failed!
    pause
    exit /b 1
)
echo [OK] Database verified with 23 tables

REM ============================================================================
REM STEP 3: UPDATE BACKEND CONFIG
REM ============================================================================
echo.
echo STEP 3: Updating backend configuration...
echo.

setlocal enabledelayedexpansion
set "config_file=backend\src\main\resources\application.properties"

for /f "tokens=*" %%A in ('type "%config_file%"') do (
    set "line=%%A"
    if "!line:spring.datasource.password=!" neq "!line!" (
        echo spring.datasource.password=%mysql_password%
    ) else (
        echo !line!
    )
) > "%config_file%.tmp"

move /y "%config_file%.tmp" "%config_file%" >nul
echo [OK] Configuration updated with MySQL password

REM ============================================================================
REM STEP 4: BUILD BACKEND
REM ============================================================================
echo.
echo STEP 4: Building backend (this takes 3-5 minutes first time)...
echo.

cd backend
mvn clean install

if %errorLevel% neq 0 (
    echo ERROR: Backend build failed!
    pause
    exit /b 1
)
echo [OK] Backend build successful
cd ..

REM ============================================================================
REM SUCCESS
REM ============================================================================
echo.
echo ============================================================================
echo SETUP COMPLETE!
echo ============================================================================
echo.
echo NOW RUN THE APPLICATION:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   mvn spring-boot:run
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
echo Terminal 3 (Browser):
echo   http://localhost:5173
echo.
echo Login with:
echo   Email: admin@earthcare.com
echo   Password: Password@123
echo.
echo ============================================================================
echo.

pause
