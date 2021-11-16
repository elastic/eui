const { join } = require('path');

module.exports = {
  extends: '../.eslintrc.js',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: join(__dirname, '..'),
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      rules: {
        'local/copy-in-jsx': 'error',
      },
    },
    {
      files: ['*.{test,spec}.tsx'],
      rules: {
        'local/copy-in-jsx': 'off',
      },
    },
  ],
};
