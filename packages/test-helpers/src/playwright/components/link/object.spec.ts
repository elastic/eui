/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiLinkObject } from './object';
import { storyUrl } from '../../../storybook';

/** Validates `EuiLinkObject` against the live component in EUI Storybook. */

const TEST_SUBJ = 'testLink';

const PLAYGROUND_URL = storyUrl(
  'navigation-euilink--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiLinkObject', () => {
  test('reads the text and href', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const link = new EuiLinkObject(page, TEST_SUBJ);

    expect(await link.getText()).toBe('Elastic website');
    expect(await link.getHref()).toBe('http://www.elastic.co/');
    expect(await link.isDisabled()).toBe(false);
  });

  test('leaves the screen reader suffix out of an external link', async ({
    page,
  }) => {
    await page.goto(`${PLAYGROUND_URL};external:!true;target:_blank`);
    const link = new EuiLinkObject(page, TEST_SUBJ);

    expect(await link.getText()).toBe('Elastic website');
  });

  test('keeps the line breaks of the text', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const link = new EuiLinkObject(page, TEST_SUBJ);
    await page.locator('.euiLink').evaluate((element) => {
      element.innerHTML = 'First<br>Second';
    });

    expect(await link.getText()).toBe('First\nSecond');
  });

  test('renders as a button without href', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};href:!undefined`);
    const link = new EuiLinkObject(page, TEST_SUBJ);

    expect(await link.getHref()).toBe('');
    await link.click();
  });

  test('reports the disabled state', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};href:!undefined;disabled:!true`);
    const link = new EuiLinkObject(page, TEST_SUBJ);

    expect(await link.isDisabled()).toBe(true);
  });
});
