/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, UseEuiTheme } from '../../../../services/theme';
import { getShadowColor } from '../functions';
import { createStyleHookFromMixin } from '../../../../global_styling/utils';
import { _EuiShadowSizes } from '../../../../global_styling/mixins/_shadow';

/**
 * Very subtle shadow used on small components, ya heard the type!
 */
export interface EuiShadowCustomColor {
  color?: string;
}

/**
 * Very subtle shadow used on small components, ya heard!
 */
export const euiSlightShadow = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: EuiShadowCustomColor = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 .8px .8px ${getShadowColor(color, 0.04, colorMode)},
  0 2.3px 2px ${getShadowColor(color, 0.03, colorMode)};
`;
};
export const useEuiSlightShadow = createStyleHookFromMixin(euiSlightShadow);

/**
 * bottomShadowSmall
 */
export const euiBottomShadowSmall = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: EuiShadowCustomColor = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 .7px 1.4px ${getShadowColor(color, 0.07, colorMode)},
  0 1.9px 4px ${getShadowColor(color, 0.05, colorMode)},
  0 4.5px 10px ${getShadowColor(color, 0.05, colorMode)};
`;
};
export const useEuiBottomShadowSmall = createStyleHookFromMixin(
  euiBottomShadowSmall
);

/**
 * bottomShadowMedium
 */
export const euiBottomShadowMedium = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: EuiShadowCustomColor = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 .9px 4px -1px ${getShadowColor(color, 0.08, colorMode)},
  0 2.6px 8px -1px ${getShadowColor(color, 0.06, colorMode)},
  0 5.7px 12px -1px ${getShadowColor(color, 0.05, colorMode)},
  0 15px 15px -1px ${getShadowColor(color, 0.04, colorMode)};
`;
};
export const useEuiBottomShadowMedium = createStyleHookFromMixin(
  euiBottomShadowMedium
);

/**
 * bottomShadow
 */
export const euiBottomShadow = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: EuiShadowCustomColor = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;

  return `
box-shadow:
  0 1px 5px ${getShadowColor(color, 0.1, colorMode)},
  0 3.6px 13px ${getShadowColor(color, 0.07, colorMode)},
  0 8.4px 23px ${getShadowColor(color, 0.06, colorMode)},
  0 23px 35px ${getShadowColor(color, 0.05, colorMode)};
`;
};
export const useEuiBottomShadow = createStyleHookFromMixin(euiBottomShadow);

/**
 * bottomShadowLarge
 */
export interface EuiBottomShadowLarge extends EuiShadowCustomColor {
  reverse?: boolean;
}
export const euiBottomShadowLarge = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color, reverse }: EuiBottomShadowLarge = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;

  return `
box-shadow:
  0 ${reverse ? '-' : ''}2.7px 9px ${getShadowColor(color, 0.13, colorMode)},
  0 ${reverse ? '-' : ''}9.4px 24px ${getShadowColor(color, 0.09, colorMode)},
  0 ${reverse ? '-' : ''}21.8px 43px ${getShadowColor(color, 0.08, colorMode)};
`;
};
export const useEuiBottomShadowLarge = createStyleHookFromMixin(
  euiBottomShadowLarge
);

/**
 * slightShadowHover
 */
export const euiSlightShadowHover = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: EuiShadowCustomColor = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 1px 5px ${getShadowColor(color, 0.1, colorMode)},
  0 3.6px 13px ${getShadowColor(color, 0.07, colorMode)},
  0 8.4px 23px ${getShadowColor(color, 0.06, colorMode)},
  0 23px 35px ${getShadowColor(color, 0.05, colorMode)};
`;
};
export const useEuiSlightShadowHover = createStyleHookFromMixin(
  euiSlightShadowHover
);

/**
 * bottomShadowFlat
 *
 * Similar to shadow medium but without the bottom depth.
 * Useful for popovers that drop UP rather than DOWN.
 */
export const euiShadowFlat = (
  { colors }: UseEuiTheme['euiTheme'],
  color: EuiShadowCustomColor['color'] = undefined,
  colorMode: UseEuiTheme['colorMode']
) => {
  const _color = color || colors.shadow;
  return `
box-shadow:
  0 0 .8px ${getShadowColor(_color, 0.06, colorMode)},
  0 0 2px ${getShadowColor(_color, 0.04, colorMode)},
  0 0 5px ${getShadowColor(_color, 0.04, colorMode)},
  0 0 17px ${getShadowColor(_color, 0.03, colorMode)};
`;
};
export const useEuiShadowFlat = createStyleHookFromMixin(euiShadowFlat);

/**
 * One hook to rule them all
 */
export const useEuiShadow = (
  size: _EuiShadowSizes = 'l',
  color: EuiShadowCustomColor['color'] = undefined
) => {
  const { euiTheme, colorMode } = useEuiTheme();

  switch (size) {
    case 'xs':
      return euiSlightShadow(euiTheme, { color }, colorMode);
      break;
    case 's':
      return euiBottomShadowSmall(euiTheme, { color }, colorMode);
      break;
    case 'm':
      return euiBottomShadowMedium(euiTheme, { color }, colorMode);
      break;
    case 'l':
      return euiBottomShadow(euiTheme, { color }, colorMode);
      break;
    case 'xl':
      return euiBottomShadowLarge(euiTheme, { color }, colorMode);
      break;

    default:
      console.warn('Please provide a valid size option to useEuiShadow');
      break;
  }
};
