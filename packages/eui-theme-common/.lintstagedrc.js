const { eslintTask } = require('../../scripts/lint-staged/eslint');
const { prettierTask } = require('../../scripts/lint-staged/prettier');

module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs}': prettierTask,
  'src/**/*.ts': eslintTask(__dirname, ['--max-warnings 0']),
  '**/*.scss':
    'stylelint --fix --allow-empty-input --quiet-deprecation-warnings',
};
