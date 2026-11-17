const { eslintTask } = require('../../scripts/lint-staged/eslint');

module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs}': 'prettier --write',
  'src/**/*.ts': eslintTask(__dirname, ['--max-warnings 0']),
  '**/*.scss':
    'stylelint --fix --allow-empty-input --quiet-deprecation-warnings',
};
