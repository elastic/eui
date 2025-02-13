/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  euiShadowFlat,
  euiShadow,
  euiSlightShadowHover,
  euiShadowXSmall,
  euiShadowSmall,
  euiShadowMedium,
  euiShadowLarge,
  euiShadowXLarge,
  type _EuiThemeShadowSize,
  type _EuiThemeShadowCustomColor,
} from '@elastic/eui-theme-common';

import { useEuiTheme } from '../../services/theme';

export {
  euiShadowFlat,
  euiShadow,
  euiSlightShadowHover,
  euiShadowXSmall,
  euiShadowSmall,
  euiShadowMedium,
  euiShadowLarge,
  euiShadowXLarge,
};

export interface EuiShadowCustomColor {
  color?: string;
}

export const useEuiSlightShadowHover = (
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiSlightShadowHover(euiThemeContext, { color });
};

export const useEuiShadowFlat = (
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiShadowFlat(euiThemeContext, { color });
};

export const useEuiShadow = (
  size: _EuiThemeShadowSize = 'l',
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiShadow(euiThemeContext, size, { color });
};
