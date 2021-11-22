const { join } = require('path');

module.exports = {
  extends: '../.eslintrc.js',
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      excludedFiles: ['*.@(spec|test).{ts,tsx}'],
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: join(__dirname, '..'),
        project: './tsconfig.json',
      },
      rules: {
        'local/text-in-jsx': 'error',
      },
    },
  ],
};
