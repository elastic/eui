/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { UseEuiTheme, useEuiTheme } from '../../services/theme';
import { lightness, tint, transparentize } from '../../services/color';

export interface MixinSlightShadowStyles {
  color?: string;
  opacity?: number;
}
export const mixinSlightShadowStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color, opacity }: MixinSlightShadowStyles = {}
) => {
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.3)
    .css();
  return `box-shadow: 0 2px 2px -1px ${rgba};`;
};
export const useSlightShadowStyles = (options?: MixinSlightShadowStyles) => {
  const { euiTheme } = useEuiTheme();
  return mixinSlightShadowStyles(euiTheme, options);
};

export interface MixinBottomShadowSmallStyles {
  color?: string;
  opacity?: number;
}
export const mixinBottomShadowSmallStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color, opacity }: MixinBottomShadowSmallStyles = {}
) => {
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.3)
    .css();
  return `
  box-shadow:
    0 2px 2px -1px ${rgba},
    0 1px 5px -2px ${rgba};
  `;
};
export const useBottomShadowSmallStyles = (
  options?: MixinBottomShadowSmallStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinBottomShadowSmallStyles(euiTheme, options);
};

export interface MixinBottomShadowMediumStyles {
  color?: string;
  opacity?: number;
}
export const mixinBottomShadowMediumStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color, opacity }: MixinBottomShadowSmallStyles = {}
) => {
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.2)
    .css();
  return `
  box-shadow:
    0 6px 12px -1px ${rgba},
    0 4px 4px -1px ${rgba},
    0 2px 2px 0 ${rgba};
  `;
};
export const useBottomShadowMediumStyles = (
  options?: MixinBottomShadowSmallStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinBottomShadowMediumStyles(euiTheme, options);
};

// Similar to shadow medium but without the bottom depth. Useful for popovers
// that drop UP rather than DOWN.
export interface MixinBottomShadowFlatStyles {
  color?: string;
  opacity?: number;
}
export const mixinBottomShadowFlatStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color, opacity }: MixinBottomShadowSmallStyles = {}
) => {
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.2)
    .css();
  return `
  box-shadow:
    0 0 12px -1px ${rgba},
    0 0 4px -1px ${rgba},
    0 0 2px 0 ${rgba};
  `;
};
export const useBottomShadowFlatStyles = (
  options?: MixinBottomShadowFlatStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinBottomShadowFlatStyles(euiTheme, options);
};

// adjustBorder allows the border color to match the drop shadow better so that there's better
// distinction between element bounds and the shadow (crisper borders)
export interface MixinBottomShadowStyles {
  color?: string;
  opacity?: number;
  adjustBorders?: boolean;
}
export const mixinBottomShadowStyles = (
  { border, colors }: UseEuiTheme['euiTheme'],
  { color: _color, opacity, adjustBorders }: MixinBottomShadowStyles = {}
) => {
  const color = _color || colors.shadow;
  const rgba = chroma(color)
    .alpha(opacity || 0.2)
    .css();

  const adjustedBorders =
    adjustBorders && !(lightness(border.color) < 50)
      ? `
  border-color: ${tint(color, 0.75)};
  border-top-color: ${tint(color, 0.8)};
  border-bottom-color: ${tint(color, 0.55)};
  `
      : '';

  return `
  box-shadow:
    0 12px 24px 0 ${rgba},
    0 6px 12px 0 ${rgba},
    0 4px 4px 0 ${rgba},
    0 2px 2px 0 ${rgba};
  ${adjustedBorders}
  `;
};
export const useBottomShadowStyles = (options?: MixinBottomShadowStyles) => {
  const { euiTheme } = useEuiTheme();
  return mixinBottomShadowStyles(euiTheme, options);
};

