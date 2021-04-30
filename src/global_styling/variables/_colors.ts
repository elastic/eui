/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { shade, tint } from '../../services/color';
import { computed } from '../../services/theme/utils';
import {
  ColorModeSwitch,
  StrictColorModeSwitch,
} from '../../services/theme/types';
import {
  makeDisabledContrastColor,
  makeHighContrastColor,
} from '../functions/_colors';

/**
 * TYPES
 */

/**
 * Top 5 colors
 */
export type _EuiThemeBrandColors = {
  primary: ColorModeSwitch;
  accent: ColorModeSwitch;
  /**
   * Test: Successful messages
   */
  success: ColorModeSwitch;
  warning: ColorModeSwitch;
  danger: ColorModeSwitch;
};

// Every color below must be based mathematically on the set above and in a particular order.
export type _EuiThemeBrandTextColors = {
  primaryText: ColorModeSwitch;
  accentText: ColorModeSwitch;
  successText: ColorModeSwitch;
  warningText: ColorModeSwitch;
  dangerText: ColorModeSwitch;
};

export type _EuiThemeShadeColors = {
  emptyShade: ColorModeSwitch;
  lightestShade: ColorModeSwitch;
  lightShade: ColorModeSwitch;
  mediumShade: ColorModeSwitch;
  darkShade: ColorModeSwitch;
  darkestShade: ColorModeSwitch;
  fullShade: ColorModeSwitch;
};

export type _EuiThemeTextColors = {
  text: ColorModeSwitch;
  title: ColorModeSwitch;
  subdued: ColorModeSwitch;
  link: ColorModeSwitch;
};

export type EUI_BODY_COLOR_KEY = 'body'; // TOOD, get this to work in `makeHighContrastColor`
export type _EuiThemeSpecialColors = {
  body: ColorModeSwitch;
  highlight: ColorModeSwitch;
  disabled: ColorModeSwitch;
  disabledText: ColorModeSwitch;
};

export type _EuiThemeColors = _EuiThemeBrandColors &
  _EuiThemeBrandTextColors &
  _EuiThemeShadeColors &
  _EuiThemeSpecialColors &
  _EuiThemeTextColors;

/*
 * LIGHT THEME
 * Only split up in the light theme to access the keys by section in the docs
 */

export const brand_colors: _EuiThemeBrandColors = {
  primary: '#006BB4',
  accent: '#DD0A73',
  success: '#017D73',
  warning: '#F5A700',
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
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',
};

export const special_colors: _EuiThemeSpecialColors = {
  body: computed(([lightestShade]) => tint(lightestShade, 0.5), [
    'colors.lightestShade',
  ]),
  highlight: '#FFFCDD',
  disabled: computed(([darkestShade]) => tint(darkestShade, 0.7), [
    'colors.darkestShade',
  ]),
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
};

export const text_colors: _EuiThemeTextColors = {
  text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  title: computed(([text]) => shade(text, 0.5), ['colors.text']),
  subdued: computed(makeHighContrastColor('colors.mediumShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

export const light_colors: _EuiThemeColors = {
  ...brand_colors,
  ...brand_text_colors,
  ...shade_colors,
  ...special_colors,
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

export const dark_colors: _EuiThemeColors = {
  // Brand
  primary: '#1BA9F5',
  accent: '#F990C0',
  success: '#7DE2D1',
  warning: '#FFCE7A',
  danger: '#F66',
  ...brand_text_colors,
  ...dark_shades,

  // Special
  body: computed(([lightestShade]) => shade(lightestShade, 0.45), [
    'colors.lightestShade',
  ]),
  highlight: '#2E2D25',
  disabled: computed(([darkestShade]) => tint(darkestShade, 0.7), [
    'colors.darkestShade',
  ]),
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),

  // Text
  text: '#DFE5EF',
  title: computed(([text]) => text, ['colors.text']),
  subdued: computed(makeHighContrastColor('colors.mediumShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

/*
 * FULL
 */

export type EuiThemeColors = StrictColorModeSwitch<_EuiThemeColors> & {
  /**
   * Temporary. Want to remove in favor of `body`
   */
  pageBackground: ColorModeSwitch;
  ghost: string;
  ink: string;
};

export const colors: EuiThemeColors = {
  ghost: '#FFF',
  ink: '#000',

  pageBackground: {
    LIGHT: computed(([lightestShade]) => tint(lightestShade, 0.5), [
      'colors.lightestShade',
    ]),
    DARK: computed(([lightestShade]) => shade(lightestShade, 0.45), [
      'colors.lightestShade',
    ]),
  },
  LIGHT: light_colors,
  DARK: dark_colors,
};
