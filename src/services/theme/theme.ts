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
  ghost: '#FFF',
  ink: '#000',
};

const graysLight = {
  emptyShade: '#FFF',
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',
};

const textVariants = {
  textPrimary: computed(['colors.primary'], ([primary]) =>
    makeHighContrastColor(primary)
  ),
  accentText: computed(['colors.accent'], ([accent]) =>
    makeHighContrastColor(accent)
  ),
  warningText: computed(['colors.warning'], ([warning]) =>
    makeHighContrastColor(warning)
  ),
  dangerText: computed(['colors.danger'], ([danger]) =>
    makeHighContrastColor(danger)
  ),
  disabledText: computed(['colors.disabled'], ([disabled]) =>
    makeDisabledContrastColor(disabled)
  ),
  successText: computed(['colors.success'], ([success]) =>
    makeHighContrastColor(success)
  ),
  link: computed(['colors.textPrimary'], ([textPrimary]) => textPrimary),
};

/* DEFAULT THEME */

export const light = {
  primary: '#006BB4',
  accent: '#DD0A73',

  // These colors stay the same no matter the theme
  ...poles,

  // Status
  success: '#017D73',
  danger: '#BD271E',
  warning: '#F5A700',

  // Grays
  ...graysLight,

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    tint(lightestShade, 0.5)
  ),
  highlight: '#FFFCDD',

  // Every color below must be based mathematically on the set above and in a particular order.
  text: computed(['colors.darkestShade'], ([darkestShade]) => darkestShade),
  title: computed(['colors.text'], ([text]) => shade(text, 0.5)),
  subduedText: computed(
    ['colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  disabled: computed(['colors.text'], ([text]) => tint(text, 0.7)),

  // Contrasty text variants
  ...textVariants,

  // State
  focusTransparency: 0.1,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => tint(primary, 1 - focusTransparency)
  ),
};

const graysDark = {
  euiColorEmptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  euiColorMediumShade: '#535966',
  euiColorDarkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  euiColorFullShade: '#FFF',
};

export const dark = {
  // These colors stay the same no matter the theme
  ...poles,

  // Core
  primary: '#1BA9F5',
  accent: '#F990C0',

  // Status
  success: '#7DE2D1',
  warning: '#FFCE7A',
  danger: '#F66',

  // Grays
  ...graysDark,

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    shade(lightestShade, 0.3)
  ),
  highlight: '#2E2D25',

  // Variations from core
  text: '#DFE5EF',
  title: computed(['colors.text'], ([text]) => text),
  subduedText: computed(
    ['colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),
  disabled: computed(['colors.text'], ([text]) => shade(text, 0.7)),

  // Contrasty text variants
  ...textVariants,

  // State
  focusTransparency: 0.3,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => shade(primary, 1 - focusTransparency)
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

  euiBorderColor: computed(['colors.lightShade'], ([lightShade]) => lightShade),

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
        custom: computed(['colors.primary'], ([primary]) => primary /*'#000'*/),
      },
      dark: { custom: '#fff' },
    },
  },
};

export const EuiThemeDefault = buildTheme(euiThemeDefault, 'EUI_THEME_DEFAULT');

/* AMSTERDAM THEME */

export const amsterdam_light = {
  primary: '#07C',
  accent: '#F04E98',

  // These colors stay the same no matter the theme
  ...poles,

  // Status
  success: '#00BFB3',
  danger: '#BD271E',
  warning: '#FEC514',
  disabled: '#ABB4C4',

  // Grays
  ...graysLight,

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    tint(lightestShade, 0.5)
  ),
  highlight: computed(['colors.warning'], ([warning]) => tint(warning, 0.9)),

  // Every color below must be based mathematically on the set above and in a particular order.
  text: computed(['colors.darkestShade'], ([darkestShade]) => darkestShade),
  title: computed(['colors.text'], ([text]) => shade(text, 0.5)),
  subduedText: computed(
    ['colors.euiColorDarkShade'],
    ([euiColorDarkShade]) => euiColorDarkShade
  ),

  // Contrasty text variants
  ...textVariants,

  // State
  focusTransparency: 0.9,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => transparentize(primary, focusTransparency)
  ),
};

export const amsterdam_dark = {
  // These colors stay the same no matter the theme
  ...poles,

  // Core
  primary: '#36A2EF',
  accent: '#F68FBE',

  // Status
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',
  disabled: '#515761',

  // Grays
  ...graysDark,

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    shade(lightestShade, 0.3)
  ),
  highlight: '#2E2D25',

  // Variations from core
  text: '#DFE5EF',
  title: computed(['colors.text'], ([text]) => text),
  subduedText: computed(
    ['colors.euiColorMediumShade'],
    ([euiColorMediumShade]) => makeHighContrastColor(euiColorMediumShade)
  ),

  // Contrasty text variants
  ...textVariants,

  // State
  focusTransparency: 0.7,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => transparentize(primary, focusTransparency)
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
