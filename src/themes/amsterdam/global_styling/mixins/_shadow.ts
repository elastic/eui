/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { UseEuiTheme } from '../../../../services/theme';
import { shadowOpacity } from '../functions';
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
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 .8px .8px ${color.alpha(shadowOpacity(0.04, colorMode)).css()},
  0 2.3px 2px ${color.alpha(shadowOpacity(0.03, colorMode)).css()};
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
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 .7px 1.4px ${color.alpha(shadowOpacity(0.07, colorMode)).css()},
  0 1.9px 4px ${color.alpha(shadowOpacity(0.05, colorMode)).css()},
  0 4.5px 10px ${color.alpha(shadowOpacity(0.05, colorMode)).css()};
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
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 .9px 4px -1px ${color.alpha(shadowOpacity(0.08, colorMode)).css()},
  0 2.6px 8px -1px ${color.alpha(shadowOpacity(0.06, colorMode)).css()},
  0 5.7px 12px -1px ${color.alpha(shadowOpacity(0.05, colorMode)).css()},
  0 15px 15px -1px ${color.alpha(shadowOpacity(0.04, colorMode)).css()};
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
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 0 .8px ${color.alpha(shadowOpacity(0.06, colorMode)).css()},
  0 0 2px ${color.alpha(shadowOpacity(0.04, colorMode)).css()},
  0 0 5px ${color.alpha(shadowOpacity(0.04, colorMode)).css()},
  0 0 17px ${color.alpha(shadowOpacity(0.03, colorMode)).css()};
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
  const color = chroma(_color || colors.shadow);

  return `
box-shadow:
  0 1px 5px ${color.alpha(shadowOpacity(0.1, colorMode)).css()},
  0 3.6px 13px ${color.alpha(shadowOpacity(0.07, colorMode)).css()},
  0 8.4px 23px ${color.alpha(shadowOpacity(0.06, colorMode)).css()},
  0 23px 35px ${color.alpha(shadowOpacity(0.05, colorMode)).css()};
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
  const color = chroma(_color || colors.shadow);

  return `
box-shadow:
  0 ${reverse ? '-' : ''}2.7px 9px ${color
    .alpha(shadowOpacity(0.13, colorMode))
    .css()},
  0 ${reverse ? '-' : ''}9.4px 24px ${color
    .alpha(shadowOpacity(0.09, colorMode))
    .css()},
  0 ${reverse ? '-' : ''}21.8px 43px ${color
    .alpha(shadowOpacity(0.08, colorMode))
    .css()};
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
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 1px 5px ${color.alpha(shadowOpacity(0.1, colorMode)).css()},
  0 3.6px 13px ${color.alpha(shadowOpacity(0.07, colorMode)).css()},
  0 8.4px 23px ${color.alpha(shadowOpacity(0.06, colorMode)).css()},
  0 23px 35px ${color.alpha(shadowOpacity(0.05, colorMode)).css()};
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
