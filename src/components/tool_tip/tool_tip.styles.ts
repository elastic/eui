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
  const { euiTheme, colorMode } = euiThemeContext;
  const animationTiming = `${euiTheme.animation.slow} ease-out 0s forwards`;
  // Shift arrow 1px more than half its size to account for border radius
  const arrowSize = euiTheme.size.m;
  const arrowPlusSize = mathWithUnits(arrowSize, (x) => (x / 2 + 1) * -1);
  const arrowMinusSize = mathWithUnits(arrowSize, (x) => (x / 2 - 1) * -1);
  return {
    // Base
    euiToolTip: css`
      ${euiShadow(euiThemeContext)}
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
      transform-origin: center;
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      ${logicalSizeCSS(arrowSize, arrowSize)}
    `,
    arrowPositions: {
      top: css`
        transform: translateY(${arrowPlusSize}) rotateZ(45deg);
      `,
      bottom: css`
        transform: translateY(${arrowMinusSize}) rotateZ(45deg);
      `,
      left: css`
        transform: translateX(${arrowPlusSize}) rotateZ(45deg);
      `,
      right: css`
        transform: translateX(${arrowMinusSize}) rotateZ(45deg);
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
