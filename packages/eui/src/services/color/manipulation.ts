/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma, { Color } from 'chroma-js';
import { EuiThemeColorModeStandard } from '../theme';
import { isValidHex } from './is_valid_hex';

/** Check whether a color string is a CSS var() reference */
const _isVarRef = (color: string) => color.includes('var(');

const inOriginalFormat = (originalColor: string, newColor: Color) => {
  return isValidHex(originalColor) ? newColor.hex() : newColor.css();
};

/**
 * Makes a color more transparent.
 * @param color - Color to manipulate
 * @param alpha - alpha channel value. From 0-1.
 *
 * When the color is a CSS var() reference, emits CSS relative color syntax
 * instead of parsing through chroma-js.
 */
export const transparentize = (color: string, alpha: number) => {
  if (_isVarRef(color)) {
    return `rgb(from ${color} r g b / ${alpha})`;
  }
  return chroma(color).alpha(alpha).css();
};

/**
 * Mixes a provided color with white.
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 *
 * When the color is a CSS var() reference, emits color-mix() instead.
 */
export const tint = (color: string, ratio: number) => {
  if (_isVarRef(color)) {
    return `color-mix(in srgb, ${color}, white ${ratio * 100}%)`;
  }
  const tint = chroma.mix(color, '#fff', ratio, 'rgb');
  return inOriginalFormat(color, tint);
};

/**
 * Mixes a provided color with black.
 * @param color - Color to mix with black
 * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
 *
 * When the color is a CSS var() reference, emits color-mix() instead.
 */
export const shade = (color: string, ratio: number) => {
  if (_isVarRef(color)) {
    return `color-mix(in srgb, ${color}, black ${ratio * 100}%)`;
  }
  const shade = chroma.mix(color, '#000', ratio, 'rgb');
  return inOriginalFormat(color, shade);
};

/**
 * Returns the tinted color for light mode and shaded color for dark mode
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 * @param colorMode - Light or dark only
 */
export const tintOrShade = (
  color: string,
  ratio: number,
  colorMode: EuiThemeColorModeStandard
) => {
  return colorMode === 'DARK' ? shade(color, ratio) : tint(color, ratio);
};

/**
 * Returns the shaded color for light mode and tinted color for dark mode
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 * @param colorMode - Light or dark only
 */
export const shadeOrTint = (
  color: string,
  ratio: number,
  colorMode: EuiThemeColorModeStandard
) => {
  return colorMode === 'DARK' ? tint(color, ratio) : shade(color, ratio);
};

/**
 * Increases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const saturate = (color: string, amount: number) => {
  const saturate = chroma(color).set('hsl.s', `+${amount}`);
  return inOriginalFormat(color, saturate);
};

/**
 * Decreases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const desaturate = (color: string, amount: number) => {
  const desaturate = chroma(color).set('hsl.s', `-${amount}`);
  return inOriginalFormat(color, desaturate);
};

/**
 * Returns the lightness value of a color. 0-100
 * @param color
 */
export const lightness = (color: string) => chroma(color).get('hsl.l') * 100;

/**
 * Returns the darken value of a color. 0-100
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const darken = (color: string, amount: number) =>
  chroma(color).darken(amount).hex();

/**
 * Returns the brighten value of a color. 0-100
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const brighten = (color: string, amount: number) =>
  chroma(color).brighten(amount).hex();
