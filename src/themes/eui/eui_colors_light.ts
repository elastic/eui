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

import {
  makeHighContrastColor,
  shade,
  shadeOrTint,
  tintOrShade,
} from '../../global_styling/functions';

const coreColors = {
  // Core
  euiColorPrimary: '#006BB4',
  euiColorSecondary: '#017D73',
  euiColorAccent: '#DD0A73',
  euiColorHighlight: '#FFFCDD',
};

const genericColors = {
  // Core
  ...coreColors,

  // These colors stay the same no matter the theme
  euiColorGhost: '#FFF',
  euiColorInk: '#000',

  // Status
  euiColorSuccess: coreColors.euiColorSecondary,
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
};

// Every color below must be based mathmatically on the set above and in a particular order.
const euiTextColor = genericColors.euiColorDarkestShade;
const elementColors = {
  euiTextColor,
  euiPageBackgroundColor: tintOrShade(
    genericColors.euiColorLightestShade,
    '50%',
    '30%'
  ),
  euiTextSubduedColor: makeHighContrastColor(genericColors.euiColorMediumShade),
  euiTitleColor: shadeOrTint(euiTextColor, '50%', '0%'),
  euiLinkColor: genericColors.euiColorPrimary,
  euiFocusBackgroundColor: tintOrShade(
    genericColors.euiColorPrimary,
    '90%',
    '50%'
  ),
};

// Contrasty text variants
const euiColorPrimaryText = makeHighContrastColor(
  genericColors.euiColorPrimary
);
const euiColorSecondaryText = makeHighContrastColor(
  genericColors.euiColorSecondary
);
const textColors = {
  euiColorPrimaryText,
  euiColorSecondaryText,
  euiColorAccentText: makeHighContrastColor(genericColors.euiColorAccent),
  euiColorWarningText: makeHighContrastColor(genericColors.euiColorWarning),
  euiColorDangerText: makeHighContrastColor(genericColors.euiColorDanger),
  euiColorSuccessText: euiColorSecondaryText,
};

// Visualization colors

// Maps allow for easier JSON usage
// Use map_merge(euiColorVisColors, yourMap) to change individual colors after importing ths file
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

// euiPaletteColorBlindKeys: euiPaletteColorBlind;
//
const euiColorVisGraphic = {
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
};

const euiColorVisBehindText = {
  euiColorVis0: euiPaletteColorBlind.euiColorVis0.behindText,
  euiColorVis1: euiPaletteColorBlind.euiColorVis1.behindText,
  euiColorVis2: euiPaletteColorBlind.euiColorVis2.behindText,
  euiColorVis3: euiPaletteColorBlind.euiColorVis3.behindText,
  euiColorVis4: euiPaletteColorBlind.euiColorVis4.behindText,
  euiColorVis5: euiPaletteColorBlind.euiColorVis5.behindText,
  euiColorVis6: euiPaletteColorBlind.euiColorVis6.behindText,
  euiColorVis7: euiPaletteColorBlind.euiColorVis7.behindText,
  euiColorVis8: euiPaletteColorBlind.euiColorVis8.behindText,
  euiColorVis9: euiPaletteColorBlind.euiColorVis9.behindText,
};

// // Charts
const euiColorChartLines = shade(genericColors.euiColorLightestShade, '3%');
const euiColorChartBand = genericColors.euiColorLightestShade;
//
// Code
const codeBlockColors = {
  euiCodeBlockBackgroundColor: genericColors.euiColorLightestShade,
  euiCodeBlockColor: euiTextColor,
  euiCodeBlockSelectedBackgroundColor: 'inherit',
  euiCodeBlockCommentColor: '#998',
  euiCodeBlockSelectorTagColor: 'inherit',
  euiCodeBlockStringColor: '#DD0A73',
  euiCodeBlockNumberColor: '#00A69B',
  euiCodeBlockKeywordColor: '#333',
  euiCodeBlockFunctionTitleColor: 'inherit',
  euiCodeBlockTagColor: '#0079A5',
  euiCodeBlockNameColor: 'inherit',
  euiCodeBlockTypeColor: '#0079A5',
  euiCodeBlockAttributeColor: 'inherit',
  euiCodeBlockSymbolColor: '#990073',
  euiCodeBlockParamsColor: 'inherit',
  euiCodeBlockMetaColor: '#999',
  euiCodeBlockTitleColor: '#900',
  euiCodeBlockRegexpColor: '#009926',
  euiCodeBlockBuiltInColor: '#0086B3',
  euiCodeBlockSectionColor: '#FFC66D',
  euiCodeBlockAdditionBackgroundColor: '#DFD',
  euiCodeBlockAdditionColor: 'inherit',
  euiCodeBlockDeletionBackgroundColor: '#FDD',
  euiCodeBlockDeletionColor: 'inherit',
  euiCodeBlockSelectorClassColor: 'inherit',
  euiCodeBlockSelectorIdColor: 'inherit',
};

const colors = {
  ...genericColors,
  ...elementColors,
  ...textColors,
  ...euiPaletteColorBlind,
  euiColorChartLines,
  euiColorChartBand,
  ...codeBlockColors,
  ...euiColorVisGraphic,
  ...euiColorVisBehindText,
};

export default colors;
export { genericColors };
