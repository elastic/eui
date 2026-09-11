/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiToolTipObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiToolTipObject` against the live component in EUI Storybook.
 * The Playground story gives the trigger `autoFocus`, so the tooltip is shown
 * on load without an interaction.
 */

const TEST_SUBJ = 'testToolTip';

const PLAYGROUND_URL = storyUrl(
  'display-euitooltip--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiToolTipObject', () => {
  test('resolves to the portaled tooltip while shown and to nothing once hidden', async ({
    page,
  }) => {
    await page.goto(PLAYGROUND_URL);
    const toolTip = new EuiToolTipObject(page, TEST_SUBJ);
    const trigger = page.getByRole('button', { name: 'Tooltip trigger' });

    await expect(toolTip.locator).toHaveCount(1);
    await expect(toolTip.locator).toHaveText('tooltip content');

    await trigger.blur();
    await expect(toolTip.locator).toHaveCount(0);

    await trigger.hover();
    await expect(toolTip.locator).toHaveCount(1);
  });
});
