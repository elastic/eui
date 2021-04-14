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
  EuiThemeColors,
  _EuiThemeTextColors,
} from '../../../../global_styling/variables/_colors';

const textVariants: _EuiThemeTextColors = {
  text: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
  title: computed(([text]) => shade(text, 0.5), ['colors.text']),

  textSubdued: computed(makeHighContrastColor('colors.darkShade')),
  textPrimary: computed(makeHighContrastColor('colors.primary')),
  textAccent: computed(makeHighContrastColor('colors.accent')),
  textSuccess: computed(makeHighContrastColor('colors.success')),
  textWarning: computed(makeHighContrastColor('colors.warning')),
  textDanger: computed(makeHighContrastColor('colors.danger')),
  textDisabled: computed(makeDisabledContrastColor('colors.disabled')),
  link: computed(([textPrimary]) => textPrimary, ['colors.textPrimary']),
};

const light_colors_ams = {
  // Brand
  primary: '#07C',
  accent: '#F04E98',

  // Status
  success: '#00BFB3',
  warning: '#FEC514',
  danger: '#BD271E',

  // Grays
  emptyShade: '#FFF',
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',

  highlight: computed(([warning]) => tint(warning, 0.9), ['colors.warning']),
};

const dark_colors_ams = {
  // Brand
  primary: '#36A2EF',
  accent: '#F68FBE',

  // Status
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',

  // Grays
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',

  highlight: '#2E2D25',
};

export const colors_ams: EuiThemeColors = {
  ghost: '#FFF',
  ink: '#000',

  LIGHT: light_colors_ams,
  DARK: dark_colors_ams,

  pageBackground: {
    LIGHT: computed(([lightestShade]) => tint(lightestShade, 0.5), [
      'colors.lightestShade',
    ]),
    DARK: computed(([lightestShade]) => shade(lightestShade, 0.3), [
      'colors.lightestShade',
    ]),
  },

  disabled: {
    LIGHT: '#ABB4C4',
    DARK: '#515761',
  },

  ...textVariants,
};
