@echo off
REM PromptVault Pro — 1-Click Windows Launcher
REM Starts local server in background if needed and opens default browser to localhost:3456

set PORT=8080
cd /d "%~dp0\.."

REM Check if port 3456 is already active
netstat -ano | findstr :%PORT% >nul
if %ERRORLEVEL% neq 0 (
    echo Starting PromptVault Pro backend on port %PORT%...
    start /b python server\server.py --port %PORT%
    timeout /t 1 /nobreak >nul
)

echo Opening PromptVault Pro in browser...
start http://localhost:%PORT%
exit
