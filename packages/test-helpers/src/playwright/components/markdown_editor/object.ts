/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiMarkdownEditorSelectors } from '../../../components/markdown_editor/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/editors-and-syntax/markdown-editor/ EuiMarkdownEditor}.
 *
 * `testSubj` must be set on `EuiMarkdownEditor` itself, EUI spreads it onto
 * the wrapper.
 */
export class EuiMarkdownEditorObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiMarkdownEditorSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The `<textarea>` holding the markdown source. */
  get textArea(): Locator {
    return this.root.locator(EuiMarkdownEditorSelectors.TEXT_AREA_SELECTOR);
  }

  /** The rendered markdown, only in the DOM while previewing. */
  get preview(): Locator {
    return this.root.locator(EuiMarkdownEditorSelectors.PREVIEW_SELECTOR);
  }

  /** Replace the markdown source. Switches back to editing first if needed. */
  async setValue(text: string): Promise<void> {
    if (await this.isPreviewing()) {
      await this.togglePreview();
    }
    await this.textArea.fill(text);
    await expect(this.textArea).toHaveValue(text);
  }

  /** The current markdown source. */
  async getValue(): Promise<string> {
    return this.textArea.inputValue();
  }

  /** Whether the rendered preview is shown instead of the textarea. */
  async isPreviewing(): Promise<boolean> {
    return (await this.preview.count()) > 0;
  }

  /** Switch between the textarea and the rendered preview. */
  async togglePreview(): Promise<void> {
    const previewing = await this.isPreviewing();
    const button = previewing
      ? EuiMarkdownEditorSelectors.EDIT_BUTTON_TEST_SUBJ
      : EuiMarkdownEditorSelectors.PREVIEW_BUTTON_TEST_SUBJ;
    await this.root.getByTestId(button).click();
    await expect(this.preview).toHaveCount(previewing ? 0 : 1);
  }
}
