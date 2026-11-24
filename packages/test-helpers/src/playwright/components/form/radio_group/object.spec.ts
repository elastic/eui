/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiRadioGroupObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiRadioGroupObject` against the live component in EUI Storybook.
 * The Playground story keeps `idSelected` itself, so clicks stick.
 */

const TEST_SUBJ = 'testRadioGroup';

const PLAYGROUND_URL = storyUrl(
  'forms-euiradiogroup--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiRadioGroupObject', () => {
  test('reads the options and the selected one', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const group = new EuiRadioGroupObject(page, TEST_SUBJ);

    expect(await group.getOptions()).toEqual(['Radio 1', 'Radio 2', 'Radio 3']);
    expect(await group.getSelected()).toBe('Radio 2');
  });

  test('select checks the radio by its exact label', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const group = new EuiRadioGroupObject(page, TEST_SUBJ);

    await group.select('Radio 1');
    expect(await group.getSelected()).toBe('Radio 1');
    await group.select('Radio 1');
    expect(await group.getSelected()).toBe('Radio 1');
    await expect(group.input('Radio 2')).not.toBeChecked();
  });

  test('getSelected is null without a selection', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};idSelected:`);
    const group = new EuiRadioGroupObject(page, TEST_SUBJ);

    expect(await group.getSelected()).toBeNull();
  });
});
