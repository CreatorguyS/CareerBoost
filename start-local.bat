@echo off
echo Starting CareerBoost Platform for Local Development...
echo.

REM Kill any existing processes on port 5000
echo Checking for existing processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    taskkill /f /pid %%a >nul 2>&1
)

REM Check if .env file exists
if not exist .env (
    echo Setting up environment file...
    copy .env.example .env
    echo.
    echo Please edit .env with your API keys and database settings.
    echo You can continue without database - it will use memory storage.
    echo.
)

REM Set environment variables for local development
set NODE_ENV=development
set PORT=5000
set HOST=127.0.0.1

echo Starting server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npx tsx server/index.ts

pause