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
import { isColorDark } from '../../../../services/color/is_color_dark';
import { hexToRgb } from '../../../../services/color/hex_to_rgb';
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
  _EuiThemeButtonColors,
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

const button_colors: _EuiThemeButtonColors = {
  buttonBackgroundPrimary: computed(([primary]) => primary, ['colors.primary']),
  buttonBackgroundAccent: computed(
    ([accent]) => tint(accent, 0.3),
    ['colors.accent']
  ),
  buttonBackgroundSuccess: computed(
    ([success]) => tint(success, 0.3),
    ['colors.success']
  ),
  buttonBackgroundWarning: computed(([warning]) => warning, ['colors.warning']),
  buttonBackgroundDanger: computed(([danger]) => danger, ['colors.danger']),
  buttonBackgroundText: computed(
    ([darkShade]) => darkShade,
    ['colors.darkShade']
  ),
  buttonBackgroundDisabled: computed(
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  buttonSecondaryBackgroundPrimary: computed(
    ([primary]) => tint(primary, 0.8),
    ['colors.primary']
  ),
  buttonSecondaryBackgroundAccent: computed(
    ([accent]) => tint(accent, 0.8),
    ['colors.accent']
  ),
  buttonSecondaryBackgroundSuccess: computed(
    ([success]) => tint(success, 0.8),
    ['colors.success']
  ),
  buttonSecondaryBackgroundWarning: computed(
    ([warning]) => tint(warning, 0.8),
    ['colors.warning']
  ),
  buttonSecondaryBackgroundDanger: computed(
    ([danger]) => tint(danger, 0.8),
    ['colors.danger']
  ),
  buttonSecondaryBackgroundText: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),
  buttonSecondaryBackgroundDisabled: computed(
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  buttonEmptyBackgroundPrimary: computed(
    ([primary]) => tint(primary, 0.9),
    ['colors.primary']
  ),
  buttonEmptyBackgroundAccent: computed(
    ([accent]) => tint(accent, 0.9),
    ['colors.accent']
  ),
  buttonEmptyBackgroundSuccess: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),
  buttonEmptyBackgroundWarning: computed(
    ([warning]) => tint(warning, 0.9),
    ['colors.warning']
  ),
  buttonEmptyBackgroundDanger: computed(
    ([danger]) => tint(danger, 0.9),
    ['colors.danger']
  ),
  buttonEmptyBackgroundText: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
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
  buttonColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  buttonSecondaryColorPrimary: computed(
    ([primaryText]) => primaryText,
    ['colors.primaryText']
  ),
  buttonSecondaryColorAccent: computed(
    ([accentText]) => accentText,
    ['colors.accentText']
  ),
  buttonSecondaryColorSuccess: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  buttonSecondaryColorWarning: computed(
    ([warningText]) => warningText,
    ['colors.warningText']
  ),
  buttonSecondaryColorDanger: computed(
    ([dangerText]) => dangerText,
    ['colors.dangerText']
  ),
  buttonSecondaryColorText: computed(([text]) => text, ['colors.text']),
  buttonSecondaryColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  buttonEmptyColorPrimary: computed(
    ([primaryText]) => primaryText,
    ['colors.primaryText']
  ),
  buttonEmptyColorAccent: computed(
    ([accentText]) => accentText,
    ['colors.accentText']
  ),
  buttonEmptyColorSuccess: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  buttonEmptyColorWarning: computed(
    ([warningText]) => warningText,
    ['colors.warningText']
  ),
  buttonEmptyColorDanger: computed(
    ([dangerText]) => dangerText,
    ['colors.dangerText']
  ),
  buttonEmptyColorText: computed(([text]) => text, ['colors.text']),
  buttonEmptyColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

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

/*
 * DARK THEME
 */

export const dark_brand_colors = {
  primary: '#36A2EF',
  accent: '#F68FBE',
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',
};

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

const dark_text_colors = {
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

const dark_button_colors: _EuiThemeButtonColors = {
  buttonBackgroundPrimary: computed(([primary]) => primary, ['colors.primary']),
  buttonBackgroundAccent: computed(([accent]) => accent, ['colors.accent']),
  buttonBackgroundSuccess: computed(([success]) => success, ['colors.success']),
  buttonBackgroundWarning: computed(([warning]) => warning, ['colors.warning']),
  buttonBackgroundDanger: computed(([danger]) => danger, ['colors.danger']),
  buttonBackgroundText: computed(([text]) => text, ['colors.text']),
  buttonBackgroundDisabled: computed(
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  buttonSecondaryBackgroundPrimary: computed(
    ([primary]) => shade(primary, 0.7),
    ['colors.primary']
  ),
  buttonSecondaryBackgroundAccent: computed(
    ([accent]) => shade(accent, 0.7),
    ['colors.accent']
  ),
  buttonSecondaryBackgroundSuccess: computed(
    ([success]) => shade(success, 0.7),
    ['colors.success']
  ),
  buttonSecondaryBackgroundWarning: computed(
    ([warning]) => shade(warning, 0.7),
    ['colors.warning']
  ),
  buttonSecondaryBackgroundDanger: computed(
    ([danger]) => shade(danger, 0.7),
    ['colors.danger']
  ),
  buttonSecondaryBackgroundText: computed(
    ([lightShade]) => shade(lightShade, 0.2),
    ['colors.lightShade']
  ),
  buttonSecondaryBackgroundDisabled: computed(
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  buttonEmptyBackgroundPrimary: computed(
    ([primary]) => tint(primary, 0.9),
    ['colors.primary']
  ),
  buttonEmptyBackgroundAccent: computed(
    ([accent]) => tint(accent, 0.9),
    ['colors.accent']
  ),
  buttonEmptyBackgroundSuccess: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),
  buttonEmptyBackgroundWarning: computed(
    ([warning]) => tint(warning, 0.9),
    ['colors.warning']
  ),
  buttonEmptyBackgroundDanger: computed(
    ([danger]) => tint(danger, 0.9),
    ['colors.danger']
  ),
  buttonEmptyBackgroundText: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  buttonEmptyBackgroundDisabled: 'transparent',

  buttonColorPrimary: isColorDark(
    ...hexToRgb(dark_brand_colors.primary as string)
  )
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorAccent: isColorDark(
    ...hexToRgb(tint(dark_brand_colors.accent as string, 0.3))
  )
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorSuccess: isColorDark(
    ...hexToRgb(tint(dark_brand_colors.success as string, 0.3))
  )
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorWarning: isColorDark(
    ...hexToRgb(tint(dark_brand_colors.warning as string, 0.3))
  )
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorDanger: isColorDark(
    ...hexToRgb(tint(dark_brand_colors.danger as string, 0.3))
  )
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorText: isColorDark(...hexToRgb(dark_text_colors.text as string))
    ? semantic_colors.plain
    : semantic_colors.ink,
  buttonColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  buttonSecondaryColorPrimary: computed(
    ([primaryText]) => primaryText,
    ['colors.primaryText']
  ),
  buttonSecondaryColorAccent: computed(
    ([accentText]) => accentText,
    ['colors.accentText']
  ),
  buttonSecondaryColorSuccess: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  buttonSecondaryColorWarning: computed(
    ([warningText]) => warningText,
    ['colors.warningText']
  ),
  buttonSecondaryColorDanger: computed(
    ([dangerText]) => dangerText,
    ['colors.dangerText']
  ),
  buttonSecondaryColorText: computed(([text]) => text, ['colors.text']),
  buttonSecondaryColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  buttonEmptyColorPrimary: computed(
    ([primaryText]) => primaryText,
    ['colors.primaryText']
  ),
  buttonEmptyColorAccent: computed(
    ([accentText]) => accentText,
    ['colors.accentText']
  ),
  buttonEmptyColorSuccess: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  buttonEmptyColorWarning: computed(
    ([warningText]) => warningText,
    ['colors.warningText']
  ),
  buttonEmptyColorDanger: computed(
    ([dangerText]) => dangerText,
    ['colors.dangerText']
  ),
  buttonEmptyColorText: computed(([text]) => text, ['colors.text']),
  buttonEmptyColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  buttonBorderColorPrimary: 'transparent',
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  ...semantic_colors,

  // Brand
  ...dark_brand_colors,

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
  ...dark_text_colors,

  ...dark_background_colors,
  ...dark_transparent_background_colors,
  ...dark_border_colors,
  ...dark_form_colors,
  ...dark_button_colors,
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
