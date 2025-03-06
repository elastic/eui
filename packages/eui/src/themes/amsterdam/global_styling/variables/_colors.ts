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
} from '../../../../services/color/manipulation';
import { computed } from '../../../../services/theme/utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
} from '../../../../services/color/contrast';
import { colorVis } from './_colors_vis';

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

export const brand_colors: _EuiThemeBrandColors = {
  primary: '#0077CC',
  accent: '#F04E98',
  accentSecondary: '#00BFB3',
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
  textAccentSecondary: computed(makeHighContrastColor('colors.success')),
  textSuccess: computed(makeHighContrastColor('colors.success')),
  textWarning: computed(makeHighContrastColor('colors.warning')),
  textDanger: computed(makeHighContrastColor('colors.danger')),
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFFFFF',
  lightestShade: '#F1F4FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000000',
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
  backgroundBasePrimary: computed(
    ([primary]) => tint(primary, 0.9),
    ['colors.primary']
  ),
  backgroundBaseAccent: computed(
    ([accent]) => tint(accent, 0.9),
    ['colors.accent']
  ),
  backgroundBaseAccentSecondary: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),
  backgroundBaseSuccess: computed(
    ([success]) => tint(success, 0.9),
    ['colors.success']
  ),
  backgroundBaseWarning: computed(
    ([warning]) => tint(warning, 0.9),
    ['colors.warning']
  ),
  backgroundBaseDanger: computed(
    ([danger]) => tint(danger, 0.9),
    ['colors.danger']
  ),
  backgroundBaseSubdued: computed(([body]) => body, ['colors.body']),
  backgroundBaseDisabled: computed(
    ([disabled]) => disabled,
    ['colors.disabled']
  ),
  backgroundBaseHighlighted: computed(
    ([backgroundBaseSubdued]) => backgroundBaseSubdued,
    ['colors.backgroundBaseSubdued']
  ),
  backgroundBasePlain: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),

  backgroundBaseFormsPrepend: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),
  backgroundBaseFormsControlDisabled: computed(
    ([mediumShade]) => mediumShade,
    ['colors.mediumShade']
  ),

  backgroundBaseInteractiveHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  backgroundBaseInteractiveSelect: computed(
    ([primary]) => tint(primary, 0.96),
    ['colors.primary']
  ),
  backgroundBaseInteractiveOverlay: computed(
    ([ink]) => transparentize(ink, 0.5),
    ['colors.ink']
  ),
  backgroundBaseSkeletonEdge: computed(
    ([lightShade]) => tint(lightShade, 0.65),
    ['colors.lightShade']
  ),
  backgroundBaseSkeletonMiddle: computed(
    ([lightShade]) => tint(lightShade, 0.8),
    ['colors.lightShade']
  ),

  backgroundLightPrimary: computed(
    ([primary]) => tint(primary, 0.8),
    ['colors.primary']
  ),
  backgroundLightAccent: computed(
    ([accent]) => tint(accent, 0.8),
    ['colors.accent']
  ),
  backgroundLightAccentSecondary: computed(
    ([success]) => tint(success, 0.8),
    ['colors.success']
  ),
  backgroundLightSuccess: computed(
    ([success]) => tint(success, 0.8),
    ['colors.success']
  ),
  backgroundLightWarning: computed(
    ([warning]) => tint(warning, 0.8),
    ['colors.warning']
  ),
  backgroundLightDanger: computed(
    ([danger]) => tint(danger, 0.8),
    ['colors.danger']
  ),
  backgroundLightText: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),

  backgroundFilledPrimary: computed(([primary]) => primary, ['colors.primary']),
  backgroundFilledAccent: computed(
    ([accent]) => tint(accent, 0.3),
    ['colors.accent']
  ),
  backgroundFilledAccentSecondary: computed(
    ([success]) => tint(success, 0.3),
    ['colors.success']
  ),
  backgroundFilledSuccess: computed(
    ([success]) => tint(success, 0.3),
    ['colors.success']
  ),
  backgroundFilledWarning: computed(([warning]) => warning, ['colors.warning']),
  backgroundFilledDanger: computed(([danger]) => danger, ['colors.danger']),
  backgroundFilledText: computed(
    ([darkShade]) => darkShade,
    ['colors.darkShade']
  ),
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
    backgroundTransparentAccentSecondary: computed(
      ([success]) => transparentize(success, 0.1),
      ['colors.success']
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
    backgroundTransparentHighlighted: computed(
      ([backgroundTransparentSubdued]) => backgroundTransparentSubdued,
      ['colors.backgroundTransparentSubdued']
    ),
    backgroundTransparentPlain: computed(
      ([ghost]) => transparentize(ghost, 0.2),
      ['colors.ghost']
    ),
  };

