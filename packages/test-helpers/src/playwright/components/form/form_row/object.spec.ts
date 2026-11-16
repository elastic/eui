/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFormRowObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFormRowObject` against the live component in EUI Storybook.
 * The Playground story has a label, a help text and a text field.
 */

const TEST_SUBJ = 'testFormRow';

const PLAYGROUND_URL = storyUrl(
  'forms-euiform-euiformrow--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiFormRowObject', () => {
  test('reads the label and help text', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getLabel()).toBe('Text field label');
    expect(await row.getHelpTexts()).toEqual([
      'I am some friendly help text.',
    ]);
    expect(await row.getErrors()).toEqual([]);
    expect(await row.isInvalid()).toBe(false);
  });

  test('reads the errors when invalid', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};isInvalid:!true;error:Required`);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getErrors()).toEqual(['Required']);
    expect(await row.isInvalid()).toBe(true);
    await expect(row.errors).toBeVisible();
  });

  test('reads an invalid label without an error', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};isInvalid:!true`);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getErrors()).toEqual([]);
    expect(await row.isInvalid()).toBe(true);
  });

  test('reads an error without a label', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};label:;isInvalid:!true;error:Required`);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getLabel()).toBe('');
    expect(await row.getErrors()).toEqual(['Required']);
    expect(await row.isInvalid()).toBe(true);
  });

  test('hides the error while valid', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};error:Required`);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getErrors()).toEqual([]);
    expect(await row.isInvalid()).toBe(false);
  });

  test('returns empty values without label and help text', async ({
    page,
  }) => {
    await page.goto(`${PLAYGROUND_URL};label:;helpText:`);
    const row = new EuiFormRowObject(page, TEST_SUBJ);

    expect(await row.getLabel()).toBe('');
    expect(await row.getHelpTexts()).toEqual([]);
    expect(await row.isInvalid()).toBe(false);
  });
});
