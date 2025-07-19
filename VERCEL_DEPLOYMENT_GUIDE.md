# Vercel Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository (recommended)
- Environment variables configured

## Environment Variables Setup

In your Vercel dashboard, go to Settings > Environment Variables and add:

### Backend Variables
```
DATABASE_URL = your_production_database_url
GOOGLE_AI_API_KEY = your_google_ai_api_key
NODE_ENV = production
```

### Frontend Variables (VITE_ prefix required)
```
VITE_SUPABASE_URL = your_production_supabase_url
VITE_SUPABASE_ANON_KEY = your_production_supabase_anon_key
VITE_API_BASE_URL = https://your-app.vercel.app
```

## Deployment Methods

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings:**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy
   - Link to existing project or create new
   - Configure environment variables

## Vercel Configuration

The project includes `vercel.json` which configures:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "framework": null,
  "functions": {
    "api/index.ts": {
      "maxDuration": 30
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api"
    },
    {
      "src": "/(.*)",
      "dest": "/api"
    }
  ]
}
```

## Database Setup for Production

### Option 1: Neon Database (Recommended)
1. Create account at neon.tech
2. Create new database
3. Copy connection string to `DATABASE_URL`

### Option 2: Supabase Database
1. Use your existing Supabase project
2. Get database URL from Settings > Database
3. Add to `DATABASE_URL`

### Option 3: Railway/PlanetScale
1. Create database on your preferred platform
2. Get connection string
3. Add to `DATABASE_URL`

## Post-Deployment Steps

1. **Apply Database Schema:**
   ```bash
   npx drizzle-kit push --config=drizzle.config.ts
   ```

2. **Test the Application:**
   - Visit your Vercel URL
   - Test all major features
   - Check browser console for errors
   - Verify API endpoints work

3. **Set Custom Domain (Optional):**
   - Go to Vercel dashboard > Domains
   - Add your custom domain
   - Configure DNS records

## Monitoring and Debugging

### Vercel Logs
- Go to your project dashboard
- Check "Functions" tab for serverless function logs
- Use "Analytics" for performance monitoring

### Common Issues

1. **Build Fails:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify TypeScript compiles locally

2. **Environment Variables Not Working:**
   - Ensure VITE_ prefix for frontend variables
   - Redeploy after adding variables
   - Check variable names match exactly

3. **API Routes Not Working:**
   - Verify api/index.ts exports properly
   - Check function timeout settings
   - Review serverless function logs

4. **Database Connection Issues:**
   - Verify DATABASE_URL format
   - Check database allows external connections
   - Ensure SSL is configured if required

## Automated Deployments

With GitHub integration:
- Every push to main branch triggers deployment
- Preview deployments for pull requests
- Automatic environment variable inheritance

## Performance Optimization

1. **Static Assets:**
   - Images optimized by Vercel automatically
   - Use Vercel Image Optimization for user uploads

2. **Caching:**
   - Static files cached automatically
   - API responses can use cache headers

3. **Bundle Analysis:**
   ```bash
   npm run build
   # Check dist/public for bundle sizes
   ```

## Security Considerations

1. **Environment Variables:**
   - Never commit .env files
   - Use different keys for production
   - Rotate API keys regularly

2. **Database Security:**
   - Use connection pooling
   - Enable SSL for database connections
   - Restrict database access to Vercel IPs if possible

3. **CORS Configuration:**
   - Configure allowed origins in production
   - Use HTTPS everywhere
   - Validate all inputs server-side