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
  primary: SEMANTIC_COLORS.primary60,
  accent: SEMANTIC_COLORS.accent60,
  accentSecondary: SEMANTIC_COLORS.accentSecondary60,
  success: SEMANTIC_COLORS.success60,
  warning: SEMANTIC_COLORS.warning40,
  danger: SEMANTIC_COLORS.danger60,
};

export const dark_brand_text_colors: _EuiThemeBrandTextColors = {
  /* Legacy colors */
  primaryText: SEMANTIC_COLORS.primary60,
  accentText: SEMANTIC_COLORS.accent60,
  successText: SEMANTIC_COLORS.success60,
  warningText: SEMANTIC_COLORS.warning30,
  dangerText: SEMANTIC_COLORS.danger60,

  /* New colors */
  textPrimary: SEMANTIC_COLORS.primary60,
  textAccent: SEMANTIC_COLORS.accent60,
  textAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  textNeutral: SEMANTIC_COLORS.neutral60,
  textSuccess: SEMANTIC_COLORS.success60,
  textWarning: SEMANTIC_COLORS.warning30,
  textRisk: SEMANTIC_COLORS.risk50,
  textDanger: SEMANTIC_COLORS.danger60,
};

export const dark_text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: SEMANTIC_COLORS.shade30,
  title: SEMANTIC_COLORS.shade20,
  subduedText: SEMANTIC_COLORS.shade60,
  link: SEMANTIC_COLORS.primary60,

  /* New colors */
  textParagraph: SEMANTIC_COLORS.shade30,
  textHeading: SEMANTIC_COLORS.shade20,
  textSubdued: SEMANTIC_COLORS.shade60,
  textDisabled: SEMANTIC_COLORS.shade80,
  textInverse: SEMANTIC_COLORS.plainDark,
};

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: SEMANTIC_COLORS.shade145,
  lightestShade: SEMANTIC_COLORS.shade135,
  lightShade: SEMANTIC_COLORS.shade125,
  mediumShade: SEMANTIC_COLORS.shade95,
  darkShade: SEMANTIC_COLORS.shade75,
  darkestShade: SEMANTIC_COLORS.shade30,
  fullShade: SEMANTIC_COLORS.plainLight,
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundBasePrimary: SEMANTIC_COLORS.primary140,
  backgroundBaseAccent: SEMANTIC_COLORS.accent140,
  backgroundBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary140,
  backgroundBaseNeutral: SEMANTIC_COLORS.neutral140,
  backgroundBaseSuccess: SEMANTIC_COLORS.success140,
  backgroundBaseWarning: SEMANTIC_COLORS.warning140,
  backgroundBaseRisk: SEMANTIC_COLORS.risk140,
  backgroundBaseDanger: SEMANTIC_COLORS.danger140,
  backgroundBaseSubdued: SEMANTIC_COLORS.plainDark,
  backgroundBasePlain: SEMANTIC_COLORS.shade145,
  backgroundBaseDisabled: SEMANTIC_COLORS.shade130,
  backgroundBaseHighlighted: SEMANTIC_COLORS.shade135,

  backgroundBaseFormsPrepend: SEMANTIC_COLORS.shade125,
  backgroundBaseFormsControlDisabled: SEMANTIC_COLORS.shade120,

  backgroundBaseInteractiveHover: SEMANTIC_COLORS.plainLightAlpha8,
  backgroundBaseInteractiveSelect: SEMANTIC_COLORS.primary130,
  backgroundBaseInteractiveSelectHover: SEMANTIC_COLORS.primary120,
  backgroundBaseInteractiveOverlay: SEMANTIC_COLORS.shade120Alpha70,

  backgroundBaseSkeletonEdge: SEMANTIC_COLORS.plainLightAlpha16,
  backgroundBaseSkeletonMiddle: SEMANTIC_COLORS.plainLightAlpha8,

  backgroundLightPrimary: SEMANTIC_COLORS.primary130,
  backgroundLightAccent: SEMANTIC_COLORS.accent130,
  backgroundLightAccentSecondary: SEMANTIC_COLORS.accentSecondary130,
  backgroundLightNeutral: SEMANTIC_COLORS.neutral130,
  backgroundLightSuccess: SEMANTIC_COLORS.success130,
  backgroundLightWarning: SEMANTIC_COLORS.warning130,
  backgroundLightRisk: SEMANTIC_COLORS.risk130,
  backgroundLightDanger: SEMANTIC_COLORS.danger130,
  backgroundLightText: SEMANTIC_COLORS.shade120,

  backgroundFilledPrimary: SEMANTIC_COLORS.primary60,
  backgroundFilledAccent: SEMANTIC_COLORS.accent60,
  backgroundFilledAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  backgroundFilledNeutral: SEMANTIC_COLORS.neutral50,
  backgroundFilledSuccess: SEMANTIC_COLORS.success60,
  backgroundFilledWarning: SEMANTIC_COLORS.warning40,
  backgroundFilledRisk: SEMANTIC_COLORS.risk50,
  backgroundFilledDanger: SEMANTIC_COLORS.danger60,
  backgroundFilledText: SEMANTIC_COLORS.shade60,
};

