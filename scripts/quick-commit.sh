#!/bin/bash

# Quick commit script for Hepta Travel
echo "🚀 Hepta Travel - Quick Commit"
echo "=============================="

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a commit message"
    echo "Usage: ./scripts/quick-commit.sh \"Your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "📝 Commit message: $COMMIT_MESSAGE"
echo ""

# Add all changes
echo "📦 Adding all changes..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit"
    exit 0
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Push to remote
echo "🌐 Pushing to remote..."
git push origin main

echo ""
echo "✅ Quick commit completed successfully!"
echo "🔗 Changes pushed to GitHub"
