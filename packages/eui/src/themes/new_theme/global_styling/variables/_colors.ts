/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../../../services/theme/utils';
import {
  _EuiThemeColors,
  _EuiThemeBrandColors,
  _EuiThemeBrandTextColors,
  _EuiThemeShadeColors,
  _EuiThemeSpecialColors,
  _EuiThemeTextColors,
  _EuiThemeColorsMode,
} from '../../../../global_styling/variables/colors';
import { COLOR_MATRIX, getColorMatrixValue } from './_color_matrix';

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

const matrix_colors = { matrix: COLOR_MATRIX };

export const brand_colors: _EuiThemeBrandColors = {
  primary: getColorMatrixValue('blue', 9),
  accent: getColorMatrixValue('pink', 5),
  success: getColorMatrixValue('teal', 4),
  warning: getColorMatrixValue('yellow', 4),
  danger: getColorMatrixValue('red', 9),
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  primaryText: getColorMatrixValue('blue', 10),
  accentText: getColorMatrixValue('pink', 10),
  successText: getColorMatrixValue('teal', 10),
  warningText: getColorMatrixValue('yellow', 10),
  dangerText: getColorMatrixValue('red', 10),
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFF',
  lightestShade: getColorMatrixValue('neutralGrey', 1),
  lightShade: getColorMatrixValue('neutralGrey', 3),
  mediumShade: getColorMatrixValue('neutralGrey', 5),
  darkShade: getColorMatrixValue('neutralGrey', 9),
  darkestShade: getColorMatrixValue('neutralGrey', 12),
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  body: getColorMatrixValue('neutralGrey', 1),
  highlight: getColorMatrixValue('yellow', 1),
  disabled: getColorMatrixValue('neutralGrey', 5),
  disabledText: getColorMatrixValue('neutralGrey', 5),
  shadow: computed(({ colors }) => colors.ink),
};

export const text_colors: _EuiThemeTextColors = {
  text: getColorMatrixValue('neutralGrey', 12),
  title: getColorMatrixValue('neutralGrey', 14),
  subduedText: getColorMatrixValue('neutralGrey', 10),
  link: getColorMatrixValue('blue', 10),
};

export const light_colors: _EuiThemeColorsMode = {
  ...matrix_colors,
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,
  ...text_colors,
};

/*
 * DARK THEME
 */

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: getColorMatrixValue('neutralGrey', 14),
  lightestShade: getColorMatrixValue('neutralGrey', 13),
  lightShade: getColorMatrixValue('neutralGrey', 12),
  mediumShade: getColorMatrixValue('neutralGrey', 10),
  darkShade: getColorMatrixValue('neutralGrey', 6),
  darkestShade: getColorMatrixValue('neutralGrey', 3),
  fullShade: '#FFF',
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  ...matrix_colors,

  // Brand
  primary: getColorMatrixValue('blue', 6),
  accent: getColorMatrixValue('pink', 5),
  success: getColorMatrixValue('teal', 4),
  warning: getColorMatrixValue('yellow', 4),
  danger: getColorMatrixValue('red', 6),

  // Shades
  ...dark_shades,

  // Special
  body: getColorMatrixValue('neutralGrey', 14),
  highlight: getColorMatrixValue('yellow', 13),
  disabled: getColorMatrixValue('neutralGrey', 10),
  disabledText: getColorMatrixValue('neutralGrey', 10),
  shadow: computed(({ colors }) => colors.ink),

  // Need to come after special colors so they can react to `body`
  primaryText: getColorMatrixValue('blue', 6),
  accentText: getColorMatrixValue('pink', 5),
  successText: getColorMatrixValue('teal', 4),
  warningText: getColorMatrixValue('yellow', 4),
  dangerText: getColorMatrixValue('red', 6),

  // Text
  text: getColorMatrixValue('neutralGrey', 2),
  title: getColorMatrixValue('neutralGrey', 2),
  subduedText: getColorMatrixValue('neutralGrey', 7),
  link: getColorMatrixValue('blue', 6),
};

/*
 * FULL
 */

export const colors: _EuiThemeColors = {
  ghost: '#FFF',
  ink: '#000',
  LIGHT: light_colors,
  DARK: dark_colors_ams,
};
