# Environment Variables - Simple Setup Guide

## Current Structure (Simplified)

**Only ONE environment file matters:** `.env.example`

### For Replit (Current Environment)
- Environment variables are set automatically via **Replit Secrets**
- Database URL is provided automatically when you create a database
- No manual .env file needed - everything works through Replit's interface

### For Local Development (VS Code)
1. Copy `.env.example` to `.env.local`
2. Fill in your actual API keys and database URL
3. The app will automatically load from `.env.local`

### For Vercel Deployment
1. Set environment variables in Vercel dashboard
2. No .env file needed - Vercel handles it through their interface

## Environment Variables Explained

### Backend Variables (Server-only, secure)
- `DATABASE_URL` - Your PostgreSQL database connection
- `GOOGLE_AI_API_KEY` - Google Gemini AI API key

### Frontend Variables (Client-accessible, need VITE_ prefix)
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase public key (safe for frontend)

## Why VITE_ Prefix?

Frontend variables need `VITE_` prefix because:
- Vite only exposes environment variables with this prefix to the browser
- This prevents accidentally exposing sensitive server-only variables
- It's a security feature, not a bug

## Quick Setup

### Replit (You're here now)
✅ **Fully configured!** - All credentials set via Replit Secrets:
- ✅ Database connected (PostgreSQL)
- ✅ Google AI enabled (Gemini API)  
- ✅ Supabase authentication working
- ✅ All features ready to use

### Local Development
```bash
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### Vercel Deployment
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

## No More Confusion!

- ❌ No more multiple .env files
- ❌ No more client/.env
- ❌ No more hardcoded API keys
- ✅ One simple structure for all environments
- ✅ Secure by default
- ✅ Clear documentation