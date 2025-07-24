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
  euiColorVis0: SEMANTIC_COLORS.accentSecondary110,
  euiColorVis1: SEMANTIC_COLORS.accentSecondary80,
  euiColorVis2: SEMANTIC_COLORS.primary110,
  euiColorVis3: SEMANTIC_COLORS.primary80,
  euiColorVis4: SEMANTIC_COLORS.accent110,
  euiColorVis5: SEMANTIC_COLORS.accent80,
  euiColorVis6: SEMANTIC_COLORS.danger110,
  euiColorVis7: SEMANTIC_COLORS.danger80,
  euiColorVis8: SEMANTIC_COLORS.warning110,
  euiColorVis9: SEMANTIC_COLORS.warning80,
};

export const visColorsLightHighContrast: _EuiThemeVisColors = {
  ...baseColorVis,

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

  euiColorVisText0: SEMANTIC_COLORS.accentSecondary110,
  euiColorVisText1: SEMANTIC_COLORS.accentSecondary100,
  euiColorVisText2: SEMANTIC_COLORS.primary110,
  euiColorVisText3: SEMANTIC_COLORS.primary90,
  euiColorVisText4: SEMANTIC_COLORS.accent100,
  euiColorVisText5: SEMANTIC_COLORS.accent80,
  euiColorVisText6: SEMANTIC_COLORS.danger100,
  euiColorVisText7: SEMANTIC_COLORS.danger80,
  euiColorVisText8: SEMANTIC_COLORS.warning110,
  euiColorVisText9: SEMANTIC_COLORS.warning90,

  euiColorVisNeutral0: SEMANTIC_COLORS.neutral100,
  euiColorVisNeutral1: SEMANTIC_COLORS.neutral80,
  euiColorVisSuccess0: SEMANTIC_COLORS.success100,
  euiColorVisSuccess1: SEMANTIC_COLORS.success80,
  euiColorVisWarning0: SEMANTIC_COLORS.warning100,
  euiColorVisWarning1: SEMANTIC_COLORS.warning80,
  euiColorVisRisk0: SEMANTIC_COLORS.risk100,
  euiColorVisRisk1: SEMANTIC_COLORS.risk80,
  euiColorVisDanger0: SEMANTIC_COLORS.danger100,
  euiColorVisDanger1: SEMANTIC_COLORS.danger80,

  euiColorVisBase0: PRIMITIVE_COLORS.mutedGrey10,

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
