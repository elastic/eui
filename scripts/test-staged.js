const { execSync } = require('child_process');

// find names of staged files
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .toString()
  .split(/[\r\n]+/g);

// execute tests related to the staged files
execSync(`yarn test-unit --findRelatedTests ${stagedFiles.join(' ')}`, {
  stdio: 'inherit',
});
