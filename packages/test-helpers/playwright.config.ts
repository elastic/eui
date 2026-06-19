/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { defineConfig, devices } from '@playwright/test';

const STORYBOOK_PORT = 6006;
const STORYBOOK_URL = `http://localhost:${STORYBOOK_PORT}`;
const STORYBOOK_STATIC_DIR = '../eui/storybook-static';

/**
 * Locally, `webServer` reuses the already-running Storybook dev server; in CI it
 * serves the prebuilt static Storybook (see the package README). Defaults track
 * kbn-scout's config (test-id attribute, timeouts, no auto-retries) for
 * cross-team consistency.
 */
export default defineConfig({
  testDir: './src',
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: STORYBOOK_URL,
    testIdAttribute: 'data-test-subj',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npx http-server ${STORYBOOK_STATIC_DIR} --port ${STORYBOOK_PORT} --silent`,
    url: STORYBOOK_URL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
