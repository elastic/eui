/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/buttons/group/|EuiButtonGroup}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiButtonGroupSelectors = {
  /** The group element carrying the consumer's `data-test-subj`, a `<fieldset>` with `options` or a `role="group"` div with children. */
  ROOT_SELECTOR: '.euiButtonGroup',

  /** The wrapper around the buttons. */
  BUTTONS_SELECTOR: '.euiButtonGroup__buttons',

  /** A button rendered from `options`. Children buttons are plain `EuiButton`s. */
  BUTTON_SELECTOR: '.euiButtonGroupButton',

  /** A selected `options` button. Prefer `aria-pressed`, which both APIs set. */
  SELECTED_BUTTON_SELECTOR: '.euiButtonGroupButton-isSelected',
};
