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
  /**
   * The native `<input type="range">` element that carries the actual value.
   * Always present and the only element the consumer's `data-test-subj`
   * resolves to unambiguously, unless `showInput` also renders a number input
   * sharing the same subj — see {@link NUMBER_INPUT_SELECTOR}.
   */
  SLIDER_SELECTOR: '.euiRangeSlider',

  /**
   * The visible number input rendered when the consumer sets `showInput`
   * (`EuiRange`) — EUI spreads the same `data-test-subj` onto this and
   * {@link SLIDER_SELECTOR}, so a plain `getByTestId` resolves to two
   * elements. Not applicable to `EuiDualRange`, whose min/max inputs need
   * their own separate `data-test-subj` via `minInputProps`/`maxInputProps`.
   */
  NUMBER_INPUT_SELECTOR: '.euiRangeInput',
};
