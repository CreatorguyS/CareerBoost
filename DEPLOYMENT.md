# Deployment Guide

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/careerboost-platform)

### Manual Deployment

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Select the project

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. **Set Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

### Database Setup

1. **Create PostgreSQL Database:**
   - Use Neon, Railway, or any PostgreSQL provider
   - Get the connection string

2. **Apply Database Schema:**
   ```bash
   npm run db:push
   ```

### Local Testing of Production Build

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Other Deployment Options

### Railway

1. Connect your repository to Railway
2. Set environment variables
3. Deploy with the default build command

### Render

1. Connect your repository to Render
2. Use build command: `npm run build`
3. Start command: `npm start`
4. Set environment variables

## Troubleshooting

### Common Issues

1. **Build fails:**
   - Check all environment variables are set
   - Ensure database is accessible
   - Check TypeScript errors with `npm run check`

2. **Static files not serving:**
   - Verify `dist/public` directory exists after build
   - Check Vercel routing configuration

3. **API routes not working:**
   - Ensure `/api/*` routes are properly configured
   - Check server logs for errors

### Performance Optimization

- Enable compression in production
- Use CDN for static assets
- Optimize database queries
- Implement proper caching strategies