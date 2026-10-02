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
 * `*_SELECTOR` values are CSS.
 */
export const EuiColorPickerSelectors = {
  /** The default text-input anchor. A custom `button` prop has no class of its own. */
  ANCHOR_SELECTOR: '.euiColorPicker__input',

  /** The popover panel, rendered in a portal and only while open. */
  PANEL_SELECTOR: '[data-popover-panel].euiColorPicker__popoverPanel',

  /** A swatch button inside the panel. */
  SWATCH_SELECTOR: '.euiColorPickerSwatch',
};
