/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiColorPickerObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiColorPickerObject` against the live component in EUI
 * Storybook. `EuiColorPicker` sets its anchor's `data-test-subj` to
 * `euiColorPickerAnchor <consumerSubj>`, which only the token-matching root
 * in the base class resolves.
 */

const TEST_SUBJ = 'testColorPicker';

const PLAYGROUND_URL = storyUrl(
  'forms-euicolorpicker-euicolorpicker--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiColorPickerObject', () => {
  let colorPicker: EuiColorPickerObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    colorPicker = new EuiColorPickerObject(page, TEST_SUBJ);
    await colorPicker.locator.waitFor({ state: 'visible' });
  });

  test('resolves to exactly one element despite the compound data-test-subj', async () => {
    await expect(colorPicker.locator).toHaveCount(1);
  });

  test('panel and swatches resolve only while open', async () => {
    await expect(colorPicker.panel).toHaveCount(0);

    await colorPicker.locator.click();

    await expect(colorPicker.panel).toHaveAttribute('data-popover-open', 'true');
    // The Playground story uses the default palette, so at least one swatch renders.
    await expect(colorPicker.swatches.first()).toBeVisible();
  });
});
