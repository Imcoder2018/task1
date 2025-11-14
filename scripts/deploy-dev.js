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

function deployDev() {
  log('\n🌍 Development Deployment', 'bright');
  log('==========================', 'cyan');

  // Install dependencies
  if (!executeCommand('npm install', 'Installing dependencies')) {
    process.exit(1);
  }

  // Run linting
  if (!executeCommand('npm run lint:frontend', 'Running frontend linting')) {
    log('⚠️  Linting failed, but continuing...', 'yellow');
  }

  // Build the project
  if (!executeCommand('npm run build:frontend', 'Building frontend')) {
    process.exit(1);
  }

  // Run tests (if available)
  try {
    executeCommand('npm run test:frontend', 'Running tests');
  } catch (error) {
    log('⚠️  Tests not available or failed, continuing...', 'yellow');
  }

  // Git operations
  if (!executeCommand('git add .', 'Adding changes to git')) {
    process.exit(1);
  }

  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  if (!executeCommand(`git commit -m "Dev deployment: ${timestamp}"`, 'Committing changes')) {
    log('⚠️  No changes to commit, continuing...', 'yellow');
  }

  // Push to dev branch
  if (!executeCommand('git push origin main', 'Pushing to main branch')) {
    process.exit(1);
  }

  // Deploy to Vercel preview
  if (!executeCommand('cd frontend && vercel', 'Deploying to Vercel preview')) {
    log('⚠️  Vercel deployment failed. Make sure you are logged in with "vercel login"', 'yellow');
  }

  log('\n🎉 Development deployment completed!', 'green');
  log('📍 Check your Vercel dashboard for the preview URL', 'cyan');
}

deployDev();
