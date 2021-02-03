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
import { buildTheme, computed, COLOR_MODE_KEY } from './utils';

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
    ['colors.euiColorSecondary'],
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
    ['colors.euiColorLightestShade'],
    ([euiColorLightestShade]) => tint(euiColorLightestShade, 0.5)
  ),
  euiColorHighlight: '#FFFCDD',

  // Every color below must be based mathematically on the set above and in a particular order.
  euiTextColor: computed(
    ['colors.euiColorDarkestShade'],
    ([euiColorDarkestShade]) => euiColorDarkestShade
  ),
  euiTitleColor: computed(['colors.euiTextColor'], ([euiTextColor]) =>
    shade(euiTextColor, 0.5)
  ),
  euiTextSubduedColor: computed(
    ['colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  euiColorDisabled: computed(['colors.euiTextColor'], ([euiTextColor]) =>
    tint(euiTextColor, 0.7)
  ),

  // Contrasty text variants
  euiColorPrimaryText: computed(
    ['colors.euiColorPrimary'],
    ([euiColorPrimary]) => makeHighContrastColor(euiColorPrimary)
  ),
  euiColorSecondaryText: computed(
    ['colors.euiColorSecondary'],
    ([euiColorSecondary]) => makeHighContrastColor(euiColorSecondary)
  ),
  euiColorAccentText: computed(['colors.euiColorAccent'], ([euiColorAccent]) =>
    makeHighContrastColor(euiColorAccent)
  ),
  euiColorWarningText: computed(
    ['colors.euiColorWarning'],
    ([euiColorWarning]) => makeHighContrastColor(euiColorWarning)
  ),
  euiColorDangerText: computed(['colors.euiColorDanger'], ([euiColorDanger]) =>
    makeHighContrastColor(euiColorDanger)
  ),
  euiColorDisabledText: computed(
    ['colors.euiColorDisabled'],
    ([euiColorDisabled]) => makeDisabledContrastColor(euiColorDisabled)
  ),
  euiColorSuccessText: computed(
    ['colors.euiColorSecondaryText'],
    ([euiColorSecondaryText]) => euiColorSecondaryText
  ),
  euiLinkColor: computed(
    ['colors.euiColorPrimaryText'],
    ([euiColorPrimaryText]) => euiColorPrimaryText
  ),
  // State
  euiFocusTransparency: 0.1,
  euiFocusBackgroundColor: computed(
    ['colors.euiColorPrimary', 'colors.euiFocusTransparency'],
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
    ['colors.euiColorSecondary'],
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
    ['colors.euiColorLightestShade'],
    ([euiColorLightestShade]) => shade(euiColorLightestShade, 0.3)
  ),
  euiColorHighlight: '#2E2D25',

  // Variations from core
  euiTextColor: '#DFE5EF',
  euiTitleColor: computed(
    ['colors.euiTextColor'],
    ([euiTextColor]) => euiTextColor
  ),
  euiTextSubduedColor: computed(
    ['colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  euiColorDisabled: computed(['colors.euiTextColor'], ([euiTextColor]) =>
    shade(euiTextColor, 0.7)
  ),

  // Contrasty text variants
  euiColorPrimaryText: computed(
    ['colors.euiColorPrimary'],
    ([euiColorPrimary]) => makeHighContrastColor(euiColorPrimary)
  ),
  euiColorSecondaryText: computed(
    ['colors.euiColorSecondary'],
    ([euiColorSecondary]) => makeHighContrastColor(euiColorSecondary)
  ),
  euiColorAccentText: computed(['colors.euiColorAccent'], ([euiColorAccent]) =>
    makeHighContrastColor(euiColorAccent)
  ),
  euiColorWarningText: computed(
    ['colors.euiColorWarning'],
    ([euiColorWarning]) => makeHighContrastColor(euiColorWarning)
  ),
  euiColorDangerText: computed(['colors.euiColorDanger'], ([euiColorDanger]) =>
    makeHighContrastColor(euiColorDanger)
  ),
  euiColorDisabledText: computed(
    ['colors.euiColorDisabled'],
    ([euiColorDisabled]) => makeDisabledContrastColor(euiColorDisabled)
  ),
  euiColorSuccessText: computed(
    ['colors.euiColorSecondaryText'],
    ([euiColorSecondaryText]) => euiColorSecondaryText
  ),
  euiLinkColor: computed(
    ['colors.euiColorPrimaryText'],
    ([euiColorPrimaryText]) => euiColorPrimaryText
  ),
  // State
  euiFocusTransparency: 0.3,
  euiFocusBackgroundColor: computed(
    ['colors.euiColorPrimary', 'colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      shade(euiColorPrimary, 1 - euiFocusTransparency)
  ),
};

// Visualization colors

// Maps allow for easier JSON usage
// Use map_merge(euiColorVisColors, $yourMap) to change individual colors after importing ths file
// The `behindText` variant is a direct copy of the hex output by the JS euiPaletteColorBlindBehindText() function
const euiPaletteColorBlind = {
  euiColorVis0: {
    graphic: '#54B399',
    behindText: '#6DCCB1',
  },
  euiColorVis1: {
    graphic: '#6092C0',
    behindText: '#79AAD9',
  },
  euiColorVis2: {
    graphic: '#D36086',
    behindText: '#EE789D',
  },
  euiColorVis3: {
    graphic: '#9170B8',
    behindText: '#A987D1',
  },
  euiColorVis4: {
    graphic: '#CA8EAE',
    behindText: '#E4A6C7',
  },
  euiColorVis5: {
    graphic: '#D6BF57',
    behindText: '#F1D86F',
  },
  euiColorVis6: {
    graphic: '#B9A888',
    behindText: '#D2C0A0',
  },
  euiColorVis7: {
    graphic: '#DA8B45',
    behindText: '#F5A35C',
  },
  euiColorVis8: {
    graphic: '#AA6556',
    behindText: '#C47C6C',
  },
  euiColorVis9: {
    graphic: '#E7664C',
    behindText: '#FF7E62',
  },
};

const colorVis = {
  euiColorVis0: euiPaletteColorBlind.euiColorVis0.graphic,
  euiColorVis1: euiPaletteColorBlind.euiColorVis1.graphic,
  euiColorVis2: euiPaletteColorBlind.euiColorVis2.graphic,
  euiColorVis3: euiPaletteColorBlind.euiColorVis3.graphic,
  euiColorVis4: euiPaletteColorBlind.euiColorVis4.graphic,
  euiColorVis5: euiPaletteColorBlind.euiColorVis5.graphic,
  euiColorVis6: euiPaletteColorBlind.euiColorVis6.graphic,
  euiColorVis7: euiPaletteColorBlind.euiColorVis7.graphic,
  euiColorVis8: euiPaletteColorBlind.euiColorVis8.graphic,
  euiColorVis9: euiPaletteColorBlind.euiColorVis9.graphic,

  euiColorVis0_behindText: euiPaletteColorBlind.euiColorVis0.behindText,
  euiColorVis1_behindText: euiPaletteColorBlind.euiColorVis1.behindText,
  euiColorVis2_behindText: euiPaletteColorBlind.euiColorVis2.behindText,
  euiColorVis3_behindText: euiPaletteColorBlind.euiColorVis3.behindText,
  euiColorVis4_behindText: euiPaletteColorBlind.euiColorVis4.behindText,
  euiColorVis5_behindText: euiPaletteColorBlind.euiColorVis5.behindText,
  euiColorVis6_behindText: euiPaletteColorBlind.euiColorVis6.behindText,
  euiColorVis7_behindText: euiPaletteColorBlind.euiColorVis7.behindText,
  euiColorVis8_behindText: euiPaletteColorBlind.euiColorVis8.behindText,
  euiColorVis9_behindText: euiPaletteColorBlind.euiColorVis9.behindText,
};

// TODO: `calc()` probably not the right solution
const sizes = {
  euiSize: '16px',
  euiSizeXS: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 0.25)`
  ),
  euiSizeS: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 0.5)`
  ),
  euiSizeM: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 0.75)`
  ),
  euiSizeL: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 1.5)`
  ),
  euiSizeXL: computed(['sizes.euiSize'], ([euiSize]) => `calc(${euiSize} * 2)`),
  euiSizeXXL: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 2.5)`
  ),

  euiButtonMinWidth: computed(
    ['sizes.euiSize'],
    ([euiSize]) => `calc(${euiSize} * 7)`
  ),

  euiScrollBar: computed(['sizes.euiSize'], ([euiSize]) => euiSize),
  euiScrollBarCorner: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => `calc(${euiSizeS} * 0.75)`
  ),
};

const borders = {
  euiBorderWidthThin: '1px',
  euiBorderWidthThick: '2px',

  euiBorderColor: computed(
    ['colors.euiColorLightShade'],
    ([euiColorLightShade]) => euiColorLightShade
  ),
  euiBorderRadius: '4px',
  euiBorderRadiusSmall: computed(
    ['borders.euiBorderRadius'],
    ([euiBorderRadius]) => `calc(${euiBorderRadius} / 2)`
  ),
  euiBorderThick: computed(
    ['borders.euiBorderWidthThick', 'borders.euiBorderColor'],
    ([euiBorderWidthThick, euiBorderColor]) =>
      `${euiBorderWidthThick} solid ${euiBorderColor}`
  ),
  euiBorderThin: computed(
    ['borders.euiBorderWidthThin', 'borders.euiBorderColor'],
    ([euiBorderWidthThin, euiBorderColor]) =>
      `${euiBorderWidthThin} solid ${euiBorderColor}`
  ),
  euiBorderEditable: computed(
    ['borders.euiBorderWidthThick', 'borders.euiBorderColor'],
    ([euiBorderWidthThick, euiBorderColor]) =>
      `${euiBorderWidthThick} dotted ${euiBorderColor}`
  ),
};

export const unbuiltDefaultEuiTheme = {
  [COLOR_MODE_KEY]: {
    light,
    dark,
  },
  colorVis,
  sizes,
  borders,
  buttons: {
    [COLOR_MODE_KEY]: {
      light: {
        custom: computed(
          ['colors.euiColorPrimary'],
          ([primary]) => primary /*'#000'*/
        ),
      },
      dark: { custom: '#fff' },
    },
  },
};

export const DefaultEuiTheme = buildTheme(
  unbuiltDefaultEuiTheme,
  'DEFAULT_EUI_THEME'
);
