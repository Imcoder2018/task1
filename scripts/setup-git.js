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

async function setupGit() {
  log('\n🔧 Git Repository Setup', 'bright');
  log('=======================', 'cyan');

  // Get repository URL from command line argument or prompt
  let repoUrl = process.argv[2];
  
  if (!repoUrl) {
    repoUrl = await new Promise((resolve) => {
      rl.question('Enter GitHub repository URL: ', (answer) => {
        resolve(answer);
      });
    });
  }

  if (!repoUrl.trim()) {
    log('❌ Repository URL is required!', 'red');
    process.exit(1);
  }

  // Configure git user (if not already configured)
  try {
    execSync('git config user.name', { stdio: 'pipe' });
  } catch (error) {
    if (!executeCommand('git config user.name "Hepta Travel Developer"', 'Setting git user name')) {
      process.exit(1);
    }
  }

  try {
    execSync('git config user.email', { stdio: 'pipe' });
  } catch (error) {
    if (!executeCommand('git config user.email "developer@hepta-travel.com"', 'Setting git user email')) {
      process.exit(1);
    }
  }

  // Configure line endings for Windows
  if (!executeCommand('git config core.autocrlf true', 'Configuring line endings')) {
    process.exit(1);
  }

  if (!executeCommand('git config core.safecrlf false', 'Disabling CRLF warnings')) {
    process.exit(1);
  }

  // Initialize git repository (if not already initialized)
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    log('Git repository already initialized', 'yellow');
  } catch (error) {
    if (!executeCommand('git init', 'Initializing git repository')) {
      process.exit(1);
    }
  }

  // Add all files
  if (!executeCommand('git add .', 'Adding all files')) {
    process.exit(1);
  }

  // Initial commit
  if (!executeCommand('git commit -m "Initial commit: Hepta Travel MERN Stack Application"', 'Creating initial commit')) {
    process.exit(1);
  }

  // Set main branch
  if (!executeCommand('git branch -M main', 'Setting main branch')) {
    process.exit(1);
  }

  // Add remote origin
  if (!executeCommand(`git remote add origin ${repoUrl}`, 'Adding remote origin')) {
    process.exit(1);
  }

  // Push to GitHub
  if (!executeCommand('git push -u origin main', 'Pushing to GitHub')) {
    process.exit(1);
  }

  log('\n🎉 Git repository setup completed successfully!', 'green');
  log(`📍 Repository: ${repoUrl}`, 'cyan');
  rl.close();
}

setupGit().catch(error => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
