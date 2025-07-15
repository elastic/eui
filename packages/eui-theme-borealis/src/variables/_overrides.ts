/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeOverrides } from '@elastic/eui-theme-common';

import { PRIMITIVE_COLORS } from './colors/_primitive_colors';
import { visColorsLightHighContrast } from './colors/_colors_vis_hcm';
import { severityColorsLightHighContrast } from './colors/_colors_severity_hcm';

export const overrides: _EuiThemeOverrides = {
  HCM: {
    colors: {
      ink: PRIMITIVE_COLORS.black,
      ghost: PRIMITIVE_COLORS.white,
      LIGHT: {
        vis: visColorsLightHighContrast,
        severity: severityColorsLightHighContrast,
      },
    },
  },
};
