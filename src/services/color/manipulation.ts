/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { isValidHex } from './is_valid_hex';

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
  const isHex = isValidHex(color);
  const tint = chroma.mix(color, '#fff', ratio, 'rgb');
  return isHex ? tint.hex() : tint.css();
};

/**
 * Mixes a provided color with black.
 * @param color - Color to mix with black
 * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
 */
export const shade = (color: string, ratio: number) => {
  const isHex = isValidHex(color);
  const shade = chroma.mix(color, '#000', ratio, 'rgb');
  return isHex ? shade.hex() : shade.css();
};

/**
 * Increases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const saturate = (color: string, amount: number) => {
  const isHex = isValidHex(color);
  const saturate = chroma(color).set('hsl.s', `+${amount}`);
  return isHex ? saturate.hex() : saturate.css();
};

/**
 * Decreases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const desaturate = (color: string, amount: number) => {
  const isHex = isValidHex(color);
  const desaturate = chroma(color).set('hsl.s', `-${amount}`);
  return isHex ? desaturate.hex() : desaturate.css();
};

/**
 * Returns the lightness value of a color. 0-100
 * @param color
 */
export const lightness = (color: string) => chroma(color).get('hsl.l') * 100;
