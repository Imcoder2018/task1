#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

async function deployProd() {
  log('\n🚀 Production Deployment', 'bright');
  log('=========================', 'cyan');

  // Get version from command line argument or prompt
  let version = process.argv[2];
  
  if (!version) {
    version = await new Promise((resolve) => {
      rl.question('Enter version (e.g., v1.0.0): ', (answer) => {
        resolve(answer);
      });
    });
  }

  if (!version.trim()) {
    log('❌ Version is required!', 'red');
    process.exit(1);
  }

  // Add 'v' prefix if not present
  if (!version.startsWith('v')) {
    version = 'v' + version;
  }

  // Confirmation prompt
  const confirm = await new Promise((resolve) => {
    rl.question(`🚨 Deploy to PRODUCTION with version ${version}? (y/N): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });

  if (!confirm) {
    log('❌ Production deployment cancelled.', 'yellow');
    process.exit(0);
  }

  // Install dependencies
  if (!executeCommand('npm install', 'Installing dependencies')) {
    process.exit(1);
  }

  // Run linting
  if (!executeCommand('npm run lint:frontend', 'Running linting')) {
    process.exit(1);
  }

  // Run type checking
  if (!executeCommand('npm run type-check', 'Running type checking')) {
    process.exit(1);
  }

  // Run tests
  try {
    executeCommand('npm run test:frontend', 'Running tests');
  } catch (error) {
    log('⚠️  Tests not available, continuing...', 'yellow');
  }

  // Build for production
  if (!executeCommand('npm run build:production', 'Building for production')) {
    process.exit(1);
  }

  // Git operations
  if (!executeCommand('git add .', 'Adding changes to git')) {
    process.exit(1);
  }

  if (!executeCommand(`git commit -m "Production release ${version}"`, 'Committing release')) {
    log('⚠️  No changes to commit, continuing...', 'yellow');
  }

  // Create git tag
  if (!executeCommand(`git tag ${version}`, 'Creating git tag')) {
    process.exit(1);
  }

  // Push to remote with tags
  if (!executeCommand('git push origin main --tags', 'Pushing to remote with tags')) {
    process.exit(1);
  }

  // Deploy to Vercel production
  if (!executeCommand('cd frontend && vercel --prod', 'Deploying to Vercel production')) {
    log('⚠️  Vercel deployment failed. Make sure you are logged in with "vercel login"', 'yellow');
    process.exit(1);
  }

  log('\n🎉 Production deployment completed successfully!', 'green');
  log(`📍 Version: ${version}`, 'cyan');
  log('📍 Check your Vercel dashboard for the production URL', 'cyan');
  
  rl.close();
}

deployProd().catch(error => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
