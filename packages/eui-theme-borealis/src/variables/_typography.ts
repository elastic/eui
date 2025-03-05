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
} from '@elastic/eui-theme-common';

// Typographic scale -- loosely based on Major Third (1.200)
export const fontScale: _EuiThemeFontScales = {
  xxxs: 0.5625, // 9px
  xxs: 0.6875, // 11px
  xs: 0.75, // 12px
  s: 0.875, // 14px
  m: 1, // 16px
  l: 1.25, // 20px
  xl: 1.5, // 24px
  xxl: 1.875, // 30px
};

// Families & base font settings
export const fontBase: _EuiThemeFontBase = {
  family: "'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  familyCode: "'Roboto Mono', Menlo, Courier, monospace",
  familySerif: 'Georgia, Times, Times New Roman, serif',

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "'calt' 1, 'kern' 1, 'liga' 1",
  defaultUnits: 'rem',

  baseline: computed(([base]) => base / 4, ['base']),
  lineHeightMultiplier: 1.5,
};

export const fontWeight: _EuiThemeFontWeights = {
  light: 300,
  regular: 400,
  medium: 450,
  semiBold: 500,
  bold: 600,
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
