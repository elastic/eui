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
 * DARK THEME
 */

export const dark_brand_colors: _EuiThemeBrandColors = {
  primary: SEMANTIC_COLORS.primary70,
  accent: SEMANTIC_COLORS.accent70,
  accentSecondary: SEMANTIC_COLORS.accentSecondary70,
  success: SEMANTIC_COLORS.success60,
  warning: SEMANTIC_COLORS.warning40,
  danger: SEMANTIC_COLORS.danger70,
};

export const dark_brand_text_colors: _EuiThemeBrandTextColors = {
  /* Legacy colors */
  primaryText: SEMANTIC_COLORS.primary60,
  accentText: SEMANTIC_COLORS.accent60,
  successText: SEMANTIC_COLORS.success60,
  warningText: SEMANTIC_COLORS.warning40,
  dangerText: SEMANTIC_COLORS.danger60,

  /* New colors */
  textPrimary: SEMANTIC_COLORS.primary60,
  textAccent: SEMANTIC_COLORS.accent60,
  textAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  textSuccess: SEMANTIC_COLORS.success60,
  textWarning: SEMANTIC_COLORS.warning40,
  textDanger: SEMANTIC_COLORS.danger60,
};

export const dark_text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: SEMANTIC_COLORS.shade20,
  title: SEMANTIC_COLORS.shade15,
  subduedText: SEMANTIC_COLORS.shade110,
  link: SEMANTIC_COLORS.primary60,

  /* New colors */
  textParagraph: SEMANTIC_COLORS.shade20,
  textHeading: SEMANTIC_COLORS.shade15,
  textSubdued: SEMANTIC_COLORS.shade110,
  textDisabled: SEMANTIC_COLORS.shade120,
  textInverse: SEMANTIC_COLORS.plainDark,
};

/* TODO: These are not finalized yet.
These tokens won't be used in the new theme specifically,
but we want to support them until fully deprecated */
export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: PRIMITIVE_COLORS.black,
  lightestShade: SEMANTIC_COLORS.shade125,
  lightShade: SEMANTIC_COLORS.shade85,
  mediumShade: SEMANTIC_COLORS.shade60,
  darkShade: SEMANTIC_COLORS.shade30,
  darkestShade: SEMANTIC_COLORS.shade10,
  fullShade: PRIMITIVE_COLORS.white,
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundPrimary: SEMANTIC_COLORS.primary130,
  backgroundAccent: SEMANTIC_COLORS.accent130,
  backgroundAccentSecondary: SEMANTIC_COLORS.accentSecondary130,
  backgroundSuccess: SEMANTIC_COLORS.success130,
  backgroundWarning: SEMANTIC_COLORS.warning130,
  backgroundDanger: SEMANTIC_COLORS.danger130,
  backgroundSubdued: SEMANTIC_COLORS.plainDark,
  backgroundDisabled: SEMANTIC_COLORS.shade70,
  backgroundPlain: SEMANTIC_COLORS.shade140,
  backgroundPage: SEMANTIC_COLORS.plainDark,
};

/* TODO: align values for previously transparent backgrounds */
export const dark_transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    backgroundTransparent: 'transparent',
    backgroundTransparentPrimary: dark_background_colors.backgroundPrimary,
    backgroundTransparentAccent: dark_background_colors.backgroundAccent,
    backgroundTransparentSuccess: dark_background_colors.backgroundSuccess,
    backgroundTransparentWarning: dark_background_colors.backgroundWarning,
    backgroundTransparentDanger: dark_background_colors.backgroundDanger,
    backgroundTransparentSubdued: dark_background_colors.backgroundSubdued,
    backgroundTransparentPlain: dark_background_colors.backgroundPlain,
  };

export const dark_border_colors: _EuiThemeBorderColors = {
  borderPrimary: SEMANTIC_COLORS.primary60,
  borderAccent: SEMANTIC_COLORS.accent60,
  borderAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  borderSuccess: SEMANTIC_COLORS.success60,
  borderWarning: SEMANTIC_COLORS.warning40,
  borderDanger: SEMANTIC_COLORS.danger60,
  borderSubdued: SEMANTIC_COLORS.shade110,
  borderDisabled: SEMANTIC_COLORS.shade110,
  borderPlain: SEMANTIC_COLORS.shade110,
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.plainDark,
  highlight: SEMANTIC_COLORS.warning100,
  disabled: SEMANTIC_COLORS.shade70,
  disabledText: SEMANTIC_COLORS.shade120,
  shadow: PRIMITIVE_COLORS.black,
};

export const dark_colors: _EuiThemeColorsMode = {
  ...SEMANTIC_COLORS,
  ...dark_brand_colors,
  ...dark_shades,
  ...dark_special_colors,
  ...dark_brand_text_colors,
  ...dark_text_colors,
  ...dark_background_colors,
  ...dark_transparent_background_colors,
  ...dark_border_colors,
};
