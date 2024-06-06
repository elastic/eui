const getCacheDirectory =
  require('jest-config/build/getCacheDirectory').default;

// Set REACT_VERSION env variable to latest if empty or invalid
if (!['16', '17', '18'].includes(process.env.REACT_VERSION)) {
  process.env.REACT_VERSION = '18';
}

const reactVersion = process.env.REACT_VERSION;

console.log(`Running tests on React v${reactVersion}`);

/** @type {import('jest').Config} */
const config = {
  rootDir: '../../',
  roots: [
    '<rootDir>/src/',
    '<rootDir>/src-docs/src/components',
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
  },
  setupFiles: [
    '<rootDir>/scripts/jest/setup/enzyme.js',
    '<rootDir>/scripts/jest/setup/throw_on_console_error.js',
    '<rootDir>/scripts/jest/setup/mocks.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/scripts/jest/setup/polyfills.js',
    '<rootDir>/scripts/jest/setup/unmount_enzyme.js',
  ],
  coverageDirectory: '<rootDir>/reports/jest-coverage',
  coverageReporters: ['json', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
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
};

if (['16', '17'].includes(reactVersion)) {
  config.moduleNameMapper[
    '^@testing-library/react((\\\\/.*)?)$'
  ] = `@testing-library/react-16-17$1`;
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
