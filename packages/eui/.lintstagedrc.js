const { eslintTask } = require('../../scripts/lint-staged/eslint');

module.exports = {
  '*.{ts,tsx,js,jsx,mjs,cjs}': 'prettier --write',
  'src/**/*.{ts,tsx,js}': eslintTask(__dirname),
  '{**/*.styles.ts,src/themes/**/*.ts,src/global_styling/**/*.ts,**/*.scss}':
    'stylelint --fix --allow-empty-input --quiet-deprecation-warnings',
};
