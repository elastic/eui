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

export const colorVisDark: _EuiThemeVisColors = {
  ...colorVisLight,

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
};