export const border_colors: _EuiThemeBorderColors = {
  borderBasePrimary: computed(
    ([primary]) => tint(primary, 0.6),
    ['colors.primary']
  ),
  borderBaseAccent: computed(
    ([accent]) => tint(accent, 0.6),
    ['colors.accent']
  ),
  borderBaseAccentSecondary: computed(
    ([success]) => tint(success, 0.6),
    ['colors.success']
  ),
  borderBaseSuccess: computed(
    ([success]) => tint(success, 0.6),
    ['colors.success']
  ),
  borderBaseWarning: computed(
    ([warning]) => tint(warning, 0.4),
    ['colors.warning']
  ),
  borderBaseDanger: computed(
    ([danger]) => tint(danger, 0.6),
    ['colors.danger']
  ),

  borderBaseSubdued: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  borderBaseDisabled: computed(
    ([lightShade]) => transparentize(darken(lightShade, 0.4), 0.1),
    ['colors.lightShade']
  ),
  borderBasePlain: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  borderBaseFloating: 'transparent',

  borderBaseFormsColorSwatch: computed(
    ([fullShade]) => transparentize(fullShade, 0.1),
    ['colors.fullShade']
  ),
  borderBaseFormsControl: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),

  borderStrongPrimary: computed(
    ([borderBasePrimary]) => borderBasePrimary,
    ['colors.borderBasePrimary']
  ),
  borderStrongAccent: computed(
    ([borderBaseAccent]) => borderBaseAccent,
    ['colors.borderBaseAccent']
  ),
  borderStrongAccentSecondary: computed(
    ([borderBaseAccentSecondary]) => borderBaseAccentSecondary,
    ['colors.borderBaseAccentSecondary']
  ),
  borderStrongSuccess: computed(
    ([borderBaseSuccess]) => borderBaseSuccess,
    ['colors.borderBaseSuccess']
  ),
  borderStrongWarning: computed(
    ([borderBaseWarning]) => borderBaseWarning,
    ['colors.borderBaseWarning']
  ),
  borderStrongDanger: computed(
    ([borderBaseDanger]) => borderBaseDanger,
    ['colors.borderBaseDanger']
  ),
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
  fullShade: '#FFFFFF',
};

export const dark_background_colors: _EuiThemeBackgroundColors = {
  backgroundBasePrimary: computed(
    ([primary]) => shade(primary, 0.8),
    ['colors.primary']
  ),
  backgroundBaseAccent: computed(
    ([accent]) => shade(accent, 0.8),
    ['colors.accent']
  ),
  backgroundBaseAccentSecondary: computed(
    ([success]) => shade(success, 0.8),
    ['colors.success']
  ),
  backgroundBaseSuccess: computed(
    ([success]) => shade(success, 0.8),
    ['colors.success']
  ),
  backgroundBaseWarning: computed(
    ([warning]) => shade(warning, 0.8),
    ['colors.warning']
  ),
  backgroundBaseDanger: computed(
    ([danger]) => shade(danger, 0.8),
    ['colors.danger']
  ),
  backgroundBaseSubdued: computed(([body]) => body, ['colors.body']),
  backgroundBaseDisabled: computed(
    ([disabled]) => disabled,
    ['colors.disabled']
  ),
  backgroundBaseHighlighted: computed(
    ([backgroundBaseSubdued]) => backgroundBaseSubdued,
    ['colors.backgroundBaseSubdued']
  ),
  backgroundBasePlain: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),

  backgroundBaseFormsPrepend: computed(
    ([lightShade]) => shade(lightShade, 0.15),
    ['colors.lightShade']
  ),
  backgroundBaseFormsControlDisabled: computed(
    ([mediumShade]) => mediumShade,
    ['colors.mediumShade']
  ),

  backgroundBaseInteractiveHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),
  backgroundBaseInteractiveSelect: computed(
    ([primary]) => shade(primary, 0.7),
    ['colors.primary']
  ),
  backgroundBaseInteractiveOverlay: computed(
    ([ink]) => transparentize(ink, 0.5),
    ['colors.ink']
  ),
  backgroundBaseSkeletonEdge: computed(
    ([lightShade]) => shade(lightShade, 0.12),
    ['colors.lightShade']
  ),
  backgroundBaseSkeletonMiddle: computed(
    ([lightShade]) => shade(lightShade, 0.24),
    ['colors.lightShade']
  ),

  backgroundLightPrimary: computed(
    ([primary]) => shade(primary, 0.7),
    ['colors.primary']
  ),
  backgroundLightAccent: computed(
    ([accent]) => shade(accent, 0.7),
    ['colors.accent']
  ),
  backgroundLightAccentSecondary: computed(
    ([success]) => shade(success, 0.7),
    ['colors.success']
  ),
  backgroundLightSuccess: computed(
    ([success]) => shade(success, 0.7),
    ['colors.success']
  ),
  backgroundLightWarning: computed(
    ([warning]) => shade(warning, 0.7),
    ['colors.warning']
  ),
  backgroundLightDanger: computed(
    ([danger]) => shade(danger, 0.7),
    ['colors.danger']
  ),
  backgroundLightText: computed(
    ([lightShade]) => shade(lightShade, 0.2),
    ['colors.lightShade']
  ),

  backgroundFilledPrimary: computed(([primary]) => primary, ['colors.primary']),
  backgroundFilledAccent: computed(([accent]) => accent, ['colors.accent']),
  backgroundFilledAccentSecondary: computed(
    ([success]) => success,
    ['colors.success']
  ),
  backgroundFilledSuccess: computed(([success]) => success, ['colors.success']),
  backgroundFilledWarning: computed(([warning]) => warning, ['colors.warning']),
  backgroundFilledDanger: computed(([danger]) => danger, ['colors.danger']),
  backgroundFilledText: computed(([text]) => text, ['colors.text']),
};

