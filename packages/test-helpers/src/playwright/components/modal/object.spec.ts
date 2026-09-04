/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiModalObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiModalObject` against the live component in EUI Storybook.
 * The Playground story's own onClose is just a logged action, not real
 * state, so this uses ToggleExample instead, which actually unmounts on
 * close.
 */

const TEST_SUBJ = 'testModal';

const TOGGLE_EXAMPLE_URL = storyUrl(
  'layout-euimodal-euimodal--toggle-example',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiModalObject', () => {
  let modal: EuiModalObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(TOGGLE_EXAMPLE_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    modal = new EuiModalObject(page, TEST_SUBJ);
  });

  test.describe('closeButton', () => {
    test('resolves to exactly one element', async () => {
      await expect(modal.closeButton).toHaveCount(1);
    });

    test('closing the modal removes it', async () => {
      await modal.closeButton.click();

      await expect(modal.locator).toHaveCount(0);
    });
  });
});
