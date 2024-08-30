/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeBrandColors,
  _EuiThemeBrandTextColors,
  _EuiThemeShadeColors,
  _EuiThemeSpecialColors,
  _EuiThemeTextColors,
  _EuiThemeBackgroundColors,
  _EuiThemeBorderColors,
  _EuiThemeSemanticColors,
  _EuiThemeColorsMode,
  _EuiThemeFormColors,
  _EuiThemeButtonColors,
} from '../../../../global_styling/variables/colors';
import { semanticColors } from '../../../../global_styling/variables/_color_matrix';
import { hexToRgb, isColorDark } from '../../../../services';

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

// manual definition to ensure types?
const semantic_colors: _EuiThemeSemanticColors = {
  plain: '#fff',
  ink: '#000',
  developerBlue: '#080F21',
  ...semanticColors,
};

const background_colors: _EuiThemeBackgroundColors = {
  backgroundPrimary: semantic_colors.primary10,
  backgroundAccent: semantic_colors.accent10,
  backgroundSuccess: semantic_colors.success10,
  backgroundWarning: semantic_colors.warning10,
  backgroundDanger: semantic_colors.danger10,
  backgroundSubdued: semantic_colors.shade10,
  backgroundPlain: semantic_colors.plain,
  backgroundDisabled: semantic_colors.shade15,
};

const transparent_background_colors = {
  backgroundPrimaryTransparent: semantic_colors.primary10,
  backgroundAccentTransparent: semantic_colors.accent10,
  backgroundSuccessTransparent: semantic_colors.success10,
  backgroundWarningTransparent: semantic_colors.warning10,
  backgroundDangerTransparent: semantic_colors.danger10,
  backgroundSubduedTransparent: semantic_colors.shade10,
  backgroundPlainTransparent: semantic_colors.shade10,
};

const border_colors: _EuiThemeBorderColors = {
  borderPrimary: semantic_colors.primary100,
  borderAccent: semantic_colors.primary100,
  borderSuccess: semantic_colors.success100,
  borderWarning: semantic_colors.warning100,
  borderDanger: semantic_colors.danger100,
  borderSubdued: semantic_colors.shade30,
  borderPlain: semantic_colors.shade30,
  borderDisabled: semantic_colors.shade30,
  borderHollow: semantic_colors.shade30,
};

export const brand_colors: _EuiThemeBrandColors = {
  primary: semantic_colors.primary90,
  accent: semantic_colors.accent50,
  success: semantic_colors.success40,
  warning: semantic_colors.warning40,
  danger: semantic_colors.danger90,
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: semantic_colors.plain,
  lightestShade: semantic_colors.shade10,
  lightShade: semantic_colors.shade30,
  mediumShade: semantic_colors.shade50,
  darkShade: semantic_colors.shade90,
  darkestShade: semantic_colors.shade120,
  fullShade: semantic_colors.ink,
};

export const text_colors: _EuiThemeTextColors = {
  text: semantic_colors.shade140,
  title: semantic_colors.shade140,
  subduedText: semantic_colors.shade100,
  link: semantic_colors.primary100,
  // new
  textHeading: semantic_colors.shade140,
  textParagraph: semantic_colors.shade140,
  textSubdued: semantic_colors.shade100,
  textPrimary: semantic_colors.primary100,
  textAccent: semantic_colors.accent100,
  textSuccess: semantic_colors.success100,
  textWarning: semantic_colors.warning100,
  textDanger: semantic_colors.danger100,
  textDisabled: semantic_colors.shade80,
  textInverse: semantic_colors.plain,
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  primaryText: text_colors.textPrimary,
  accentText: text_colors.textAccent,
  successText: text_colors.textSuccess,
  warningText: text_colors.textWarning,
  dangerText: text_colors.textDanger,
};

export const special_colors: _EuiThemeSpecialColors = {
  body: semantic_colors.shade10,
  highlight: background_colors.backgroundWarning,
  disabled: background_colors.backgroundDisabled,
  disabledText: text_colors.textDisabled,
  shadow: semantic_colors.ink,
};

