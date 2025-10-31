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
  textNeutral: SEMANTIC_COLORS.neutral100,
  textSuccess: SEMANTIC_COLORS.success100,
  textWarning: SEMANTIC_COLORS.warning100,
  textRisk: SEMANTIC_COLORS.risk100,
  textDanger: SEMANTIC_COLORS.danger100,
};

export const text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: SEMANTIC_COLORS.shade130,
  title: SEMANTIC_COLORS.shade140,
  subduedText: SEMANTIC_COLORS.shade95,
  link: SEMANTIC_COLORS.primary100,

  /* New colors */
  textParagraph: SEMANTIC_COLORS.shade130,
  textHeading: SEMANTIC_COLORS.shade140,
  textSubdued: SEMANTIC_COLORS.shade95,
  textDisabled: SEMANTIC_COLORS.shade70,
  textInverse: SEMANTIC_COLORS.plainLight,
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: SEMANTIC_COLORS.plainLight,
  lightestShade: SEMANTIC_COLORS.shade15,
  lightShade: SEMANTIC_COLORS.shade30,
  mediumShade: SEMANTIC_COLORS.shade60,
  darkShade: SEMANTIC_COLORS.shade90,
  darkestShade: SEMANTIC_COLORS.shade120,
  fullShade: SEMANTIC_COLORS.plainDark,
};

export const background_colors: _EuiThemeBackgroundColors = {
  backgroundBasePrimary: SEMANTIC_COLORS.primary10,
  backgroundBaseAccent: SEMANTIC_COLORS.accent10,
  backgroundBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary10,
  backgroundBaseNeutral: SEMANTIC_COLORS.neutral10,
  backgroundBaseSuccess: SEMANTIC_COLORS.success10,
  backgroundBaseWarning: SEMANTIC_COLORS.warning10,
  backgroundBaseRisk: SEMANTIC_COLORS.risk10,
  backgroundBaseDanger: SEMANTIC_COLORS.danger10,
  backgroundBaseSubdued: SEMANTIC_COLORS.shade10,
  backgroundBasePlain: SEMANTIC_COLORS.plainLight,
  backgroundBaseDisabled: SEMANTIC_COLORS.shade15,
  backgroundBaseHighlighted: SEMANTIC_COLORS.shade10,

  backgroundBaseFormsPrepend: SEMANTIC_COLORS.shade15,
  backgroundBaseFormsControlDisabled: SEMANTIC_COLORS.shade30,

  backgroundBaseInteractiveHover: SEMANTIC_COLORS.primary100Alpha4,
  backgroundBaseInteractiveSelect: SEMANTIC_COLORS.primary10,
  backgroundBaseInteractiveSelectHover: SEMANTIC_COLORS.primary20,
  backgroundBaseInteractiveOverlay: SEMANTIC_COLORS.shade100Alpha70,

  backgroundBaseSkeletonEdge: SEMANTIC_COLORS.shade100Alpha16,
  backgroundBaseSkeletonMiddle: SEMANTIC_COLORS.shade100Alpha4,

  backgroundLightPrimary: SEMANTIC_COLORS.primary20,
  backgroundLightAccent: SEMANTIC_COLORS.accent20,
  backgroundLightAccentSecondary: SEMANTIC_COLORS.accentSecondary20,
  backgroundLightNeutral: SEMANTIC_COLORS.neutral20,
  backgroundLightSuccess: SEMANTIC_COLORS.success20,
  backgroundLightWarning: SEMANTIC_COLORS.warning20,
  backgroundLightRisk: SEMANTIC_COLORS.risk20,
  backgroundLightDanger: SEMANTIC_COLORS.danger20,
  backgroundLightText: SEMANTIC_COLORS.shade20,

  backgroundFilledPrimary: SEMANTIC_COLORS.primary90,
  backgroundFilledAccent: SEMANTIC_COLORS.accent90,
  backgroundFilledAccentSecondary: SEMANTIC_COLORS.accentSecondary90,
  backgroundFilledNeutral: SEMANTIC_COLORS.neutral80,
  backgroundFilledSuccess: SEMANTIC_COLORS.success90,
  backgroundFilledWarning: SEMANTIC_COLORS.warning40,
  backgroundFilledRisk: SEMANTIC_COLORS.risk70,
  backgroundFilledDanger: SEMANTIC_COLORS.danger90,
  backgroundFilledText: SEMANTIC_COLORS.shade90,
};

