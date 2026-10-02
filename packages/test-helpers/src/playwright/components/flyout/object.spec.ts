/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFlyoutObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testFlyout';

const PLAYGROUND_URL = storyUrl('layout-euiflyout-euiflyout--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiFlyoutObject', () => {
  let flyout: EuiFlyoutObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    flyout = new EuiFlyoutObject(page, TEST_SUBJ);
  });

  test.describe('closeButton', () => {
    test('resolves to exactly one element', async () => {
      await expect(flyout.closeButton).toHaveCount(1);
    });

    test('closing the flyout removes it', async () => {
      await flyout.closeButton.click();

      await expect(flyout.locator).toHaveCount(0);
    });
  });
});
