/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/color-picker/|EuiColorPicker}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiColorPickerSelectors = {
  /** Token EUI adds to the anchor's `data-test-subj`, on the default input and on a custom `button` alike. */
  ANCHOR_TEST_SUBJ: 'euiColorPickerAnchor',

  /** The anchor, whether the default text input or a custom `button`. */
  ANCHOR_SELECTOR: '[data-test-subj~="euiColorPickerAnchor"]',

  /** The popover panel, rendered in a portal and only while open. */
  PANEL_SELECTOR: '[data-popover-panel].euiColorPicker__popoverPanel',

  /** A swatch button inside the panel. */
  SWATCH_SELECTOR: '.euiColorPickerSwatch',

  /** The hex input inside the panel. Present only when `secondaryInputDisplay` is `top` or `bottom`. */
  SECONDARY_INPUT_SELECTOR: '[data-test-subj^="euiColorPickerInput_"]',
};
