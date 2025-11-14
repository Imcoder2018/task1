#!/bin/bash

# Git setup script for Hepta Travel
echo "🔧 Hepta Travel - Git Repository Setup"
echo "======================================"

# Check if repository URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a GitHub repository URL"
    echo "Usage: ./scripts/setup-git.sh https://github.com/username/hepta-travel.git"
    exit 1
fi

REPO_URL="$1"

echo "📝 Repository URL: $REPO_URL"
echo ""

# Initialize git repository
echo "🏗️  Initializing Git repository..."
git init

# Add all files
echo "📦 Adding all files..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Hepta Travel MERN Stack

🌟 Features:
- Complete MERN stack architecture
- React frontend with Next.js 14
- Node.js backend with Express
- MongoDB database integration
- JWT authentication
- Responsive design with Tailwind CSS
- Tour booking system
- Blog management
- Contact forms
- Admin dashboard

🚀 Ready for deployment!"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin "$REPO_URL"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Git repository setup completed successfully!"
echo "🔗 Repository: $REPO_URL"
echo "📝 Next steps:"
echo "   1. Configure Vercel deployment"
echo "   2. Set up environment variables"
echo "   3. Connect domain (optional)"
