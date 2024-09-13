/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  computed,
  type _EuiThemeFont,
  type _EuiThemeFontBase,
  type _EuiThemeFontScales,
  type _EuiThemeFontWeights,
} from '@elastic/eui';

// Typographic scale -- loosely based on Major Third (1.250)
export const fontScale: _EuiThemeFontScales = {
  xxxs: 0.5625,
  xxs: 0.6875,
  xs: 0.75,
  s: 0.875,
  m: 1,
  l: 1.375,
  xl: 1.6875,
  xxl: 2.125,
};

// Families & base font settings
export const fontBase: _EuiThemeFontBase = {
  family: "'Comic Sans MS', 'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  familyCode: "'Comic Sans MS', 'Roboto Mono', Menlo, Courier, monospace",
  familySerif: "'Comic Sans MS', Georgia, Times, Times New Roman, serif",

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "",
  defaultUnits: 'rem',

  baseline: computed(([base]) => base / 4, ['base']),
  lineHeightMultiplier: 1.25,
};

export const fontWeight: _EuiThemeFontWeights = {
  light: 400,
  regular: 400,
  medium: 400,
  semiBold: 700,
  bold: 700,
};

export const font: _EuiThemeFont = {
  ...fontBase,
  scale: fontScale,
  weight: fontWeight,
  body: {
    scale: 's',
    weight: 'regular',
  },
  title: {
    weight: 'bold',
  },
};
