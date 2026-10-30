/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiCardObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiCardObject` against the live component in EUI Storybook.
 * The Playground story keeps the `selectable` state itself.
 */

const TEST_SUBJ = 'testCard';

const PLAYGROUND_URL = storyUrl(
  'display-euicard--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiCardObject', () => {
  test('reads the title and description', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const card = new EuiCardObject(page, TEST_SUBJ);

    expect(await card.getTitle()).toBe('Card title');
    expect(await card.getDescription()).toBe('Card description');
  });

  test('getDescription returns null without a description', async ({
    page,
  }) => {
    await page.goto(`${PLAYGROUND_URL};description:`);
    const card = new EuiCardObject(page, TEST_SUBJ);

    expect(await card.getTitle()).toBe('Card title');
    expect(await card.getDescription()).toBeNull();
  });

  test('toggleSelected flips the selectable switch', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};selectable:!true`);
    const card = new EuiCardObject(page, TEST_SUBJ);

    expect(await card.isSelected()).toBe(false);
    await card.toggleSelected();
    expect(await card.isSelected()).toBe(true);
    await card.toggleSelected();
    expect(await card.isSelected()).toBe(false);
  });

  test('click fires the card onClick', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};onClick:!true`);
    const card = new EuiCardObject(page, TEST_SUBJ);
    await card.locator.evaluate((node) => {
      (window as unknown as { clicked: boolean }).clicked = false;
      node.addEventListener(
        'click',
        () => ((window as unknown as { clicked: boolean }).clicked = true)
      );
    });

    await card.click();

    expect(
      await card.locator.evaluate(
        () => (window as unknown as { clicked: boolean }).clicked
      )
    ).toBe(true);
  });
});
