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

const TEST_SUBJ = 'testConfirmModal';

test.describe('EuiModalObject', () => {
  test.describe('against EuiConfirmModal', () => {
    // EuiConfirmModal renders EuiModal underneath, but is validated against
    // its own story rather than assumed from EuiModal's.
    const CONFIRM_MODAL_URL = storyUrl(
      'layout-euiconfirmmodal--playground',
      `data-test-subj:${TEST_SUBJ}`
    );

    test('closeButton resolves to exactly one element', async ({ page }) => {
      await page.goto(CONFIRM_MODAL_URL);
      await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
      const modal = new EuiModalObject(page, TEST_SUBJ);

      await expect(modal.closeButton).toHaveCount(1);
    });
  });
});
