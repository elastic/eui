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

import { buildTheme, computed, COLOR_MODE_KEY } from './utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
  transparentize,
} from '../../global_styling/functions/_colors';
import { light_colors } from '../../global_styling/variables/_colors';
import { dark_colors } from '../../global_styling/variables/_colors_dark';
import { light_colors_ams } from '../../themes/eui-amsterdam/global_styling/variables/_colors';
import { dark_colors_ams } from '../../themes/eui-amsterdam/global_styling/variables/_colors_dark';
import { focus } from '../../global_styling/variables/_states';

const poles = {
  ghost: '#FFF',
  ink: '#000',
};

const textVariants = {
  textPrimary: computed(['colors.primary'], ([primary]) =>
    makeHighContrastColor(primary)
  ),
  textAccent: computed(['colors.accent'], ([accent]) =>
    makeHighContrastColor(accent)
  ),
  textWarning: computed(['colors.warning'], ([warning]) =>
    makeHighContrastColor(warning)
  ),
  textDanger: computed(['colors.danger'], ([danger]) =>
    makeHighContrastColor(danger)
  ),
  textDisabled: computed(['colors.disabled'], ([disabled]) =>
    makeDisabledContrastColor(disabled)
  ),
  textSuccess: computed(['colors.success'], ([success]) =>
    makeHighContrastColor(success)
  ),
  link: computed(['colors.textPrimary'], ([textPrimary]) => textPrimary),
};

/* DEFAULT THEME */

export const light = {
  ...poles,
  ...light_colors,
  ...textVariants,
  ...focus.light,
};

export const dark = {
  ...poles,
  ...dark_colors,
  ...textVariants,
  ...focus.dark,
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

const base = 16;

const sizes = {
  euiSize: computed(['base'], ([base]) => `${base}px`),
  euiSizeXS: computed(['base'], ([base]) => `${base * 0.25}px`),
  euiSizeS: computed(['base'], ([base]) => `${base * 0.5}px`),
  euiSizeM: computed(['base'], ([base]) => `${base * 0.75}px`),
  euiSizeL: computed(['base'], ([base]) => `${base * 1.5}px`),
  euiSizeXL: computed(['base'], ([base]) => `${base * 2}px`),
  euiSizeXXL: computed(['base'], ([base]) => `${base * 2.5}px`),

  euiButtonMinWidth: computed(['base'], ([base]) => `${base * 7}px`),

  euiScrollBar: computed(['sizes.euiSize'], ([euiSize]) => euiSize),
  euiScrollBarCorner: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => `calc(${euiSizeS} * 0.75)`
  ),
};

const borderRadius = {
  euiBorderRadius: '4px',
  euiBorderRadiusSmall: computed(
    ['borders.euiBorderRadius'],
    ([euiBorderRadius]) => `calc(${euiBorderRadius} * 0.5)`
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
  // colorVis,
  base,
  sizes,
  borders: {
    ...borderRadius,
    ...borders,
  },
  focus: {
    colors: {
      light: {
        ...focus.light,
      },
      dark: { custom: '#fff' },
    },
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
  ...poles,
  ...light_colors_ams,
  ...textVariants,

  // State
  focusTransparency: 0.1,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => transparentize(primary, focusTransparency)
  ),
};

export const amsterdam_dark = {
  ...poles,
  ...dark_colors_ams,
  ...textVariants,
  ...focus.light,

  // State
  focusTransparency: 0.3,
  focusBackground: computed(
    ['colors.primary', 'colors.focusTransparency'],
    ([primary, focusTransparency]) => transparentize(primary, focusTransparency)
  ),
};

const amsterdam_borderRadius = {
  euiBorderRadius: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => `calc(${euiSizeS} * 0.75)`
  ),
  euiBorderRadiusSmall: computed(
    ['sizes.euiSizeS'],
    ([euiSizeS]) => `calc(${euiSizeS} * 0.5)`
  ),
};

export const euiThemeAmsterdam = {
  [COLOR_MODE_KEY]: {
    light: amsterdam_light,
    dark: amsterdam_dark,
  },
  focus,
  colorVis,
  base,
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
