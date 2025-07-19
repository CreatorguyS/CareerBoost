# Windows Setup Guide - Fixed VS Code Errors

## Problem Fixed: VS Code Errors on Windows

The errors you encountered are now resolved:
- ✅ **'ts-node' not recognized** - Using `tsx` instead
- ✅ **DATABASE_URL must be set** - Graceful fallback to memory storage  
- ✅ **'NODE_ENV' not recognized** - Windows batch file handles environment variables

## Quick Start for Windows

### 1. Setup Environment
```cmd
REM Copy environment template
copy .env.example .env

REM Edit .env with your values (optional - works without database too)
notepad .env
```

### 2. Start Development Server

**Option A: Use Windows Batch File (Recommended)**
```cmd
start-local.bat
```

**Option B: If port is in use, kill existing processes first**
```cmd
kill-port.bat
start-local.bat
```

**Option C: Use VS Code Tasks**
- Press `Ctrl+Shift+P`
- Type "Tasks: Run Task"
- Select "Start Windows (Cross-platform)"

**Option D: Manual start**
```cmd
npx tsx server/index.ts
```

### 3. VS Code Debug Mode
- Press `F5` to start debugging
- Or go to Run and Debug panel → "Start CareerBoost Platform"

## Environment Configuration

### Minimal Setup (Memory Storage)
The app works without database - just copy the .env file:
```cmd
copy .env.example .env
local-dev.bat
```

### Full Setup (With Database)
Edit `.env` with your actual values:
```env
# Database Configuration (Required for data persistence)
DATABASE_URL=postgresql://username:password@localhost:5432/careerboost
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=careerboost

# Required for AI features
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Environment
NODE_ENV=development
PORT=5000
HOST=127.0.0.1
```

## What's Fixed

### 1. Database Connection
- **Before**: Hard error if DATABASE_URL missing
- **After**: Graceful fallback to memory storage with helpful warnings

### 2. Environment Variables  
- **Before**: Windows couldn't handle `NODE_ENV=development tsx server/index.ts`
- **After**: `local-dev.bat` sets environment variables properly

### 3. TypeScript Execution
- **Before**: Used `ts-node` which isn't installed
- **After**: Using `tsx` which is already in dependencies

### 4. VS Code Integration
- Added `.vscode/` configuration files
- Debug configuration works with F5
- Task runner for development commands

## Troubleshooting

### Port Already in Use
```cmd
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### Permission Issues
```cmd
REM Run VS Code as administrator
runas /user:Administrator "code ."
```

### Node Modules Issues
```cmd
rmdir /s node_modules
del package-lock.json
npm install
```

Your Windows VS Code setup is now fully compatible! 🚀