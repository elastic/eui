/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { _EuiThemeColors } from '@elastic/eui-theme-common';

import { SEMANTIC_COLORS } from './_semantic_colors';
import { light_colors } from './_colors_light';
import { dark_colors } from './_colors_dark';
import { colorVisLight } from './_colors_vis_light';
import { colorVisDark } from './_colors_vis_dark';
import { severityColors } from './_colors_severity';

export const colors: _EuiThemeColors = {
  ghost: SEMANTIC_COLORS.plainLight,
  ink: SEMANTIC_COLORS.plainDark,
  plainLight: SEMANTIC_COLORS.plainLight,
  plainDark: SEMANTIC_COLORS.plainDark,
  severity: severityColors,
  LIGHT: {
    ...light_colors,
    vis: colorVisLight,
  },
  DARK: {
    ...dark_colors,
    vis: colorVisDark,
  },
};
