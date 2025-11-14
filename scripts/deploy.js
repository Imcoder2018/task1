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
  magenta: '\x1b[35m',
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

function showMenu() {
  log('\n🚀 Hepta Travel Deployment Menu', 'bright');
  log('================================', 'cyan');
  log('1. 📊 Git Status', 'yellow');
  log('2. ⚡ Quick Commit', 'yellow');
  log('3. 🔧 Setup Git Repository', 'yellow');
  log('4. 🌍 Deploy to Development', 'yellow');
  log('5. 🎯 Deploy to Staging', 'yellow');
  log('6. 🚀 Deploy to Production', 'yellow');
  log('7. 📦 Build & Test', 'yellow');
  log('8. 🔗 Connect Vercel', 'yellow');
  log('9. 📋 Deploy Menu (Show All)', 'yellow');
  log('0. 🚪 Exit', 'yellow');
  log('================================', 'cyan');
}

function gitStatus() {
  log('\n📊 Checking Git Status...', 'blue');
  executeCommand('git status', 'Git Status Check');
  executeCommand('git log --oneline -10', 'Recent Commits');
}

function quickCommit() {
  rl.question('\n💬 Enter commit message: ', (message) => {
    if (!message.trim()) {
      log('❌ Commit message cannot be empty!', 'red');
      return handleMenu();
    }
    
    const success = executeCommand('git add .', 'Adding all changes') &&
                   executeCommand(`git commit -m "${message}"`, 'Committing changes') &&
                   executeCommand('git push origin main', 'Pushing to remote');
    
    if (success) {
      log('\n🎉 Quick commit completed successfully!', 'green');
    }
    
    handleMenu();
  });
}

function setupGit() {
  rl.question('\n🔗 Enter GitHub repository URL (https://github.com/username/repo.git): ', (repoUrl) => {
    if (!repoUrl.trim()) {
      log('❌ Repository URL cannot be empty!', 'red');
      return handleMenu();
    }
    
    const commands = [
      { cmd: 'git init', desc: 'Initializing Git repository' },
      { cmd: 'git add .', desc: 'Adding all files' },
      { cmd: 'git commit -m "Initial commit: Hepta Travel MERN Stack"', desc: 'Initial commit' },
      { cmd: 'git branch -M main', desc: 'Setting main branch' },
      { cmd: `git remote add origin ${repoUrl}`, desc: 'Adding remote origin' },
      { cmd: 'git push -u origin main', desc: 'Pushing to GitHub' }
    ];
    
    let success = true;
    for (const { cmd, desc } of commands) {
      if (!executeCommand(cmd, desc)) {
        success = false;
        break;
      }
    }
    
    if (success) {
      log('\n🎉 Git repository setup completed!', 'green');
      log('📝 Repository URL: ' + repoUrl, 'cyan');
    }
    
    handleMenu();
  });
}

function deployDev() {
  log('\n🌍 Deploying to Development Environment...', 'blue');
  
  const success = executeCommand('npm run build:frontend', 'Building Frontend') &&
                 executeCommand('npm run test:frontend', 'Running Frontend Tests') &&
                 executeCommand('npm run build:backend', 'Building Backend') &&
                 executeCommand('git add .', 'Adding changes') &&
                 executeCommand('git commit -m "Deploy: Development build"', 'Committing build') &&
                 executeCommand('git push origin dev', 'Pushing to dev branch');
  
  if (success) {
    log('\n🎉 Development deployment completed!', 'green');
    log('🔗 Dev URL: https://hepta-travel-dev.vercel.app', 'cyan');
  }
  
  handleMenu();
}

