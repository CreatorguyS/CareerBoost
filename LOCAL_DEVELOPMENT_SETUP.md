# Local Development Setup Guide

## Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional - app works with memory storage)
- VS Code (recommended)

## Environment Setup

1. **Clone/Download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your actual API keys and database URL
   - The app will fallback to memory storage if no database is configured

   ```bash
   cp .env.local.example .env.local
   ```

4. **Environment Variables Explanation:**
   
   **Backend Variables (Server-only):**
   - `DATABASE_URL` - PostgreSQL connection string (optional)
   - `GOOGLE_AI_API_KEY` - Google Gemini AI API key
   - `NODE_ENV` - development/production
   - `PORT` - Server port (default: 5000)

   **Frontend Variables (Client-accessible, require VITE_ prefix):**
   - `VITE_SUPABASE_URL` - Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
   - `VITE_API_BASE_URL` - Backend API URL

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts both the Express server and Vite dev server on port 5000.

### Production Build & Test
```bash
npm run build
npm start
```

## VS Code Setup

1. **Recommended Extensions:**
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter

2. **VS Code Settings (.vscode/settings.json):**
   ```json
   {
     "typescript.preferences.includePackageJsonAutoImports": "auto",
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "tailwindCSS.includeLanguages": {
       "typescript": "typescript",
       "typescriptreact": "typescriptreact"
     }
   }
   ```

## Database Setup (Optional)

If you want to use a real database instead of memory storage:

1. **PostgreSQL Setup:**
   - Install PostgreSQL locally
   - Create database: `createdb careerboost`
   - Update `DATABASE_URL` in `.env.local`

2. **Apply Schema:**
   ```bash
   npm run db:push
   ```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Database interface
│   └── index.ts     # Server entry point
├── shared/          # Shared types and schemas
└── api/             # Vercel serverless functions
```

## Common Issues

1. **Port already in use:** Change PORT in .env.local
2. **Module not found:** Run `npm install`
3. **Database connection error:** Check DATABASE_URL or use memory storage
4. **Environment variables not working:** Ensure VITE_ prefix for frontend vars

## Development Workflow

1. Start development server: `npm run dev`
2. Open http://localhost:5000
3. Frontend changes auto-reload via Vite
4. Backend changes auto-reload via tsx
5. Check browser console and terminal for errors