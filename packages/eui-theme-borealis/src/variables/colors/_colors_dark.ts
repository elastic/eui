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
  warningText: SEMANTIC_COLORS.warning60,
  dangerText: SEMANTIC_COLORS.danger60,

  /* New colors */
  textPrimary: SEMANTIC_COLORS.primary60,
  textAccent: SEMANTIC_COLORS.accent60,
  textAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  textSuccess: SEMANTIC_COLORS.success60,
  textWarning: SEMANTIC_COLORS.warning60,
  textDanger: SEMANTIC_COLORS.danger60,
};

export const dark_text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: SEMANTIC_COLORS.shade20,
  title: SEMANTIC_COLORS.shade15,
  subduedText: SEMANTIC_COLORS.shade40,
  link: SEMANTIC_COLORS.primary60,

  /* New colors */
  textParagraph: SEMANTIC_COLORS.shade20,
  textHeading: SEMANTIC_COLORS.shade15,
  textSubdued: SEMANTIC_COLORS.shade40,
  textDisabled: SEMANTIC_COLORS.shade60,
  textInverse: SEMANTIC_COLORS.plainDark,
};

/* TODO: These are not finalized yet.
These tokens won't be used in the new theme specifically,
but we want to support them until fully deprecated */
export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: SEMANTIC_COLORS.plainDark,
  lightestShade: SEMANTIC_COLORS.shade135,
  lightShade: SEMANTIC_COLORS.shade125,
  mediumShade: SEMANTIC_COLORS.shade95,
  darkShade: SEMANTIC_COLORS.shade75,
  darkestShade: SEMANTIC_COLORS.shade30,
  fullShade: SEMANTIC_COLORS.plainLight,
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundBasePrimary: SEMANTIC_COLORS.primary130,
  backgroundBaseAccent: SEMANTIC_COLORS.accent130,
  backgroundBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary130,
  backgroundBaseSuccess: SEMANTIC_COLORS.success130,
  backgroundBaseWarning: SEMANTIC_COLORS.warning130,
  backgroundBaseDanger: SEMANTIC_COLORS.danger130,
  backgroundBasePlain: SEMANTIC_COLORS.shade140,
  backgroundBaseSubdued: SEMANTIC_COLORS.shade130,
  backgroundBaseDisabled: SEMANTIC_COLORS.shade125,
  backgroundBasePage: SEMANTIC_COLORS.plainDark,
  backgroundBasePrepend: SEMANTIC_COLORS.shade125,

  backgroundBaseHover: SEMANTIC_COLORS.shade130,
  backgroundBaseHoverTransparent: PRIMITIVE_COLORS.transparent.white['10'],
  backgroundBaseSelect: SEMANTIC_COLORS.primary130,
  backgroundBaseOverlay: SEMANTIC_COLORS.shadeTransparent100,
  backgroundBaseSkeletonEdge: PRIMITIVE_COLORS.transparent.white['10'],
  backgroundBaseSkeletonMiddle: PRIMITIVE_COLORS.transparent.white['30'],

  backgroundLightPrimary: SEMANTIC_COLORS.primary120,
  backgroundLightAccent: SEMANTIC_COLORS.accent120,
  backgroundLightAccentSecondary: SEMANTIC_COLORS.accentSecondary120,
  backgroundLightSuccess: SEMANTIC_COLORS.success120,
  backgroundLightWarning: SEMANTIC_COLORS.warning120,
  backgroundLightDanger: SEMANTIC_COLORS.danger120,
  backgroundLightText: SEMANTIC_COLORS.shade120,

  backgroundFilledPrimary: SEMANTIC_COLORS.primary70,
  backgroundFilledAccent: SEMANTIC_COLORS.accent70,
  backgroundFilledAccentSecondary: SEMANTIC_COLORS.accentSecondary70,
  backgroundFilledSuccess: SEMANTIC_COLORS.success70,
  backgroundFilledWarning: SEMANTIC_COLORS.warning40,
  backgroundFilledDanger: SEMANTIC_COLORS.danger70,
  backgroundFilledText: SEMANTIC_COLORS.shade70,
};

export const dark_border_colors: _EuiThemeBorderColors = {
  borderBasePrimary: SEMANTIC_COLORS.primary60,
  borderBaseAccent: SEMANTIC_COLORS.accent60,
  borderBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  borderBaseSuccess: SEMANTIC_COLORS.success60,
  borderBaseWarning: SEMANTIC_COLORS.warning40,
  borderBaseDanger: SEMANTIC_COLORS.danger60,
  borderBasePlain: SEMANTIC_COLORS.shade110,
  borderBaseSubdued: SEMANTIC_COLORS.shade120,
  borderBaseDisabled: SEMANTIC_COLORS.shade110,
  borderBaseFloating: SEMANTIC_COLORS.shade120,
  borderBaseColorSwatch: PRIMITIVE_COLORS.transparent.white['30'],
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.plainDark,
  highlight: SEMANTIC_COLORS.primary100,
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
  ...dark_border_colors,
};
