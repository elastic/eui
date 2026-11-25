/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import { EuiBadgeObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiBadgeObject` against the live component in EUI Storybook.
 * `onClick` and `iconOnClick` are boolean toggles on the Playground story.
 */

const TEST_SUBJ = 'testBadge';

const PLAYGROUND_URL = storyUrl(
  'display-euibadge-euibadge--playground',
  `data-test-subj:${TEST_SUBJ}`
);

/** Records the `aria-label` of every clicked button on `<body data-clicked>`. */
const recordClicks = (page: Page) =>
  page.evaluate(() => {
    document.body.dataset.clicked = '';
    document.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', () => {
        document.body.dataset.clicked += `${button.getAttribute(
          'aria-label'
        )},`;
      })
    );
  });

const getClicked = async (page: Page): Promise<string[]> =>
  ((await page.locator('body').getAttribute('data-clicked')) ?? '')
    .split(',')
    .filter(Boolean);

test.describe('EuiBadgeObject', () => {
  test('getText reads a plain badge', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const badge = new EuiBadgeObject(page, TEST_SUBJ);

    expect(await badge.getText()).toBe('Badge text');
    await expect(badge.iconButton).toHaveCount(0);
  });

  test('click works on an href badge', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};href:somewhere`);
    const badge = new EuiBadgeObject(page, TEST_SUBJ);

    await badge.click();
    await expect(page).toHaveURL(/\/somewhere$/);
  });

  test('click works on an onClick badge', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};onClick:!true;onClickAriaLabel:Act`);
    const badge = new EuiBadgeObject(page, TEST_SUBJ);

    await expect(page.getByRole('button', { name: 'Act' })).toBeVisible();
    await badge.click();
    expect(await badge.getText()).toBe('Badge text');
  });

  test('clickIcon works on an iconOnClick badge', async ({ page }) => {
    await page.goto(
      `${PLAYGROUND_URL};iconType:cross;iconOnClick:!true;iconOnClickAriaLabel:Remove`
    );
    const badge = new EuiBadgeObject(page, TEST_SUBJ);

    await expect(badge.iconButton).toHaveAccessibleName('Remove');
    await recordClicks(page);

    await badge.clickIcon();
    expect(await getClicked(page)).toEqual(['Remove']);
    expect(await badge.getText()).toBe('Badge text');
  });

  test.describe('with onClick and iconOnClick combined', () => {
    const COMBINED_URL = `${PLAYGROUND_URL};onClick:!true;onClickAriaLabel:Act;iconType:cross;iconOnClick:!true;iconOnClickAriaLabel:Remove`;

    test('click targets the text button', async ({ page }) => {
      await page.goto(COMBINED_URL);
      const badge = new EuiBadgeObject(page, TEST_SUBJ);
      await expect(badge.iconButton).toHaveAccessibleName('Remove');
      await recordClicks(page);

      await badge.click();
      expect(await getClicked(page)).toEqual(['Act']);
      expect(await badge.getText()).toBe('Badge text');
    });

    test('clickIcon targets the icon button', async ({ page }) => {
      await page.goto(COMBINED_URL);
      const badge = new EuiBadgeObject(page, TEST_SUBJ);
      await expect(badge.iconButton).toHaveAccessibleName('Remove');
      await recordClicks(page);

      await badge.clickIcon();
      expect(await getClicked(page)).toEqual(['Remove']);
    });
  });
});
