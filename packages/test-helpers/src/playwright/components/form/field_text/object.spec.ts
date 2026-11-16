/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFieldTextObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFieldTextObject` against the live component in EUI Storybook.
 * The Playground story is uncontrolled, so typed text sticks.
 */

const TEST_SUBJ = 'testFieldText';

const PLAYGROUND_URL = storyUrl(
  'forms-euifieldtext--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiFieldTextObject', () => {
  test('fill replaces the text', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiFieldTextObject(page, TEST_SUBJ);

    expect(await field.getValue()).toBe('');
    await field.fill('first');
    await field.fill('second');
    expect(await field.getValue()).toBe('second');
  });

  test('clear empties the input', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiFieldTextObject(page, TEST_SUBJ);

    await field.fill('logs');
    await field.clear();
    expect(await field.getValue()).toBe('');
  });
});
