/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/other/file-picker/|EuiFilePicker}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiFilePickerSelectors = {
  /** The `<input type="file">` carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiFilePicker__input',

  /** The wrapper around the input and the prompt. Gets `euiFilePicker-hasFiles` once files are picked. */
  WRAPPER_SELECTOR: '.euiFilePicker',

  /** The prompt text, the file name, "N files selected" or the initial prompt. */
  PROMPT_TEXT_SELECTOR: '.euiFilePicker__promptText',

  /** The remove button, rendered only with files and when not disabled. */
  CLEAR_BUTTON_SELECTOR: '.euiFilePicker__clearButton',
};
