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
 * DARK THEME
 */

export const dark_brand_colors: _EuiThemeBrandColors = {
  primary: '#00aa00', // test color for distinction
  accent: '#F68FBE',
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',
};

export const dark_brand_text_colors: _EuiThemeBrandTextColors = {
  // temp. static values to remove dependency on makeHighContrastColor
  primaryText: '#36a2ef',
  accentText: '#f68fbe',
  successText: '#7dded8',
  warningText: '#f3d371',
  dangerText: '#f86b63',
};

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  // temp. static values to remove dependency on shade and makeDisabledContrastColor
  body: '#141519',
  highlight: '#2E2D25',
  disabled: '#515761',
  disabledText: '#515761',
  shadow: computed(({ colors }) => colors.ink),
};

export const dark_text_colors: _EuiThemeTextColors = {
  text: '#DFE5EF',
  title: computed(([text]) => text, ['colors.text']),
  subduedText: '#81858f', // temp. static value to remove dependency makeDisabledContrastColor
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

export const dark_colors: _EuiThemeColorsMode = {
  ...dark_brand_colors,
  ...dark_shades,
  ...dark_special_colors,
  // Need to come after special colors so they can react to `body`
  ...dark_brand_text_colors,
  ...dark_text_colors,
};
