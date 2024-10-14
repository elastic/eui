/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  type _EuiThemeBrandColors,
  type _EuiThemeBrandTextColors,
  type _EuiThemeShadeColors,
  type _EuiThemeSpecialColors,
  type _EuiThemeTextColors,
  type _EuiThemeColorsMode,
  _EuiThemeBackgroundColors,
  _EuiThemeBorderColors,
  _EuiThemeTransparentBackgroundColors,
} from '@elastic/eui-theme-common';

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
  emptyShade: PRIMITIVE_COLORS.white,
  lightestShade: SEMANTIC_COLORS.shade10,
  lightShade: SEMANTIC_COLORS.shade30,
  mediumShade: SEMANTIC_COLORS.shade60,
  darkShade: SEMANTIC_COLORS.shade85,
  darkestShade: SEMANTIC_COLORS.shade125,
  fullShade: PRIMITIVE_COLORS.black,
};

export const background_colors: _EuiThemeBackgroundColors = {
  backgroundPrimary: SEMANTIC_COLORS.primary10,
  backgroundAccent: SEMANTIC_COLORS.accent10,
  backgroundAccentSecondary: SEMANTIC_COLORS.accentSecondary10,
  backgroundSuccess: SEMANTIC_COLORS.success10,
  backgroundWarning: SEMANTIC_COLORS.warning10,
  backgroundDanger: SEMANTIC_COLORS.danger10,
  backgroundSubdued: SEMANTIC_COLORS.shade10,
  backgroundDisabled: SEMANTIC_COLORS.shade20,
  backgroundPlain: SEMANTIC_COLORS.plainLight,
  backgroundPage: SEMANTIC_COLORS.shade10,
};

/* TODO: align values for previously transparent backgrounds */
export const transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    backgroundTransparent: 'transparent',
    backgroundTransparentPrimary: background_colors.backgroundPrimary,
    backgroundTransparentAccent: background_colors.backgroundAccent,
    backgroundTransparentSuccess: background_colors.backgroundSuccess,
    backgroundTransparentWarning: background_colors.backgroundWarning,
    backgroundTransparentDanger: background_colors.backgroundDanger,
    backgroundTransparentSubdued: SEMANTIC_COLORS.shade15,
    backgroundTransparentPlain: SEMANTIC_COLORS.shade15,
  };

export const border_colors: _EuiThemeBorderColors = {
  borderPrimary: SEMANTIC_COLORS.primary100,
  borderAccent: SEMANTIC_COLORS.accent100,
  borderAccentSecondary: SEMANTIC_COLORS.accentSecondary100,
  borderSuccess: SEMANTIC_COLORS.success100,
  borderWarning: SEMANTIC_COLORS.warning100,
  borderDanger: SEMANTIC_COLORS.danger100,
  borderSubdued: SEMANTIC_COLORS.shade30,
  borderDisabled: SEMANTIC_COLORS.shade30,
  borderPlain: SEMANTIC_COLORS.shade30,
};

export const special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.shade10,
  highlight: SEMANTIC_COLORS.warning10,
  disabled: SEMANTIC_COLORS.shade20,
  disabledText: SEMANTIC_COLORS.shade80,
  shadow: PRIMITIVE_COLORS.black,
};

export const light_colors: _EuiThemeColorsMode = {
  ...SEMANTIC_COLORS,
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  ...brand_text_colors,
  ...text_colors,
  ...background_colors,
  ...transparent_background_colors,
  ...border_colors,
};
