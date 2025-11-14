@echo off
title Hepta Travel - Quick Commit
color 0B
echo.
echo ========================================
echo      HEPTA TRAVEL - QUICK COMMIT
echo ========================================
echo.
cd /d "%~dp0\.."
set /p message="Enter commit message: "
if "%message%"=="" (
    echo Error: Commit message is required!
    pause
    exit /b 1
)
npm run quick-commit "%message%"
pause
