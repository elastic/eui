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

const baseColorVis = {
  euiColorVis0: SEMANTIC_COLORS.accentSecondary80,
  euiColorVis1: SEMANTIC_COLORS.accentSecondary110,
  euiColorVis2: SEMANTIC_COLORS.primary80,
  euiColorVis3: SEMANTIC_COLORS.primary110,
  euiColorVis4: SEMANTIC_COLORS.accent80,
  euiColorVis5: SEMANTIC_COLORS.accent110,
  euiColorVis6: SEMANTIC_COLORS.danger80,
  euiColorVis7: SEMANTIC_COLORS.danger110,
  euiColorVis8: SEMANTIC_COLORS.warning80,
  euiColorVis9: SEMANTIC_COLORS.warning110,
};

export const visColorsLightHighContrast: _EuiThemeVisColors = {
  euiColorVis0: SEMANTIC_COLORS.accentSecondary80,
  euiColorVis1: SEMANTIC_COLORS.accentSecondary110,
  euiColorVis2: SEMANTIC_COLORS.primary80,
  euiColorVis3: SEMANTIC_COLORS.primary110,
  euiColorVis4: SEMANTIC_COLORS.accent80,
  euiColorVis5: SEMANTIC_COLORS.accent110,
  euiColorVis6: SEMANTIC_COLORS.danger80,
  euiColorVis7: SEMANTIC_COLORS.danger110,
  euiColorVis8: SEMANTIC_COLORS.warning80,
  euiColorVis9: SEMANTIC_COLORS.warning110,

  euiColorVisBehindText0: baseColorVis.euiColorVis0,
  euiColorVisBehindText1: baseColorVis.euiColorVis1,
  euiColorVisBehindText2: baseColorVis.euiColorVis2,
  euiColorVisBehindText3: baseColorVis.euiColorVis3,
  euiColorVisBehindText4: baseColorVis.euiColorVis4,
  euiColorVisBehindText5: baseColorVis.euiColorVis5,
  euiColorVisBehindText6: baseColorVis.euiColorVis6,
  euiColorVisBehindText7: baseColorVis.euiColorVis7,
  euiColorVisBehindText8: baseColorVis.euiColorVis8,
  euiColorVisBehindText9: baseColorVis.euiColorVis9,

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

  euiColorVisSuccess0: SEMANTIC_COLORS.success100,
  euiColorVisSuccess1: SEMANTIC_COLORS.success80,
  euiColorVisWarning0: SEMANTIC_COLORS.warning80,
  euiColorVisDanger0: SEMANTIC_COLORS.danger80,
  euiColorVisDanger1: SEMANTIC_COLORS.danger100,

  euiColorVisNeutral0: PRIMITIVE_COLORS.mutedGrey70,

  euiColorSeverity0: PRIMITIVE_COLORS.mutedGrey20,
  euiColorSeverity1: SEMANTIC_COLORS.shade90,
  euiColorSeverity2: SEMANTIC_COLORS.shade75,
  euiColorSeverity3: SEMANTIC_COLORS.shade60,
  euiColorSeverity4: SEMANTIC_COLORS.shade45,
  euiColorSeverity5: SEMANTIC_COLORS.shade30,
  euiColorSeverity6: SEMANTIC_COLORS.warning20,
  euiColorSeverity7: SEMANTIC_COLORS.warning30,
  euiColorSeverity8: SEMANTIC_COLORS.danger30,
  euiColorSeverity9: SEMANTIC_COLORS.danger40,
  euiColorSeverity10: SEMANTIC_COLORS.danger50,
  euiColorSeverity11: SEMANTIC_COLORS.danger60,
  euiColorSeverity12: SEMANTIC_COLORS.danger70,
  euiColorSeverity13: SEMANTIC_COLORS.danger80,
  euiColorSeverity14: SEMANTIC_COLORS.danger90,

  euiColorVisGrey0: PRIMITIVE_COLORS.blueGrey30,
  euiColorVisGrey1: PRIMITIVE_COLORS.blueGrey60,
  euiColorVisGrey2: PRIMITIVE_COLORS.blueGrey90,
  euiColorVisGrey3: PRIMITIVE_COLORS.blueGrey130,

  euiColorVisWarm0: SEMANTIC_COLORS.danger10,
  euiColorVisWarm1: SEMANTIC_COLORS.danger50,
  euiColorVisWarm2: SEMANTIC_COLORS.danger100,

  euiColorVisCool0: SEMANTIC_COLORS.primary10,
  euiColorVisCool1: SEMANTIC_COLORS.primary50,
  euiColorVisCool2: SEMANTIC_COLORS.primary100,

  euiColorVisComplementary0: SEMANTIC_COLORS.primary80,
  euiColorVisComplementary1: SEMANTIC_COLORS.warning80,
};
