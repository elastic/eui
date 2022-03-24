/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { useEuiTheme, UseEuiTheme } from '../../services/theme';
import { transparentize } from '../../services/color';
import { mixinOverflowShadowStyles, useOverflowShadowStyles } from './_shadow';
import { CSSProperties } from 'react';

/**
 * Set scroll bar appearance on Chrome (and firefox).
 * All parameters are optional and default to specific global settings.
 */
export interface MixinScrollBarStyles {
  thumbColor?: CSSProperties['backgroundColor'];
  trackColor?: CSSProperties['backgroundColor'];
  /**
   * Defaults to `thin`. Use `auto` only for large page scrollbars
   */
  width?: CSSProperties['scrollbarWidth'];
  /**
   * Overall width (height for horizontal scrollbars)
   */
  size?: CSSProperties['width'];
  /**
   * Corner sizes are usually determined by `width` and
   * are used as an inset border and therefore a smaller corner size means a larger thumb
   */
  corner?: CSSProperties['borderWidth'];
}
export const mixinScrollBarStyles = (
  { colors, size }: UseEuiTheme['euiTheme'],
  {
    thumbColor: _thumbColor,
    trackColor = 'transparent',
    width = 'thin',
    size: _size,
    corner: _corner,
  }: MixinScrollBarStyles = {}
) => {
  // Set defaults from theme
  const thumbColor = _thumbColor || transparentize(colors.darkShade, 0.5);
  const scrollBarSize = _size || size.base;
  const scrollBarCorner =
    _corner || width === 'thin' ? `calc(${size.s} * 0.75)` : size.xs;

  // Firefox's scrollbar coloring cascades, but the sizing does not,
  // so it's being added to this mixin for allowing support wherever custom scrollbars are
  const firefoxSupport = `scrollbar-color: ${thumbColor} ${trackColor};`;

  return `scrollbar-width: ${width};

    &::-webkit-scrollbar {
      width: ${scrollBarSize};
      height: ${scrollBarSize};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${thumbColor};
      background-clip: content-box;
      border-radius: ${scrollBarSize};
      border: ${scrollBarCorner} solid ${trackColor};
    }

    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background-color: ${trackColor};
    }

    ${firefoxSupport}
  `;
};
export const useScrollBarStyles = (options?: MixinScrollBarStyles) => {
  const { euiTheme } = useEuiTheme();
  return mixinScrollBarStyles(euiTheme, options);
};

export interface MixinInnerBorderStyles {
  type?: 'light' | 'dark';
  borderRadius?: number;
  alpha?: number;
}
// Useful border shade when dealing with images of unknown color.
export const mixinInnerBorderStyles = (
  { colors }: UseEuiTheme['euiTheme'],
  { type = 'dark', borderRadius = 0, alpha = 0.1 }: MixinInnerBorderStyles = {}
) => {
  const color = chroma(
    type === 'dark' ? colors.darkestShade : colors.emptyShade
  )
    .alpha(alpha)
    .css();

  return `
    position: relative;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: ${borderRadius};
      content: '';
      pointer-events: none;
      border: 1px solid ${color};
    }
  `;
};
export const useInnerBorderStyles = (options: MixinInnerBorderStyles) => {
  const { euiTheme } = useEuiTheme();
  return mixinInnerBorderStyles(euiTheme, options);
};

/**
 * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.
 *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.
 *    Others like Safari, won't show anything at all.
 */

// Just overflow and scrollbars
const yScrollStyles = `
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &:focus {
    outline: none; /* 1 */
  }
`;
export const mixinYScrollStyles = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${mixinScrollBarStyles(euiTheme)}
  ${yScrollStyles}
`;
export const useYScrollStyles = () => `
  ${useScrollBarStyles()}
  ${yScrollStyles}
`;
const xScrollStyles = `
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &:focus {
    outline: none; /* 1 */
  }
`;
export const mixinXScrollStyles = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${mixinScrollBarStyles(euiTheme)}
  ${xScrollStyles}
`;
export const useXScrollStyles = () => `
  ${useScrollBarStyles()}
  ${xScrollStyles}
`;

// // The full overflow with shadow
export const mixinYScrollWithShadowsStyles = (
  euiTheme: UseEuiTheme['euiTheme']
) => `
  ${mixinYScrollStyles(euiTheme)}
  ${mixinOverflowShadowStyles(euiTheme, { direction: 'y' })}
`;
export const useYScrollWithShadows = () => `
  ${useYScrollStyles()}
  ${useOverflowShadowStyles({ direction: 'y' })}
`;

export const mixinXScrollWithShadowsStyles = (
  euiTheme: UseEuiTheme['euiTheme']
) => `
  ${mixinXScrollStyles(euiTheme)}
  ${mixinOverflowShadowStyles(euiTheme, { direction: 'x' })}
`;
export const useXScrollWithShadows = () => `
  ${useXScrollStyles()}
  ${useOverflowShadowStyles({ direction: 'x' })}
`;

// Hiding elements offscreen to only be read by screen reader
export const mixinScreenReaderOnlyStyles = () => `
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
export const useScreenReaderOnlyStyles = mixinScreenReaderOnlyStyles;

// Doesn't have reduced motion turned on
export const mixinCanAnimateStyles = (content: string) => `
  @media screen and (prefers-reduced-motion: no-preference) {
    ${content}
  }
`;
export const useCanAnimateStyles = mixinCanAnimateStyles;
