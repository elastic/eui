/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { UseEuiTheme } from '../../services/theme';
import { transparentize } from '../../services/color';
import { mixinOverflowShadowStyles } from './_shadow';
import { createStyleHookFromMixin } from '../utils';

/**
 * Set scroll bar appearance on Chrome (and firefox).
 * All parameters are optional and default to specific global settings.
 */
export interface EuiScrollBarStyles {
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
export const euiScrollBarStyles = (
  { colors, size }: UseEuiTheme['euiTheme'],
  {
    thumbColor: _thumbColor,
    trackColor = 'transparent',
    width = 'thin',
    size: _size,
    corner: _corner,
  }: EuiScrollBarStyles = {}
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
export const useEuiScrollBar = createStyleHookFromMixin(euiScrollBarStyles);

/**
 * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.
 *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.
 *    Others like Safari, won't show anything at all.
 */

// TODO: How do we use Emotion to output the CSS class utilities instead?
export const euiYScroll = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${euiScrollBarStyles(euiTheme)}
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &:focus {
    outline: none; /* 1 */
  }
`;
export const useEuiYScroll = createStyleHookFromMixin(euiYScroll);

export const euiYScrollWithShadows = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${euiYScroll(euiTheme)}
  ${mixinOverflowShadowStyles(euiTheme, { direction: 'y' })}
`;
export const useEuiYScrollWithShadows = createStyleHookFromMixin(
  euiYScrollWithShadows
);

export const euiXScroll = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${euiScrollBarStyles(euiTheme)}
  overflow-x: auto;
  &:focus {
    outline: none; /* 1 */
  }
`;
export const useEuiXScroll = createStyleHookFromMixin(euiXScroll);

export const euiXScrollWithShadows = (euiTheme: UseEuiTheme['euiTheme']) => `
  ${euiXScroll(euiTheme)}
  ${mixinOverflowShadowStyles(euiTheme, { direction: 'x' })}
`;
export const useEuiXScrollWithShadows = createStyleHookFromMixin(
  euiXScrollWithShadows
);
