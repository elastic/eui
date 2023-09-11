const { execSync } = require('child_process');

// https://jestjs.io/docs/cli#--changedsince
execSync(`yarn test-unit --changedSince main`, {
  stdio: 'inherit',
});
