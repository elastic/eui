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
  primary: getColorMatrixValue('blue', 90),
  accent: getColorMatrixValue('pink', 50),
  success: getColorMatrixValue('green', 40),
  warning: getColorMatrixValue('yellow', 40),
  danger: getColorMatrixValue('red', 90),
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  primaryText: getColorMatrixValue('blue', 100),
  accentText: getColorMatrixValue('pink', 100),
  successText: getColorMatrixValue('green', 100),
  warningText: getColorMatrixValue('yellow', 100),
  dangerText: getColorMatrixValue('red', 100),
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFF',
  lightestShade: getColorMatrixValue('blueGrey', 10),
  lightShade: getColorMatrixValue('blueGrey', 30),
  mediumShade: getColorMatrixValue('blueGrey', 50),
  darkShade: getColorMatrixValue('blueGrey', 90),
  darkestShade: getColorMatrixValue('blueGrey', 120),
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  body: getColorMatrixValue('blueGrey', 10),
  highlight: getColorMatrixValue('yellow', 10),
  disabled: getColorMatrixValue('blueGrey', 50),
  disabledText: getColorMatrixValue('blueGrey', 50),
  shadow: computed(({ colors }) => colors.ink),
};

export const text_colors: _EuiThemeTextColors = {
  text: getColorMatrixValue('blueGrey', 120),
  title: getColorMatrixValue('blueGrey', 140),
  subduedText: getColorMatrixValue('blueGrey', 100),
  link: getColorMatrixValue('blue', 100),
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
  emptyShade: getColorMatrixValue('blueGrey', 140),
  lightestShade: getColorMatrixValue('blueGrey', 130),
  lightShade: getColorMatrixValue('blueGrey', 120),
  mediumShade: getColorMatrixValue('blueGrey', 100),
  darkShade: getColorMatrixValue('blueGrey', 60),
  darkestShade: getColorMatrixValue('blueGrey', 30),
  fullShade: '#FFF',
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  ...matrix_colors,

  // Brand
  primary: getColorMatrixValue('blue', 60),
  accent: getColorMatrixValue('pink', 50),
  success: getColorMatrixValue('green', 40),
  warning: getColorMatrixValue('yellow', 40),
  danger: getColorMatrixValue('red', 60),

  // Shades
  ...dark_shades,

  // Special
  body: getColorMatrixValue('blueGrey', 140),
  highlight: getColorMatrixValue('yellow', 130),
  disabled: getColorMatrixValue('blueGrey', 100),
  disabledText: getColorMatrixValue('blueGrey', 100),
  shadow: computed(({ colors }) => colors.ink),

  // Need to come after special colors so they can react to `body`
  primaryText: getColorMatrixValue('blue', 60),
  accentText: getColorMatrixValue('pink', 50),
  successText: getColorMatrixValue('green', 40),
  warningText: getColorMatrixValue('yellow', 40),
  dangerText: getColorMatrixValue('red', 60),

  // Text
  text: getColorMatrixValue('blueGrey', 20),
  title: getColorMatrixValue('blueGrey', 20),
  subduedText: getColorMatrixValue('blueGrey', 70),
  link: getColorMatrixValue('blue', 60),
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
