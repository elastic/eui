/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { shade, tint, lightness as getLightness } from './manipulation';
import { getOn } from '../theme/utils';

/** Check whether a color string is a CSS var() reference */
const _isVarRef = (color: string) => color.includes('var(');

export const getColorContrast = (textColor: string, backgroundColor: string) =>
  chroma.contrast(textColor, backgroundColor);

export const wcagContrastMin = 4.5; // WCAG AA minimum contrast ratio for normal (non-large) text

/**
 * Creates a new color that meets or exceeds WCAG level AA
 * @param foreground - Color to manipulate
 * @param ratio - Amount to change in absolute terms. 0-10.
 * *
 * @param themeOrBackground - Color to use as the contrast basis or just pass EuiTheme
 *
 * When the foreground or background is a CSS var() reference, the iterative
 * contrast algorithm cannot run. The foreground color is returned as-is
 * (graceful degradation — the pre-computed theme tokens should already have
 * adequate contrast).
 */
export const makeHighContrastColor =
  (_foreground: string, ratio = 4.85) =>
  (
    themeOrBackground:
      | string
      | {
          colors: { body: string };
          [key: string]: any;
        }
  ) => {
    const foreground = (
      typeof themeOrBackground === 'object'
        ? getOn(themeOrBackground, _foreground) ?? _foreground
        : _foreground
    ) as string;
    const background =
      typeof themeOrBackground === 'object'
        ? themeOrBackground.colors.body
        : themeOrBackground;

    // CSS var() references can't be parsed by chroma — pass through as-is
    if (_isVarRef(foreground) || _isVarRef(background)) {
      return foreground;
    }

    if (chroma(foreground).alpha() < 1 || chroma(background).alpha() < 1) {
      console.warn(
        `Contrast cannot be accurately calculated when colors have alpha channel opacity. Make sure the provided foreground and background colors have no transparency:

Foreground: ${foreground}
Background: ${background}`
      );
    }

    let contrast = chroma.contrast(foreground, background);

    // Determine the lightness factor of the background color first to
    // determine whether to shade or tint the foreground.
    const brightness = getLightness(background);

    let highContrastTextColor = foreground;

    while (contrast < ratio) {
      if (brightness > 50) {
        highContrastTextColor = shade(highContrastTextColor, 0.05);
      } else {
        highContrastTextColor = tint(highContrastTextColor, 0.05);
      }

      contrast = chroma.contrast(highContrastTextColor, background);

      const lightness = getLightness(highContrastTextColor);

      if (lightness < 5) {
        console.warn(
          'High enough contrast could not be determined. Most likely your background color does not adjust for light mode.'
        );
        return highContrastTextColor;
      }

      if (lightness > 95) {
        console.warn(
          'High enough contrast could not be determined. Most likely your background color does not adjust for dark mode.'
        );
        return highContrastTextColor;
      }
    }

    return chroma(highContrastTextColor).hex();
  };

/**
 * Creates a new color with increased contrast
 * Disabled content only needs a contrast of at least 2 because there is no interaction available
 * @param foreground - Color to manipulate
 * @param ratio - Amount to change in absolute terms. 0-10.
 * *
 * @param themeOrBackground - Color to use as the contrast basis
 */
export const makeDisabledContrastColor =
  (color: string, ratio = 2) =>
  (
    themeOrBackground:
      | string
      | {
          colors: { body: string };
          [key: string]: any;
        }
  ) =>
    makeHighContrastColor(color, ratio)(themeOrBackground);

export const warnIfContrastBelowMin = (
  textColor: string,
  backgroundColor: string,
  min = wcagContrastMin
) => {
  const ratio = getColorContrast(textColor, backgroundColor);
  if (ratio < min) {
    // eslint-disable-next-line no-console
    console.warn(
      `Warning: ${backgroundColor} background with ${textColor} text has a low contrast of ${ratio.toFixed(
        2
      )}. Should be above ${min}.`
    );
  }
};
