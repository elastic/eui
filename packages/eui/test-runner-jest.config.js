const path = require('path');
const { getJestConfig } = require('@storybook/test-runner');

const defaultConfig = getJestConfig();

module.exports = {
  ...defaultConfig,
  testTimeout: 60_000,
  // Playwright + the hang-clock worker can leave open handles; without this
  // Jest logs "did not exit" and the CI job waits until the 30min timeout.
  forceExit: true,
  // Extends the test-runner's environment to restore VRT snapshot retries
  testEnvironment: path.resolve(__dirname, '.storybook/vrt.environment.mjs'),
  modulePathIgnorePatterns: [
    ...(defaultConfig.modulePathIgnorePatterns ?? []),
    // Prevent jest-haste-map from scanning `eui-docgen`'s compiled JSON mocks,
    // which duplicate the TypeScript mocks in `packages/eui/src` and cause warnings
    'eui-docgen/dist',
  ],
};
