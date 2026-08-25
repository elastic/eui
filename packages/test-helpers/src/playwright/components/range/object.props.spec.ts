/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiRangeObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testRange';

test.describe('EuiRangeObject', () => {
  test.describe('showInput (EuiRange only — a real EUI collision)', () => {
    // The Playground story's `showInput` control is a mixed-type radio
    // (`[false, true, 'inputWithPopover']`), so it needs Storybook's `!`-typed
    // arg syntax to deserialize to the boolean `true` rather than the string
    // `"true"`, which the control silently rejects in favor of its default.
    const SHOW_INPUT_URL = storyUrl(
      'forms-euirange--playground',
      `data-test-subj:${TEST_SUBJ};showInput:!true`
    );

    test('slider and numberInput each resolve to exactly one element, despite sharing testSubj', async ({
      page,
    }) => {
      await page.goto(SHOW_INPUT_URL);
      const range = new EuiRangeObject(page, TEST_SUBJ);
      // A plain `getByTestId(TEST_SUBJ)` would already be ambiguous here —
      // wait on the disambiguated `slider` instead.
      await range.slider.waitFor({ state: 'visible' });

      await expect(range.slider).toHaveCount(1);
      await expect(range.numberInput).toHaveCount(1);
      await expect(range.numberInput).toHaveJSProperty('value', '50');
    });
  });
});
