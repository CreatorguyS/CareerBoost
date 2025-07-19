@echo off
echo Starting CareerBoost Platform...
echo.

REM Check if .env file exists
if not exist .env (
    echo Error: .env file not found!
    echo Please copy .env.example to .env and configure your environment variables.
    echo.
    echo Run this command:
    echo copy .env.example .env
    echo.
    echo Then edit .env with your actual values.
    pause
    exit /b 1
)

REM Set environment variables for Windows
set NODE_ENV=development
set PORT=5000
set HOST=127.0.0.1

REM Load environment variables from .env file
for /f "delims=" %%x in (.env) do (set "%%x")

echo Environment: %NODE_ENV%
echo Port: %PORT%
echo Host: %HOST%
echo.

REM Start the development server
echo Starting development server...
npx tsx server/index.ts