import { createJsWithTsEsmPreset } from 'ts-jest';

const presetConfig = createJsWithTsEsmPreset();

const config = {
  ...presetConfig,
};

export default config;
