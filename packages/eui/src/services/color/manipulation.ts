/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma, { Color } from 'chroma-js';
import {
  COLOR_MATRIX_MAP,
  COLOR_SHADES_COUNT,
  getColorMatrixValue,
} from '../../themes/new_theme/global_styling/variables/_color_matrix';
import { EuiThemeColorModeStandard } from '../theme';
import { isNewTheme } from '../../themes/flags';
import { isValidHex } from './is_valid_hex';

const getColorFromMatrix = (
  color: string,
  ratio: number,
  direction: 'lighten' | 'darken'
) => {
  const colorData = COLOR_MATRIX_MAP.get(color.toLowerCase());

  if (!colorData) return undefined;

  const { group, shade } = colorData;
  const hasLargeScale = group === 'blueGrey';
  const ratioStep = Math.round(ratio * COLOR_SHADES_COUNT) * 10;
  const step = hasLargeScale ? ratioStep / 2 : ratioStep;
  const colorShade =
    direction === 'lighten'
      ? Math.max(shade - step, 10)
      : Math.min(shade + step, COLOR_SHADES_COUNT * 10);

  if (shade === colorShade) {
    return color;
  }

  const newColor = getColorMatrixValue(group, colorShade);

  return inOriginalFormat(color, chroma(newColor));
};

const inOriginalFormat = (originalColor: string, newColor: Color) => {
  return isValidHex(originalColor) ? newColor.hex() : newColor.css();
};

/**
 * Makes a color more transparent.
 * @param color - Color to manipulate
 * @param alpha - alpha channel value. From 0-1.
 */
export const transparentize = (color: string, alpha: number) =>
  chroma(color).alpha(alpha).css();

/**
 * Mixes a provided color with white.
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 */
export const tint = (color: string, ratio: number) => {
  if (isNewTheme()) {
    const matrixColor = getColorFromMatrix(color, ratio, 'lighten');

    console.log('matrixColor', matrixColor);

    if (matrixColor) return matrixColor;
  }

  const tint = chroma.mix(color, '#fff', ratio, 'rgb');
  return inOriginalFormat(color, tint);
};

/**
 * Mixes a provided color with black.
 * @param color - Color to mix with black
 * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
 */
export const shade = (color: string, ratio: number) => {
  if (isNewTheme()) {
    const matrixColor = getColorFromMatrix(color, ratio, 'darken');

    if (matrixColor) return matrixColor;
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
export const darken = (color: string, amount: number) => {
  if (isNewTheme()) {
    const matrixColor = getColorFromMatrix(color, amount, 'darken');

    if (matrixColor) return matrixColor;
  }

  return chroma(color).darken(amount).hex();
};

/**
 * Returns the brighten value of a color. 0-100
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const brighten = (color: string, amount: number) => {
  if (isNewTheme()) {
    const matrixColor = getColorFromMatrix(color, amount, 'lighten');

    if (matrixColor) return matrixColor;
  }

  chroma(color).brighten(amount).hex();
};
