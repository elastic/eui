const { eslintTask } = require('../../scripts/lint-staged/eslint');
const { prettierTask } = require('../../scripts/lint-staged/prettier');

module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs}': prettierTask,
  'src/**/*.{ts,tsx,js}': eslintTask(__dirname),
  '{**/*.styles.ts,src/themes/**/*.ts,src/global_styling/**/*.ts,**/*.scss}':
    'stylelint --fix --allow-empty-input --quiet-deprecation-warnings',
};
