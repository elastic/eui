/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiMarkdownEditorObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiMarkdownEditorObject` against the live component in EUI
 * Storybook. The Playground story is stateful, so typed text sticks.
 */

const TEST_SUBJ = 'testMarkdownEditor';

const PLAYGROUND_URL = storyUrl(
  'editors-syntax-euimarkdowneditor--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiMarkdownEditorObject', () => {
  let editor: EuiMarkdownEditorObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    editor = new EuiMarkdownEditorObject(page, TEST_SUBJ);
    await editor.textArea.waitFor({ state: 'visible' });
  });

  test('setValue replaces the source', async () => {
    await editor.setValue('# first');
    await editor.setValue('# second');

    expect(await editor.getValue()).toBe('# second');
  });

  test('togglePreview switches between preview and editing', async () => {
    await editor.setValue('# Heading');
    expect(await editor.isPreviewing()).toBe(false);

    await editor.togglePreview();
    expect(await editor.isPreviewing()).toBe(true);
    await expect(editor.preview.getByRole('heading')).toHaveText('Heading');

    await editor.togglePreview();
    expect(await editor.isPreviewing()).toBe(false);
    await expect(editor.textArea).toBeVisible();
  });

  test('setValue leaves preview mode first', async () => {
    await editor.togglePreview();
    await editor.setValue('back to editing');

    expect(await editor.isPreviewing()).toBe(false);
    expect(await editor.getValue()).toBe('back to editing');
  });
});
