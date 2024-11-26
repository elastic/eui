/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  logicalCSS,
  logicalSizeCSS,
  euiFontSize,
  euiCanAnimate,
  mathWithUnits,
} from '../../global_styling';
import { COLOR_MODES_STANDARD, UseEuiTheme, tint, shade } from '../../services';
import { euiShadow } from '../../themes/amsterdam';

export const euiToolTipBackgroundColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode']
) =>
  colorMode === COLOR_MODES_STANDARD.dark
    ? shade(euiTheme.colors.emptyShade, 1)
    : tint(euiTheme.colors.fullShade, 0.25);

export const euiToolTipBorderColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode']
) =>
  colorMode === COLOR_MODES_STANDARD.dark
    ? shade(euiTheme.colors.fullShade, 0.8)
    : tint(euiTheme.colors.fullShade, 0.35);

const euiToolTipAnimationVertical = (size: string) => keyframes`
    0% {
        opacity: 0;
        transform: translateY(${size});
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const euiToolTipAnimationHorizontal = (size: string) => keyframes`
    0% {
        opacity: 0;
        transform: translateX(${size});
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const euiToolTipStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode, highContrastMode } = euiThemeContext;

  const hasShadow = !highContrastMode;
  const hasVisibleBorder = highContrastMode || colorMode === 'DARK';
  const animationTiming = `${euiTheme.animation.slow} ease-out 0s forwards`;

  const arrowSize = euiTheme.size.m;
  const arrowOffset = mathWithUnits(arrowSize, (x) => x / -2);
  const arrowBorderRadius = mathWithUnits(
    euiTheme.border.radius.small,
    (x) => x / 2
  );

  return {
    // Base
    euiToolTip: css`
      ${hasShadow ? euiShadow(euiThemeContext) : ''}
      border: ${euiTheme.border.width.thin} solid
        ${hasVisibleBorder ? euiTheme.border.color : 'transparent'};
      border-radius: ${euiTheme.border.radius.medium};
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      color: ${euiTheme.colors.ghost};
      z-index: ${euiTheme.levels.toast};
      ${logicalCSS('max-width', '256px')}
      overflow-wrap: break-word;
      padding: ${euiTheme.size.s};
      ${euiFontSize(euiThemeContext, 's')}

      position: absolute;

      [class*='euiHorizontalRule'] {
        background-color: ${euiToolTipBorderColor(euiTheme, colorMode)};
      }
    `,
    // Sizes
    s: css`
      ${euiFontSize(euiThemeContext, 'xs')}
    `,
    // Positions
    top: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationVertical(`-${euiTheme.size.base}`)}
          ${animationTiming};
      }
    `,
    bottom: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationVertical(euiTheme.size.base)}
          ${animationTiming};
      }
    `,
    left: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationHorizontal(`-${euiTheme.size.base}`)}
          ${animationTiming};
      }
    `,
    right: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationHorizontal(euiTheme.size.base)}
          ${animationTiming};
      }
    `,
    // Arrow
    euiToolTip__arrow: css`
      content: '';
      position: absolute;
      ${logicalSizeCSS(arrowSize)}
      background-color: inherit;
      border: inherit;
      border-radius: ${arrowBorderRadius};
      clip-path: polygon(0 0, 100% 100%, 0 100%);
      transform-origin: center;
    `,
    arrowPositions: {
      top: css`
        transform: rotate(-45deg);
        ${logicalCSS('margin-top', arrowOffset)}
      `,
      bottom: css`
        ${logicalCSS('bottom', 0)}
        transform: rotate(135deg);
        ${logicalCSS('margin-bottom', arrowOffset)}
      `,
      left: css`
        transform: rotate(-135deg);
        ${logicalCSS('margin-left', arrowOffset)}
      `,
      right: css`
        ${logicalCSS('right', 0)}
        transform: rotate(45deg);
        ${logicalCSS('margin-right', arrowOffset)}
      `,
    },
    // Title
    euiToolTip__title: css`
      font-weight: ${euiTheme.font.weight.bold};
      ${logicalCSS(
        'border-bottom',
        `solid ${euiTheme.border.width.thin} ${euiToolTipBorderColor(
          euiTheme,
          colorMode
        )}`
      )}
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}
      ${logicalCSS('margin-bottom', euiTheme.size.xs)}
    `,
  };
};

export const euiToolTipAnchorStyles = () => ({
  // Elements
  euiToolTipAnchor: css`
    /* Disabled elements don't fire mouse events, which means leaving a disabled element
       wouldn't trigger the onMouseOut and hide the tooltip. Disabling pointer events
       on disabled elements means any mouse events remain handled by parent elements
       https://jakearchibald.com/2017/events-and-disabled-form-fields/ */
    *[disabled] {
      pointer-events: none;
    }
  `,
  // Variants
  block: css`
    display: block;
  `,
  inlineBlock: css`
    display: inline-block;
  `,
});
