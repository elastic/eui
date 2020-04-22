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

import { euiSize } from './sizes';
// Some mixins that help us deal with browser scaling of text more consistantly.
// Essentially, fonts across eui should scale agains the root html element, not
// against parent inheritance.

// Typography mixins

const convertToRem = (size: number) => `${size / euiFontSize}rem`;

// Spit out rem and px
const fontSize = (size: number = euiFontSize) => `
  font-size: ${size}px;
  font-size: ${convertToRem(size)};
`;

// Our base gridline is at 1/2 the font-size, ensure line-heights stay on that gridline.
// EX: A proper line-height for text is 1.5 times the font-size.
//     If our base font size (euiFontSize) is 16, our baseline is 8 (16*1.5 / 3). To ensure the
//     text stays on the baseline, we pass a multiplier to calculate a line-height in rems.
const _lineHeightFromBaseline = (multiplier: number = 3) =>
  convertToRem((euiFontSize / 2) * multiplier);

// ??
const lineHeightFromBaseline = (multiplier: number = 3) =>
  `line-height: ${_lineHeightFromBaseline(multiplier)}`;

// Families
const families = {
  euiFontFamily:
    "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  euiCodeFontFamily: "'Roboto Mono', Consolas, Menlo, Courier, monospace",
};

// Careful using ligatures. Code editors like ACE will often error because of width calculations
const euiFontFeatureSettings = "'calt' 1, 'kern' 1, 'liga' 1";

// Font sizes -- scale is loosely based on Major Third (1.250)
const euiTextScale = [2.25, 1.75, 1.25, 1.125, 1, 0.875, 0.75];

const euiFontSize = euiSize; // 5th position in scale
const sizes = {
  euiFontSizeXS: euiFontSize * euiTextScale[6], // 12px
  euiFontSizeS: euiFontSize * euiTextScale[5], // 14px
  euiFontSizeM: euiFontSize * euiTextScale[3], // 18px
  euiFontSizeL: euiFontSize * euiTextScale[2], // 20px
  euiFontSizeXL: euiFontSize * euiTextScale[1], // 28px
  euiFontSizeXXL: euiFontSize * euiTextScale[0], // 36px
};

// Line height
const euiLineHeight = 1.5;

// Font weights
const weights = {
  euiFontWeightLight: 300,
  euiFontWeightRegular: 400,
  euiFontWeightMedium: 500,
  euiFontWeightSemiBold: 600,
  euiFontWeightBold: 700,
};

// Titles map
// Lists all the properties per EuiTitle size that then gets looped through to create the selectors.
// The map allows for tokenization and easier customization per theme, otherwise you'd have to override the selectors themselves
const titles = {
  xxxs: `
    font-size: ${sizes.euiFontSizeXS}px,
    line-height: ${lineHeightFromBaseline(3)},
    font-weight: ${weights.euiFontWeightBold},
  `,
  xxs: `
    font-size: ${sizes.euiFontSizeS}px,
    line-height: ${lineHeightFromBaseline(3)},
    font-weight: ${weights.euiFontWeightBold},
  `,
  xs: `
    font-size: ${euiFontSize}px,
    line-height: ${lineHeightFromBaseline(3)},
    font-weight: ${weights.euiFontWeightSemiBold},
    letter-spacing: -.02em,
  `,
  s: `
    font-size: ${sizes.euiFontSizeL}px,
    line-heigh': ${lineHeightFromBaseline(4)},
    font-weight: ${weights.euiFontWeightMedium},
    letter-spacing: -.025em,
  `,
  m: `
    font-size: ${sizes.euiFontSizeXL}px,
    line-height: ${lineHeightFromBaseline(5)},
    font-weight: ${weights.euiFontWeightLight},
    letter-spacing: -.04em,
  `,
  l: `
    font-size: ${sizes.euiFontSizeXXL}px,
    line-height: ${lineHeightFromBaseline(6)},
    font-weight: ${weights.euiFontWeightLight},
    letter-spacing: -.03em,
  `,
};

const typography = {
  fontSize,
  ...families,
  euiFontFeatureSettings,
  euiTextScale,
  ...sizes,
  euiLineHeight,
  ...weights,
  ...titles,
};

export default typography;
export { typography };
