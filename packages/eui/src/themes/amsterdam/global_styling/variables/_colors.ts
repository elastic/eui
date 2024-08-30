/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  darken,
  shade,
  tint,
  transparentize,
} from '../../../../services/color';
import { computed } from '../../../../services/theme/utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
} from '../../../../services/color/contrast';
import {
  _EuiThemeColors,
  _EuiThemeBrandColors,
  _EuiThemeBrandTextColors,
  _EuiThemeShadeColors,
  _EuiThemeSpecialColors,
  _EuiThemeTextColors,
  _EuiThemeColorsMode,
  _EuiThemeBackgroundColors,
} from '../../../../global_styling/variables/colors';
import { semanticColors } from '../../../../global_styling/variables/_color_matrix';

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

const semantic_colors = {
  plain: '#fff',
  ink: '#000',
  developerBlue: '#080F21',
  ...semanticColors,
};

export const brand_colors: _EuiThemeBrandColors = {
  primary: '#07C',
  accent: '#F04E98',
  success: '#00BFB3',
  warning: '#FEC514',
  danger: '#BD271E',
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  primaryText: computed(makeHighContrastColor('colors.primary')),
  accentText: computed(makeHighContrastColor('colors.accent')),
  successText: computed(makeHighContrastColor('colors.success')),
  warningText: computed(makeHighContrastColor('colors.warning')),
  dangerText: computed(makeHighContrastColor('colors.danger')),
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFF',
  lightestShade: '#F1F4FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  body: computed(
    ([lightestShade]) => tint(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  highlight: computed(([warning]) => tint(warning, 0.9), ['colors.warning']),
  disabled: '#ABB4C4',
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  shadow: computed(({ colors }) => colors.ink),
};

export const text_colors: _EuiThemeTextColors = {
  text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  title: computed(([text]) => shade(text, 0.5), ['colors.text']),
  subduedText: computed(makeHighContrastColor('colors.darkShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),

  textHeading: computed(([text]) => shade(text, 0.5), ['colors.text']),
  textParagraph: computed(
    ([darkestShade]) => darkestShade,
    ['colors.darkestShade']
  ),
  textSubdued: computed(makeHighContrastColor('colors.darkShade')),
  textPrimary: computed(makeHighContrastColor('colors.primary')),
  textAccent: computed(makeHighContrastColor('colors.accent')),
  textSuccess: computed(makeHighContrastColor('colors.success')),
  textWarning: computed(makeHighContrastColor('colors.warning')),
  textDanger: computed(makeHighContrastColor('colors.danger')),
  textDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),
  textInverse: computed(([ink]) => ink, ['colors.ink']),
};

export const background_colors: _EuiThemeBackgroundColors = {
  backgroundPrimary: computed(
    ([primary]) => tint(primary, 0.9),
    ['colors.primary']
  ),
  backgroundAccent: computed(
    ([accent]) => tint(accent, 0.9),
    ['colors.accent']
  ),
  backgroundSuccess: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),
  backgroundWarning: computed(
    ([warning]) => tint(warning, 0.9),
    ['colors.warning']
  ),
  backgroundDanger: computed(
    ([danger]) => tint(danger, 0.9),
    ['colors.danger']
  ),
  backgroundSubdued: special_colors.body,
  backgroundPlain: shade_colors.emptyShade,
  backgroundDisabled: computed(
    ([disabled]) => tint(disabled, 0.9),
    ['colors.disabled']
  ),
};

export const transparent_background_colors = {
  backgroundPrimaryTransparent: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  backgroundAccentTransparent: computed(
    ([accent]) => transparentize(accent, 0.1),
    ['colors.accent']
  ),
  backgroundSuccessTransparent: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundWarningTransparent: computed(
    ([warning]) => transparentize(warning, 0.1),
    ['colors.warning']
  ),
  backgroundDangerTransparent: computed(
    ([danger]) => transparentize(danger, 0.1),
    ['colors.danger']
  ),
  backgroundSubduedTransparent: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  backgroundPlainTransparent: computed(
    ([ghost]) => transparentize(ghost, 0.2),
    ['colors.ghost']
  ),
};

export const border_colors = {
  borderPrimary: computed(
    ([primary]) => tint(primary, 0.6),
    ['colors.primary']
  ),
  borderAccent: computed(([accent]) => tint(accent, 0.6), ['colors.accent']),
  borderSuccess: computed(
    ([success]) => tint(success, 0.6),
    ['colors.success']
  ),
  borderWarning: computed(
    ([warning]) => tint(warning, 0.4),
    ['colors.warning']
  ),
  borderDanger: computed(([danger]) => tint(danger, 0.6), ['colors.danger']),
  borderPlain: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  borderSubdued: computed(
    ([lightShade]) => tint(lightShade, 0.3),
    ['colors.lightShade']
  ),
  borderDisabled: computed(
    ([borderPlain]) => borderPlain,
    ['colors.borderPlain']
  ),
  borderHollow: computed(
    ([borderPlain]) => borderPlain,
    ['colors.borderPlain']
  ),
};

const form_colors = {
  formBackground: computed(
    ([lightestShade]) => tint(lightestShade, 0.6),
    ['colors.lightestShade']
  ),
  formBackgroundDisabled: computed(
    ([lightestShade]) => darken(lightestShade, 0.05),
    ['colors.lightestShade']
  ),
  formBackgroundFocused: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  formBorderColor: computed(
    ([borderPlain]) => transparentize(darken(borderPlain, 4), 0.1),
    ['colors.borderPlain']
  ),
  formAppendBackground: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),
  formControlPlaceholderColor: computed(
    ([subduedText, lightestShade]) =>
      makeHighContrastColor(subduedText)(tint(lightestShade, 0.6)),
    ['colors.subduedText', 'colors.lightestShade']
  ),
  formControlBorder: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  formAutofillBackground: computed(
    ([primary]) => tint(primary, 0.8),
    ['colors.primary']
  ),
  formAutofillBorderColor: computed(
    ([primaryText]) => transparentize(primaryText, 0.2),
    ['colors.primaryText']
  ),
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
};

