/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { UseEuiTheme, useEuiTheme } from '../../../../services/theme';
import { shadowOpacity } from '../functions';

/**
 * slightShadow
 */
export interface MixinSlightShadowStyles {
  color?: string;
}
export const mixinSlightShadowStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinSlightShadowStyles = {}
) => {
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 .8px .8px ${color.alpha(shadowOpacity(0.04, colorMode)).css()},
  0 2.3px 2px ${color.alpha(shadowOpacity(0.03, colorMode)).css()};
`;
};
export const useSlightShadowStyles = (options?: MixinSlightShadowStyles) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinSlightShadowStyles(euiTheme, colorMode, options);
};

/**
 * bottomShadowSmall
 */
export interface MixinBottomShadowSmallStyles {
  color?: string;
}
export const mixinBottomShadowSmallStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinBottomShadowSmallStyles = {}
) => {
  const color = chroma(_color || colors.shadow);
  return `
box-shadow:
  0 .7px 1.4px ${color.alpha(shadowOpacity(0.07, colorMode)).css()},
  0 1.9px 4px ${color.alpha(shadowOpacity(0.05, colorMode)).css()},
  0 4.5px 10px ${color.alpha(shadowOpacity(0.05, colorMode)).css()};
`;
};
export const useBottomShadowSmallStyles = (
  options?: MixinBottomShadowSmallStyles
) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinBottomShadowSmallStyles(euiTheme, colorMode, options);
};

/**
 * bottomShadowMedium
 */
export interface MixinBottomShadowMediumStyles {
  color?: string;
}
export const mixinBottomShadowMediumStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinBottomShadowSmallStyles = {}
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
export const useBottomShadowMediumStyles = (
  options?: MixinBottomShadowSmallStyles
) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinBottomShadowMediumStyles(euiTheme, colorMode, options);
};

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
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinBottomShadowSmallStyles = {}
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
export const useBottomShadowFlatStyles = (
  options?: MixinBottomShadowFlatStyles
) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinBottomShadowFlatStyles(euiTheme, colorMode, options);
};

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
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinBottomShadowStyles = {}
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
export const useBottomShadowStyles = (options?: MixinBottomShadowStyles) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinBottomShadowStyles(euiTheme, colorMode, options);
};

/**
 * bottomShadowLarge
 */
export interface MixinBottomShadowLargeStyles {
  color?: string;
  reverse?: boolean;
}
export const mixinBottomShadowLargeStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  { color: _color, reverse }: MixinBottomShadowLargeStyles = {}
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
export const useBottomShadowLargeStyles = (
  options?: MixinBottomShadowLargeStyles
) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinBottomShadowLargeStyles(euiTheme, colorMode, options);
};

/**
 * slightShadowHover
 */
export interface MixinSlightShadowHoverStyles {
  color?: string;
}
export const mixinSlightShadowHoverStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  { color: _color }: MixinSlightShadowHoverStyles = {}
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
export const useSlightShadowHoverStyles = (
  options?: MixinSlightShadowHoverStyles
) => {
  const { euiTheme, colorMode } = useEuiTheme();
  return mixinSlightShadowHoverStyles(euiTheme, colorMode, options);
};

/**
 * slightShadowActive
 */
export const mixinSlightShadowActiveStyles = mixinSlightShadowHoverStyles;
export const useSlightShadowActiveStyles = useSlightShadowHoverStyles;
