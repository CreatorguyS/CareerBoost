# VS Code Setup Guide for CareerBoost Platform

## 🚀 Complete Steps to Run in VS Code

### Step 1: Prerequisites
Make sure you have these installed:
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **VS Code** - Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Step 2: Global Dependencies
Open **Command Prompt** or **PowerShell** as Administrator and run:
```cmd
npm install -g tsx typescript
```

### Step 3: Download/Clone Project
1. Download or clone your CareerBoost project
2. Open the project folder in VS Code:
   - **File → Open Folder**
   - Select your project directory

### Step 4: Install Dependencies
Open **Terminal** in VS Code (`Ctrl + `` ` or Terminal → New Terminal`):
```cmd
npm install
```

### Step 5: Environment Setup
1. Copy the environment template:
   ```cmd
   copy .env.example .env
   ```

2. Edit the `.env` file and add your API keys:
   ```env
   # Supabase Configuration
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # Google AI
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   
   # Server Configuration
   HOST=127.0.0.1
   PORT=5000
   
   # Development Environment
   NODE_ENV=development
   ```

### Step 6: Run the Project
In the VS Code terminal, run:
```cmd
tsx local-dev.js
```

**OR** use the batch file:
```cmd
start-local.bat
```

### Step 7: Access the Application
Open your browser and go to:
```
http://localhost:5000
```

## 📁 VS Code Project Structure

```
CareerBoost/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities
│   │   └── contexts/       # React contexts
├── server/                 # Backend (Express + TypeScript)
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database layer
├── shared/                 # Shared types
├── .env                   # Your environment variables
├── local-dev.js           # Windows dev script
└── start-local.bat        # Windows batch file
```

## 🔧 VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **TypeScript Hero** - Better TypeScript support
2. **ES7+ React/Redux/React-Native snippets** - React snippets
3. **Prettier - Code formatter** - Code formatting
4. **Auto Rename Tag** - HTML/JSX tag renaming
5. **Bracket Pair Colorizer** - Better bracket visibility
6. **GitLens** - Git integration
7. **Thunder Client** - API testing (like Postman)

## ⚡ VS Code Configuration

Create `.vscode/settings.json` in your project:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

Create `.vscode/launch.json` for debugging:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/local-dev.js",
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## 🐛 Troubleshooting

### "tsx not found"
```cmd
# Install globally
npm install -g tsx typescript

# OR run with npx
npx tsx local-dev.js
```

### "Port 5000 already in use"
```cmd
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### "ENOTSUP socket error"
Make sure your `.env` file has:
```env
HOST=127.0.0.1
```

### "Module not found"
```cmd
# Clear and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

## 🎯 Development Workflow

1. **Start the server**: `tsx local-dev.js`
2. **Make changes**: Edit files in `client/src/` or `server/`
3. **Auto-reload**: Changes are automatically detected
4. **View app**: Browser automatically refreshes
5. **Debug**: Use VS Code debugger with F5

## 📝 Available Commands

- `tsx local-dev.js` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Update database schema
- `npm run check` - Type checking

## 🌐 API Endpoints

Once running, you can test these endpoints:

- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/resumes` - Get user resumes
- `POST /api/resumes` - Create new resume

## 💡 Tips for VS Code

1. **Use Ctrl+Shift+P** for command palette
2. **Use Ctrl+`` ` ** to open terminal
3. **Use Ctrl+P** to quickly open files
4. **Use F12** to go to definition
5. **Use Alt+Shift+F** to format code
6. **Use Ctrl+Shift+L** to select all occurrences

## 🔄 Hot Reload Features

- **Frontend**: React components auto-reload
- **Backend**: Server restarts on file changes
- **Database**: Schema changes with `npm run db:push`
- **Styles**: CSS/Tailwind updates instantly

Your CareerBoost platform is now ready for development in VS Code! 🚀