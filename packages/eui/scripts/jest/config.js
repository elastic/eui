const jestConfig = require('jest-config');
const getCacheDirectory = () => jestConfig.defaults.cacheDirectory;

// Set REACT_VERSION env variable to latest if empty or invalid
if (!['17', '18'].includes(process.env.REACT_VERSION)) {
  process.env.REACT_VERSION = '18';
}

const reactVersion = process.env.REACT_VERSION;

/**
 * Buildkite reporter requires a token to be set and this token is only
 * available when jest is running in our CI pipeline.
 */
const buildkiteTestReporterToken = process.env.BUILDKITE_ANALYTICS_TOKEN;
const isBuildkiteTestReporterAvailable =
  typeof buildkiteTestReporterToken === 'string' &&
  buildkiteTestReporterToken !== '';

if (isBuildkiteTestReporterAvailable) {
  console.log('Buildkite Test Analytics reporter available');
}

console.log(`Running tests on React v${reactVersion}`);

/** @type {import('jest').Config} */
const config = {
  rootDir: '../../',
  roots: [
    '<rootDir>/src/',
    '<rootDir>/scripts/babel',
    '<rootDir>/scripts/tests',
    '<rootDir>/scripts/eslint-plugin',
    '<rootDir>/.storybook',
  ],
  collectCoverageFrom: [
    'src/{components,services,global_styling}/**/*.{ts,tsx,js,jsx}',
    '!src/{components,services,global_styling}/**/*.{testenv,spec,a11y,stories}.{ts,tsx,js,jsx}',
    '!src/{components,services,global_styling}/index.ts',
    '!src/{components,services,global_styling}/**/*/index.ts',
    '!src/components/date_picker/react-datepicker/**/*.{js,jsx}',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/jest/mocks/file_mock.js',
    '\\.(css|less|scss)$': '<rootDir>/scripts/jest/mocks/style_mock.js',
    '^uuid$': require.resolve('uuid'),
  },
  setupFiles: [
    '<rootDir>/scripts/jest/setup/enzyme.js',
    '<rootDir>/scripts/jest/setup/throw_on_console_error.js',
    '<rootDir>/scripts/jest/setup/mocks.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/scripts/jest/setup/polyfills.js',
    '<rootDir>/scripts/jest/setup/unmount_enzyme.js',
    '<rootDir>/scripts/jest/setup/matchers.js',
  ],
  coverageDirectory: '<rootDir>/reports/jest-coverage',
  coverageReporters: ['json', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(js|tsx?)$': 'babel-jest',
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/enzyme-to-json/serializer',
    '<rootDir>/scripts/jest/setup/emotion',
  ],
  // react version and user permissions aware cache directory
  cacheDirectory: `${getCacheDirectory()}_react-${reactVersion}`,
  reporters: [
    'default',
    !!isBuildkiteTestReporterAvailable && [
      'buildkite-test-collector/jest/reporter',
      {
        token: buildkiteTestReporterToken,
      },
    ],
  ].filter(Boolean),
  // Include test location in test results for buildkite-test-collector
  testLocationInResults: true,
};

if (reactVersion === '17') {
  config.moduleNameMapper[
    '^@testing-library/react((\\\\/.*)?)$'
  ] = `@testing-library/react-17$1`;
  config.moduleNameMapper['^react((\\/.*)?)$'] = `react-${reactVersion}$1`;

  // This import override is here just to make jest module resolver happy.
  // The import wouldn't actually work if executed on React <18
  // since there's no such export as react-dom/client on previous
  // React versions
  config.moduleNameMapper['^react-dom/client'] = 'react-dom';

  config.moduleNameMapper[
    '^react-dom((\\/.*)?)$'
  ] = `react-dom-${reactVersion}$1`;
}

module.exports = config;
