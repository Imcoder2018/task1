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

async function quickCommit() {
  log('\n⚡ Quick Commit & Push', 'bright');
  log('=====================', 'cyan');

  // Get commit message from command line argument or prompt
  let commitMessage = process.argv[2];
  
  if (!commitMessage) {
    commitMessage = await new Promise((resolve) => {
      rl.question('Enter commit message: ', (answer) => {
        resolve(answer);
      });
    });
  }

  if (!commitMessage.trim()) {
    log('❌ Commit message is required!', 'red');
    process.exit(1);
  }

  // Check git status
  log('\n📊 Checking git status...', 'yellow');
  try {
    execSync('git status --porcelain', { stdio: 'pipe' });
  } catch (error) {
    log('❌ Not a git repository. Please run setup-git first.', 'red');
    process.exit(1);
  }

  // Add all changes
  if (!executeCommand('git add .', 'Adding all changes')) {
    process.exit(1);
  }

  // Commit changes
  if (!executeCommand(`git commit -m "${commitMessage}"`, 'Committing changes')) {
    process.exit(1);
  }

  // Push to remote
  if (!executeCommand('git push', 'Pushing to remote repository')) {
    process.exit(1);
  }

  log('\n🎉 Quick commit completed successfully!', 'green');
  rl.close();
}

quickCommit().catch(error => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
