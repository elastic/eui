/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeFontBase } from '../../global_styling/variables/_typography';

/**
 * Calculates the line-height to the closest multiple of the baseline
 * EX: A proper line-height for text is 1.5 times the font-size.
 *     If our base font size (euiFontSize) is 16, and our baseline is 4. To ensure the
 *     text stays on the baseline, we pass a multiplier to calculate a line-height.
 * @param base - Theme base unit
 * @param font - Requires numbers for the `lineHeightMultiplier` and `baseline` values
 * @param scale - The font scale multiplier
 * *
 * @returns string - Rem unit aligned to baseline
 */
export function lineHeightFromBaseline(
  base: number,
  font: {
    baseline: _EuiThemeFontBase['baseline'];
    lineHeightMultiplier: _EuiThemeFontBase['lineHeightMultiplier'];
  },
  scale: number
) {
  const { baseline, lineHeightMultiplier } = font;

  const pixelValue =
    Math.floor(Math.round(base * scale * lineHeightMultiplier) / baseline) *
    baseline;
  return `${pixelValue / base}rem`;
}
