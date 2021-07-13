/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { font } from '../../../../global_styling/variables/_typography';

// Creates the font sizes by multiplying the `base` with each of the scale values
// const fontSize = Object.keys(font.scale).reduce((acc, elem) => {
//   acc[elem] = computed(
//     [`${COLOR_MODE_KEY}.font.base.m`, `${COLOR_MODE_KEY}.font.scale.${elem}`],
//     ([base, scale]) => `${base * scale}px`
//   );
//   return acc;
// }, {});

export const font_ams = {
  ...font,
  family: "'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
};

// $euiFontSizeXS:   floor($euiFontSize * .86);  // 12px // h6
// $euiFontSizeS:    floor($euiFontSize * 1);    // 14px // h5 --> Now the same as the base $euiFontSize
// $euiFontSizeM:     ceil($euiFontSize * 1.14); // 16px // h4
// $euiFontSizeL:     ceil($euiFontSize * 1.57); // 22px // h3
// $euiFontSizeXL:   floor($euiFontSize * 1.93); // 27px // h2
// $euiFontSizeXXL:  floor($euiFontSize * 2.43); // 34px // h1

// $euiBodyLineHeight: 1.142857143; // 16px from a 14px base font size to ensure it aligns to our 16px grid

// $euiCodeFontWeightRegular: 400;
// $euiCodeFontWeightBold: 700;

// // Use 8px increments for base gridline
// @function lineHeightFromBaseline($multiplier: 3) {
//   @return convertToRem(($euiSize/2)*$multiplier);
// }
// @mixin lineHeightFromBaseline($multiplier: 3) {
//   line-height: lineHeightFromBaseline($multiplier);
// }

// $euiTitles: (
//   'xxxs': (
//     'font-size': $euiFontSizeXS,
//     'line-height': lineHeightFromBaseline(2),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'xxs': (
//     'font-size': $euiFontSizeS,
//     'line-height': lineHeightFromBaseline(3),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'xs': (
//     'font-size': $euiFontSizeM,
//     'line-height': lineHeightFromBaseline(3),
//     'font-weight': $euiFontWeightBold,
//   ),
//   's': (
//     'font-size': $euiFontSizeL,
//     'line-height': lineHeightFromBaseline(4),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'm': (
//     'font-size': $euiFontSizeXL,
//     'line-height': lineHeightFromBaseline(4),
//     'font-weight': $euiFontWeightBold,
//   ),
//   'l': (
//     'font-size': $euiFontSizeXXL,
//     'line-height': lineHeightFromBaseline(5),
//     'font-weight': $euiFontWeightBold,
//   ),
// );
