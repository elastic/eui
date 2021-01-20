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

import chroma from 'chroma-js';
import { buildTheme, computed } from '../services';

export const tint = (color: string, ratio: number) =>
  chroma.mix(color, '#fff', ratio).hex();
export const shade = (color: string, ratio: number) =>
  chroma.mix(color, '#000', ratio).hex();
const makeHighContrastColor = (color: string) => color;
const makeDisabledContrastColor = (color: string) => color;

export const light = {
  euiColorPrimary: '#006BB4',
  euiColorSecondary: '#017D73',
  euiColorAccent: '#DD0A73',

  // These colors stay the same no matter the theme
  euiColorGhost: '#FFF',
  euiColorInk: '#000',

  // Status
  euiColorSuccess: computed(
    ['light.colors.euiColorSecondary'],
    ([euiColorSecondary]) => euiColorSecondary
  ),
  euiColorDanger: '#BD271E',
  euiColorWarning: '#F5A700',

  // Grays
  euiColorEmptyShade: '#FFF',
  euiColorLightestShade: '#F5F7FA',
  euiColorLightShade: '#D3DAE6',
  euiColorMediumShade: '#98A2B3',
  euiColorDarkShade: '#69707D',
  euiColorDarkestShade: '#343741',
  euiColorFullShade: '#000',

  // Backgrounds
  euiPageBackgroundColor: computed(
    ['light.colors.euiColorLightestShade'],
    ([euiColorLightestShade]) => tint(euiColorLightestShade, 0.5)
  ),
  euiColorHighlight: '#FFFCDD',

  // Every color below must be based mathematically on the set above and in a particular order.
  euiTextColor: computed(
    ['light.colors.euiColorDarkestShade'],
    ([euiColorDarkestShade]) => euiColorDarkestShade
  ),
  euiTitleColor: computed(['light.colors.euiTextColor'], ([euiTextColor]) =>
    shade(euiTextColor, 0.5)
  ),
  euiTextSubduedColor: computed(
    ['light.colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  euiColorDisabled: computed(['light.colors.euiTextColor'], ([euiTextColor]) =>
    tint(euiTextColor, 0.7)
  ),

  // Contrasty text variants
  euiColorPrimaryText: computed(
    ['light.colors.euiColorPrimary'],
    ([euiColorPrimary]) => makeHighContrastColor(euiColorPrimary)
  ),
  euiColorSecondaryText: computed(
    ['light.colors.euiColorSecondary'],
    ([euiColorSecondary]) => makeHighContrastColor(euiColorSecondary)
  ),
  euiColorAccentText: computed(
    ['light.colors.euiColorAccent'],
    ([euiColorAccent]) => makeHighContrastColor(euiColorAccent)
  ),
  euiColorWarningText: computed(
    ['light.colors.euiColorWarning'],
    ([euiColorWarning]) => makeHighContrastColor(euiColorWarning)
  ),
  euiColorDangerText: computed(
    ['light.colors.euiColorDanger'],
    ([euiColorDanger]) => makeHighContrastColor(euiColorDanger)
  ),
  euiColorDisabledText: computed(
    ['light.colors.euiColorDisabled'],
    ([euiColorDisabled]) => makeDisabledContrastColor(euiColorDisabled)
  ),
  euiColorSuccessText: computed(
    ['light.colors.euiColorSecondaryText'],
    ([euiColorSecondaryText]) => euiColorSecondaryText
  ),
  euiLinkColor: computed(
    ['light.colors.euiColorPrimaryText'],
    ([euiColorPrimaryText]) => euiColorPrimaryText
  ),
  // State
  euiFocusTransparency: 0.1,
  euiFocusBackgroundColor: computed(
    ['light.colors.euiColorPrimary', 'light.colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      tint(euiColorPrimary, 1 - euiFocusTransparency)
  ),
};

export const dark = {
  // These colors stay the same no matter the theme
  euiColorGhost: '#FFF',
  euiColorInk: '#000',

  // Core
  euiColorPrimary: '#1BA9F5',
  euiColorSecondary: '#7DE2D1',
  euiColorAccent: '#F990C0',

  // Status
  euiColorSuccess: computed(
    ['dark.colors.euiColorSecondary'],
    ([euiColorSecondary]) => euiColorSecondary
  ),
  euiColorWarning: '#FFCE7A',
  euiColorDanger: '#F66',

  // Grays
  euiColorEmptyShade: '#1D1E24',
  euiColorLightestShade: '#25262E',
  euiColorLightShade: '#343741',
  euiColorMediumShade: '#535966',
  euiColorDarkShade: '#98A2B3',
  euiColorDarkestShade: '#D4DAE5',
  euiColorFullShade: '#FFF',

  // Backgrounds
  euiPageBackgroundColor: computed(
    ['light.colors.euiColorLightestShade'],
    ([euiColorLightestShade]) => shade(euiColorLightestShade, 0.3)
  ),
  euiColorHighlight: '#2E2D25',

  // Variations from core
  euiTextColor: '#DFE5EF',
  euiTitleColor: computed(
    ['dark.colors.euiTextColor'],
    ([euiTextColor]) => euiTextColor
  ),
  euiTextSubduedColor: computed(
    ['light.colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  euiColorDisabled: computed(['light.colors.euiTextColor'], ([euiTextColor]) =>
    shade(euiTextColor, 0.7)
  ),

  // Contrasty text variants
  euiColorPrimaryText: computed(
    ['light.colors.euiColorPrimary'],
    ([euiColorPrimary]) => makeHighContrastColor(euiColorPrimary)
  ),
  euiColorSecondaryText: computed(
    ['light.colors.euiColorSecondary'],
    ([euiColorSecondary]) => makeHighContrastColor(euiColorSecondary)
  ),
  euiColorAccentText: computed(
    ['light.colors.euiColorAccent'],
    ([euiColorAccent]) => makeHighContrastColor(euiColorAccent)
  ),
  euiColorWarningText: computed(
    ['light.colors.euiColorWarning'],
    ([euiColorWarning]) => makeHighContrastColor(euiColorWarning)
  ),
  euiColorDangerText: computed(
    ['light.colors.euiColorDanger'],
    ([euiColorDanger]) => makeHighContrastColor(euiColorDanger)
  ),
  euiColorDisabledText: computed(
    ['light.colors.euiColorDisabled'],
    ([euiColorDisabled]) => makeDisabledContrastColor(euiColorDisabled)
  ),
  euiColorSuccessText: computed(
    ['light.colors.euiColorSecondaryText'],
    ([euiColorSecondaryText]) => euiColorSecondaryText
  ),
  euiLinkColor: computed(
    ['light.colors.euiColorPrimaryText'],
    ([euiColorPrimaryText]) => euiColorPrimaryText
  ),
  // State
  euiFocusTransparency: 0.3,
  euiFocusBackgroundColor: computed(
    ['dark.colors.euiColorPrimary', 'dark.colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      shade(euiColorPrimary, 1 - euiFocusTransparency)
  ),
};

export const DefaultEuiTheme = buildTheme({
  light: { colors: light },
  dark: { colors: dark },
});