/*
 * DARK THEME
 */

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundPrimary: computed(
    ([primary]) => shade(primary, 0.9),
    ['colors.primary']
  ),
  backgroundAccent: computed(
    ([accent]) => shade(accent, 0.9),
    ['colors.accent']
  ),
  backgroundSuccess: computed(
    ([success]) => shade(success, 0.9),
    ['colors.success']
  ),
  backgroundWarning: computed(
    ([warning]) => shade(warning, 0.9),
    ['colors.warning']
  ),
  backgroundDanger: computed(
    ([danger]) => shade(danger, 0.9),
    ['colors.danger']
  ),
  backgroundSubdued: special_colors.body,
  backgroundPlain: shade_colors.emptyShade,
  backgroundDisabled: computed(
    ([disabled]) => shade(disabled, 0.9),
    ['colors.disabled']
  ),
};

export const dark_transparent_background_colors = {
  ...transparent_background_colors,
  backgroundSubduedTransparent: computed(
    ([lightShade]) => transparentize(lightShade, 0.4),
    ['colors.lightShade']
  ),
};

export const dark_border_colors = {
  borderPrimary: computed(
    ([primary]) => shade(primary, 0.6),
    ['colors.primary']
  ),
  borderAccent: computed(([accent]) => shade(accent, 0.6), ['colors.accent']),
  borderSuccess: computed(
    ([success]) => shade(success, 0.6),
    ['colors.success']
  ),
  borderWarning: computed(
    ([warning]) => shade(warning, 0.4),
    ['colors.warning']
  ),
  borderDanger: computed(([danger]) => shade(danger, 0.6), ['colors.danger']),
  borderPlain: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  borderSubdued: computed(
    ([lightShade]) => tint(lightShade, 0.3),
    ['colors.lightShade']
  ),
  borderDisabled: computed(
    ([borderPlain]) => borderPlain,
    ['colors.borderPlain']
  ),
  borderHollow: computed(
    ([borderPlain]) => tint(borderPlain, 0.15),
    ['colors.borderPlain']
  ),
};

const dark_form_colors = {
  ...form_colors,
  formBackground: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  formBackgroundFocused: computed(
    ([emptyShade]) => shade(emptyShade, 0.4),
    ['colors.emptyShade']
  ),
  formBorderColor: computed(
    ([ghost]) => transparentize(ghost, 0.1),
    ['colors.ghost']
  ),
  formAppendBackground: computed(
    ([lightShade]) => shade(lightShade, 0.15),
    ['colors.lightShade']
  ),
  formControlBorder: computed(
    ([lightestShade]) => tint(lightestShade, 0.31),
    ['colors.lightestShade']
  ),
  formAutofillBackground: computed(
    ([primary]) => shade(primary, 0.2),
    ['colors.primary']
  ),
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  ...semantic_colors,

  // Brand
  primary: '#36A2EF',
  accent: '#F68FBE',
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',

  // Shades
  ...dark_shades,

  // Special
  body: computed(
    ([lightestShade]) => shade(lightestShade, 0.45),
    ['colors.lightestShade']
  ),
  highlight: '#2E2D25',
  disabled: '#515761',
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  shadow: computed(({ colors }) => colors.ink),

  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,

  // Text
  text: '#DFE5EF',
  title: computed(([text]) => text, ['colors.text']),
  subduedText: computed(makeHighContrastColor('colors.mediumShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),

  textHeading: computed(([text]) => text, ['colors.text']),
  textParagraph: '#DFE5EF',
  textSubdued: computed(makeHighContrastColor('colors.mediumShade')),
  textPrimary: computed(makeHighContrastColor('colors.primary')),
  textAccent: computed(makeHighContrastColor('colors.accent')),
  textSuccess: computed(makeHighContrastColor('colors.success')),
  textWarning: computed(makeHighContrastColor('colors.warning')),
  textDanger: computed(makeHighContrastColor('colors.danger')),
  textDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),
  textInverse: computed(([ghost]) => ghost, ['colors.ghost']),

  ...dark_background_colors,
  ...dark_transparent_background_colors,
  ...dark_border_colors,
  ...dark_form_colors,
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
