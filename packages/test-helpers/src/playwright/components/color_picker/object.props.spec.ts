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
 * Validates `EuiColorPickerObject` against a custom `button` anchor, where
 * the hex input is inside the panel instead of being the anchor.
 */

const TEST_SUBJ = 'testColorPicker';
const STORY_ID = 'forms-euicolorpicker-euicolorpicker--with-custom-button';

test.describe('EuiColorPickerObject with a custom button', () => {
  let colorPicker: EuiColorPickerObject;

  test.describe('secondaryInputDisplay="bottom"', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(storyUrl(STORY_ID, `data-test-subj:${TEST_SUBJ}`));
      colorPicker = new EuiColorPickerObject(page, TEST_SUBJ);
      await colorPicker.locator.waitFor({ state: 'visible' });
    });

    test('resolves the button as the anchor', async () => {
      await expect(colorPicker.locator).toHaveCount(1);
      await expect(colorPicker.locator).toHaveRole('button');
    });

    test('setColor opens, fills the panel input and closes again', async () => {
      await colorPicker.setColor('#00ff00');

      await expect(colorPicker.panel).toHaveCount(0);
      expect(await colorPicker.getColor()).toBe('#00FF00');
      await expect(colorPicker.panel).toHaveCount(0);
    });
  });

  test.describe('secondaryInputDisplay="none"', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        storyUrl(STORY_ID, `data-test-subj:${TEST_SUBJ};secondaryInputDisplay:none`)
      );
      colorPicker = new EuiColorPickerObject(page, TEST_SUBJ);
      await colorPicker.locator.waitFor({ state: 'visible' });
    });

    test('setColor throws a descriptive error', async () => {
      await expect(colorPicker.setColor('#0000ff')).rejects.toThrow(/secondaryInputDisplay/);
    });
  });
});
