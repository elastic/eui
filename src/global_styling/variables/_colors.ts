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

import { computed } from '../../services/theme/utils';
import {
  makeDisabledContrastColor,
  makeHighContrastColor,
  shade,
  tint,
} from '../functions/_colors';

export type _EuiThemeTextColors = {
  /**
   * TODO: Allow for `string | keys of LIGHT/DARK` instead of `any`
   */
  text: any;
  title: any;
  textSubdued: any;
  textPrimary: string;
  textAccent: string;
  textSuccess: string;
  textWarning: string;
  textDanger: string;
  textDisabled: string;
  link: string;
};

const textVariants: _EuiThemeTextColors = {
  // Every color below must be based mathematically on the set above and in a particular order.
  text: {
    LIGHT: computed(([darkestShade]) => darkestShade, ['colors.darkestShade']),
    DARK: '#DFE5EF',
  },

  title: {
    LIGHT: computed(([text]) => shade(text, 0.5), ['colors.text']),
    DARK: computed(([text]) => text, ['colors.text']),
  },

  textSubdued: {
    LIGHT: computed(([mediumShade]) => makeHighContrastColor(mediumShade), [
      'colors.mediumShade',
    ]),
    DARK: computed(([mediumShade]) => makeHighContrastColor(mediumShade), [
      'colors.mediumShade',
    ]),
  },

  textPrimary: computed((theme) => makeHighContrastColor(theme.colors.primary)),
  textAccent: computed(([accent]) => makeHighContrastColor(accent), [
    'colors.accent',
  ]),
  textSuccess: computed(([success]) => makeHighContrastColor(success), [
    'colors.success',
  ]),
  textWarning: computed(([warning]) => makeHighContrastColor(warning), [
    'colors.warning',
  ]),
  textDanger: computed(([danger]) => makeHighContrastColor(danger), [
    'colors.danger',
  ]),
  textDisabled: computed(([disabled]) => makeDisabledContrastColor(disabled), [
    'colors.disabled',
  ]),
  link: computed(([textPrimary]) => textPrimary, ['colors.textPrimary']),
};

export type _EuiThemeBaseColors = {
  primary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  emptyShade: string;
  lightestShade: string;
  lightShade: string;
  mediumShade: string;
  darkShade: string;
  darkestShade: string;
  fullShade: string;
  highlight: string;
};

export const light_colors: _EuiThemeBaseColors = {
  // Brand
  primary: '#006BB4',
  accent: '#DD0A73',

  // Status
  success: '#017D73',
  warning: '#F5A700',
  danger: '#BD271E',

  // Grays
  emptyShade: '#FFF',
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',

  // Special
  highlight: '#FFFCDD',
};

export const dark_colors: _EuiThemeBaseColors = {
  // Brand
  primary: '#1BA9F5',
  accent: '#F990C0',

  // Status
  success: '#7DE2D1',
  warning: '#FFCE7A',
  danger: '#F66',

  // Grays
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',

  // Backgrounds
  highlight: '#2E2D25',
};

export type EuiThemeColors = _EuiThemeBaseColors &
  _EuiThemeTextColors & {
    disabled: any;
    pageBackground: any;
  };

export const colors: EuiThemeColors = {
  LIGHT: light_colors,
  DARK: dark_colors,

  disabled: {
    LIGHT: computed(([darkestShade]) => tint(darkestShade, 0.7), [
      'colors.darkestShade',
    ]),
    DARK: computed(([darkestShade]) => shade(darkestShade, 0.7), [
      'colors.darkestShade',
    ]),
  },

  // Backgrounds
  pageBackground: {
    LIGHT: computed(([lightestShade]) => tint(lightestShade, 0.5), [
      'colors.lightestShade',
    ]),
    DARK: computed(([lightestShade]) => shade(lightestShade, 0.3), [
      'colors.lightestShade',
    ]),
  },

  ...textVariants,
};
