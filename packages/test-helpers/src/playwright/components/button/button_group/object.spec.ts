/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiButtonGroupObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiButtonGroupObject` against the live component in EUI
 * Storybook. The selection stories keep their own state.
 */

const TEST_SUBJ = 'testButtonGroup';

const SINGLE_URL = storyUrl(
  'navigation-euibuttongroup--single-selection',
  `data-test-subj:${TEST_SUBJ}`
);

const CHILDREN_ICON_URL = storyUrl(
  'navigation-euibuttongroup--selection-icon-only',
  `data-test-subj:${TEST_SUBJ}`
);

const MULTI_URL = storyUrl(
  'navigation-euibuttongroup--multi-selection',
  `data-test-subj:${TEST_SUBJ}`
);


test.describe('EuiButtonGroupObject', () => {
  test('lists the options', async ({ page }) => {
    await page.goto(SINGLE_URL);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    expect(await group.getOptions()).toEqual([
      'Option one',
      'Option two',
      'Option three',
    ]);
  });

  test('select moves the single selection', async ({ page }) => {
    await page.goto(SINGLE_URL);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    expect(await group.getSelected()).toEqual(['Option one']);
    await group.select('Option three');
    await group.select('Option three');
    expect(await group.getSelected()).toEqual(['Option three']);
  });

  test('select and deselect change a multi selection', async ({ page }) => {
    await page.goto(MULTI_URL);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    expect(await group.getSelected()).toEqual(['Option one']);
    await group.select('Option three');
    expect(await group.getSelected()).toEqual(['Option one', 'Option three']);
    await group.deselect('Option one');
    expect(await group.getSelected()).toEqual(['Option three']);
  });

  test('reads children API icon buttons by their aria-label', async ({
    page,
  }) => {
    await page.goto(CHILDREN_ICON_URL);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    expect(await group.getOptions()).toEqual([
      'Grid view',
      'List view',
      'Map view',
    ]);
    expect(await group.getSelected()).toEqual(['Grid view']);
    await group.select('Map view');
    expect(await group.getSelected()).toEqual(['Map view']);
  });

  test('deselect is a no-op on a button without aria-pressed', async ({
    page,
  }) => {
    await page.goto(MULTI_URL);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    await group.deselect('Option two');
    expect(await group.getSelected()).toEqual(['Option one']);
  });

  test('addresses icon-only buttons by their hidden label', async ({
    page,
  }) => {
    await page.goto(`${SINGLE_URL};isIconOnly:!true`);
    const group = new EuiButtonGroupObject(page, TEST_SUBJ);

    expect(await group.getOptions()).toEqual([
      'Option one',
      'Option two',
      'Option three',
    ]);
    await group.select('Option two');
    expect(await group.getSelected()).toEqual(['Option two']);
  });
});
