const { getJestConfig } = require('@storybook/test-runner');

const defaultConfig = getJestConfig();

module.exports = {
  ...defaultConfig,
  modulePathIgnorePatterns: [
    ...(defaultConfig.modulePathIgnorePatterns ?? []),
    // Prevent jest-haste-map from scanning `eui-docgen`'s compiled JSON mocks,
    // which duplicate the TypeScript mocks in `packages/eui/src` and cause warnings
    'eui-docgen/dist',
  ],
};
