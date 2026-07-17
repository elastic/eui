/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { euiCanAnimate, euiCantAnimate } from '@elastic/eui-theme-common';

import { useEuiTheme, UseEuiTheme } from '../../services/theme';
import { transparentize } from '../../services/color';
import { logicalCSS, logicalCSSWithFallback } from '../functions';

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
  { euiTheme: { colors, size } }: UseEuiTheme,
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
      ${logicalCSS('width', scrollBarSize)}
      ${logicalCSS('height', scrollBarSize)}
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
export const useEuiScrollBar = (options?: EuiScrollBarStyles) => {
  const euiTheme = useEuiTheme();
  return euiScrollBarStyles(euiTheme, options);
};

/**
 * *INTERNAL*
 * Overflow shadow masks for use in YScroll and XScroll helpers
 */
interface EuiOverflowShadowStyles {
  direction?: 'y' | 'x';
  side?: 'both' | 'start' | 'end';
  /**
   * When enabled, uses scroll animated pseudo elements to create a soft scroll container edge.
   * Otherwise uses `mask-image` to create a static, soft gradient edge.
   * It falls back to `mask-image` for `prefers-reduced-motion: reduce` settings and browsers that don't
   * support the scroll timeline API.
   */
  hasAnimatedOverflowShadow?: boolean;
}
export const euiOverflowShadowStyles = (
  { euiTheme: { size, colors } }: UseEuiTheme,
  {
    direction: _direction,
    side: _side,
    hasAnimatedOverflowShadow = false,
  }: EuiOverflowShadowStyles = {}
) => {
  const direction = _direction || 'y';
  const side = _side || 'both';
  const hideHeight = size.s;
  const gradientStart = `
  ${transparentize('red', 0.1)} 0%,
  ${transparentize('red', 1)} ${hideHeight}
  `;
  const gradientEnd = `
  ${transparentize('red', 1)} calc(100% - ${hideHeight}),
  ${transparentize('red', 0.1)} 100%
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

  // Chrome+Edge has a very bizarre edge case bug where `mask-image` stops working
  // This workaround forces a stacking context on the scrolling container, which
  // hopefully addresses the bug. @see:
  // - https://issues.chromium.org/issues/40778541
  // - https://github.com/elastic/kibana/issues/180828
  // - https://github.com/elastic/eui/pull/6343#issuecomment-1302732021
  const chromiumMaskWorkaround = 'transform: translateZ(0);';
  const overflowShadowStatic =
    direction === 'y'
      ? `mask-image: linear-gradient(to bottom, ${gradient}); ${chromiumMaskWorkaround}`
      : `mask-image: linear-gradient(to right, ${gradient}); ${chromiumMaskWorkaround}`;

  // If supported, use the scroll timeline API to animate the gradient to show/hide it on the scroll edges.
  // We only support vertical scrolling as horizontal scrolling has increased complexity on element dimensions.
  if (hasAnimatedOverflowShadow && direction === 'y') {
    const featureFlag = 'animation-timeline: scroll()';
    const gradientStartColor = `var(--euiOverflowShadowColor, ${colors.backgroundBasePlain})`;
    const gradientEndColor = 'transparent';
    const gradientSize = size.base;
    const gradientScrollRange = size.m;

    const commonPseudoElementStyles = `
      content: '';
      display: block;
      position: sticky;
      z-index: 1;
      block-size: ${gradientSize};
      pointer-events: none;
    `;

    return `
      @supports not (${featureFlag}) {
        ${overflowShadowStatic}
      }

      ${euiCantAnimate} {
        ${overflowShadowStatic}
      }

      ${euiCanAnimate} {
        @supports (${featureFlag}) {
          @keyframes show { 
            from { opacity: 0 } 
            to { opacity: 1 }
          }
          @keyframes hide { 
            from { opacity: 1 }
            to { opacity: 0 }
          }

          position: relative;

          /* Gradient on start edge */
          &::before {
            ${commonPseudoElementStyles}
            inset-block-start: 0;
            /* prevent pushing down the content */
            ${logicalCSS('margin-bottom', `-${gradientSize}`)} 
            /* uses CSS custom property to support customization depending on layout wrapper background color */
            background: linear-gradient(to bottom, ${gradientStartColor}, ${gradientEndColor});
            
            opacity: 0;
            animation: show linear both;
            animation-timeline: scroll(y);
            animation-range: 0px ${gradientScrollRange};
          }

          /* Gradient on end edge */
          &::after {
            ${commonPseudoElementStyles}
            inset-block-end: 0;
            /* prevent adding extra space */
            ${logicalCSS('margin-top', `-${gradientSize}`)} 
            background: linear-gradient(to top, ${gradientStartColor}, ${gradientEndColor});

            
            /* NOTE: To ensure the bottom gradient is not visible when the container has no overflow,
            we need to use opacity: 0 as default. Using two animations with 'animation-fill-mode: forwards'
            ensures the show/hide animation works both with and without overflow. */
            /* scroll animation */
            opacity: 0;
            animation-name: show, hide;
            animation-timing-function: step-start, linear;
            animation-fill-mode: forwards;
            animation-timeline: scroll(y);
            animation-range: 0% 100%, calc(100% - ${gradientScrollRange}) 100%;
          }
        }
      }
    `;
  }

  return overflowShadowStatic;
};

/**
 * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.
 *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.
 *    Others like Safari, won't show anything at all.
 */
interface _EuiYScroll {
  height?: CSSProperties['height'];
}
export const euiYScroll = (
  euiTheme: UseEuiTheme,
  { height }: _EuiYScroll = {}
) => `
  ${euiScrollBarStyles(euiTheme)}
  ${logicalCSS('height', height || '100%')}
  ${logicalCSSWithFallback('overflow-y', 'auto')}
  ${logicalCSSWithFallback('overflow-x', 'hidden')}
  &:focus {
    outline: none; /* 1 */
  }
`;
export const useEuiYScroll = ({ height }: _EuiYScroll = {}) => {
  const euiTheme = useEuiTheme();
  return euiYScroll(euiTheme, { height });
};

interface _EuiYScrollWithShadows extends _EuiYScroll {
  side?: 'both' | 'start' | 'end';
  hasAnimatedOverflowShadow?: boolean;
}
export const euiYScrollWithShadows = (
  euiTheme: UseEuiTheme,
  {
    height,
    side = 'both',
    hasAnimatedOverflowShadow = false,
  }: _EuiYScrollWithShadows = {}
) => `
  ${euiYScroll(euiTheme, { height })}
  ${euiOverflowShadowStyles(euiTheme, {
    direction: 'y',
    side,
    hasAnimatedOverflowShadow,
  })}
`;
export const useEuiYScrollWithShadows = ({
  height,
  side,
  hasAnimatedOverflowShadow,
}: _EuiYScrollWithShadows = {}) => {
  const euiTheme = useEuiTheme();
  return euiYScrollWithShadows(euiTheme, {
    height,
    side,
    hasAnimatedOverflowShadow,
  });
};

export const euiXScroll = (euiTheme: UseEuiTheme) => `
  ${euiScrollBarStyles(euiTheme)}
  ${logicalCSSWithFallback('overflow-x', 'auto')}
  &:focus {
    outline: none; /* 1 */
  }
`;
export const useEuiXScroll = () => {
  const euiTheme = useEuiTheme();
  return euiXScroll(euiTheme);
};

export const euiXScrollWithShadows = (euiTheme: UseEuiTheme) => `
  ${euiXScroll(euiTheme)}
  ${euiOverflowShadowStyles(euiTheme, { direction: 'x' })}
`;
export const useEuiXScrollWithShadows = () => {
  const euiTheme = useEuiTheme();
  return euiXScrollWithShadows(euiTheme);
};

interface EuiScrollOverflowStyles {
  direction?: 'y' | 'x';
  mask?: boolean;
}
export const euiOverflowScroll = (
  euiTheme: UseEuiTheme,
  { direction, mask = false }: EuiScrollOverflowStyles = {}
) => {
  switch (direction) {
    case 'y':
      return mask ? euiYScrollWithShadows(euiTheme) : euiYScroll(euiTheme);
    case 'x':
      return mask ? euiXScrollWithShadows(euiTheme) : euiXScroll(euiTheme);

    default:
      console.warn(
        'Please provide a valid direction option to useEuiOverflowScroll'
      );
      return '';
  }
};
export const useEuiOverflowScroll = (
  direction: EuiScrollOverflowStyles['direction'],
  mask: EuiScrollOverflowStyles['mask'] = false
) => {
  const euiTheme = useEuiTheme();
  return euiOverflowScroll(euiTheme, { direction, mask });
};

/**
 * For quickly applying a full-height element whether using flex or not
 */
export const euiFullHeight = () => `
  ${logicalCSS('height', '100%')}
  flex: 1 1 auto;
  overflow: hidden;
`;
