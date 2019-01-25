@echo off
rmdir /s /q testing-workspace\workspace
echo Deleted workspace directory
xcopy testing-workspace\template testing-workspace\workspace /E /Q
echo Files successfully copied
pause