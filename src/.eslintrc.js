const { join } = require('path');

module.exports = {
  extends: '../.eslintrc.js',
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: join(__dirname, '..'),
        project: './tsconfig.json',
      },
      rules: {
        'local/text-in-jsx': 'error',
      },
    },
    {
      files: ['*.{test,spec}.tsx'],
      rules: {
        'local/text-in-jsx': 'off',
      },
    },
  ],
};
