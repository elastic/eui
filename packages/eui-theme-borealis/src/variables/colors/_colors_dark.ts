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

// Values sourced from @elastic/design-tokens — do not edit manually.
// To change a color, update the corresponding token in packages/design-tokens/
// and rebuild.
import tokens from '@elastic/design-tokens/dist/ts/dark-all.json';

import { PRIMITIVE_COLORS } from './_primitive_colors';

/*
 * DARK THEME
 */

const m = tokens.color;

export const dark_brand_colors: _EuiThemeBrandColors = {
  primary: m.brand.primary,
  accent: m.brand.accent,
  accentSecondary: m.brand['accent-secondary'],
  success: m.brand.success,
  warning: m.brand.warning,
  danger: m.brand.danger,
};

export const dark_brand_text_colors: _EuiThemeBrandTextColors = {
  /* Legacy colors */
  primaryText: m.text.primary,
  accentText: m.text.accent,
  successText: m.text.success,
  warningText: m.text.warning,
  dangerText: m.text.danger,

  /* New colors */
  textPrimary: m.text.primary,
  textAccent: m.text.accent,
  textAccentSecondary: m.text['accent-secondary'],
  textNeutral: m.text.neutral,
  textSuccess: m.text.success,
  textWarning: m.text.warning,
  textRisk: m.text.risk,
  textDanger: m.text.danger,
  textAssistance: m.text.assistance,
};

export const dark_text_colors: _EuiThemeTextColors = {
  /* Legacy colors */
  text: m.text.paragraph,
  title: m.text.heading,
  subduedText: m.text.subdued,
  link: m.text.link,

  /* New colors */
  textParagraph: m.text.paragraph,
  textHeading: m.text.heading,
  textSubdued: m.text.subdued,
  textDisabled: m.text.disabled,
  textInverse: m.text.inverse,
  textInk: m.text.ink,
  textGhost: m.text.ghost,
};

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: m['shade-alias'].empty,
  lightestShade: m['shade-alias'].lightest,
  lightShade: m['shade-alias'].light,
  mediumShade: m['shade-alias'].medium,
  darkShade: m['shade-alias'].dark,
  darkestShade: m['shade-alias'].darkest,
  fullShade: m['shade-alias'].full,
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundBasePrimary: m.background.base.primary,
  backgroundBaseAccent: m.background.base.accent,
  backgroundBaseAccentSecondary: m.background.base['accent-secondary'],
  backgroundBaseNeutral: m.background.base.neutral,
  backgroundBaseSuccess: m.background.base.success,
  backgroundBaseWarning: m.background.base.warning,
  backgroundBaseRisk: m.background.base.risk,
  backgroundBaseDanger: m.background.base.danger,
  backgroundBaseAssistance: m.background.base.assistance,
  backgroundBaseSubdued: m.background.base.subdued,
  backgroundBasePlain: m.background.base.plain,
  backgroundBaseDisabled: m.background.base.disabled,
  backgroundBaseHighlighted: m.background.base.highlighted,

  backgroundBaseFormsPrepend: m.background.base['forms-prepend'],
  backgroundBaseFormsControlDisabled: m.background.base['forms-control-disabled'],

  backgroundBaseInteractiveHover: m.background.base['interactive-hover'],
  backgroundBaseInteractiveHoverAssistance: m.background.base['interactive-hover-assistance'],
  backgroundBaseInteractiveSelect: m.background.base['interactive-select'],
  backgroundBaseInteractiveSelectHover: m.background.base['interactive-select-hover'],
  backgroundBaseInteractiveOverlay: m.background.base['interactive-overlay'],

  backgroundBaseSkeletonEdge: m.background.base['skeleton-edge'],
  backgroundBaseSkeletonMiddle: m.background.base['skeleton-middle'],

  backgroundLightPrimary: m.background.light.primary,
  backgroundLightAccent: m.background.light.accent,
  backgroundLightAccentSecondary: m.background.light['accent-secondary'],
  backgroundLightNeutral: m.background.light.neutral,
  backgroundLightSuccess: m.background.light.success,
  backgroundLightWarning: m.background.light.warning,
  backgroundLightRisk: m.background.light.risk,
  backgroundLightDanger: m.background.light.danger,
  backgroundLightAssistance: m.background.light.assistance,
  backgroundLightText: m.background.light.text,

  backgroundFilledPrimary: m.background.filled.primary,
  backgroundFilledAccent: m.background.filled.accent,
  backgroundFilledAccentSecondary: m.background.filled['accent-secondary'],
  backgroundFilledNeutral: m.background.filled.neutral,
  backgroundFilledSuccess: m.background.filled.success,
  backgroundFilledWarning: m.background.filled.warning,
  backgroundFilledRisk: m.background.filled.risk,
  backgroundFilledDanger: m.background.filled.danger,
  backgroundFilledAssistance: m.background.filled.assistance,
  backgroundFilledText: m.background.filled.text,
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
  borderBasePrimary: m.border.base.primary,
  borderBaseAccent: m.border.base.accent,
  borderBaseAccentSecondary: m.border.base['accent-secondary'],
  borderBaseNeutral: m.border.base.neutral,
  borderBaseSuccess: m.border.base.success,
  borderBaseWarning: m.border.base.warning,
  borderBaseRisk: m.border.base.risk,
  borderBaseDanger: m.border.base.danger,
  borderBaseAssistance: m.border.base.assistance,

  borderBasePlain: m.border.base.plain,
  borderBaseSubdued: m.border.base.subdued,
  borderBaseProminent: m.border.base.prominent,
  borderBaseDisabled: m.border.base.disabled,
  borderBaseFloating: m.border.base.floating,

  borderBaseFormsColorSwatch: m.border.base['forms-color-swatch'],

  borderInteractiveFormsHoverPlain: m.border.interactive['forms-hover-plain'],
  borderInteractiveFormsHoverProminent: m.border.interactive['forms-hover-prominent'],
  borderInteractiveFormsHoverDanger: m.border.interactive['forms-hover-danger'],

  borderStrongPrimary: m.border.strong.primary,
  borderStrongAccent: m.border.strong.accent,
  borderStrongAccentSecondary: m.border.strong['accent-secondary'],
  borderStrongNeutral: m.border.strong.neutral,
  borderStrongSuccess: m.border.strong.success,
  borderStrongWarning: m.border.strong.warning,
  borderStrongRisk: m.border.strong.risk,
  borderStrongDanger: m.border.strong.danger,
  borderStrongAssistance: m.border.strong.assistance,
  borderStrongText: m.border.strong.text,
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  body: m.special.body,
  highlight: m.special.highlight,
  disabled: m.special.disabled,
  disabledText: m.special['disabled-text'],
  shadow: m.special.shadow,
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
