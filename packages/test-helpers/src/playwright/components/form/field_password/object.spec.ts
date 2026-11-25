/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFieldPasswordObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFieldPasswordObject` against the live component in EUI Storybook.
 * The Playground story is uncontrolled, so typed text sticks.
 */

const TEST_SUBJ = 'testFieldPassword';

const PLAYGROUND_URL = storyUrl(
  'forms-euifieldpassword--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiFieldPasswordObject', () => {
  test('fill, getValue and clear work while masked', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiFieldPasswordObject(page, TEST_SUBJ);

    expect(await field.isMasked()).toBe(true);
    await field.fill('hunter2');
    expect(await field.getValue()).toBe('hunter2');
    await field.clear();
    expect(await field.getValue()).toBe('');
  });

  test('toggleVisibility flips a dual field', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};type:dual`);
    const field = new EuiFieldPasswordObject(page, TEST_SUBJ);

    await field.fill('hunter2');
    expect(await field.isMasked()).toBe(true);
    await field.toggleVisibility();
    expect(await field.isMasked()).toBe(false);
    expect(await field.getValue()).toBe('hunter2');
    await field.toggleVisibility();
    expect(await field.isMasked()).toBe(true);
  });

  test('toggleVisibility skips a consumer append button, also from a Locator scope', async ({
    page,
  }) => {
    await page.goto(`${PLAYGROUND_URL};type:dual;append:button`);
    const field = new EuiFieldPasswordObject(
      page.locator('#storybook-root'),
      TEST_SUBJ
    );

    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
    await field.toggleVisibility();
    expect(await field.isMasked()).toBe(false);
  });
});
