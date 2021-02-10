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
// TODO
const makeHighContrastColor = (color: string) => color;
// TODO
const makeDisabledContrastColor = (color: string) => color;
// TODO
const transparentize = (color: string, ratio: number) =>
  ratio ? color : color;

const poles = {
  euiColorGhost: '#FFF',
  euiColorInk: '#000',
};

const graysLight = {
  euiColorEmptyShade: '#FFF',
  euiColorLightestShade: '#F5F7FA',
  euiColorLightShade: '#D3DAE6',
  euiColorMediumShade: '#98A2B3',
  euiColorDarkShade: '#69707D',
  euiColorDarkestShade: '#343741',
  euiColorFullShade: '#000',
};

const textVariants = {
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
};

/* DEFAULT THEME */

export const light = {
  euiColorPrimary: '#006BB4',
  euiColorSecondary: '#017D73',
  euiColorAccent: '#DD0A73',

  // These colors stay the same no matter the theme
  ...poles,

  // Status
  euiColorSuccess: computed(
    ['colors.euiColorSecondary'],
    ([euiColorSecondary]) => euiColorSecondary
  ),
  euiColorDanger: '#BD271E',
  euiColorWarning: '#F5A700',

  // Grays
  ...graysLight,

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
  ...textVariants,

  // State
  euiFocusTransparency: 0.1,
  euiFocusBackgroundColor: computed(
    ['colors.euiColorPrimary', 'colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      tint(euiColorPrimary, 1 - euiFocusTransparency)
  ),
};

const graysDark = {
  euiColorEmptyShade: '#1D1E24',
  euiColorLightestShade: '#25262E',
  euiColorLightShade: '#343741',
  euiColorMediumShade: '#535966',
  euiColorDarkShade: '#98A2B3',
  euiColorDarkestShade: '#D4DAE5',
  euiColorFullShade: '#FFF',
};

export const dark = {
  // These colors stay the same no matter the theme
  ...poles,

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
  ...graysDark,

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
  ...textVariants,

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

const sizes = {
  euiSize: 16,
  euiSizeXS: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 0.25),
  euiSizeS: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 0.5),
  euiSizeM: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 0.75),
  euiSizeL: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 1.5),
  euiSizeXL: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 2),
  euiSizeXXL: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 2.5),

  euiButtonMinWidth: computed(['sizes.euiSize'], ([euiSize]) => euiSize * 7),

  euiScrollBar: computed(['sizes.euiSize'], ([euiSize]) => euiSize),
  euiScrollBarCorner: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => euiSizeS * 0.75
  ),
};

const borderRadius = {
  euiBorderRadius: 4,
  euiBorderRadiusSmall: computed(
    ['borders.euiBorderRadius'],
    ([euiBorderRadius]) => euiBorderRadius * 0.5
  ),
};

const borders = {
  euiBorderWidthThin: '1px',
  euiBorderWidthThick: '2px',

  euiBorderColor: computed(
    ['colors.euiColorLightShade'],
    ([euiColorLightShade]) => euiColorLightShade
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

export const euiThemeDefault = {
  [COLOR_MODE_KEY]: {
    light,
    dark,
  },
  colorVis,
  sizes,
  borders: {
    ...borderRadius,
    ...borders,
  },
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

export const EuiThemeDefault = buildTheme(euiThemeDefault, 'EUI_THEME_DEFAULT');

/* AMSTERDAM THEME */

export const amsterdam_light = {
  euiColorPrimary: '#07C',
  euiColorSecondary: '#00BFB3',
  euiColorAccent: '#F04E98',

  // These colors stay the same no matter the theme
  ...poles,

  // Status
  euiColorSuccess: computed(
    ['colors.euiColorSecondary'],
    ([euiColorSecondary]) => euiColorSecondary
  ),
  euiColorDanger: '#BD271E',
  euiColorWarning: '#FEC514',
  euiColorDisabled: '#ABB4C4',

  // Grays
  ...graysLight,

  // Backgrounds
  euiPageBackgroundColor: computed(
    ['colors.euiColorLightestShade'],
    ([euiColorLightestShade]) => tint(euiColorLightestShade, 0.5)
  ),
  euiColorHighlight: computed(['colors.euiColorWarning'], ([euiColorWarning]) =>
    tint(euiColorWarning, 0.9)
  ),

  // Every color below must be based mathematically on the set above and in a particular order.
  euiTextColor: computed(
    ['colors.euiColorDarkestShade'],
    ([euiColorDarkestShade]) => euiColorDarkestShade
  ),
  euiTitleColor: computed(['colors.euiTextColor'], ([euiTextColor]) =>
    shade(euiTextColor, 0.5)
  ),
  euiTextSubduedColor: computed(
    ['colors.euiColorDarkShade'],
    ([euiColorDarkShade]) => euiColorDarkShade
  ),

  // Contrasty text variants
  ...textVariants,

  // State
  euiFocusTransparency: 0.9,
  euiFocusBackgroundColor: computed(
    ['colors.euiColorPrimary', 'colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      transparentize(euiColorPrimary, euiFocusTransparency)
  ),
};

export const amsterdam_dark = {
  // These colors stay the same no matter the theme
  ...poles,

  // Core
  euiColorPrimary: '#36A2EF',
  euiColorSecondary: '#7DDED8',
  euiColorAccent: '#F68FBE',

  // Status
  euiColorSuccess: computed(
    ['colors.euiColorSecondary'],
    ([euiColorSecondary]) => euiColorSecondary
  ),
  euiColorWarning: '#F3D371',
  euiColorDanger: '#F86B63',
  euiColorDisabled: '#515761',

  // Grays
  ...graysDark,

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

  // Contrasty text variants
  ...textVariants,

  // State
  euiFocusTransparency: 0.7,
  euiFocusBackgroundColor: computed(
    ['colors.euiColorPrimary', 'colors.euiFocusTransparency'],
    ([euiColorPrimary, euiFocusTransparency]) =>
      transparentize(euiColorPrimary, euiFocusTransparency)
  ),
};

const amsterdam_borderRadius = {
  euiBorderRadius: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => euiSizeS * 0.75
  ),
  euiBorderRadiusSmall: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => euiSizeS * 0.5
  ),
};

export const euiThemeAmsterdam = {
  [COLOR_MODE_KEY]: {
    light: amsterdam_light,
    dark: amsterdam_dark,
  },
  colorVis,
  sizes,
  borders: {
    ...amsterdam_borderRadius,
    ...borders,
  },
  buttons: {
    [COLOR_MODE_KEY]: {
      light: {
        custom: '#000',
      },
      dark: { custom: '#fff' },
    },
  },
};

export const EuiThemeAmsterdam = buildTheme(
  euiThemeAmsterdam,
  'EUI_THEME_AMSTERDAM'
);
