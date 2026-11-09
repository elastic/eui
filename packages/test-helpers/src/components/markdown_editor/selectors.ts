/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/editors-and-syntax/markdown-editor/|EuiMarkdownEditor}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiMarkdownEditorSelectors = {
  /** The wrapper carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiMarkdownEditor',

  /** The `<textarea>` holding the markdown source. */
  TEXT_AREA_SELECTOR: '.euiMarkdownEditorTextArea',

  /** The rendered markdown, only in the DOM while previewing. */
  PREVIEW_SELECTOR: '.euiMarkdownEditorPreview',

  /** The toolbar button that switches to preview. */
  PREVIEW_BUTTON_TEST_SUBJ: 'markdown_editor_edit_button',

  /** The toolbar button that switches back to editing. */
  EDIT_BUTTON_TEST_SUBJ: 'markdown_editor_preview_button',
};
