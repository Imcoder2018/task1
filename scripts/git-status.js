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

function executeCommand(command, description, silent = false) {
  try {
    if (!silent) log(`\n📊 ${description}...`, 'cyan');
    const output = execSync(command, { encoding: 'utf8' });
    if (!silent) log(`✅ ${description} completed!`, 'green');
    return output;
  } catch (error) {
    if (!silent) log(`❌ ${description} failed: ${error.message}`, 'red');
    return null;
  }
}

function gitStatus() {
  log('\n📊 Git Status Report', 'bright');
  log('===================', 'cyan');

  // Check if git repository exists
  const isGitRepo = executeCommand('git rev-parse --is-inside-work-tree', 'Checking git repository', true);
  if (!isGitRepo) {
    log('❌ Not a git repository. Run "npm run setup-git" first.', 'red');
    return;
  }

  // Current branch
  const branch = executeCommand('git branch --show-current', 'Getting current branch', true);
  if (branch) {
    log(`\n🌿 Current Branch: ${branch.trim()}`, 'green');
  }

  // Remote information
  const remote = executeCommand('git remote -v', 'Getting remote information', true);
  if (remote) {
    log('\n🔗 Remote Repositories:', 'yellow');
    console.log(remote);
  }

  // Git status
  const status = executeCommand('git status --porcelain', 'Getting working directory status', true);
  if (status) {
    if (status.trim()) {
      log('\n📝 Working Directory Changes:', 'yellow');
      console.log(status);
    } else {
      log('\n✅ Working directory is clean', 'green');
    }
  }

  // Recent commits
  const commits = executeCommand('git log --oneline -10', 'Getting recent commits', true);
  if (commits) {
    log('\n📚 Recent Commits (last 10):', 'blue');
    console.log(commits);
  }

  // Commit statistics
  const stats = executeCommand('git log --since="1 month ago" --pretty=format:"%an" | sort | uniq -c | sort -nr', 'Getting commit statistics', true);
  if (stats) {
    log('\n📈 Commit Statistics (last month):', 'magenta');
    console.log(stats);
  }

  // Tags
  const tags = executeCommand('git tag -l', 'Getting tags', true);
  if (tags && tags.trim()) {
    log('\n🏷️  Tags:', 'cyan');
    console.log(tags);
  } else {
    log('\n🏷️  No tags found', 'yellow');
  }

  // Stash list
  const stash = executeCommand('git stash list', 'Getting stash list', true);
  if (stash && stash.trim()) {
    log('\n💾 Stash List:', 'yellow');
    console.log(stash);
  }

  log('\n📊 Git status report completed!', 'green');
}

gitStatus();
