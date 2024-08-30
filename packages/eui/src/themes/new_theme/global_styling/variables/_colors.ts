/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeColors } from '../../../../global_styling/variables/colors';
import { light_colors } from './_colors_light';
import { dark_colors } from './_colors_dark';

export const colors: _EuiThemeColors = {
  ghost: '#FFF',
  ink: '#000',
  LIGHT: light_colors,
  DARK: dark_colors,
};
