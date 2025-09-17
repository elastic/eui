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
  type _EuiThemeText,
} from '@elastic/eui-theme-common';

// Typographic scale -- loosely based on Major Third (1.200)
export const fontScale: _EuiThemeFontScales = {
  xxxs: 0.786, // 11px (same as xxs, or remove xxs entirely)
  xxs: 0.786, // 11px (new min)
  xs: 0.857, // 12px
  s: 1, // 14px (new base)
  m: 1.143, // 16px
  l: 1.429, // 20px
  xl: 1.714, // 24px (new max)
  xxl: 1.714, // 24px  (same as xl, or remove xxs entirely)
};

// Families & base font settings
export const fontBase: _EuiThemeFontBase = {
  family: "'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  familyCode: "'Roboto Mono', Menlo, Courier, monospace",
  familySerif: 'Georgia, Times, Times New Roman, serif',

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "'calt' 1, 'kern' 1, 'liga' 1",
  defaultUnits: 'rem', 

  baseline: computed(([base]) => (typeof base === 'object' ? base.base : base) / 4, ['base']),
  lineHeightMultiplier: 1.5,
  letterSpacing: -0.1,
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
  text: {
    defaultSize: 's',
  },
  spacer: {
    defaultSize: 'm',
  },
  horizontalRule: {
    defaultMargin: 'm',
  },
  button: {
    defaultSize: 's',
  },
  formControls: {
    defaultCompressed: true,
  },
  tabs: {
    defaultSize: 'm',
  },
  searchBar: {
    defaultGutterSize: 's', // Smaller gap between search input and filters
  },
  flexGroup: {
    defaultGutterSize: 's', // Tighter spacing for flex groups
  },
  basicTable: {
    defaultTransparent: true, // Transparent background for Borealis
  },
  title: {
    weight: 'semiBold',
    letterSpacing: -0.2,
    scaleMapping: {
      xxxs: 'xs',
      xxs: 'xs',
      xs: 's',
      s: 'm',
      m: 'l',
      l: 'xl',
    },
    // Borealis-specific overrides for EuiCallout titles
    calloutScaleMapping: {
      s: 'xs',  // Callout "s" → EuiTitle "s" → 14px
      m: 's',  // Callout "m" → EuiTitle "m" → 16px
    },
    // tabsScaleMapping: {
    //   s: 'xs',  // Tab "s" → EuiTitle "xs" → 12px
    //   m: 's',   // Tab "m" → EuiTitle "s" → 14px
    //   l: 'm',   // Tab "l" → EuiTitle "m" → 16px
    // },
  },
};
