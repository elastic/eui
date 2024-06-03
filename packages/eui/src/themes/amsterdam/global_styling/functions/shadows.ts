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
} from '../../../../services/theme/types';

// Create a CSS color value using whose opacity is determined based
// on either a light or dark theme. We use a multiplier
// of 1 for light themes and 2.5 for dark themes
export const getShadowColor = (
  color: string,
  opacity: number,
  colorMode: EuiThemeColorModeStandard
) => {
  const themeOpacity =
    colorMode === COLOR_MODES_STANDARD.dark ? opacity * 3.5 : opacity * 1;
  return chroma(color).alpha(themeOpacity).css();
};
