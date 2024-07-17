/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { shade, tint } from '../../../../services/color';
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
} from '../../../../global_styling/variables/colors';

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

export const brand_colors: _EuiThemeBrandColors = {
  //primary: '#07C',
  primary: '#0B64DD',
  accent: '#F04E98',
  //success: '#00BFB3',
  success: '#02BCB7',
  warning: '#FEC514',
  //danger: '#BD271E',
  danger: '#DE0000',
};

export const brand_text_colors: _EuiThemeBrandTextColors = {
  //primaryText: computed(makeHighContrastColor('colors.primary')),
  primaryText: '#153385',
  //accentText: computed(makeHighContrastColor('colors.accent')),
  accentText: '#89004A',
  //successText: computed(makeHighContrastColor('colors.success')),
  successText: '#00615F',
  //warningText: computed(makeHighContrastColor('colors.warning')),
  warningText: '#AD5600',
  //dangerText: computed(makeHighContrastColor('colors.danger')),
  dangerText: '#B60000',
};

export const shade_colors: _EuiThemeShadeColors = {
  emptyShade: '#FFF',
  //lightestShade: '#F1F4FA',
  lightestShade: '#FBFCFD',
  //lightShade: '#D3DAE6',
  lightShade: '#DFE6EF',
  //mediumShade: '#98A2B3',
  mediumShade: '#C4CDD8',
  //darkShade: '#69707D',
  darkShade: '#353741',
  //darkestShade: '#343741',
  darkestShade: '#1C1E24',
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  // body: computed(
  //   ([lightestShade]) => tint(lightestShade, 0.4),
  //   ['colors.lightestShade']
  // ),
  body: '#F5F7FA',
  highlight: computed(([warning]) => tint(warning, 0.9), ['colors.warning']),
  //disabled: '#ABB4C4',
  disabled: '#E6EBF2',
  //disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  disabledText: '#7F8494',
  shadow: computed(({ colors }) => colors.ink),
};

export const text_colors: _EuiThemeTextColors = {
  //text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  text: '#353741',
  //title: computed(([text]) => shade(text, 0.5), ['colors.text']),
  title: '#1C1E24',
  //subduedText: computed(makeHighContrastColor('colors.darkShade')),
  subduedText: '#7F8494',
  //link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
  link: '#153385',
};

export const light_colors: _EuiThemeColorsMode = {
  ...brand_colors,
  ...shade_colors,
  ...special_colors,
  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,
  ...text_colors,
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

export const dark_colors_ams: _EuiThemeColorsMode = {
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
