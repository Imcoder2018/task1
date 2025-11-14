@echo off
title Hepta Travel - Git Status
color 0A
echo.
echo ========================================
echo      HEPTA TRAVEL - GIT STATUS
echo ========================================
echo.
cd /d "%~dp0\.."
npm run git:status
pause
