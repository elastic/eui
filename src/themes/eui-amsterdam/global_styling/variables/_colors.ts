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

import { shade, tint } from '../../../../services/color';
import { computed } from '../../../../services/theme/utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
} from '../../../../global_styling/functions/_colors';
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
  ...brand_text_colors,

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
  ...brand_text_colors,

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

  pageBackground: {
    LIGHT: computed(([lightestShade]) => tint(lightestShade, 0.5), [
      'colors.lightestShade',
    ]),
    DARK: computed(([lightestShade]) => shade(lightestShade, 0.3), [
      'colors.lightestShade',
    ]),
  },
  LIGHT: light_colors_ams,
  DARK: dark_colors_ams,
};
