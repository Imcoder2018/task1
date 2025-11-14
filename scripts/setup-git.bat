@echo off
title Hepta Travel - Git Setup
color 0C
echo.
echo ========================================
echo       HEPTA TRAVEL - GIT SETUP
echo ========================================
echo.
cd /d "%~dp0\.."
set /p repo="Enter GitHub repository URL: "
if "%repo%"=="" (
    echo Error: Repository URL is required!
    pause
    exit /b 1
)
npm run setup-git "%repo%"
pause
