# Local Development Setup for CareerBoost Platform

## Quick Start (Windows)

1. **Install Node.js** (if not already installed):
   - Download from https://nodejs.org/
   - Install version 18 or higher

2. **Install global dependencies**:
   ```cmd
   npm install -g tsx typescript
   ```

3. **Clone and setup the project**:
   ```cmd
   # Navigate to your project directory
   cd path\to\your\project
   
   # Install dependencies
   npm install
   
   # Create environment file
   copy .env.example .env
   ```

4. **Configure environment variables**:
   Edit the `.env` file and add your API keys:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   HOST=127.0.0.1
   PORT=5000
   ```

5. **Start the development server**:
   ```cmd
   # For Windows (avoids NODE_ENV issues)
   tsx local-dev.js
   
   # OR use the batch file
   start-local.bat
   ```

## Quick Start (Mac/Linux)

1. **Install Node.js** (if not already installed):
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

2. **Install global dependencies**:
   ```bash
   npm install -g tsx typescript
   ```

3. **Clone and setup the project**:
   ```bash
   # Navigate to your project directory
   cd path/to/your/project
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

4. **Configure environment variables**:
   Edit the `.env` file and add your API keys

5. **Start the development server**:
   ```bash
   # Make script executable
   chmod +x start-local.sh
   
   # Run the script
   ./start-local.sh
   
   # OR run directly
   npm run dev
   ```

## Troubleshooting Common Issues

### 1. "tsx not found" or "ts-node not found"
```bash
# Install globally
npm install -g tsx typescript

# OR install locally and use npx
npx tsx server/index.ts
```

### 2. "NODE_ENV is not recognized" (Windows)
Use the Windows-specific commands:
```cmd
# Instead of: npm run dev
# Use: tsx local-dev.js
tsx local-dev.js
```

### 3. "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 4. "ENOTSUP: operation not supported on socket" (Windows)
This error occurs when Windows tries to bind to `0.0.0.0`. The server is now configured to use `127.0.0.1` automatically on Windows.

If you still see this error:
```cmd
# Set HOST explicitly in your .env file
HOST=127.0.0.1
```

### 5. Port already in use
The app runs on port 5000. If it's in use:
```bash
# Find and kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill
```

### 5. Database connection issues
- If you don't have PostgreSQL, the app will use in-memory storage
- To use PostgreSQL, set the DATABASE_URL in your .env file

## Project Structure

```
CareerBoost/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility libraries
│   │   └── contexts/       # React contexts
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database layer
├── shared/                 # Shared types and schemas
├── .env.example           # Environment variables template
├── local-dev.js           # Windows-compatible dev script
├── start-local.bat        # Windows batch file
└── start-local.sh         # Unix shell script
```

## API Keys Setup

### Supabase Setup
1. Go to https://supabase.com/
2. Create a new project
3. Go to Settings > API
4. Copy your URL and anon key

### Google AI Setup
1. Go to https://ai.google.dev/
2. Create a new project
3. Generate an API key
4. Add it to your .env file

## Development Workflow

1. **Frontend Development**: 
   - Files in `client/src/` will auto-reload
   - Uses Vite for fast development

2. **Backend Development**:
   - Files in `server/` will auto-reload
   - Uses tsx for TypeScript execution

3. **Database Changes**:
   - Edit schemas in `shared/schema.ts`
   - Run `npm run db:push` to apply changes

## Available Scripts

- `npm run dev` - Start development server (Mac/Linux)
- `tsx local-dev.js` - Start development server (Windows)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## VS Code Configuration

Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Need Help?

If you're still having issues:

1. Check that Node.js version is 18 or higher: `node --version`
2. Check that npm is working: `npm --version`
3. Make sure all dependencies are installed: `npm install`
4. Verify your .env file has the correct API keys
5. Check that port 5000 is not being used by another application

The application should be accessible at `http://localhost:5000` once running successfully.