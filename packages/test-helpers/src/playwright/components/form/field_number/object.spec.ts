/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFieldNumberObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFieldNumberObject` against the live component in EUI Storybook.
 * The Playground story is uncontrolled, so typed values stick.
 */

const TEST_SUBJ = 'testFieldNumber';

const PLAYGROUND_URL = storyUrl(
  'forms-euifieldnumber--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiFieldNumberObject', () => {
  test('fill accepts numbers and strings', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiFieldNumberObject(page, TEST_SUBJ);

    expect(await field.getValue()).toBe('');
    await field.fill(42);
    expect(await field.getValue()).toBe('42');
    await field.fill('-1.5');
    expect(await field.getValue()).toBe('-1.5');
  });

  test('clear empties the input', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiFieldNumberObject(page, TEST_SUBJ);

    await field.fill(7);
    await field.clear();
    expect(await field.getValue()).toBe('');
  });
});