/**
 * NOTE: temp values for migration - these should not be used,
 * use backgroundBase tokens instead
 * TODO: remove once obsolete
 */
export const dark_transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    backgroundTransparent: PRIMITIVE_COLORS.transparent,
    backgroundTransparentPrimary: dark_background_colors.backgroundBasePrimary,
    backgroundTransparentAccent: dark_background_colors.backgroundBaseAccent,
    backgroundTransparentAccentSecondary:
      dark_background_colors.backgroundBaseAccent,
    backgroundTransparentNeutral: dark_background_colors.backgroundBaseNeutral,
    backgroundTransparentSuccess: dark_background_colors.backgroundBaseSuccess,
    backgroundTransparentWarning: dark_background_colors.backgroundBaseWarning,
    backgroundTransparentRisk: dark_background_colors.backgroundBaseRisk,
    backgroundTransparentDanger: dark_background_colors.backgroundBaseDanger,
    backgroundTransparentSubdued: dark_background_colors.backgroundBaseSubdued,
    backgroundTransparentHighlighted:
      dark_background_colors.backgroundBaseSubdued,
    backgroundTransparentPlain: dark_background_colors.backgroundBasePlain,
  };

export const dark_border_colors: _EuiThemeBorderColors = {
  borderBasePrimary: SEMANTIC_COLORS.primary120,
  borderBaseAccent: SEMANTIC_COLORS.accent120,
  borderBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary120,
  borderBaseNeutral: SEMANTIC_COLORS.neutral120,
  borderBaseSuccess: SEMANTIC_COLORS.success120,
  borderBaseWarning: SEMANTIC_COLORS.warning120,
  borderBaseRisk: SEMANTIC_COLORS.risk120,
  borderBaseDanger: SEMANTIC_COLORS.danger120,

  borderBasePlain: SEMANTIC_COLORS.shade100,
  borderBaseSubdued: SEMANTIC_COLORS.shade120,
  borderBaseDisabled: SEMANTIC_COLORS.shade100,
  borderBaseFloating: SEMANTIC_COLORS.shade120,

  borderBaseFormsColorSwatch: SEMANTIC_COLORS.plainLightAlpha32,
  borderBaseFormsControl: SEMANTIC_COLORS.shade80,

  borderInteractiveFormsHoverPlain: SEMANTIC_COLORS.shade90,
  borderInteractiveFormsHoverDanger: SEMANTIC_COLORS.danger70,

  borderStrongPrimary: SEMANTIC_COLORS.primary60,
  borderStrongAccent: SEMANTIC_COLORS.accent60,
  borderStrongAccentSecondary: SEMANTIC_COLORS.accentSecondary60,
  borderStrongNeutral: SEMANTIC_COLORS.neutral60,
  borderStrongSuccess: SEMANTIC_COLORS.success60,
  borderStrongWarning: SEMANTIC_COLORS.warning40,
  borderStrongRisk: SEMANTIC_COLORS.risk50,
  borderStrongDanger: SEMANTIC_COLORS.danger60,
  borderStrongText: SEMANTIC_COLORS.shade60,
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.plainDark,
  highlight: SEMANTIC_COLORS.primary100,
  disabled: SEMANTIC_COLORS.shade130,
  disabledText: SEMANTIC_COLORS.shade80,
  shadow: PRIMITIVE_COLORS.black,
};

export const dark_colors: _EuiThemeColorsMode = {
  ...dark_brand_colors,
  ...dark_shades,
  ...dark_special_colors,
  ...dark_brand_text_colors,
  ...dark_text_colors,
  ...dark_background_colors,
  ...dark_transparent_background_colors,
  ...dark_border_colors,
};
