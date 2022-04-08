/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiThemeFont,
  _EuiThemeFontScale,
} from '../../global_styling/variables/_typography';

export const LINE_HEIGHT_MULTIPLIER_S = 1.5;
export const LINE_HEIGHT_MULTIPLIER_L = 1.25;

/**
 * Calculates the line-height to the closest multiple of the baseline
 * EX: A proper line-height for text is 1.5 times the font-size.
 *     If our base font size (euiFontSize) is 16, and our baseline is 4. To ensure the
 *     text stays on the baseline, we pass a multiplier to calculate a line-height.
 * @param base - Theme base unit
 * @param font - Requires the `body` and `baseline` values
 * @param scale - The font scale multiplier
 * *
 * @returns string - Rem unit aligned to baseline
 */
export function lineHeightFromBaseline(
  base: number,
  font: EuiThemeFont,
  scale: number
) {
  const { baseline, body } = font;
  const numerator = base * scale;
  const denominator = base * font.scale[body.scale];

  const _lineHeightMultiplier =
    numerator <= base ? LINE_HEIGHT_MULTIPLIER_S : LINE_HEIGHT_MULTIPLIER_L;

  const pixelValue =
    Math.floor(Math.round(numerator * _lineHeightMultiplier) / baseline) *
    baseline;
  return `${pixelValue / denominator}rem`;
}

/**
 *
 *
 *
 * @param base = 16
 * @param scale = full scale
 * @param bodyScale = 's'
 * @param scale = 'm'
 * @returns
 */

export function fontSizeFromScale(
  base: number,
  scale: { [key in _EuiThemeFontScale]: number },
  bodyScale: _EuiThemeFontScale,
  size: _EuiThemeFontScale
) {
  const numerator = base * scale[size];
  const denominator = base * scale[bodyScale];

  return `${(numerator / denominator).toFixed(4)}rem`;
}
