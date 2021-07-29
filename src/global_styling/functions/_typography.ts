/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeFontBase } from '../variables/_typography';

// Typography functions

// Calculates the line-height to the closest multiple of the baseline
// EX: A proper line-height for text is 1.5 times the font-size.
//     If our base font size (euiFontSize) is 16, and our baseline is 4. To ensure the
//     text stays on the baseline, we pass a multiplier to calculate a line-height.

export function fontSizeFromScale(base: number, scale: number) {
  const pixelValue = Math.round(base * scale);
  return `${pixelValue / base}rem`;
}

export function lineHeightFromBaseline(
  base: number,
  font: _EuiThemeFontBase,
  scale: number
) {
  const { lineHeightMultiplier, baseline } = font;

  const pixelValue =
    Math.floor(Math.round(base * scale * lineHeightMultiplier) / baseline) *
    baseline;
  return `${pixelValue / base}rem`;
}
