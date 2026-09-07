/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiGlobalToastListObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiGlobalToastListObject` against the live component in EUI
 * Storybook. The Playground story is stateful: it starts with one toast,
 * wires `dismissToast`, and renders an "Add toast" button. `data-test-subj`
 * is injected via Storybook's `args` URL parameter onto the list element.
 */

const TEST_SUBJ = 'testToastList';

const PLAYGROUND_URL = storyUrl(
  'display-euitoast-euiglobaltoastlist-euiglobaltoastlist--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiGlobalToastListObject', () => {
  let toastList: EuiGlobalToastListObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    toastList = new EuiGlobalToastListObject(page, TEST_SUBJ);
  });

  test.describe('toasts', () => {
    test('locates the toasts in the list', async () => {
      await expect(toastList.toasts).toHaveCount(1);
      await expect(toastList.toasts).toContainText('Hello from Toast!');
    });

    test('tracks toasts as they are added', async ({ page }) => {
      await page.getByRole('button', { name: 'Add toast' }).click();

      await expect(toastList.toasts).toHaveCount(2);
    });
  });

  test.describe('closeAll', () => {
    test('closes every toast', async ({ page }) => {
      await page.getByRole('button', { name: 'Add toast' }).click();
      await expect(toastList.toasts).toHaveCount(2);

      await toastList.closeAll();

      await expect(toastList.toasts).toHaveCount(0);
    });

    test('is a no-op when the list is empty', async () => {
      await toastList.closeAll();
      await expect(toastList.toasts).toHaveCount(0);

      await toastList.closeAll();

      await expect(toastList.toasts).toHaveCount(0);
    });
  });
});
