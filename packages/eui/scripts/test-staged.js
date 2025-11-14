const { execSync } = require('child_process');

const isShallowClone = () => {
  try {
    return execSync('git rev-parse --is-shallow-repository', { 
      encoding: 'utf8' 
    }).trim() === 'true';
  } catch (e) {
    return false;
  }
};

const tryUnshallow = () => {
  if (!isShallowClone()) return true;
  
  console.log('📦 Shallow clone detected, fetching full history...');
  try {
    execSync('git fetch --unshallow origin', { stdio: 'inherit' });
    execSync('git fetch origin main:main', { stdio: 'inherit' });
    console.log('✅ Successfully fetched full history');
    return true;
  } catch (e) {
    console.warn('⚠️  Could not fetch full history');
    return false;
  }
};

const canUseChangedSince = () => {
  try {
    execSync('git merge-base HEAD main', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Main logic: try to use --changedSince, fall back to all tests if needed
// https://jestjs.io/docs/cli#--changedsince
if (tryUnshallow() || canUseChangedSince()) {
  execSync(`yarn test-unit --changedSince main`, {
    stdio: 'inherit',
  });
} else {
  console.warn('⚠️  Running all tests (cannot determine changed files)');
  execSync(`yarn test-unit`, {
    stdio: 'inherit',
  });
}
