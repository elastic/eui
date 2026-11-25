/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiTextAreaObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiTextAreaObject` against the live component in EUI Storybook.
 * The Playground story is uncontrolled, so typed text sticks.
 */

const TEST_SUBJ = 'testTextArea';

const PLAYGROUND_URL = storyUrl(
  'forms-euitextarea--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiTextAreaObject', () => {
  test('fill replaces the text, line breaks included', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiTextAreaObject(page, TEST_SUBJ);

    expect(await field.getValue()).toBe('');
    await field.fill('first');
    await field.fill('second\nline');
    expect(await field.getValue()).toBe('second\nline');
  });

  test('clear empties the textarea', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const field = new EuiTextAreaObject(page, TEST_SUBJ);

    await field.fill('logs');
    await field.clear();
    expect(await field.getValue()).toBe('');
  });
});
