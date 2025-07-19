# CareerBoost Platform

## Overview

CareerBoost is a comprehensive career development platform designed for students and job seekers. It combines AI-powered resume building, automated internship search, higher education guidance, and career advisory services. The platform features a React frontend with TypeScript, an Express.js backend, PostgreSQL database with Drizzle ORM, and integrates with external services like Supabase for authentication and Google's Gemini AI for intelligent recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between client and server components:

**Frontend Architecture:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Tailwind CSS with shadcn/ui components for consistent UI
- React Router for client-side routing
- TanStack Query for state management and API caching
- Context API for authentication state management

**Backend Architecture:**
- Express.js server with TypeScript
- RESTful API design with modular route structure
- Drizzle ORM for database operations
- Session-based authentication with PostgreSQL session store
- Environment-based configuration management

**Database Design:**
- PostgreSQL as the primary database
- Drizzle ORM for type-safe database queries
- Migration-based schema management
- Shared schema definitions between client and server

## Key Components

**Authentication System:**
- Supabase integration for user authentication
- Protected routes with React context
- Session management with automatic token refresh
- Role-based access control ready

**AI Integration:**
- Google Gemini AI for resume optimization and career advice
- Automated content generation for resumes
- Smart job matching algorithms
- ATS score calculation and improvement suggestions

**Core Features:**
1. **AI Resume Builder** - Automated resume creation with ATS optimization
2. **Smart Internship Finder** - AI-powered job matching and auto-apply functionality
3. **Higher Studies Advisor** - University and scholarship recommendation system
4. **Career AI Advisor** - Personalized career guidance and skill gap analysis
5. **Pricing System** - Tiered subscription model (Free, Pro, Premium)

**UI Component Library:**
- Radix UI primitives for accessibility
- Custom component abstraction layer
- Consistent design system with CSS variables
- Responsive design patterns

## Data Flow

1. **User Registration/Login:**
   - Frontend form → Supabase Auth → Context state update → Protected route access

2. **Resume Building:**
   - User input → AI processing (Gemini) → ATS analysis → Database storage → PDF generation

3. **Job Search:**
   - User preferences → AI matching → External job APIs → Filtered results → Auto-apply workflow

4. **University Search:**
   - Search criteria → Database query → AI recommendations → Results with saved items

5. **Career Advice:**
   - User profile analysis → AI processing → Personalized recommendations → Action plans

## External Dependencies

**Authentication & Database:**
- Supabase for user authentication and real-time features
- Neon Database (PostgreSQL) for primary data storage
- Connect-pg-simple for session storage

**AI & ML Services:**
- Google Gemini AI for content generation and analysis
- Custom algorithms for job matching and ATS scoring

**UI & Styling:**
- Tailwind CSS for utility-first styling
- Radix UI for accessible component primitives
- Lucide React for consistent iconography
- React Hot Toast for notifications

**Development Tools:**
- Vite for fast development and building
- ESBuild for server-side bundling
- TypeScript for type safety across the stack
- Drizzle Kit for database migrations

## Deployment Strategy

**Build Process:**
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations applied via `db:push` command

**Environment Configuration:**
- Development: Local Vite dev server with Express API
- Production: Single Express server serving static files and API
- Database: PostgreSQL with connection pooling
- Environment variables for API keys and database connections

**Key Scripts:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build both frontend and backend for production
- `npm start` - Run production server
- `npm run db:push` - Apply database schema changes

**Hosting Considerations:**
- Single-process deployment suitable for platforms like Vercel, Railway, or Heroku
- Static file serving integrated into Express server
- Database migrations handled through Drizzle commands
- Environment variable configuration for different deployment stages

## Recent Changes

**Environment Configuration Fix (January 2025):**
- Fixed Supabase URL construction error by adding proper fallback values
- Added dotenv package for proper environment variable loading in local development
- Configured automatic .env file loading for development environments
- Fixed DATABASE_URL loading issues for local development
- Application now works seamlessly in both Replit and local environments

**Database Integration (January 2025):**
- Added PostgreSQL database with comprehensive schema
- Applied schema with users, resumes, applications, and user_profiles tables
- Updated DatabaseStorage to use real database instead of memory storage
- Fixed TypeScript errors and null safety issues
- Database successfully connected and tested
- All CRUD operations working with proper type safety

**Build System Fix (January 2025):**
- Fixed Vite build issue causing deployment failures in Vercel
- Corrected import path resolution for client/index.html
- Resolved Rollup import resolution error during production build
- Verified build process works correctly for both local and deployment environments
- Project now builds successfully with proper client/server separation maintained

**Vercel Deployment Fix (January 2025):**
- Fixed static-only deployment issue by updating vercel.json routing configuration
- Separated serverless function setup from traditional server deployment
- Added setupRoutes() function specifically for Vercel serverless environment
- Updated API handler to properly export Express app for Vercel functions
- Fixed route handling: static assets served directly, API routes to serverless function
- Added comprehensive deployment verification guide with test endpoints
- Deployment now provides fully functional web application with working API endpoints

**Production Deployment Setup (January 2025):**
- Configured project for Vercel deployment with proper serverless functions
- Created vercel.json configuration for seamless deployment
- Added API routing through /api directory for Vercel compatibility
- Set up comprehensive environment variable documentation
- Created detailed deployment guides and README documentation
- Successfully tested build process and production configuration
- Application ready for deployment on Vercel and local development

**Database Integration (January 2025):**
- Added PostgreSQL database with comprehensive schema
- Applied schema with users, resumes, applications, and user_profiles tables
- Updated DatabaseStorage to use real database instead of memory storage
- Fixed TypeScript errors and null safety issues
- Database successfully connected and tested
- All CRUD operations working with proper type safety

**Replit Environment Migration (January 2025):**
- Successfully migrated from Replit Agent to Replit environment
- Fixed environment variable configuration with proper client/server separation
- Secured Google AI API calls by moving them to backend endpoints
- Created comprehensive documentation for local development (VS Code) and Vercel deployment
- Removed hardcoded API keys and implemented proper security practices
- Added clear environment variable examples for different deployment scenarios
- Application fully functional on Replit, ready for local development and Vercel deployment
- Created separate .env files for different environments with clear documentation

**Database Integration (December 2024):**
- Added comprehensive database schema with users, resumes, applications, and user_profiles tables
- Implemented DatabaseStorage class with Supabase PostgreSQL integration  
- Added API routes for full CRUD operations on all entities
- Set up proper type safety with Drizzle ORM and Zod validation
- Maintained fallback to MemStorage when database is unavailable
- Integrated authentication flow with Supabase user management

**Migration Completion:**
- Successfully migrated from Bolt to Replit environment
- Fixed routing system migration from React Router to Wouter
- Configured environment variables for Supabase and Google AI
- Set up proper CSS theming with Tailwind and shadcn/ui
- Application running successfully with all features integrated