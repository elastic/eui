/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeOverrides } from '@elastic/eui-theme-common';
import { PRIMITIVE_COLORS } from './colors/_primitive_colors';

export const overrides: _EuiThemeOverrides = {
  HCM: {
    colors: {
      ink: PRIMITIVE_COLORS.black,
      ghost: PRIMITIVE_COLORS.white,
      LIGHT: {
        primary: '#00ff00',
      },
      DARK: {
        primary: '#0000ff',
      },
    },
  },
};
