# CareerBoost Platform

A comprehensive career development platform designed for students and job seekers. Features AI-powered resume building, automated internship search, higher education guidance, and career advisory services.

## 🚀 Quick Start

### For Local Development (VS Code)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd careerboost-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5000`

### For Vercel Deployment

1. **Connect repository to Vercel**
   - Import project from GitHub/GitLab
   - Or use Vercel CLI: `vercel`

2. **Configure environment variables**
   - See [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)

3. **Deploy**
   - Automatic deployment on every push to main branch

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utility functions
│   │   └── services/       # API services
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database interface
│   ├── db.ts              # Database configuration
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas and types
├── api/                   # Vercel serverless functions
│   └── index.ts          # Vercel API handler
└── dist/                  # Build output
    ├── public/            # Frontend build
    └── index.js          # Backend build
```

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI, Vite
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **Database**: PostgreSQL (with memory fallback)
- **Authentication**: Supabase
- **AI Integration**: Google Gemini AI
- **Deployment**: Vercel, Replit

## 🔧 Environment Variables

### Backend Variables (Server-only)
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_AI_API_KEY` - Google Gemini AI API key
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)

### Frontend Variables (Client-accessible, require VITE_ prefix)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_API_BASE_URL` - Backend API URL

## 📚 Documentation

- [Local Development Setup](./LOCAL_DEVELOPMENT_SETUP.md) - Complete setup guide for VS Code
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md) - Deploy to Vercel
- [Project Architecture](./replit.md) - Technical architecture and decisions

## 🔐 Security Features

- ✅ Environment variables properly separated (client vs server)
- ✅ API keys secured on backend only
- ✅ Database queries use parameterized statements
- ✅ Input validation with Zod schemas
- ✅ CORS configuration for production
- ✅ No sensitive data exposed to client

## 🚀 Features

### 🎯 Core Features
- **AI Resume Builder** - ATS-optimized resume creation
- **Smart Internship Finder** - AI-powered job matching
- **Higher Studies Advisor** - University recommendations
- **Career AI Advisor** - Personalized career guidance
- **Pricing System** - Tiered subscription model

### 🔧 Development Features
- **Hot Reload** - Both frontend and backend
- **Type Safety** - Full TypeScript support
- **Database Flexibility** - PostgreSQL with memory fallback
- **Modern UI** - Shadcn/ui components with dark mode
- **API Documentation** - RESTful API with clear endpoints

## 🌐 Deployment Options

### Replit (Current)
- ✅ Currently running
- ✅ Auto-restart on changes
- ✅ Built-in environment management

### Vercel (Recommended for Production)
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments

### Local Development
- ✅ VS Code integration
- ✅ Full debugging support
- ✅ Local database option

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:push     # Apply schema changes
npm run db:generate # Generate migrations
npm run db:migrate  # Run migrations

# Utilities
npm run check       # TypeScript type checking
```

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not working**
   - Ensure VITE_ prefix for frontend variables
   - Check .env.local file exists and is properly formatted

2. **Database connection errors**
   - App will fallback to memory storage automatically
   - Check DATABASE_URL format and database availability

3. **Build failures**
   - Run `npm run check` for TypeScript errors
   - Ensure all dependencies are installed

4. **Port conflicts**
   - Change PORT in .env.local
   - Default port is 5000

### Getting Help

1. Check the browser console for client-side errors
2. Check terminal/server logs for backend errors
3. Verify environment variables are set correctly
4. Ensure all required API keys are configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details