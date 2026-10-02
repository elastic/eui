/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/range-controls/|EuiRange}
 * and `EuiDualRange`. `*_SELECTOR` values are CSS.
 */
export const EuiRangeSelectors = {
  /** The native `<input type="range">` element that carries the actual value. */
  SLIDER_SELECTOR: '.euiRangeSlider',

  /** The visible number input, rendered on a plain `EuiRange` with `showInput`. See the package README for why it can share `data-test-subj` with {@link SLIDER_SELECTOR}. */
  NUMBER_INPUT_SELECTOR: '.euiRangeInput',
};
