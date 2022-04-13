/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeFontScale,
  _EuiThemeFontSizeMeasurement,
} from '../variables/_typography';
import { UseEuiTheme } from '../../services/theme/hooks';

/**
 *
 *
 *
 * @param base = 16
 * @param scale = full scale
 * @param bodyScale = 's'
 * @param size = 'm'
 * @param measurement - The returned string measurement
 * @returns string - Calculated font-size value
 */

export function fontSizeFromScale(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme'],
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
) {
  if (measurement === 'em') {
    return `${font.scale[scale]}em`;
  }

  const numerator = base * font.scale[scale];
  const denominator = base * font.scale[font.body.scale];

  return measurement === 'px'
    ? `${numerator}px`
    : `${(numerator / denominator).toFixed(4)}rem`;
}

/**
 * Calculates the line-height to the closest multiple of the baseline
 * EX: A proper line-height for text is 1.5 times the font-size.
 *     If our base font size (euiFontSize) is 16, and our baseline is 4. To ensure the
 *     text stays on the baseline, we pass a multiplier to calculate a line-height.
 * @param base - Theme base unit
 * @param font - Requires the `body` and `baseline` values
 * @param scale - The font scale multiplier
 * @param measurement - The returned string measurement
 * *
 * @returns string - Calculated line-height value aligned to baseline
 */

export function lineHeightFromBaseline(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme'],
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
) {
  const { baseline, body, lineHeightMultiplier } = font;
  const numerator = base * font.scale[scale];
  const denominator = base * font.scale[body.scale];

  const _lineHeightMultiplier =
    numerator <= base ? lineHeightMultiplier : lineHeightMultiplier * 0.833;

  if (measurement === 'em') {
    // Even though the line-height via `em` cannot be determined against the pixel baseline grid;
    // we will assume that typically larger scale font-sizes should have a shorter line-height;
    return _lineHeightMultiplier.toFixed(4).toString();
  }

  const pixelValue =
    Math.floor(Math.round(numerator * _lineHeightMultiplier) / baseline) *
    baseline;
  return measurement === 'px'
    ? `${pixelValue}px`
    : `${(pixelValue / denominator).toFixed(4)}rem`;
}
