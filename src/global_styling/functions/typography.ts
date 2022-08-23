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
  _EuiThemeFontWeights,
} from '../variables/typography';
import { UseEuiTheme } from '../../services/theme/hooks';
import { logicalCSS } from './logicals';

export interface _FontScaleOptions {
  /**
   * The returned string measurement
   */
  measurement?: _EuiThemeFontSizeMeasurement;
  /**
   * An additional custom scale multiplier to use against the current scale
   * This parameter can be used (e.g. by EuiText sizes) to get sizes of text smaller than the default
   */
  customScale?: _EuiThemeFontScale;
}

/**
 * Calculates the font-size value based on the provided scale key
 * @param scale - The font scale key
 * @param theme - Requires the `base` and `font` keys
 * @param options - Optional parameters - see _FontScaleOptions
 *
 * @returns string - Calculated font-size value
 */

export function euiFontSizeFromScale(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme'],
  { measurement = 'rem', customScale }: _FontScaleOptions = {}
) {
  if (measurement === 'em') {
    return `${font.scale[scale]}em`;
  }

  let numerator = base * font.scale[scale];
  if (customScale) numerator *= font.scale[customScale];
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
 * @param scale - The font scale key
 * @param theme - Requires the `base` and `font` keys
 * @param options - Optional parameters - see _FontScaleOptions
 *
 * @returns string - Calculated line-height value aligned to baseline
 */

export function euiLineHeightFromBaseline(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme'],
  { measurement = 'rem', customScale }: _FontScaleOptions = {}
) {
  const { baseline, lineHeightMultiplier } = font;
  let numerator = base * font.scale[scale];
  if (customScale) numerator *= font.scale[customScale];
  const denominator = base * font.scale[font.body.scale];

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

/**
 * Text weight shifting
 *
 * When changing the font-weight based on the state of the component,
 * this mixin will ensure that the sizing is dependent on the boldest
 * weight so it doesn't shift sibling content.
 */
export const euiTextShift = (
  fontWeight: keyof _EuiThemeFontWeights = 'bold',
  attribute: string = 'data-text',
  euiTheme: UseEuiTheme['euiTheme']
) => {
  return `
  &::after {
    display: block;
    content: attr(${attribute});
    font-weight: ${euiTheme.font.weight[fontWeight]};
    ${logicalCSS('height', 0)}
    overflow: hidden;
    visibility: hidden;
  }`;
};