export interface MixinBottomShadowLargeStyles {
  color?: string;
  opacity?: number;
  adjustBorders?: boolean;
  reverse?: boolean;
}
export const mixinBottomShadowLargeStyles = (
  { border, colors }: UseEuiTheme['euiTheme'],
  {
    color: _color,
    opacity,
    adjustBorders,
    reverse,
  }: MixinBottomShadowLargeStyles = {}
) => {
  const color = _color || colors.shadow;
  const rgba = chroma(color)
    .alpha(opacity || 0.1)
    .css();

  // Never adjust borders if the border color is already on the dark side (dark theme)
  const adjustedBorders =
    adjustBorders && !(lightness(border.color) < 50)
      ? `
    border-color: ${tint(color, 0.75)};
    border-top-color: ${tint(color, 0.8)};
    border-bottom-color: ${tint(color, 0.55)};
    `
      : '';

  if (reverse) {
    return `
    box-shadow:
      0 -40px 64px 0 ${rgba},
      0 -24px 32px 0 ${rgba},
      0 -16px 16px 0 ${rgba},
      0 -8px 8px 0 ${rgba};
      ${adjustedBorders}
    `;
  } else {
    return `
    box-shadow:
      0 40px 64px 0 ${rgba},
      0 24px 32px 0 ${rgba},
      0 16px 16px 0 ${rgba},
      0 8px 8px 0 ${rgba},
      0 4px 4px 0 ${rgba},
      0 2px 2px 0 ${rgba};
      ${adjustedBorders}
    `;
  }
};
export const useBottomShadowLargeStyles = (
  options?: MixinBottomShadowLargeStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinBottomShadowLargeStyles(euiTheme, options);
};

export interface MixinSlightShadowHoverStyles {
  color?: string;
  opacity?: number;
}
export const mixinSlightShadowHoverStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { color, opacity: _opacity }: MixinSlightShadowHoverStyles = {}
) => {
  const opacity = _opacity || 0.3;
  const rgba1 = chroma(color || colors.shadow)
    .alpha(opacity)
    .css();
  const rgba2 = chroma(color || colors.shadow)
    .alpha(opacity / 2)
    .css();
  return `
  box-shadow:
    0 4px 8px 0 ${rgba2},
    0 2px 2px -1px ${rgba1};
  `;
};
export const useSlightShadowHoverStyles = (
  options?: MixinSlightShadowHoverStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinSlightShadowHoverStyles(euiTheme, options);
};

export const mixinSlightShadowActiveStyles = mixinSlightShadowHoverStyles;
export const useSlightShadowActiveStyles = useSlightShadowHoverStyles;

export interface MixinOverflowShadowStyles {
  direction?: 'y' | 'x';
  side?: 'both' | 'start' | 'end';
}
export const mixinOverflowShadowStyles = (
  { size }: UseEuiTheme['euiTheme'],
  { direction: _direction, side: _side }: MixinOverflowShadowStyles = {}
) => {
  const direction = _direction || 'y';
  const side = _side || 'both';
  const hideHeight = `calc(${size.base} * 0.75 * 1.25)`;
  const gradientStart = `
  ${transparentize('red', 0.9)} 0%,
  ${transparentize('red', 0)} ${hideHeight};
  `;
  const gradientEnd = `
  ${transparentize('red', 0)} calc(100% - ${hideHeight}),
  ${transparentize('red', 0.9)} 100%;
  `;
  let gradient = '';
  if (side) {
    if (side === 'both') {
      gradient = `${gradientStart}, ${gradientEnd}`;
    } else if (side === 'start') {
      gradient = `${gradientStart}`;
    } else {
      gradient = `${gradientEnd}`;
    }
  }

  if (direction === 'y') {
    return `mask-image: linear-gradient(to bottom, ${gradient})`;
  } else {
    return `mask-image: linear-gradient(to right, ${gradient})`;
  }
};
export const useOverflowShadowStyles = (
  options?: MixinOverflowShadowStyles
) => {
  const { euiTheme } = useEuiTheme();
  return mixinOverflowShadowStyles(euiTheme, options);
};
