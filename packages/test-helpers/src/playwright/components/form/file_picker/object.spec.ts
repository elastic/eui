/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFilePickerObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFilePickerObject` against the live component in EUI Storybook.
 * Files are passed as buffers so no fixture files are needed.
 */

const TEST_SUBJ = 'testFilePicker';

const PLAYGROUND_URL = storyUrl(
  'forms-euifilepicker--playground',
  `data-test-subj:${TEST_SUBJ}`
);

const file = (name: string) => ({
  name,
  mimeType: 'text/plain',
  buffer: Buffer.from(name),
});

test.describe('EuiFilePickerObject', () => {
  test('setFiles picks one file and shows its name', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const picker = new EuiFilePickerObject(page, TEST_SUBJ);

    expect(await picker.getFileNames()).toEqual([]);
    await picker.setFiles(file('logs.txt'));
    expect(await picker.getFileNames()).toEqual(['logs.txt']);
    await expect(picker.prompt).toHaveText('logs.txt');
  });

  test('setFiles picks several files on a multiple picker', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};multiple:!true`);
    const picker = new EuiFilePickerObject(page, TEST_SUBJ);

    await picker.setFiles([file('a.txt'), file('b.txt')]);
    expect(await picker.getFileNames()).toEqual(['a.txt', 'b.txt']);
    await expect(picker.prompt).toHaveText('2 files selected');
  });

  test('clear removes the files on both displays', async ({ page }) => {
    for (const display of ['large', 'default']) {
      await page.goto(`${PLAYGROUND_URL};display:${display}`);
      const picker = new EuiFilePickerObject(page, TEST_SUBJ);

      await picker.setFiles(file('logs.txt'));
      await picker.clear();
      expect(await picker.getFileNames()).toEqual([]);
      await expect(picker.prompt).toHaveText('Select or drag and drop a file');
    }
  });
});
