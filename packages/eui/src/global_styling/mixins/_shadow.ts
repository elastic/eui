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
  type EuiShadowOptions,
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

export const useEuiSlightShadowHover = (options?: EuiShadowOptions) => {
  const euiThemeContext = useEuiTheme();
  return euiSlightShadowHover(euiThemeContext, options);
};

export const useEuiShadowFlat = (options?: EuiShadowOptions) => {
  const euiThemeContext = useEuiTheme();
  return euiShadowFlat(euiThemeContext, options);
};

export const useEuiShadow = (
  size: _EuiThemeShadowSize = 'l',
  options?: EuiShadowOptions
) => {
  const euiThemeContext = useEuiTheme();
  return euiShadow(euiThemeContext, size, options);
};
