# 🚀 Hepta Travel - Complete Deployment Guide

## 📋 Deployment Overview

This guide covers all deployment methods for the Hepta Travel application, including automated scripts, manual deployment, and CI/CD setup.

## 🛠️ Prerequisites

### Required Software
- **Node.js**: Version 18 or higher
- **Git**: For version control
- **Vercel CLI**: `npm install -g vercel`
- **GitHub Account**: For repository hosting
- **Vercel Account**: For deployment hosting

### Environment Setup
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Verify installation
vercel --version
node --version
git --version
```

## 🎯 Deployment Methods

### Method 1: Automated Scripts (Recommended)

#### 1. Interactive Deployment Menu
```bash
# Run interactive menu
npm run deploy-menu

# Or use Windows batch file
scripts\deploy-menu.bat
```

**Menu Options:**
- 📊 Git Status
- ⚡ Quick Commit
- 🔧 Setup Git Repository
- 🌍 Deploy to Development
- 🎯 Deploy to Staging
- 🚀 Deploy to Production
- 📦 Build & Test
- 🔗 Connect Vercel

#### 2. Quick Commit & Push
```bash
# Command line with message
npm run quick-commit "Fix tour detail page routing"

# Interactive prompt
npm run quick-commit

# Windows batch file
scripts\quick-commit.bat
```

#### 3. Setup Git Repository (First Time)
```bash
# With repository URL
npm run setup-git https://github.com/username/hepta-travel.git

# Interactive prompt
npm run setup-git

# Windows batch file
scripts\setup-git.bat
```

#### 4. Development Deployment
```bash
# Deploy to preview environment
npm run deploy:dev

# Windows batch file
scripts\deploy-dev.bat
```

#### 5. Production Deployment
```bash
# Deploy with version
npm run deploy:prod v1.0.0

# Interactive version prompt
npm run deploy:prod

# Windows batch file
scripts\deploy-prod.bat
```

### Method 2: Manual Deployment

#### Step 1: Prepare Repository
```bash
# Clone or navigate to project
git clone https://github.com/username/hepta-travel.git
cd hepta-travel-mern

# Install dependencies
npm install
cd frontend && npm install
```

#### Step 2: Build Application
```bash
# From frontend directory
npm run build

# Verify build success
npm run start
```

#### Step 3: Deploy to Vercel
```bash
# Login to Vercel (first time)
vercel login

# Link project (first time)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: GitHub Integration (CI/CD)

#### Setup GitHub Repository
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/hepta-travel.git
git push -u origin main
```

#### Connect Vercel to GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Automatic Deployments
- **Push to main**: Triggers production deployment
- **Pull requests**: Creates preview deployments
- **Branch pushes**: Creates branch preview deployments

## 🔧 Configuration Files

### Vercel Configuration (`frontend/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url",
    "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY": "@google-maps-key"
  },
  "functions": {
    "app/api/*/route.js": {
      "maxDuration": 30
    }
  },
  "regions": ["iad1"],
  "github": {
    "enabled": true,
    "autoAlias": true
  }
}
```

### Next.js Configuration (`frontend/next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

## 🌍 Environment Variables

### Development (`.env.local`)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Development flags
NODE_ENV=development
```

### Production (Vercel Dashboard)
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_google_maps_key

# Analytics
NEXT_PUBLIC_GA_ID=your_production_google_analytics_id

# Production flags
NODE_ENV=production
```

## 📊 Deployment Monitoring

### Build Logs
```bash
# View local build logs
npm run build 2>&1 | tee build.log

# View Vercel deployment logs
vercel logs https://your-app.vercel.app
```

### Performance Monitoring
- **Vercel Analytics**: Automatic performance monitoring
- **Core Web Vitals**: Built-in Next.js metrics
- **Build Time**: Track build performance over time

### Error Monitoring
- **Vercel Functions**: Automatic error logging
- **Console Errors**: Browser developer tools
- **Build Errors**: Deployment failure notifications

## 🔄 Deployment Workflows

### Development Workflow
```
1. Code Changes
   ├── Edit files in src/
   ├── Test locally (npm run dev)
   └── Verify functionality

2. Commit Changes
   ├── npm run quick-commit "description"
   ├── Or: git add . && git commit -m "message"
   └── git push origin main

3. Deploy Preview
   ├── npm run deploy:dev
   ├── Or: vercel (preview deployment)
   └── Test preview URL

4. Production Deploy
   ├── npm run deploy:prod v1.x.x
   ├── Or: vercel --prod
   └── Verify production URL
```

### Hotfix Workflow
```
1. Identify Issue
   ├── Check error logs
   ├── Reproduce locally
   └── Create fix

2. Quick Deploy
   ├── npm run quick-commit "hotfix: description"
   ├── vercel --prod
   └── Monitor deployment

3. Verify Fix
   ├── Test production URL
   ├── Check error logs
   └── Notify stakeholders
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

#### Vercel Connection Issues
```bash
# Re-login to Vercel
vercel logout
vercel login

# Re-link project
vercel link --yes

# Check project settings
vercel project ls
```

#### Environment Variable Issues
```bash
# List current environment variables
vercel env ls

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL

# Pull environment variables
vercel env pull .env.local
```

#### Domain Issues
```bash
# Check domain configuration
vercel domains ls

# Add custom domain
vercel domains add your-domain.com

# Check DNS configuration
nslookup your-domain.com
```

### Error Resolution

#### "Build failed" Error
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Fix TypeScript/ESLint errors
4. Redeploy with `vercel --prod`

#### "Function timeout" Error
1. Check function execution time
2. Optimize slow operations
3. Increase timeout in `vercel.json`
4. Consider edge functions for better performance

#### "Environment variable not found" Error
1. Check variable name spelling
2. Verify variable is set in Vercel dashboard
3. Ensure `NEXT_PUBLIC_` prefix for client-side variables
4. Redeploy after adding variables

## 📈 Performance Optimization

### Build Optimization
```javascript
// next.config.js optimizations
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
}
```

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
npm run build && npm run analyze
```

### Performance Monitoring
```javascript
// pages/_app.js - Web Vitals
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics service
}
```

## 🔐 Security Considerations

### Environment Security
- Never commit `.env` files to git
- Use Vercel's environment variable dashboard
- Rotate API keys regularly
- Use different keys for development/production

### Build Security
- Keep dependencies updated
- Run security audits: `npm audit`
- Use TypeScript for type safety
- Implement proper error boundaries

## 📞 Support & Resources

### Documentation Links
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)

### Community Support
- [Vercel Discord](https://discord.gg/vercel)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

### Emergency Contacts
- **Production Issues**: Check Vercel status page
- **Build Failures**: Review deployment logs
- **Domain Issues**: Contact Vercel support

---

## 🎉 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Git repository up to date
- [ ] Version tagged (for production)

### Post-Deployment
- [ ] Verify deployment URL works
- [ ] Check all pages load correctly
- [ ] Test critical user flows
- [ ] Monitor error logs
- [ ] Update documentation

### Production Deployment
- [ ] Backup current version
- [ ] Deploy during low-traffic hours
- [ ] Monitor performance metrics
- [ ] Prepare rollback plan
- [ ] Notify team of deployment

---

**🚀 Your Hepta Travel application is now ready for professional deployment with automated workflows and monitoring!**
