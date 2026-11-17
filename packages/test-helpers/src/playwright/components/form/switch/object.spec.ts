/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSwitchObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiSwitchObject` against the live component in EUI Storybook.
 * The Playground story keeps the `checked` state itself.
 */

const TEST_SUBJ = 'testSwitch';

const PLAYGROUND_URL = storyUrl(
  'forms-euiswitch--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiSwitchObject', () => {
  test('check and uncheck change the state once', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const toggle = new EuiSwitchObject(page, TEST_SUBJ);

    expect(await toggle.isChecked()).toBe(false);
    await toggle.check();
    await toggle.check();
    expect(await toggle.isChecked()).toBe(true);
    await toggle.uncheck();
    expect(await toggle.isChecked()).toBe(false);
  });

  test('toggle flips the state', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};checked:!true`);
    const toggle = new EuiSwitchObject(page, TEST_SUBJ);

    expect(await toggle.isChecked()).toBe(true);
    await toggle.toggle();
    expect(await toggle.isChecked()).toBe(false);
    await toggle.toggle();
    expect(await toggle.isChecked()).toBe(true);
  });
});
