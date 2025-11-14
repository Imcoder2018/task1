# 🚀 Hepta Travel - Deployment Guide

This guide covers all deployment options and scripts for the Hepta Travel MERN stack application.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Deployment Scripts](#deployment-scripts)
- [Environment Setup](#environment-setup)
- [Vercel Deployment](#vercel-deployment)
- [GitHub Integration](#github-integration)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Interactive Deployment Menu
```bash
npm run deploy-menu
```
This launches an interactive menu with all deployment options.

### Quick Commands
```bash
# Check git status
npm run git:status

# Quick commit and push
npm run quick-commit "Your commit message"

# Setup GitHub repository
npm run setup-git https://github.com/username/hepta-travel.git

# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod v1.0.0
```

## 📜 Deployment Scripts

### 1. Git Status (`git-status.sh`)
**Command:** `npm run git:status`

Provides comprehensive git repository information:
- Current branch
- Repository status
- Recent commits
- Remote information
- Commit statistics
- Recent tags
- Working directory analysis

### 2. Quick Commit (`quick-commit.sh`)
**Command:** `npm run quick-commit "commit message"`

Streamlined commit process:
- Adds all changes
- Creates commit with provided message
- Pushes to main branch
- Provides status feedback

### 3. Git Setup (`setup-git.sh`)
**Command:** `npm run setup-git <repository-url>`

Initial repository setup:
- Initializes git repository
- Creates comprehensive initial commit
- Sets up remote origin
- Pushes to GitHub
- Provides next steps

### 4. Development Deployment (`deploy-dev.sh`)
**Command:** `npm run deploy:dev`

Development environment deployment:
- Installs dependencies
- Builds frontend for development
- Runs linting checks
- Creates dev branch
- Deploys to Vercel preview

### 5. Production Deployment (`deploy-prod.sh`)
**Command:** `npm run deploy:prod <version>`

Production deployment with full testing:
- Confirmation prompts
- Dependency installation
- Complete test suite
- Production builds
- Version tagging
- Vercel production deployment

### 6. Interactive Menu (`deploy.js`)
**Command:** `npm run deploy-menu`

Full-featured deployment interface:
- Git status checking
- Quick commits
- Repository setup
- Environment deployments
- Build & test operations
- Vercel integration

## 🔧 Environment Setup

### Prerequisites
```bash
# Install Node.js and npm
# Install Git
# Install Vercel CLI (optional)
npm install -g vercel
```

### Project Setup
```bash
# Clone repository
git clone https://github.com/username/hepta-travel.git
cd hepta-travel

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hepta-travel
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Production Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hepta-travel
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## ☁️ Vercel Deployment

### Automatic Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Manual Deployment
```bash
# Production deployment
npm run vercel:deploy

# Preview deployment
npm run vercel:preview
```

### Vercel Configuration (`vercel.json`)
The project includes a pre-configured `vercel.json` file with:
- Next.js and Node.js build settings
- API routing configuration
- Environment variable setup
- GitHub integration

## 🔗 GitHub Integration

### Setting up GitHub Repository
```bash
# Using setup script
npm run setup-git https://github.com/username/hepta-travel.git

# Manual setup
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/hepta-travel.git
git push -u origin main
```

### Branch Strategy
- **main**: Production branch
- **dev**: Development branch
- **staging**: Staging branch (optional)
- **feature/***: Feature branches

### Auto-deployment with Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy!

Vercel will automatically deploy:
- **Production**: Pushes to `main` branch
- **Preview**: All other branches and pull requests

## 🛠️ Available Scripts

### Root Level Scripts
```bash
npm run dev                 # Start both frontend and backend
npm run build              # Build both applications
npm run start              # Start both applications
npm run test:all           # Run all tests
npm run lint               # Lint all code
npm run deploy-menu        # Interactive deployment menu
npm run quick-commit       # Quick git commit
npm run setup-git          # Setup GitHub repository
npm run deploy:dev         # Deploy to development
npm run deploy:prod        # Deploy to production
npm run git:status         # Git status report
npm run vercel:deploy      # Deploy to Vercel production
npm run vercel:preview     # Deploy to Vercel preview
```

### Frontend Scripts
```bash
cd frontend
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm run type-check         # TypeScript type checking
```

### Backend Scripts
```bash
cd backend
npm run dev                # Start development server
npm run build              # Build TypeScript
npm run start              # Start production server
npm run lint               # Run ESLint
npm test                   # Run tests
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
cd frontend && rm -rf .next
npm run build
```

#### 2. Environment Variables Not Loading
```bash
# Check .env file locations
# Frontend: frontend/.env.local
# Backend: backend/.env

# Verify variable names start with NEXT_PUBLIC_ for frontend
```

#### 3. Vercel Deployment Fails
```bash
# Check build logs in Vercel dashboard
# Verify all environment variables are set
# Ensure vercel.json is properly configured
```

#### 4. Git Issues
```bash
# Check git status
npm run git:status

# Reset git configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Debug Mode
```bash
# Enable debug mode for scripts
DEBUG=1 npm run deploy-menu
```

## 📝 Best Practices

### Before Deployment
1. ✅ Run all tests: `npm run test:all`
2. ✅ Check linting: `npm run lint`
3. ✅ Verify build: `npm run build`
4. ✅ Test locally: `npm run dev`
5. ✅ Update version: Edit `package.json`

### Production Checklist
- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] API endpoints working
- [ ] Authentication flow verified
- [ ] Payment integration tested (if applicable)
- [ ] Error handling implemented
- [ ] Performance optimized
- [ ] Security measures in place

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Configure uptime monitoring
- Monitor performance metrics
- Set up automated backups

## 🔒 Security Considerations

- Never commit `.env` files
- Use strong JWT secrets
- Enable CORS properly
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production
- Keep dependencies updated

## 📞 Support

For deployment issues:

1. Check the troubleshooting section
2. Review Vercel deployment logs
3. Check GitHub Actions (if configured)
4. Create an issue in the repository

---

**Happy Deploying! 🚀**

Built with ❤️ for Hepta Travel
