/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../../../services/theme';
import { getShadowColor } from '../functions';
import { createStyleHookFromMixin } from '../../../../global_styling/utils';

/**
 * slightShadow
 */
export interface MixinSlightShadowStyles {
  color?: string;
}
export const mixinSlightShadowStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinSlightShadowStyles = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 .8px .8px ${getShadowColor(color, 0.04, colorMode)},
  0 2.3px 2px ${getShadowColor(color, 0.03, colorMode)};
`;
};
export const useSlightShadowStyles = createStyleHookFromMixin(
  mixinSlightShadowStyles
);

/**
 * bottomShadowSmall
 */
export interface MixinBottomShadowSmallStyles {
  color?: string;
}
export const mixinBottomShadowSmallStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinBottomShadowSmallStyles = {},
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
export const useBottomShadowSmallStyles = createStyleHookFromMixin(
  mixinBottomShadowSmallStyles
);

/**
 * bottomShadowMedium
 */
export interface MixinBottomShadowMediumStyles {
  color?: string;
}
export const mixinBottomShadowMediumStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinBottomShadowSmallStyles = {},
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
export const useBottomShadowMediumStyles = createStyleHookFromMixin(
  mixinBottomShadowMediumStyles
);

/**
 * bottomShadowFlat
 *
 * Similar to shadow medium but without the bottom depth.
 * Useful for popovers that drop UP rather than DOWN.
 */
export interface MixinBottomShadowFlatStyles {
  color?: string;
}
export const mixinBottomShadowFlatStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinBottomShadowSmallStyles = {},
  colorMode: UseEuiTheme['colorMode']
) => {
  const color = _color || colors.shadow;
  return `
box-shadow:
  0 0 .8px ${getShadowColor(color, 0.06, colorMode)},
  0 0 2px ${getShadowColor(color, 0.04, colorMode)},
  0 0 5px ${getShadowColor(color, 0.04, colorMode)},
  0 0 17px ${getShadowColor(color, 0.03, colorMode)};
`;
};
export const useBottomShadowFlatStyles = createStyleHookFromMixin(
  mixinBottomShadowFlatStyles
);

/**
 * bottomShadow
 *
 * adjustBorder allows the border color to match the drop shadow better so that there's better
 * distinction between element bounds and the shadow (crisper borders)
 */
export interface MixinBottomShadowStyles {
  color?: string;
}
export const mixinBottomShadowStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinBottomShadowStyles = {},
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
export const useBottomShadowStyles = createStyleHookFromMixin(
  mixinBottomShadowStyles
);

/**
 * bottomShadowLarge
 */
export interface MixinBottomShadowLargeStyles {
  color?: string;
  reverse?: boolean;
}
export const mixinBottomShadowLargeStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color, reverse }: MixinBottomShadowLargeStyles = {},
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
export const useBottomShadowLargeStyles = createStyleHookFromMixin(
  mixinBottomShadowLargeStyles
);

/**
 * slightShadowHover
 */
export interface MixinSlightShadowHoverStyles {
  color?: string;
}
export const mixinSlightShadowHoverStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color: _color }: MixinSlightShadowHoverStyles = {},
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
export const useSlightShadowHoverStyles = createStyleHookFromMixin(
  mixinSlightShadowHoverStyles
);

/**
 * slightShadowActive
 */
export const mixinSlightShadowActiveStyles = mixinSlightShadowHoverStyles;
export const useSlightShadowActiveStyles = useSlightShadowHoverStyles;
