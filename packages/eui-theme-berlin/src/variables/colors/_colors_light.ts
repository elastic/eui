/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  type _EuiThemeColors,
  type _EuiThemeBrandColors,
  type _EuiThemeBrandTextColors,
  type _EuiThemeShadeColors,
  type _EuiThemeSpecialColors,
  type _EuiThemeTextColors,
  type _EuiThemeColorsMode,
} from '@elastic/eui-theme-base';

import { PRIMITIVE_COLORS } from './_primitive_colors';
import { SEMANTIC_COLORS } from './_semantic_colors';

/*
 * LIGHT THEME
 */

export const brand_colors: _EuiThemeBrandColors = {
  primary: SEMANTIC_COLORS.primary90,
  accent: SEMANTIC_COLORS.accent90,
  accentSecondary: SEMANTIC_COLORS.accentSecondary90,
  success: SEMANTIC_COLORS.success90,
  warning: SEMANTIC_COLORS.warning40,
  danger: SEMANTIC_COLORS.danger90,
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  /* Legacy colors */
  primaryText: SEMANTIC_COLORS.primary100,
  accentText: SEMANTIC_COLORS.accent100,
  successText: SEMANTIC_COLORS.success100,
  warningText: SEMANTIC_COLORS.warning100,
  dangerText: SEMANTIC_COLORS.danger100,

  /* New colors */
  textPrimary: SEMANTIC_COLORS.primary100,
  textAccent: SEMANTIC_COLORS.accent100,
  textAccentSecondary: SEMANTIC_COLORS.accentSecondary100,
  textSuccess: SEMANTIC_COLORS.success100,
  textWarning: SEMANTIC_COLORS.warning100,
  textDanger: SEMANTIC_COLORS.danger100,
};

export const text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: SEMANTIC_COLORS.shade135,
  title: SEMANTIC_COLORS.shade140,
  subduedText: SEMANTIC_COLORS.shade100,
  link: SEMANTIC_COLORS.primary100,

  /* New colors */
  textParagraph: SEMANTIC_COLORS.shade135,
  textHeading: SEMANTIC_COLORS.shade140,
  textSubdued: SEMANTIC_COLORS.shade100,
  textDisabled: SEMANTIC_COLORS.shade80,
  textInverse: SEMANTIC_COLORS.plainLight,
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: SEMANTIC_COLORS.plainLight,
  lightestShade: SEMANTIC_COLORS.shade10,
  lightShade: SEMANTIC_COLORS.shade30,
  mediumShade: SEMANTIC_COLORS.shade60,
  darkShade: SEMANTIC_COLORS.shade85,
  darkestShade: SEMANTIC_COLORS.shade125,
  fullShade: PRIMITIVE_COLORS.black,
};

export const special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.shade10,
  highlight: SEMANTIC_COLORS.warning10,
  disabled: SEMANTIC_COLORS.shade20,
  disabledText: SEMANTIC_COLORS.shade80,
  shadow: PRIMITIVE_COLORS.black,
};

export const light_colors: _EuiThemeColorsMode = {
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  ...brand_text_colors,
  ...text_colors,
};
