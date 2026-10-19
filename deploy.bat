@echo off
title CyberShield - Automatic Vercel Deployer
color 0b
echo =========================================================
echo    CyberShield Security Suite - Auto Deployment
echo =========================================================
echo.
echo [1/3] Staging all modified files...
git add .

echo.
echo [2/3] Creating commit with timestamp...
git commit -m "Auto deploy update: %date% %time%"

echo.
echo [3/3] Pushing to GitHub (origin main)...
git push origin main

echo.
echo =========================================================
echo  [SUCCESS] Code pushed to GitHub!
echo  Vercel is now automatically rebuilding and deploying:
echo  https://cybershield-eight-roan.vercel.app/
echo =========================================================
echo.
pause
