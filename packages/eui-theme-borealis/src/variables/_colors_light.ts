/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  computed,
  type _EuiThemeBrandColors,
  type _EuiThemeBrandTextColors,
  type _EuiThemeShadeColors,
  type _EuiThemeSpecialColors,
  type _EuiThemeTextColors,
  type _EuiThemeColorsMode,
} from '@elastic/eui-theme-common';

/*
 * LIGHT THEME
 */

export const brand_colors: _EuiThemeBrandColors = {
  primary: '#00ff00', // test color for distinction
  accent: '#F04E98',
  success: '#00BFB3',
  warning: '#FEC514',
  danger: '#BD271E',
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  // temp. static values to remove dependency on makeHighContrastColor
  primaryText: '#006bb8',
  accentText: '#ba3d76',
  successText: '#00BFB3',
  warningText: '#83650a',
  dangerText: '#bd271e',
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFF',
  lightestShade: '#F1F4FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  // temp. static values to remove dependency on tint and makeDisabledContrastColor
  body: '#f7f8fc',
  highlight: '#fff9e8',
  disabled: '#ABB4C4',
  disabledText: '#a2abba',
  shadow: computed(({ colors }) => colors.ink),
};

export const text_colors: _EuiThemeTextColors = {
  text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  // temp. static values to remove dependency on tint and makeDisabledContrastColor
  title: '#1a1c21',
  subduedText: '#646a77',
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

export const light_colors: _EuiThemeColorsMode = {
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,
  ...text_colors,
};
