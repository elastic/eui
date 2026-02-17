/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeFontScale,
  _EuiThemeFontUnit,
  _EuiThemeFontWeights,
} from '../variables/typography';
import { UseEuiTheme } from '../../services/theme/hooks';
import { logicalCSS } from './logicals';

export interface _FontScaleOptions {
  /**
   * The font-size or line-height unit to return
   */
  unit?: _EuiThemeFontUnit;
  /**
   * An additional custom scale multiplier to use against the current scale
   * This parameter can be used (e.g. by EuiText sizes) to get sizes of text smaller than the default
   */
  customScale?: _EuiThemeFontScale;
}

/**
 * Fixed mapping of font sizes (in pixels) to line heights (in pixels)
 * These mappings are consistent across all units (rem, px, em)
 */
const FONT_SIZE_TO_LINE_HEIGHT_MAP: Record<number, number> = {
  9: 14,   // xxxs
  11: 17,  // xxs
  12: 18,  // xs
  14: 20,  // s
  16: 22,  // m
  20: 26,  // l
  24: 30,  // xl
  30: 36,  // xxl
};

/**
 * Gets the line height in pixels for a given font size in pixels
 * Uses the fixed mapping, or calculates proportionally for intermediate values
 */
function getLineHeightForFontSize(fontSizePx: number): number {
  // Exact match
  if (FONT_SIZE_TO_LINE_HEIGHT_MAP[fontSizePx]) {
    return FONT_SIZE_TO_LINE_HEIGHT_MAP[fontSizePx];
  }
  
  // For intermediate values, find the closest match and interpolate
  const sizes = Object.keys(FONT_SIZE_TO_LINE_HEIGHT_MAP)
    .map(Number)
    .sort((a, b) => a - b);
  
  // Find the closest size
  let closestSize = sizes[0];
  let minDiff = Math.abs(fontSizePx - closestSize);
  
  for (const size of sizes) {
    const diff = Math.abs(fontSizePx - size);
    if (diff < minDiff) {
      minDiff = diff;
      closestSize = size;
    }
  }
  
  // Use the line height from the closest match
  return FONT_SIZE_TO_LINE_HEIGHT_MAP[closestSize];
}

/**
 * Returns letter-spacing for specific font scales
 * @param scale - The font scale key
 * @param theme - Requires the `base` and `font` keys
 * @returns string | undefined - Letter-spacing value in rem, or undefined for scales without letter-spacing
 */
export function euiLetterSpacingFromScale(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme']
): string | undefined {
  const letterSpacingMap: Record<string, string> = {
    l: '-0.005rem',
    xl: '-0.01rem',
    xxl: '-0.015rem',
  };
  
  return letterSpacingMap[scale];
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
  { unit = font.defaultUnits, customScale }: _FontScaleOptions = {}
) {
  if (unit === 'em') {
    return `${font.scale[scale]}em`;
  }

  let numerator = base * font.scale[scale];
  if (customScale) numerator *= font.scale[customScale];
  const denominator = base * font.scale[font.body.scale];

  return unit === 'px'
    ? `${numerator}px`
    : `${(numerator / denominator).toFixed(4)}rem`;
}

/**
 * Returns the line-height based on a fixed mapping of font sizes to line heights
 * The mapping ensures consistent line heights regardless of unit (rem, px, em)
 * @param scale - The font scale key
 * @param theme - Requires the `base` and `font` keys
 * @param options - Optional parameters - see _FontScaleOptions
 *
 * @returns string - Line-height value from the fixed mapping
 */

export function euiLineHeightFromBaseline(
  scale: _EuiThemeFontScale,
  { base, font }: UseEuiTheme['euiTheme'],
  { unit = font.defaultUnits, customScale }: _FontScaleOptions = {}
) {
  // Calculate the font size in pixels
  let fontSizePx = base * font.scale[scale];
  if (customScale) fontSizePx *= font.scale[customScale];
  
  // Round to nearest integer for pixel matching
  const fontSizePxRounded = Math.round(fontSizePx);
  
  // Get the corresponding line height in pixels
  const lineHeightPx = getLineHeightForFontSize(fontSizePxRounded);
  
  // Convert to the requested unit
  if (unit === 'px') {
    return `${lineHeightPx}px`;
  }
  
  if (unit === 'em') {
    // For em, return the ratio of line-height to actual font-size (not rounded)
    const ratio = lineHeightPx / fontSizePx;
    return ratio.toFixed(4).toString();
  }
  
  // For rem, convert relative to the body font size
  const denominator = base * font.scale[font.body.scale];
  return `${(lineHeightPx / denominator).toFixed(4)}rem`;
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
