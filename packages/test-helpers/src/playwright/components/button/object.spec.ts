/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiButtonObject } from './object';
import { storyUrl } from '../../../storybook';

/** Validates `EuiButtonObject` against the live component in EUI Storybook. */

const TEST_SUBJ = 'testButton';

const PLAYGROUND_URL = storyUrl(
  'navigation-euibutton--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiButtonObject', () => {
  test('reads the text and clicks', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const button = new EuiButtonObject(page, TEST_SUBJ);

    expect(await button.getText()).toBe('Button');
    expect(await button.isDisabled()).toBe(false);
    expect(await button.isLoading()).toBe(false);
    await button.click();
  });

  test('reports the disabled state', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};isDisabled:!true`);
    const button = new EuiButtonObject(page, TEST_SUBJ);

    expect(await button.isDisabled()).toBe(true);
  });

  test('reports aria-disabled', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};isDisabled:!true;hasAriaDisabled:!true`);
    const button = new EuiButtonObject(page, TEST_SUBJ);

    expect(await button.isDisabled()).toBe(true);
  });

  test('reports the loading state', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};isLoading:!true`);
    const button = new EuiButtonObject(page, TEST_SUBJ);

    expect(await button.isLoading()).toBe(true);
  });
});
