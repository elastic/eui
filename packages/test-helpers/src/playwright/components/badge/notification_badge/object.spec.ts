/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiNotificationBadgeObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiNotificationBadgeObject` against the live component in EUI Storybook.
 */

const TEST_SUBJ = 'testNotificationBadge';

const PLAYGROUND_URL = storyUrl(
  'display-euinotificationbadge--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiNotificationBadgeObject', () => {
  test('reads the text and the count', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const badge = new EuiNotificationBadgeObject(page, TEST_SUBJ);

    expect(await badge.getText()).toBe('5');
    expect(await badge.getCount()).toBe(5);
  });

  test('getCount is NaN for non numeric text', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};children:new`);
    const badge = new EuiNotificationBadgeObject(page, TEST_SUBJ);

    expect(await badge.getText()).toBe('new');
    expect(await badge.getCount()).toBeNaN();
  });
});