function deployStaging() {
  log('\n🎯 Deploying to Staging Environment...', 'blue');
  
  rl.question('⚠️  Are you sure you want to deploy to staging? (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      log('❌ Staging deployment cancelled.', 'yellow');
      return handleMenu();
    }
    
    const success = executeCommand('npm run build:production', 'Building for Production') &&
                   executeCommand('npm run test:all', 'Running All Tests') &&
                   executeCommand('git add .', 'Adding changes') &&
                   executeCommand('git commit -m "Deploy: Staging release"', 'Committing release') &&
                   executeCommand('git push origin staging', 'Pushing to staging branch');
    
    if (success) {
      log('\n🎉 Staging deployment completed!', 'green');
      log('🔗 Staging URL: https://hepta-travel-staging.vercel.app', 'cyan');
    }
    
    handleMenu();
  });
}

function deployProduction() {
  log('\n🚀 Deploying to Production Environment...', 'red');
  
  rl.question('⚠️  Are you sure you want to deploy to PRODUCTION? (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      log('❌ Production deployment cancelled.', 'yellow');
      return handleMenu();
    }
    
    rl.question('📝 Enter release version (e.g., v1.0.0): ', (version) => {
      if (!version.trim()) {
        log('❌ Version cannot be empty!', 'red');
        return handleMenu();
      }
      
      const success = executeCommand('npm run build:production', 'Building for Production') &&
                     executeCommand('npm run test:all', 'Running All Tests') &&
                     executeCommand('git add .', 'Adding changes') &&
                     executeCommand(`git commit -m "Release: ${version}"`, 'Committing release') &&
                     executeCommand(`git tag ${version}`, 'Creating version tag') &&
                     executeCommand('git push origin main', 'Pushing to main branch') &&
                     executeCommand(`git push origin ${version}`, 'Pushing version tag');
      
      if (success) {
        log('\n🎉 Production deployment completed!', 'green');
        log('🔗 Production URL: https://hepta-travel.vercel.app', 'cyan');
        log(`📦 Version: ${version}`, 'magenta');
      }
      
      handleMenu();
    });
  });
}

function buildAndTest() {
  log('\n📦 Building and Testing Project...', 'blue');
  
  const success = executeCommand('npm install', 'Installing Dependencies') &&
                 executeCommand('npm run build:frontend', 'Building Frontend') &&
                 executeCommand('npm run build:backend', 'Building Backend') &&
                 executeCommand('npm run test:frontend', 'Testing Frontend') &&
                 executeCommand('npm run lint', 'Running Linter') &&
                 executeCommand('npm run type-check', 'Type checking');
  
  if (success) {
    log('\n🎉 Build and test completed successfully!', 'green');
  }
  
  handleMenu();
}

function connectVercel() {
  log('\n🔗 Connecting to Vercel...', 'blue');
  
  rl.question('📝 Enter your Vercel team/username: ', (team) => {
    if (!team.trim()) {
      log('❌ Team/username cannot be empty!', 'red');
      return handleMenu();
    }
    
    const success = executeCommand('npm install -g vercel', 'Installing Vercel CLI') &&
                   executeCommand('vercel login', 'Logging into Vercel') &&
                   executeCommand(`vercel --prod --confirm -A vercel.json`, 'Deploying to Vercel');
    
    if (success) {
      log('\n🎉 Vercel connection completed!', 'green');
      log('⚙️  Configure auto-deployment by connecting your GitHub repo in Vercel dashboard', 'cyan');
    }
    
    handleMenu();
  });
}

function handleMenu() {
  showMenu();
  rl.question('\n🔥 Select an option (0-9): ', (choice) => {
    switch (choice) {
      case '1':
        gitStatus();
        break;
      case '2':
        quickCommit();
        break;
      case '3':
        setupGit();
        break;
      case '4':
        deployDev();
        break;
      case '5':
        deployStaging();
        break;
      case '6':
        deployProduction();
        break;
      case '7':
        buildAndTest();
        break;
      case '8':
        connectVercel();
        break;
      case '9':
        handleMenu();
        break;
      case '0':
        log('\n👋 Goodbye! Happy deploying!', 'green');
        rl.close();
        break;
      default:
        log('\n❌ Invalid option. Please try again.', 'red');
        handleMenu();
    }
  });
}

// Start the application
log('🌟 Welcome to Hepta Travel Deployment Manager!', 'bright');
handleMenu();
