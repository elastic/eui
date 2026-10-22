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
 * Validates `EuiCallOutObject` against the live component in EUI Storybook.
 * The Playground story has a title and text and no dismiss button.
 */

const TEST_SUBJ = 'testCallOut';

const STORY_ID = 'display-euicallout--playground';

test.describe('EuiCallOutObject', () => {
  let callOut: EuiCallOutObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(storyUrl(STORY_ID, `data-test-subj:${TEST_SUBJ}`));
    callOut = new EuiCallOutObject(page, TEST_SUBJ);
    await callOut.locator.waitFor({ state: 'visible' });
  });

  test('resolves the root, not the derived inner blocks', async () => {
    await expect(callOut.locator).toHaveCount(1);
    await expect(callOut.locator).toHaveAttribute('data-test-subj', TEST_SUBJ);
  });

  test.describe('getTitle and getText', () => {
    test('read the title and the text block', async () => {
      expect(await callOut.getTitle()).toBe('Callout title');
      expect(await callOut.getText()).toBe('A short callout text');
    });

    test('return an empty string when the text prop is absent', async ({
      page,
    }) => {
      await page.goto(
        storyUrl(STORY_ID, `data-test-subj:${TEST_SUBJ};text:!undefined`)
      );
      const titleOnly = new EuiCallOutObject(page, TEST_SUBJ);
      await titleOnly.locator.waitFor({ state: 'visible' });

      expect(await titleOnly.getTitle()).toBe('Callout title');
      expect(await titleOnly.getText()).toBe('');
    });
  });

  test.describe('getColor', () => {
    test('reads the default color', async () => {
      expect(await callOut.getColor()).toBe('primary');
    });

    test('reads a non default color', async ({ page }) => {
      await page.goto(
        storyUrl(STORY_ID, `data-test-subj:${TEST_SUBJ};color:warning`)
      );
      const warning = new EuiCallOutObject(page, TEST_SUBJ);
      await warning.locator.waitFor({ state: 'visible' });

      expect(await warning.getColor()).toBe('warning');
    });
  });

  test.describe('dismissButton', () => {
    test('is absent without onDismiss', async () => {
      await expect(callOut.dismissButton).toHaveCount(0);
    });
  });
});
