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

import { COLOR_MODE_KEY, computed } from '../../services/theme/utils';

const baseline = 4;
const lineHeight = 1.5;

// Families & base font settings
const font = {
  family:
    "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  familyCode: "'Roboto Mono', Consolas, Menlo, Courier, monospace",

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "'calt' 1, 'kern' 1, 'liga' 1",

  // Base number values for each font scale
  base: {
    s: computed([`${COLOR_MODE_KEY}.base`], ([base]) => base * 0.75), // 12
    m: computed([`${COLOR_MODE_KEY}.base`], ([base]) => base * 0.875), // 14
    l: computed([`${COLOR_MODE_KEY}.base`], ([base]) => base), // 16
  },

  // Typographic scale -- loosely based on Major Third (1.250)
  // TODO: Doesn't seem to like arrays
  // scale: [2.25, 1.75, 1.25, 1.125, 1, 0.875, 0.75],
  scale: {
    xxl: 2.25,
    xl: 1.75,
    l: 1.25,
    m: 1.125,
    base: 1,
    s: 0.875,
    xs: 0.75,
  },
};

const fontScale = {};

// Creates the 3 scales of font sizes by multiplying the `base` with each of the scale values
fontScale.small = Object.keys(font.scale).reduce((acc, elem) => {
  acc[elem] = computed(
    [`${COLOR_MODE_KEY}.font.base.s`, `${COLOR_MODE_KEY}.font.scale.${elem}`],
    ([base, scale]) => `${Math.round(base * scale)}px`
  );
  return acc;
}, {});
fontScale.medium = Object.keys(font.scale).reduce((acc, elem) => {
  acc[elem] = computed(
    [`${COLOR_MODE_KEY}.font.base.m`, `${COLOR_MODE_KEY}.font.scale.${elem}`],
    ([base, scale]) => `${Math.round(base * scale)}px`
  );
  return acc;
}, {});
fontScale.large = Object.keys(font.scale).reduce((acc, elem) => {
  acc[elem] = computed(
    [`${COLOR_MODE_KEY}.font.base.l`, `${COLOR_MODE_KEY}.font.scale.${elem}`],
    ([base, scale]) => `${Math.round(base * scale)}px`
  );
  return acc;
}, {});

export default {
  font,
  lineHeight,
  baseline,
  fontScale,
  fontSize: fontScale.medium,
};

// // Line height
// $euiLineHeight:     1.5;
// $euiBodyLineHeight: 1;

// // Font weights
// $euiFontWeightLight:        300;
// $euiFontWeightRegular:      400;
// $euiFontWeightMedium:       500;
// $euiFontWeightSemiBold:     600;
// $euiFontWeightBold:         700;
// $euiCodeFontWeightRegular:  400;
// $euiCodeFontWeightBold:     700;

// Titles map
// Lists all the properties per EuiTitle size that then gets looped through to create the selectors.
// The map allows for tokenization and easier customization per theme, otherwise you'd have to override the selectors themselves
// $euiTitles: (
//   'xxxs': (
//     'font-size': $euiFontSizeXS,
//     'line-height': lineHeightFromBaseline(3),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'xxs': (
//     'font-size': $euiFontSizeS,
//     'line-height': lineHeightFromBaseline(3),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'xs': (
//     'font-size': $euiFontSize,
//     'line-height': lineHeightFromBaseline(3),
//     'font-weight': $euiFontWeightSemiBold,
//     'letter-spacing': -.02em,
//   ),
//   's': (
//     'font-size': $euiFontSizeL,
//     'line-height': lineHeightFromBaseline(4),
//     'font-weight': $euiFontWeightMedium,
//     'letter-spacing': -.025em,
//   ),
//   'm': (
//     'font-size': $euiFontSizeXL,
//     'line-height': lineHeightFromBaseline(5),
//     'font-weight': $euiFontWeightLight,
//     'letter-spacing': -.04em,
//   ),
//   'l': (
//     'font-size': $euiFontSizeXXL,
//     'line-height': lineHeightFromBaseline(6),
//     'font-weight': $euiFontWeightLight,
//     'letter-spacing': -.03em,
//   ),
// );