export const dark_transparent_background_colors: _EuiThemeTransparentBackgroundColors =
  {
    ...transparent_background_colors,
    backgroundTransparentSubdued: computed(
      ([lightShade]) => transparentize(lightShade, 0.4),
      ['colors.lightShade']
    ),
    backgroundTransparentHighlighted: computed(
      ([backgroundTransparentSubdued]) => backgroundTransparentSubdued,
      ['colors.backgroundTransparentSubdued']
    ),
  };

export const dark_border_colors: _EuiThemeBorderColors = {
  borderBasePrimary: computed(
    ([primary]) => shade(primary, 0.6),
    ['colors.primary']
  ),
  borderBaseAccent: computed(
    ([accent]) => shade(accent, 0.6),
    ['colors.accent']
  ),
  borderBaseAccentSecondary: computed(
    ([success]) => shade(success, 0.6),
    ['colors.success']
  ),
  borderBaseSuccess: computed(
    ([success]) => shade(success, 0.6),
    ['colors.success']
  ),
  borderBaseWarning: computed(
    ([warning]) => shade(warning, 0.4),
    ['colors.warning']
  ),
  borderBaseDanger: computed(
    ([danger]) => shade(danger, 0.6),
    ['colors.danger']
  ),

  borderBaseSubdued: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  borderBaseDisabled: computed(
    ([ghost]) => transparentize(ghost, 0.1),
    ['colors.ghost']
  ),
  borderBasePlain: computed(
    ([lightShade]) => lightShade,
    ['colors.lightShade']
  ),
  borderBaseFloating: 'transparent',

  borderBaseFormsColorSwatch: computed(
    ([fullShade]) => transparentize(fullShade, 0.1),
    ['colors.fullShade']
  ),
  borderBaseFormsControl: computed(
    ([lightestShade]) => tint(lightestShade, 0.31),
    ['colors.lightestShade']
  ),

  borderStrongPrimary: computed(
    ([borderBasePrimary]) => borderBasePrimary,
    ['colors.borderBasePrimary']
  ),
  borderStrongAccent: computed(
    ([borderBaseAccent]) => borderBaseAccent,
    ['colors.borderBaseAccent']
  ),
  borderStrongAccentSecondary: computed(
    ([borderBaseAccentSecondary]) => borderBaseAccentSecondary,
    ['colors.borderBaseAccentSecondary']
  ),
  borderStrongSuccess: computed(
    ([borderBaseSuccess]) => borderBaseSuccess,
    ['colors.borderBaseSuccess']
  ),
  borderStrongWarning: computed(
    ([borderBaseWarning]) => borderBaseWarning,
    ['colors.borderBaseWarning']
  ),
  borderStrongDanger: computed(
    ([borderBaseDanger]) => borderBaseDanger,
    ['colors.borderBaseDanger']
  ),
};

export const dark_colors_ams: _EuiThemeColorsMode = {
  // Brand
  primary: '#36A2EF',
  accent: '#F68FBE',
  accentSecondary: '#7DDED8',
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
  ghost: '#FFFFFF',
  ink: '#000000',
  plainLight: '#FFFFFF',
  plainDark: '#000000',
  LIGHT: light_colors,
  DARK: dark_colors_ams,
  vis: colorVis,
};
