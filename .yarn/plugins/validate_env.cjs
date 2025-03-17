/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const path = require('node:path');
const fs = require('node:fs');
const { ReportError, MessageName, formatUtils } = require('@yarnpkg/core');

/**
 * Validate Node.js version and OS used
 */
const validateProject = (project) => {
  const { cwd, configuration } = project;
  const nvmrcPath = path.resolve(cwd, '.nvmrc');

  let expectedNodeVersion;
  try {
    expectedNodeVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
  } catch (e) {
    throw new Error(
      `Unexpected error occurred - .nvmrc not found in EUI root (${nvmrcPath})`
    );
  }

  const nodeVersion = process.version.substring(1); // prefixed with "v"
  if (expectedNodeVersion !== nodeVersion) {
    const message = formatUtils.pretty(
      configuration,
      `Detected incorrect Node.js version ${process.version} instead of the expected v${expectedNodeVersion}. Please run "nvm install && nvm use" and try again.`,
      'red'
    );
    throw new ReportError(MessageName.UNNAMED, message);
  }

  if (process.platform === 'win32') {
    const message = formatUtils.pretty(
      configuration,
      `Development on Windows is not supported. We recommend using WSL with your preferred Linux distro - https://learn.microsoft.com/en-us/windows/wsl/install`
    );
    throw new ReportError(MessageName.UNNAMED, message);
  }
};

module.exports = {
  name: 'plugin-eui-validate-env',
  factory: () => ({
    hooks: {
      validateProject,
    },
  }),
};
