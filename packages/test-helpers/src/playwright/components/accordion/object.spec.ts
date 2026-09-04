/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiAccordionObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testAccordion';

const PLAYGROUND_URL = storyUrl('layout-euiaccordion--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiAccordionObject', () => {
  let accordion: EuiAccordionObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    accordion = new EuiAccordionObject(page, TEST_SUBJ);
  });

  test.describe('trigger', () => {
    test('reflects the closed state by default', async () => {
      await expect(accordion.trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('reflects the open state after a click', async () => {
      await accordion.trigger.click();

      await expect(accordion.trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('content', () => {
    test('resolves to exactly one element', async () => {
      await expect(accordion.content).toHaveCount(1);
    });
  });
});
