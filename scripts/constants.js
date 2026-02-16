const IGNORE_BUILD = ['**/webpack.config.js', '**/*.d.ts'];
const IGNORE_TESTS = [
  '**/*.test.js',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.tsx',
  '**/*.stories.ts',
  '**/*.stories.tsx',
  '**/*.docgen.tsx',
  '**/**.stories.utils.ts',
  '**/**.stories.utils.tsx',
  '**/*.mdx',
  '**/test/internal/**/*.ts',
  '**/test/internal/**/*.tsx',
  '**/__mocks__/**',
];
const IGNORE_TESTENV = [
  '**/*.testenv.js',
  '**/*.testenv.tsx',
  '**/*.testenv.ts',
];
const IGNORE_PACKAGES = ['**/react-datepicker/test/**/*.js'];

module.exports = {
  IGNORE_BUILD,
  IGNORE_TESTS,
  IGNORE_TESTENV,
  IGNORE_PACKAGES,
};