/**
 * NOTE: temp values for migration - these should not be used,
 * use backgroundBase tokens instead
 * TODO: remove once obsolete
 */
export const transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    backgroundTransparent: PRIMITIVE_COLORS.transparent,
    backgroundTransparentPrimary: background_colors.backgroundBasePrimary,
    backgroundTransparentAccent: background_colors.backgroundBaseAccent,
    backgroundTransparentAccentSecondary:
      background_colors.backgroundBaseAccentSecondary,
    backgroundTransparentNeutral: background_colors.backgroundBaseNeutral,
    backgroundTransparentSuccess: background_colors.backgroundBaseSuccess,
    backgroundTransparentWarning: background_colors.backgroundBaseWarning,
    backgroundTransparentRisk: background_colors.backgroundBaseRisk,
    backgroundTransparentDanger: background_colors.backgroundBaseDanger,
    backgroundTransparentSubdued: SEMANTIC_COLORS.shade15,
    backgroundTransparentHighlighted: SEMANTIC_COLORS.shade15,
    backgroundTransparentPlain: SEMANTIC_COLORS.shade15,
  };

export const border_colors: _EuiThemeBorderColors = {
  borderBasePrimary: SEMANTIC_COLORS.primary30,
  borderBaseAccent: SEMANTIC_COLORS.accent30,
  borderBaseAccentSecondary: SEMANTIC_COLORS.accentSecondary30,
  borderBaseNeutral: SEMANTIC_COLORS.neutral30,
  borderBaseSuccess: SEMANTIC_COLORS.success30,
  borderBaseWarning: SEMANTIC_COLORS.warning30,
  borderBaseRisk: SEMANTIC_COLORS.risk30,
  borderBaseDanger: SEMANTIC_COLORS.danger30,

  borderBasePlain: SEMANTIC_COLORS.shade30,
  borderBaseSubdued: SEMANTIC_COLORS.shade20,
  borderBaseProminent: SEMANTIC_COLORS.shade50,
  borderBaseDisabled: SEMANTIC_COLORS.shade30,
  borderBaseFloating: PRIMITIVE_COLORS.transparent,

  borderBaseFormsColorSwatch: SEMANTIC_COLORS.shade100Alpha24,

  borderInteractiveFormsHoverPlain: SEMANTIC_COLORS.shade40,
  borderInteractiveFormsHoverProminent: SEMANTIC_COLORS.shade70,
  borderInteractiveFormsHoverDanger: SEMANTIC_COLORS.danger80,

  borderStrongPrimary: SEMANTIC_COLORS.primary90,
  borderStrongAccent: SEMANTIC_COLORS.accent90,
  borderStrongAccentSecondary: SEMANTIC_COLORS.accentSecondary90,
  borderStrongNeutral: SEMANTIC_COLORS.neutral90,
  borderStrongSuccess: SEMANTIC_COLORS.success90,
  borderStrongWarning: SEMANTIC_COLORS.warning90,
  borderStrongRisk: SEMANTIC_COLORS.risk90,
  borderStrongDanger: SEMANTIC_COLORS.danger90,
  borderStrongText: SEMANTIC_COLORS.shade90,
};

export const special_colors: _EuiThemeSpecialColors = {
  body: SEMANTIC_COLORS.shade10,
  highlight: SEMANTIC_COLORS.primary10,
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
  ...background_colors,
  ...transparent_background_colors,
  ...border_colors,
};
