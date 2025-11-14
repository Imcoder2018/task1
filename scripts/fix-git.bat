@echo off
title Hepta Travel - Fix Git Configuration
color 0D
echo.
echo ========================================
echo    HEPTA TRAVEL - FIX GIT CONFIG
echo ========================================
echo.
echo This will fix git configuration and clean up the repository
echo.
cd /d "%~dp0\.."
npm run fix-git
pause
