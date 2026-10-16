@echo off
title Push CyberShield Project to GitHub
color 0b
set "PATH=C:\Users\smp\AppData\Local\Programs\Git\cmd;C:\Users\smp\AppData\Local\Programs\Git\mingw64\bin;%PATH%"
cd /d "%~dp0"

echo ==========================================================
echo   Pushing CyberShield Project to GitHub Repository
echo   https://github.com/smitpatel2005/CYBERSECURITYPROJECT0.git
echo ==========================================================
echo.

git push -u origin main

echo.
echo ==========================================================
echo Process complete.
echo ==========================================================
pause
