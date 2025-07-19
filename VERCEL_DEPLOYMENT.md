# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/careerboost-platform)

## Manual Deployment Steps

### 1. Prepare Your Repository

Ensure these files are in your repository:
- ✅ `vercel.json` (configured)
- ✅ `package.json` (configured)
- ✅ `.env.example` (for reference)
- ✅ `README.md` (with setup instructions)

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your CareerBoost repository

### 3. Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset:** Other
- **Build Command:** `npm run build`
- **Output Directory:** `dist/public`
- **Install Command:** `npm install`

### 4. Set Environment Variables

In Vercel dashboard, add these environment variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/database

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Environment
NODE_ENV=production
```

### 5. Database Setup for Production

#### Option A: Neon Database (Recommended for Vercel)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to Vercel as `DATABASE_URL`

#### Option B: Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to Vercel as `DATABASE_URL`

#### Option C: Railway Database

1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy connection string
4. Add to Vercel as `DATABASE_URL`

### 6. Apply Database Schema

After deployment, apply the schema:

```bash
# Clone your repository locally
git clone <your-repo-url>
cd careerboost-platform

# Install dependencies
npm install

# Set your production DATABASE_URL in .env
echo "DATABASE_URL=your_production_database_url" > .env

# Apply schema to production database
npm run db:push
```

### 7. Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Visit your live URL

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJ...` |
| `GOOGLE_AI_API_KEY` | Google Gemini AI API key | `AIza...` |
| `NODE_ENV` | Environment mode | `production` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `HOST` | Server host | `0.0.0.0` |

## Custom Domain

1. In Vercel project dashboard
2. Go to "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring & Analytics

Vercel provides built-in:
- **Performance monitoring**
- **Error tracking**
- **Analytics**
- **Real-time logs**

Access these in your Vercel project dashboard.

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Test build locally: `npm run build`

### Database Connection Errors

1. Verify `DATABASE_URL` is correct
2. Check database is accessible from external connections
3. Ensure database exists and schema is applied

### API Routes Not Working

1. Check function logs in Vercel dashboard
2. Verify `vercel.json` configuration
3. Test API routes locally

### Static Files Not Serving

1. Verify `dist/public` contains built files
2. Check build command completed successfully
3. Verify `outputDirectory` in `vercel.json`

## Performance Optimization

### Edge Functions
Consider using Vercel Edge Functions for:
- Authentication checks
- Simple API responses
- Redirects

### Caching
Configure caching headers for:
- Static assets
- API responses
- Database queries

### Bundle Size
Monitor and optimize:
- JavaScript bundle size
- CSS bundle size
- Image optimization

## Scaling Considerations

### Database
- Use connection pooling
- Consider read replicas for high traffic
- Monitor query performance

### API
- Implement rate limiting
- Use Redis for caching
- Consider CDN for static assets

Your CareerBoost platform is now deployed on Vercel! 🚀