#!/bin/bash

# Development deployment script for Hepta Travel
echo "🌍 Hepta Travel - Development Deployment"
echo "========================================"

echo "🏗️  Starting development deployment..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
cd frontend && npm install
cd ../backend && npm install
cd ..

# Build frontend for development
echo "🔨 Building frontend for development..."
cd frontend && npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

# Run quick tests
echo "🧪 Running quick tests..."
cd frontend && npm run lint
cd ../backend && npm run lint
cd ..

# Commit changes
echo "💾 Committing development changes..."
git add .
git commit -m "Dev: Development build $(date '+%Y-%m-%d %H:%M')"

# Push to dev branch
echo "🌐 Pushing to development branch..."
git checkout -b dev 2>/dev/null || git checkout dev
git push origin dev

# Deploy to Vercel preview
echo "☁️  Deploying to Vercel preview..."
cd frontend && npx vercel --confirm
cd ..

echo ""
echo "🎉 Development deployment completed!"
echo "🔗 Preview URL: Check Vercel dashboard for preview link"
echo "🌿 Branch: dev"
echo ""
echo "📝 Development environment ready for testing!"
