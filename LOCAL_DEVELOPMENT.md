# Local Development Setup for VS Code

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/) or use cloud database
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** - [Download here](https://git-scm.com/)

## Quick Setup

### 1. Clone and Install

```bash
git clone <your-repository-url>
cd careerboost-platform
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/careerboost
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=careerboost

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Environment
NODE_ENV=development
PORT=5000
HOST=127.0.0.1
```

### 3. Database Setup

Create database and apply schema:

```bash
# Create database (if using local PostgreSQL)
createdb careerboost

# Apply schema
npm run db:push
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5000`

## VS Code Extensions (Recommended)

Install these extensions for the best development experience:

- **TypeScript and JavaScript** (built-in)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

## Development Scripts

```bash
npm run dev     # Start development server with hot reload
npm run build   # Build for production
npm run start   # Start production server
npm run check   # TypeScript type checking
npm run db:push # Apply database schema changes
```

## Project Structure

```
careerboost-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/           # Utility libraries
│   │   └── services/      # API services
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database layer
│   ├── db.ts              # Database connection
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
└── dist/                  # Build output
```

## Database Configuration Options

### Option 1: Local PostgreSQL
Install PostgreSQL locally and create a database

### Option 2: Cloud Database
Use services like:
- **Neon** (recommended for Vercel)
- **Supabase** (includes auth)
- **Railway**
- **PlanetScale**

### Option 3: Docker
```bash
docker run --name postgres-careerboost \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=careerboost \
  -p 5432:5432 -d postgres:15
```

## Troubleshooting

### Common Issues

1. **Port 5000 already in use:**
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database connection errors:**
   - Check PostgreSQL is running
   - Verify DATABASE_URL is correct
   - Ensure database exists

3. **TypeScript errors:**
   ```bash
   npm run check
   ```

4. **Dependencies issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Hot Reload Not Working
- Restart the development server
- Check if files are being watched correctly
- Ensure VS Code is not blocking file changes

## Production Build Testing

Test production build locally:

```bash
npm run build
npm start
```

Visit: `http://localhost:5000`

## VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

Your local development environment is now ready!