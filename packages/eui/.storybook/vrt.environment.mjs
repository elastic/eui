/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import CustomEnvironment from '@storybook/test-runner/playwright/custom-environment.js';

/**
 * Restores the VRT snapshot retries that `jest.retryTimes(2)` configured
 * before @storybook/test-runner v0.20 - the `jest` object is no longer
 * reachable from `test-runner.ts`, so set the jest-circus retry globals
 * (registered symbols read by the test framework) on the test realm directly.
 */
class VrtEnvironment extends CustomEnvironment {
  async setup() {
    await super.setup();
    this.global[Symbol.for('RETRY_TIMES')] = 2;
    this.global[Symbol.for('LOG_ERRORS_BEFORE_RETRY')] = true;
  }
}

export default VrtEnvironment;
