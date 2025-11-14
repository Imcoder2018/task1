#!/usr/bin/env node

const { execSync } = require('child_process');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(command, description) {
  try {
    log(`\n📦 ${description}...`, 'cyan');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully!`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
}

function fixGit() {
  log('\n🔧 Fixing Git Configuration and Repository', 'bright');
  log('==========================================', 'cyan');

  // Configure git user globally
  if (!executeCommand('git config --global user.name "Hepta Travel Developer"', 'Setting global git user name')) {
    process.exit(1);
  }

  if (!executeCommand('git config --global user.email "developer@hepta-travel.com"', 'Setting global git user email')) {
    process.exit(1);
  }

  // Configure line endings for Windows
  if (!executeCommand('git config --global core.autocrlf true', 'Configuring global line endings')) {
    process.exit(1);
  }

  if (!executeCommand('git config --global core.safecrlf false', 'Disabling global CRLF warnings')) {
    process.exit(1);
  }

  // Remove node_modules from git tracking
  log('\n🧹 Cleaning up git tracking...', 'yellow');
  try {
    execSync('git rm -r --cached node_modules/ 2>nul', { stdio: 'pipe' });
    log('✅ Removed root node_modules from git tracking', 'green');
  } catch (error) {
    log('⚠️  Root node_modules not in git tracking', 'yellow');
  }

  try {
    execSync('git rm -r --cached frontend/node_modules/ 2>nul', { stdio: 'pipe' });
    log('✅ Removed frontend/node_modules from git tracking', 'green');
  } catch (error) {
    log('⚠️  Frontend node_modules not in git tracking', 'yellow');
  }

  try {
    execSync('git rm -r --cached backend/node_modules/ 2>nul', { stdio: 'pipe' });
    log('✅ Removed backend/node_modules from git tracking', 'green');
  } catch (error) {
    log('⚠️  Backend node_modules not in git tracking', 'yellow');
  }

  // Remove other unnecessary files
  try {
    execSync('git rm -r --cached .next/ 2>nul', { stdio: 'pipe' });
    log('✅ Removed .next from git tracking', 'green');
  } catch (error) {
    log('⚠️  .next not in git tracking', 'yellow');
  }

  try {
    execSync('git rm -r --cached frontend/.next/ 2>nul', { stdio: 'pipe' });
    log('✅ Removed frontend/.next from git tracking', 'green');
  } catch (error) {
    log('⚠️  Frontend .next not in git tracking', 'yellow');
  }

  // Add gitignore files
  if (!executeCommand('git add .gitignore .gitattributes frontend/.gitignore backend/.gitignore', 'Adding gitignore files')) {
    process.exit(1);
  }

  // Commit the cleanup
  try {
    execSync('git commit -m "Fix git configuration and clean up tracking"', { stdio: 'inherit' });
    log('✅ Committed git cleanup changes', 'green');
  } catch (error) {
    log('⚠️  No changes to commit or commit failed', 'yellow');
  }

  // Show current status
  log('\n📊 Current Git Status:', 'blue');
  try {
    execSync('git status --short', { stdio: 'inherit' });
  } catch (error) {
    log('❌ Failed to show git status', 'red');
  }

  log('\n🎉 Git configuration and cleanup completed!', 'green');
  log('📍 You can now use the deployment scripts without issues', 'cyan');
}

fixGit();
