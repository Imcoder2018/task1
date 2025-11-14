@echo off
title Hepta Travel - Deployment Menu
color 0A
echo.
echo ========================================
echo    HEPTA TRAVEL - DEPLOYMENT MENU
echo ========================================
echo.
cd /d "%~dp0\.."
npm run deploy-menu
pause
