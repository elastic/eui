/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiRangeObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiRangeObject` against the live component in EUI Storybook. The
 * Playground story renders a plain `EuiRange` with `showInput` unset
 * (default `false`), so the slider is the only element `data-test-subj`
 * resolves to. `object.props.spec.ts` covers the `showInput` collision case.
 */

const TEST_SUBJ = 'testRange';

const PLAYGROUND_URL = storyUrl('forms-euirange--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiRangeObject', () => {
  let range: EuiRangeObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    range = new EuiRangeObject(page, TEST_SUBJ);
  });

  test.describe('slider', () => {
    test('resolves to exactly one element', async () => {
      await expect(range.slider).toHaveCount(1);
    });
  });

  test.describe('numberInput', () => {
    test('resolves to zero elements when showInput is unset', async () => {
      await expect(range.numberInput).toHaveCount(0);
    });
  });
});

test.describe('EuiRangeObject against EuiDualRange', () => {
  // EuiDualRange is a separate component from EuiRange, not a variant of it.
  // Validated against its own story rather than assumed from EuiRange's.
  const DUAL_RANGE_URL = storyUrl('forms-euidualrange--playground', `data-test-subj:${TEST_SUBJ}`);

  test('slider resolves to exactly one element', async ({ page }) => {
    await page.goto(DUAL_RANGE_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    const range = new EuiRangeObject(page, TEST_SUBJ);

    await expect(range.slider).toHaveCount(1);
  });
});
