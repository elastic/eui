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
  brand_text_colors,
  shade_colors,
  EuiThemeColors,
  dark_shades,
} from '../../../../global_styling/variables/_colors';

/*
 * LIGHT THEME
 */

export const light_colors_ams: _EuiThemeColors = {
  // Brand
  primary: '#07C',
  accent: '#F04E98',
  success: '#00BFB3',
  warning: '#FEC514',
  danger: '#BD271E',

  // Shades
  ...shade_colors,
  lightestShade: '#f0f4fb',

  // Special
  body: computed(([lightestShade]) => tint(lightestShade, 0.5), [
    'colors.lightestShade',
  ]),
  highlight: computed(([warning]) => tint(warning, 0.9), ['colors.warning']),
  disabled: '#ABB4C4',
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  shadow: computed(({ colors }) => colors.ink),

  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,

  // Text
  text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  title: computed(([text]) => shade(text, 0.5), ['colors.text']),
  subdued: computed(makeHighContrastColor('colors.darkShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

/*
 * DARK THEME
 */

export const dark_colors_ams: _EuiThemeColors = {
  // Brand
  primary: '#36A2EF',
  accent: '#F68FBE',
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',

  // Shades
  ...dark_shades,

  // Special
  body: computed(([lightestShade]) => shade(lightestShade, 0.45), [
    'colors.lightestShade',
  ]),
  highlight: '#2E2D25',
  disabled: '#515761',
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  shadow: computed(({ colors }) => colors.ink),

  // Need to come after special colors so they can react to `body`
  ...brand_text_colors,

  // Text
  text: '#DFE5EF',
  title: computed(([text]) => text, ['colors.text']),
  subdued: computed(makeHighContrastColor('colors.mediumShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

/*
 * FULL
 */

export const colors_ams: EuiThemeColors = {
  ghost: '#FFF',
  ink: '#000',
  LIGHT: light_colors_ams,
  DARK: dark_colors_ams,
};
