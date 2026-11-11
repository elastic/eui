/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiEmptyPromptObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiEmptyPromptObject` against the live component in EUI
 * Storybook. The Playground story has a title, a body, two actions and a
 * footer, the PageTemplate story a single action.
 */

const TEST_SUBJ = 'testEmptyPrompt';

const PLAYGROUND_URL = storyUrl(
  'display-euiemptyprompt--playground',
  `data-test-subj:${TEST_SUBJ}`
);

/** The PageTemplate story has a single action. */
const PAGE_TEMPLATE_URL = storyUrl(
  'display-euiemptyprompt--page-template',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiEmptyPromptObject', () => {
  test('reads the title and body', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);

    expect(await prompt.getTitle()).toBe('Start adding cases');
    expect(await prompt.getBody()).toBe(
      'Add a new case or change your filter settings.'
    );
  });

  test('returns empty strings without title and body', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};body:`);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);

    expect(await prompt.getBody()).toBe('');
  });

  test('lists and clicks the actions', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);

    expect(await prompt.getActions()).toEqual(['Upgrade', 'Start a trial']);
    await expect(prompt.action('Upgrade')).toBeVisible();
    await prompt.clickAction('Start a trial');
  });

  test('ignores a link in the body with the same name', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);
    await page
      .locator('.euiEmptyPrompt__content > .euiText')
      .evaluate((body) => {
        body.insertAdjacentHTML('beforeend', '<a href="#">Upgrade</a>');
      });

    await expect(prompt.action('Upgrade')).toHaveCount(1);
    await expect(prompt.action('Upgrade')).toHaveRole('button');
    expect(await prompt.getActions()).toEqual(['Upgrade', 'Start a trial']);
  });

  test('reads and clicks a single action', async ({ page }) => {
    await page.goto(PAGE_TEMPLATE_URL);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);

    expect(await prompt.getActions()).toEqual(['Create visualization']);
    await prompt.clickAction('Create visualization');
  });

  test('exposes the footer', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const prompt = new EuiEmptyPromptObject(page, TEST_SUBJ);

    await expect(prompt.footer).toContainText('Want to learn more?');
  });
});
