/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import chroma from 'chroma-js';
import { shade, tint, lightness as getLightness } from '../../services/color';
import { getOn } from '../../services/theme/utils';

/**
 * Creates a new color that meets or exceeds WCAG level AA
 * @param foreground - Color to manipulate
 * @param ratio - Amount to change in absolute terms. 0-1.
 * *
 * @param themeOrBackground - Color to use as the contrast basis
 */
export const makeHighContrastColor = (_foreground: string, ratio = 4.5) => (
  themeOrBackground:
    | string
    | {
        colors: { pageBackground: string };
        [key: string]: any;
      }
) => {
  const foreground = (typeof themeOrBackground === 'object'
    ? getOn(themeOrBackground, _foreground)
    : _foreground) as string;
  const background =
    typeof themeOrBackground === 'object'
      ? themeOrBackground.colors.pageBackground
      : themeOrBackground;
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

  return highContrastTextColor;
};

/**
 * Creates a new color with increased contrast
 * Disabled content only needs a contrast of at least 2 because there is no interaction available
 * @param foreground - Color to manipulate
 * *
 * @param themeOrBackground - Color to use as the contrast basis
 */
export const makeDisabledContrastColor = ($color: string) => (
  themeOrBackground:
    | string
    | {
        colors: { pageBackground: string };
        [key: string]: any;
      }
) => makeHighContrastColor($color, 2)(themeOrBackground);
