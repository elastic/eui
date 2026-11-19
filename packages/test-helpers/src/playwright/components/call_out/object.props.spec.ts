/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiCallOutObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiCallOutObject` against a dismissible call out. The Playground
 * story's `onDismiss` toggle logs the callback instead of unmounting, so the
 * click itself is the observable outcome.
 */

const TEST_SUBJ = 'testCallOut';

test.describe('EuiCallOutObject (onDismiss)', () => {
  let callOut: EuiCallOutObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      storyUrl(
        'display-euicallout--playground',
        `data-test-subj:${TEST_SUBJ};onDismiss:!true`
      )
    );
    callOut = new EuiCallOutObject(page, TEST_SUBJ);
    await callOut.locator.waitFor({ state: 'visible' });
  });

  test('exposes the dismiss button and clicks it', async () => {
    await expect(callOut.dismissButton).toBeVisible();

    await callOut.dismiss();

    await expect(callOut.dismissButton).toBeFocused();
  });
});
