/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeColors,
  _EuiThemeBrandColors,
  _EuiThemeBrandTextColors,
  _EuiThemeShadeColors,
  _EuiThemeSpecialColors,
  _EuiThemeTextColors,
  _EuiThemeColorsMode,
  _EuiThemeBackgroundColors,
  _EuiThemeBorderColors,
  _EuiThemeTransparentBackgroundColors,
} from '@elastic/eui-theme-common';

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

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

export const brand_colors: _EuiThemeBrandColors = {
  primary: '#07C',
  accent: '#F04E98',
  accentSecondary: '#F04E98',
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

  textPrimary: computed(makeHighContrastColor('colors.primary')),
  textAccent: computed(makeHighContrastColor('colors.accent')),
  textAccentSecondary: computed(makeHighContrastColor('colors.accent')),
  textSuccess: computed(makeHighContrastColor('colors.success')),
  textWarning: computed(makeHighContrastColor('colors.warning')),
  textDanger: computed(makeHighContrastColor('colors.danger')),
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

  textParagraph: computed(
    ([darkestShade]) => darkestShade,
    ['colors.darkestShade']
  ),
  textHeading: computed(([text]) => shade(text, 0.5), ['colors.text']),
  textSubdued: computed(makeHighContrastColor('colors.darkShade')),
  textDisabled: computed(makeDisabledContrastColor('colors.disabled')),
  textInverse: computed(([ghost]) => ghost, ['colors.ghost']),
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
  backgroundAccentSecondary: computed(
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
  backgroundSubdued: computed(([body]) => body, ['colors.body']),
  backgroundDisabled: computed(([disabled]) => disabled, ['colors.disabled']),
  backgroundPlain: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  backgroundPage: computed(([body]) => body, ['colors.body']),
};

export const transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    backgroundTransparent: 'transparent',
    backgroundTransparentPrimary: computed(
      ([primary]) => transparentize(primary, 0.1),
      ['colors.primary']
    ),
    backgroundTransparentAccent: computed(
      ([accent]) => transparentize(accent, 0.1),
      ['colors.accent']
    ),
    backgroundTransparentSuccess: computed(
      ([success]) => transparentize(success, 0.1),
      ['colors.success']
    ),
    backgroundTransparentWarning: computed(
      ([warning]) => transparentize(warning, 0.1),
      ['colors.warning']
    ),
    backgroundTransparentDanger: computed(
      ([danger]) => transparentize(danger, 0.1),
      ['colors.danger']
    ),
    backgroundTransparentSubdued: computed(
      ([lightShade]) => transparentize(lightShade, 0.2),
      ['colors.lightShade']
    ),
    backgroundTransparentPlain: computed(
      ([ghost]) => transparentize(ghost, 0.2),
      ['colors.ghost']
    ),
  };

export const border_colors: _EuiThemeBorderColors = {
  borderPrimary: computed(
    ([primary]) => tint(primary, 0.6),
    ['colors.primary']
  ),
  borderAccent: computed(([accent]) => tint(accent, 0.6), ['colors.accent']),
  borderAccentSecondary: computed(
    ([accent]) => tint(accent, 0.6),
    ['colors.accent']
  ),
  borderSuccess: computed(
    ([success]) => tint(success, 0.6),
    ['colors.success']
  ),
  borderWarning: computed(
    ([warning]) => tint(warning, 0.4),
    ['colors.warning']
  ),
  borderDanger: computed(([danger]) => tint(danger, 0.6), ['colors.danger']),
  borderSubdued: computed(([color]) => color, ['border.color']),
  borderDisabled: computed(
    ([lightShade]) => transparentize(darken(lightShade, 4), 0.1),
    ['colors.lightShade']
  ),
  borderPlain: computed(([color]) => color, ['border.color']),
};

export const light_colors: _EuiThemeColorsMode = {
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,
  ...text_colors,
  ...background_colors,
  ...transparent_background_colors,
  ...border_colors,
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
    ([primary]) => shade(primary, 0.8),
    ['colors.primary']
  ),
  backgroundAccent: computed(
    ([accent]) => shade(accent, 0.8),
    ['colors.accent']
  ),
  backgroundAccentSecondary: computed(
    ([accent]) => shade(accent, 0.8),
    ['colors.accent']
  ),
  backgroundSuccess: computed(
    ([success]) => shade(success, 0.8),
    ['colors.success']
  ),
  backgroundWarning: computed(
    ([warning]) => shade(warning, 0.8),
    ['colors.warning']
  ),
  backgroundDanger: computed(
    ([danger]) => shade(danger, 0.8),
    ['colors.danger']
  ),
  backgroundSubdued: computed(([body]) => shade(body, 0.9), ['colors.body']),
  backgroundDisabled: computed(([disabled]) => disabled, ['colors.disabled']),
  backgroundPlain: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  backgroundPage: computed(([body]) => body, ['colors.body']),
};

export const dark_transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    ...transparent_background_colors,
    backgroundTransparentSubdued: computed(
      ([lightShade]) => transparentize(lightShade, 0.4),
      ['colors.lightShade']
    ),
  };

export const dark_border_colors: _EuiThemeBorderColors = {
  borderPrimary: computed(
    ([primary]) => shade(primary, 0.6),
    ['colors.primary']
  ),
  borderAccent: computed(([accent]) => shade(accent, 0.6), ['colors.accent']),
  borderAccentSecondary: computed(
    ([accent]) => shade(accent, 0.6),
    ['colors.accent']
  ),
  borderSuccess: computed(
    ([success]) => shade(success, 0.6),
    ['colors.success']
  ),
  borderWarning: computed(
    ([warning]) => shade(warning, 0.4),
    ['colors.warning']
  ),
  borderDanger: computed(([danger]) => shade(danger, 0.6), ['colors.danger']),
  borderSubdued: computed(([color]) => color, ['border.color']),
  borderDisabled: computed(
    ([ghost]) => transparentize(ghost, 0.1),
    ['colors.ghost']
  ),
  borderPlain: computed(([color]) => color, ['border.color']),
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  // Brand
  primary: '#36A2EF',
  accent: '#F68FBE',
  accentSecondary: '#F68FBE',
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

  textParagraph: '#DFE5EF',
  textHeading: computed(([text]) => text, ['colors.text']),
  textSubdued: computed(makeHighContrastColor('colors.mediumShade')),
  textDisabled: computed(makeDisabledContrastColor('colors.disabled')),
  textInverse: computed(([ink]) => ink, ['colors.ink']),

  ...dark_background_colors,
  ...dark_transparent_background_colors,
  ...dark_border_colors,
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
