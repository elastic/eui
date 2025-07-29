/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import {
  COLOR_MODES_STANDARD,
  EuiThemeColorModeStandard,
} from '../../services/theme/types';

// Create a CSS color value using whose opacity is determined based
// on either a light or dark theme. We use a multiplier
// of 1 for light themes and 3.5 for dark themes
export const getShadowColor = (
  color: string,
  opacity: number,
  colorMode: EuiThemeColorModeStandard
) => {
  const themeOpacity =
    colorMode === COLOR_MODES_STANDARD.dark ? opacity * 3.5 : opacity * 1;
  return chroma(color).alpha(themeOpacity).css();
};

/**
 * Converts a `box-shadow` string to a `filter: drop-shadow()` string.
 *
 * @todo check whether this is actually needed in +2025, the original code replacing
 * box-shadow with filter: drop-shadow() had the following comment:
 * > Using only one drop-shadow filter instead of multiple is more
 * > performant & prevents Safari bugs
 *
 * @param boxShadow The `box-shadow` string to convert.
 * @returns The converted `filter` string.
 */
export const boxShadowToFilterDropShadow = (boxShadow: string) => {
  const dropShadows = boxShadow
    .split(/,(?![^(]*\))/) // split by comma, but not inside parentheses
    .map((shadow) => {
      shadow = shadow.trim();
      // remove `inset`, not supported by drop-shadow
      if (shadow.startsWith('inset ')) {
        shadow = shadow.slice(6);
      }
      // can be complex (hsl, rgb, etc.), used AI for this
      const colorMatch = shadow.match(
        /(hsl|rgb)a?\(.*\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+$/
      );
      let color: string;
      let parts: string[];
      if (colorMatch) {
        color = colorMatch[0];
        parts = shadow.substring(0, colorMatch.index).trim().split(/\s+/);
      } else {
        color = '#000'; // fallback to black
        parts = shadow.trim().split(/\s+/);
      }
      // drop-shadow doesn't support spread, so we only take x, y, blur
      const [x, y, blur] = parts;

      return `drop-shadow(${x} ${y} ${blur} ${color})`;
    })
    .join(' ');

  return `filter: ${dropShadows};`;
};
