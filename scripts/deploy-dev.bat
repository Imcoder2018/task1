@echo off
title Hepta Travel - Development Deployment
color 0E
echo.
echo ========================================
echo   HEPTA TRAVEL - DEV DEPLOYMENT
echo ========================================
echo.
cd /d "%~dp0\.."
npm run deploy:dev
pause
