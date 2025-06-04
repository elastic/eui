/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

import { SEMANTIC_COLORS } from './_semantic_colors';
import { PRIMITIVE_COLORS } from './_primitive_colors';

// Maps allow for easier JSON usage
// Use map_merge(euiColorVisColors, $yourMap) to change individual colors after importing ths file
// The `behindText` variant is a direct copy of the hex output by the JS euiPaletteColorBlindBehindText() function
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
};

export const colorVis: _EuiThemeVisColors = {
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

  euiColorVisBehindText0: euiPaletteColorBlind.euiColorVis0.graphic,
  euiColorVisBehindText1: euiPaletteColorBlind.euiColorVis1.graphic,
  euiColorVisBehindText2: euiPaletteColorBlind.euiColorVis2.graphic,
  euiColorVisBehindText3: euiPaletteColorBlind.euiColorVis3.graphic,
  euiColorVisBehindText4: euiPaletteColorBlind.euiColorVis4.graphic,
  euiColorVisBehindText5: euiPaletteColorBlind.euiColorVis5.graphic,
  euiColorVisBehindText6: euiPaletteColorBlind.euiColorVis6.graphic,
  euiColorVisBehindText7: euiPaletteColorBlind.euiColorVis7.graphic,
  euiColorVisBehindText8: euiPaletteColorBlind.euiColorVis8.graphic,
  euiColorVisBehindText9: euiPaletteColorBlind.euiColorVis9.graphic,

  euiColorVisAsTextLight0: SEMANTIC_COLORS.accentSecondary100,
  euiColorVisAsTextLight1: SEMANTIC_COLORS.primary100,
  euiColorVisAsTextLight2: SEMANTIC_COLORS.accent100,
  euiColorVisAsTextLight3: SEMANTIC_COLORS.danger100,
  euiColorVisAsTextLight4: SEMANTIC_COLORS.warning100,
  euiColorVisAsTextLight5: SEMANTIC_COLORS.success100,
  euiColorVisAsTextLight6: SEMANTIC_COLORS.assistance100,

  euiColorVisAsTextDark0: SEMANTIC_COLORS.accentSecondary60,
  euiColorVisAsTextDark1: SEMANTIC_COLORS.primary60,
  euiColorVisAsTextDark2: SEMANTIC_COLORS.accent60,
  euiColorVisAsTextDark3: SEMANTIC_COLORS.danger60,
  euiColorVisAsTextDark4: SEMANTIC_COLORS.warning60,
  euiColorVisAsTextDark5: SEMANTIC_COLORS.success60,
  euiColorVisAsTextDark6: SEMANTIC_COLORS.assistance60,

  euiColorVisNeutral0: SEMANTIC_COLORS.neutral60,
  euiColorVisNeutral1: SEMANTIC_COLORS.neutral30,
  euiColorVisSuccess0: SEMANTIC_COLORS.success60,
  euiColorVisSuccess1: SEMANTIC_COLORS.success30,
  euiColorVisWarning0: SEMANTIC_COLORS.warning60,
  euiColorVisWarning1: SEMANTIC_COLORS.warning30,
  euiColorVisRisk0: SEMANTIC_COLORS.risk60,
  euiColorVisRisk1: SEMANTIC_COLORS.risk30,
  euiColorVisDanger0: SEMANTIC_COLORS.danger60,
  euiColorVisDanger1: SEMANTIC_COLORS.danger30,

  euiColorVisBase0: PRIMITIVE_COLORS.mutedGrey10,

  euiColorVisGrey0: PRIMITIVE_COLORS.blueGrey30,
  euiColorVisGrey1: PRIMITIVE_COLORS.blueGrey60,
  euiColorVisGrey2: PRIMITIVE_COLORS.blueGrey90,
  euiColorVisGrey3: PRIMITIVE_COLORS.blueGrey130,

  euiColorVisWarm0: SEMANTIC_COLORS.danger10,
  euiColorVisWarm1: SEMANTIC_COLORS.danger40,
  euiColorVisWarm2: SEMANTIC_COLORS.danger60,

  euiColorVisCool0: SEMANTIC_COLORS.primary10,
  euiColorVisCool1: SEMANTIC_COLORS.primary40,
  euiColorVisCool2: SEMANTIC_COLORS.primary60,

  euiColorVisComplementary0: SEMANTIC_COLORS.primary60,
  euiColorVisComplementary1: SEMANTIC_COLORS.warning60,
};