const form_colors: _EuiThemeFormColors = {
  formBackground: semantic_colors.plain,
  formBackgroundDisabled: semantic_colors.shade15,
  formBackgroundFocused: semantic_colors.plain,
  formBorderColor: border_colors.borderPlain,
  formAppendBackground: semantic_colors.plain,
  formControlPlaceholderColor: text_colors.textSubdued,
  formControlBorder: border_colors.borderPlain,
  formAutofillBackground: semantic_colors.primary10,
  formAutofillBorderColor: border_colors.borderPlain,
};

const button_colors: _EuiThemeButtonColors = {
  buttonBackgroundPrimary: brand_colors.primary,
  buttonBackgroundAccent: brand_colors.accent,
  buttonBackgroundSuccess: brand_colors.success,
  buttonBackgroundWarning: brand_colors.warning,
  buttonBackgroundDanger: brand_colors.danger,
  buttonBackgroundText: shade_colors.darkestShade,
  buttonBackgroundDisabled: background_colors.backgroundDisabled,

  buttonSecondaryBackgroundPrimary: semantic_colors.primary20,
  buttonSecondaryBackgroundAccent: semantic_colors.accent20,
  buttonSecondaryBackgroundSuccess: semantic_colors.success20,
  buttonSecondaryBackgroundWarning: semantic_colors.warning20,
  buttonSecondaryBackgroundDanger: semantic_colors.danger20,
  buttonSecondaryBackgroundText: semantic_colors.shade20,
  buttonSecondaryBackgroundDisabled: background_colors.backgroundDisabled,

  buttonEmptyBackgroundPrimary: background_colors.backgroundPrimary,
  buttonEmptyBackgroundAccent: background_colors.backgroundAccent,
  buttonEmptyBackgroundSuccess: background_colors.backgroundSuccess,
  buttonEmptyBackgroundWarning: background_colors.backgroundWarning,
  buttonEmptyBackgroundDanger: background_colors.backgroundDanger,
  buttonEmptyBackgroundText: background_colors.backgroundSubdued,
  buttonEmptyBackgroundDisabled: 'transparent',

  buttonColorPrimary: isColorDark(...hexToRgb(brand_colors.primary as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorAccent: isColorDark(...hexToRgb(brand_colors.accent as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorSuccess: isColorDark(...hexToRgb(brand_colors.success as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorWarning: isColorDark(...hexToRgb(brand_colors.warning as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorDanger: isColorDark(...hexToRgb(brand_colors.danger as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorText: isColorDark(...hexToRgb(shade_colors.darkShade as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorDisabled: text_colors.textDisabled,

  buttonSecondaryColorPrimary: text_colors.textPrimary,
  buttonSecondaryColorAccent: text_colors.textAccent,
  buttonSecondaryColorSuccess: text_colors.textSuccess,
  buttonSecondaryColorWarning: text_colors.textWarning,
  buttonSecondaryColorDanger: text_colors.textDanger,
  buttonSecondaryColorText: text_colors.textParagraph,
  buttonSecondaryColorDisabled: text_colors.textDisabled,

  buttonEmptyColorPrimary: text_colors.textPrimary,
  buttonEmptyColorAccent: text_colors.textAccent,
  buttonEmptyColorSuccess: text_colors.textSuccess,
  buttonEmptyColorWarning: text_colors.textWarning,
  buttonEmptyColorDanger: text_colors.textDanger,
  buttonEmptyColorText: text_colors.textParagraph,
  buttonEmptyColorDisabled: text_colors.textDisabled,

  buttonBorderColorPrimary: 'transparent',
};

export const light_colors: _EuiThemeColorsMode = {
  ...semantic_colors,
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,
  // experimental new tokens
  ...text_colors,
  ...background_colors,
  ...transparent_background_colors,
  ...border_colors,
  ...form_colors,
  ...button_colors,
};
