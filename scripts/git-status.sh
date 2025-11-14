#!/bin/bash

# Git status script for Hepta Travel
echo "📊 Hepta Travel - Git Status Report"
echo "==================================="

echo ""
echo "🌿 Current Branch:"
git branch --show-current

echo ""
echo "📈 Repository Status:"
git status --short

echo ""
echo "📝 Recent Commits (Last 10):"
git log --oneline -10

echo ""
echo "🔗 Remote Information:"
git remote -v

echo ""
echo "📊 Commit Statistics:"
echo "Total commits: $(git rev-list --all --count)"
echo "Contributors: $(git shortlog -sn | wc -l)"

echo ""
echo "🏷️  Recent Tags:"
git tag --sort=-version:refname | head -5

echo ""
echo "📋 Working Directory Analysis:"
echo "Modified files: $(git diff --name-only | wc -l)"
echo "Staged files: $(git diff --cached --name-only | wc -l)"
echo "Untracked files: $(git ls-files --others --exclude-standard | wc -l)"

echo ""
echo "✅ Git status report completed!"
