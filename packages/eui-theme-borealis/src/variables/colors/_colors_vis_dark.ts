/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

import { SEMANTIC_COLORS } from './_semantic_colors';
import { colorVisLight } from './_colors_vis_light';

const euiPaletteColorBlind = {
  euiColorVis0: {
    graphic: SEMANTIC_COLORS.accentSecondary60,
  },
  euiColorVis1: {
    graphic: SEMANTIC_COLORS.accentSecondary30,
  },
  euiColorVis2: {
    graphic: SEMANTIC_COLORS.primary60,
  },
  euiColorVis3: {
    graphic: SEMANTIC_COLORS.primary30,
  },
  euiColorVis4: {
    graphic: SEMANTIC_COLORS.accent60,
  },
  euiColorVis5: {
    graphic: SEMANTIC_COLORS.accent30,
  },
  euiColorVis6: {
    graphic: SEMANTIC_COLORS.danger60,
  },
  euiColorVis7: {
    graphic: SEMANTIC_COLORS.danger30,
  },
  euiColorVis8: {
    graphic: SEMANTIC_COLORS.warning60,
  },
  euiColorVis9: {
    graphic: SEMANTIC_COLORS.warning30,
  },
  euiColorVis10: {
    graphic: SEMANTIC_COLORS.assistance60,
  },
  euiColorVis11: {
    graphic: SEMANTIC_COLORS.assistance30,
  },
};

export const colorVisDark: _EuiThemeVisColors = {
  ...colorVisLight,
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
  euiColorVis10: euiPaletteColorBlind.euiColorVis10.graphic,
  euiColorVis11: euiPaletteColorBlind.euiColorVis11.graphic,

  euiColorVisText0: SEMANTIC_COLORS.accentSecondary60,
  euiColorVisText1: SEMANTIC_COLORS.accentSecondary30,
  euiColorVisText2: SEMANTIC_COLORS.primary60,
  euiColorVisText3: SEMANTIC_COLORS.primary30,
  euiColorVisText4: SEMANTIC_COLORS.accent60,
  euiColorVisText5: SEMANTIC_COLORS.accent30,
  euiColorVisText6: SEMANTIC_COLORS.danger60,
  euiColorVisText7: SEMANTIC_COLORS.danger30,
  euiColorVisText8: SEMANTIC_COLORS.warning60,
  euiColorVisText9: SEMANTIC_COLORS.warning30,
  euiColorVisText10: SEMANTIC_COLORS.assistance60,
  euiColorVisText11: SEMANTIC_COLORS.assistance30,
};
