/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import {
  COLOR_MODES_STANDARD,
  EuiThemeColorModeStandard,
} from '../../../../services';

// Use a function to determine shadow opacity based
// on either a light or dark theme. We use a multiplier
// of 1 for light themes and 2.5 for dark themes
export const shadowOpacity = (
  opacity: number,
  colorMode: EuiThemeColorModeStandard
) => {
  return colorMode === COLOR_MODES_STANDARD.dark ? opacity * 2.5 : opacity * 1;
};

// Create a CSS color value using `shadowOpacity`
export const getShadowColor = (
  color: string,
  opacity: number,
  colorMode: EuiThemeColorModeStandard
) => chroma(color).alpha(shadowOpacity(opacity, colorMode)).css();
