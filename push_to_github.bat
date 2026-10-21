@echo off
title Pushing Pettah Bazaar Presentation to GitHub...
set PATH=C:\Users\tilan\AppData\Local\Programs\Git\cmd;%PATH%
cd /d "%~dp0"
echo ===================================================
echo Pushing Pettah Bazaar Presentation to GitHub (main)
echo ===================================================
git push -u origin main
echo ===================================================
echo Done!
pause
