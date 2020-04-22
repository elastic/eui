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

import euiColorsLight from './eui_colors_light';
import {
  makeHighContrastColor,
  shade,
  tint,
} from '../../global_styling/functions';

const coreColors = {
  euiColorPrimary: '#1BA9F5',
  euiColorSecondary: '#7DE2D1',
  euiColorAccent: '#F990C0',
  euiColorHighlight: '#2E2D25',
};

const genericColors = {
  // Core
  ...coreColors,

  // These colors stay the same no matter the theme
  euiColorGhost: '#FFF',
  euiColorInk: '#000',

  // Status
  euiColorSuccess: coreColors.euiColorSecondary,
  euiColorDanger: '#F66',
  euiColorWarning: '#FFCE7A',

  // Grays
  euiColorEmptyShade: '#1D1E24',
  euiColorLightestShade: '#25262E',
  euiColorLightShade: '#343741',
  euiColorMediumShade: '#535966',
  euiColorDarkShade: '#98A2B3',
  euiColorDarkestShade: '#D4DAE5',
  euiColorFullShade: '#FFF',
};

const euiTextColor = '#DFE5EF';
const elementColors = {
  euiTextColor,
  euiTitleColor: euiTextColor,
  euiLinkColor: genericColors.euiColorPrimary,
  euiTextSubduedColor: makeHighContrastColor(genericColors.euiColorMediumShade),
  euiPageBackgroundColor: shade(genericColors.euiColorLightestShade, '30%'),
  euiFocusBackgroundColor: '#232635',
};

// // Variations from core
// $euiShadowColor: #000;
// $euiShadowColorLarge: #000;

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
  euiColorDangerText: makeHighContrastColor(
    genericColors.euiColorDanger,
    genericColors.euiColorLightShade
  ),
  euiColorSuccessText: euiColorSecondaryText,
};

// Charts
const euiColorChartLine = genericColors.euiColorLightShade;
const euiColorChartBand = tint(genericColors.euiColorLightShade, '2.5%');

// Code
const codeBlockColors = {
  euiCodeBlockCommentColor: '#656565',
  euiCodeBlockSelectorTagColor: '#C792EA',
  euiCodeBlockStringColor: '#C3E88D',
  euiCodeBlockNumberColor: '#F77669',
  euiCodeBlockKeywordColor: '#C792EA',
  euiCodeBlockFunctionTitleColor: '#75A5FF',
  euiCodeBlockTagColor: '#ABB2BF',
  euiCodeBlockNameColor: '#E06C75',
  euiCodeBlockTypeColor: '#DA4939',
  euiCodeBlockAttributeColor: '#80CBBF',
  euiCodeBlockSymbolColor: '#C792EA',
  euiCodeBlockParamsColor: '#EEFFF7',
  euiCodeBlockMetaColor: '#75A5FF',
  euiCodeBlockTitleColor: '#75A5FF',
  euiCodeBlockSectionColor: '#FFC66D',
  euiCodeBlockAdditionBackgroundColor: '#144212',
  euiCodeBlockAdditionColor: '#E6E1DC',
  euiCodeBlockDeletionBackgroundColor: '#600',
  euiCodeBlockDeletionColor: '#E6E1DC',
  euiCodeBlockSelectorClassColor: '#FFCB68',
  euiCodeBlockSelectorIdColor: '#F77669',
};

const colors = {
  ...euiColorsLight,
  ...genericColors,
  ...elementColors,
  ...textColors,
  euiColorChartLine,
  euiColorChartBand,
  ...codeBlockColors,
};

export default colors;
export { genericColors };
