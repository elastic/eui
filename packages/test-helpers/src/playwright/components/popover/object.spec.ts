/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiPopoverObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testPopover';

const PLAYGROUND_URL = storyUrl(
  'layout-euipopover-euipopover--playground',
  `data-test-subj:${TEST_SUBJ};isOpen:!false`
);

test.describe('EuiPopoverObject', () => {
  let popover: EuiPopoverObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    popover = new EuiPopoverObject(page, TEST_SUBJ);
  });

  test.describe('open', () => {
    test('opens a closed popover', async () => {
      await expect(popover.locator).toHaveAttribute('aria-expanded', 'false');

      await popover.open();

      await expect(popover.locator).toHaveAttribute('aria-expanded', 'true');
    });

    test('is a no-op when already open', async () => {
      await popover.open();
      await popover.open();

      await expect(popover.locator).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('close', () => {
    test('closes an open popover', async () => {
      await popover.open();

      await popover.close();

      await expect(popover.locator).toHaveAttribute('aria-expanded', 'false');
    });

    test('is a no-op when already closed', async () => {
      await popover.close();

      await expect(popover.locator).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
