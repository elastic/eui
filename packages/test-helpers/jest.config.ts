/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(js|tsx?)$': 'babel-jest',
  },
  moduleNameMapper: {
    'uuid': require.resolve('uuid'),
  },
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
  ],
};

export default config;
