#!/bin/bash

# Production deployment script for Hepta Travel
echo "🚀 Hepta Travel - Production Deployment"
echo "======================================="

# Check if version is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a version number"
    echo "Usage: ./scripts/deploy-prod.sh v1.0.0"
    exit 1
fi

VERSION="$1"

echo "📦 Version: $VERSION"
echo ""

# Confirmation prompt
read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Production deployment cancelled"
    exit 0
fi

echo "🏗️  Starting production deployment..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
cd frontend && npm ci
cd ../backend && npm ci
cd ..

# Run tests
echo "🧪 Running tests..."
cd frontend && npm run test:ci
if [ $? -ne 0 ]; then
    echo "❌ Frontend tests failed"
    exit 1
fi

cd ../backend && npm test
if [ $? -ne 0 ]; then
    echo "❌ Backend tests failed"
    exit 1
fi

cd ..

# Build frontend
echo "🔨 Building frontend for production..."
cd frontend && npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

# Build backend
echo "🔨 Building backend for production..."
cd backend && npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

# Commit and tag
echo "💾 Committing release..."
git add .
git commit -m "Release: $VERSION

🚀 Production deployment
✅ All tests passed
🔨 Frontend and backend built
📦 Ready for production"

# Create tag
echo "🏷️  Creating version tag..."
git tag "$VERSION"

# Push to main
echo "🌐 Pushing to main branch..."
git push origin main

# Push tag
echo "🏷️  Pushing version tag..."
git push origin "$VERSION"

# Deploy to Vercel
echo "☁️  Deploying to Vercel..."
cd frontend && npx vercel --prod --confirm
cd ..

echo ""
echo "🎉 Production deployment completed successfully!"
echo "📦 Version: $VERSION"
echo "🔗 Production URL: https://hepta-travel.vercel.app"
echo "🏷️  Tagged as: $VERSION"
echo ""
echo "📝 Post-deployment checklist:"
echo "   ✅ Verify frontend is working"
echo "   ✅ Test API endpoints"
echo "   ✅ Check database connectivity"
echo "   ✅ Verify authentication flow"
echo "   ✅ Test booking system"
