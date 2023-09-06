const { execSync } = require('child_process');

// find names of staged files
const stagedFiles = execSync(
  'git diff main...HEAD --name-only --diff-filter=ACMR'
)
  .toString()
  .split(/[\r\n]+/g);

// execute tests related to the staged files
execSync(`yarn test-unit --findRelatedTests ${stagedFiles.join(' ')}`, {
  stdio: 'inherit',
});
