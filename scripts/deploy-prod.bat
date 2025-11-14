@echo off
title Hepta Travel - Production Deployment
color 0C
echo.
echo ========================================
echo  HEPTA TRAVEL - PROD DEPLOYMENT
echo ========================================
echo.
echo WARNING: This will deploy to PRODUCTION!
echo.
cd /d "%~dp0\.."
set /p version="Enter version (e.g., v1.0.0): "
if "%version%"=="" (
    echo Error: Version is required!
    pause
    exit /b 1
)
npm run deploy:prod "%version%"
pause
