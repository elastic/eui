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

// Mixes a provided color with white.
export const tint = (color: string, ratio: number) =>
  chroma.mix(color, '#fff', ratio).hex();

// Mixes a provided color with black.
export const shade = (color: string, ratio: number) =>
  chroma.mix(color, '#000', ratio).hex();

export const saturate = (color: string, amount: number) =>
  chroma(color).set('hsl.s', `+${amount}`).css();

// Given a $foreground and a $background, make the $foreground AA accessibility by slightly
// adjusting it till the contrast is high enough
// const usingFullTheme = `makeHighContrastColor('#FFF')({ colors: { pageBackground: '#000'}, [...] })`
// const usingBaseValue = `makeHighContrastColor('#FFF')('#000')`
export const makeHighContrastColor = ($foreground: string, $ratio = 4.5) => (
  themeOrBackground:
    | string
    | {
        colors: { pageBackground: string };
        [key: string]: any;
      }
) => {
  const $background =
    typeof themeOrBackground === 'object'
      ? themeOrBackground.colors.pageBackground
      : themeOrBackground;
  let $contrast = chroma.contrast($foreground, $background);

  // Determine the lightness factor of the background color first to
  // determine whether to shade or tint the foreground.
  const $brightness = chroma($background).get('hsl.l') * 100;

  let $highContrastTextColor = $foreground;

  while ($contrast < $ratio) {
    if ($brightness > 50) {
      $highContrastTextColor = shade($highContrastTextColor, 0.05);
    } else {
      $highContrastTextColor = tint($highContrastTextColor, 0.05);
    }

    $contrast = chroma.contrast($highContrastTextColor, $background);

    const $lightness = chroma($highContrastTextColor).get('hsl.l') * 100;

    if ($lightness < 5) {
      console.warn(
        'High enough contrast could not be determined. Most likely your background color does not adjust for light mode.'
      );
      return $highContrastTextColor;
    }

    if ($lightness > 95) {
      console.warn(
        'High enough contrast could not be determined. Most likely your background color does not adjust for dark mode.'
      );
      return $highContrastTextColor;
    }
  }

  return $highContrastTextColor;
};

// Disabled content only needs a contrast of at least 2 because there is no interaction available
// const usingFullTheme = `makeDisabledContrastColor('#FFF')({ colors: { pageBackground: '#000'}, [...] })`
// const usingBaseValue = `makeDisabledContrastColor('#FFF')('#000')`
export const makeDisabledContrastColor = ($color: string) => (
  themeOrBackground:
    | string
    | {
        colors: { pageBackground: string };
        [key: string]: any;
      }
) => {
  const $background =
    typeof themeOrBackground === 'object'
      ? themeOrBackground.colors.pageBackground
      : themeOrBackground;
  return makeHighContrastColor($color, 2)($background);
};

export const transparentize = (color: string, alpha: number) =>
  chroma(color).alpha(alpha).css();
