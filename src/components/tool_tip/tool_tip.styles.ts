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
  /*
   * 1. Shift arrow 1px more than half its size to account for border radius
   */
  const arrowSize = euiTheme.size.m;
  const arrowPlusSize = mathWithUnits(arrowSize, (x) => (x / 2 + 1) * -1); // 1.
  const arrowMinusSize = mathWithUnits(arrowSize, (x) => (x / 2 - 1) * -1); // 1.
  return {
    // Base
    euiToolTip: css`
      ${euiShadow(euiThemeContext)};
      border-radius: ${euiTheme.border.radius.medium};
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      color: ${euiTheme.colors.ghost};
      z-index: ${euiTheme.levels.toast};
      ${logicalCSS('max-width', '256px')}
      overflow-wrap: break-word;
      padding: ${euiTheme.size.s};
      ${euiFontSize(euiThemeContext, 's')};

      position: absolute;

      [class*='euiHorizontalRule'] {
        background-color: ${euiToolTipBorderColor(euiTheme, colorMode)};
      }
    `,
    // Sizes
    s: css`
      ${euiFontSize(euiThemeContext, 'xs')};
    `,
    // Positions
    top: css`
      animation: ${euiToolTipAnimationVertical(`-${euiTheme.size.base}`)}
        ${animationTiming};
    `,
    bottom: css`
      animation: ${euiToolTipAnimationVertical(euiTheme.size.base)}
        ${animationTiming};

      [class*='euiToolTip__arrow'] {
        transform: translateY(${arrowMinusSize}) rotateZ(45deg); /* 1 */
      }
    `,
    left: css`
      animation: ${euiToolTipAnimationHorizontal(`-${euiTheme.size.base}`)}
        ${animationTiming};

      [class*='euiToolTip__arrow'] {
        transform: translateX(${arrowPlusSize}) rotateZ(45deg); /* 1 */
      }
    `,
    right: css`
      animation: ${euiToolTipAnimationHorizontal(euiTheme.size.base)}
        ${animationTiming};

      [class*='euiToolTip__arrow'] {
        transform: translateX(${arrowMinusSize}) rotateZ(45deg); /* 1 */
      }
    `,
    // Elements
    euiToolTip__arrow: css`
      content: '';
      position: absolute;
      transform-origin: center;
      border-radius: 2px;
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      ${logicalSizeCSS(arrowSize, arrowSize)};
      transform: translateY(${arrowPlusSize}) rotateZ(45deg); /* 1 */
    `,
  };
};

export const euiToolTipPopoverStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => ({
  // Elements
  euiToolTip__title: css`
    font-weight: ${euiTheme.font.weight.bold};
    ${logicalCSS(
      'border-bottom',
      `solid ${euiTheme.border.width.thin} ${euiToolTipBorderColor(
        euiTheme,
        colorMode
      )}`
    )};
    ${logicalCSS('padding-bottom', euiTheme.size.xs)};
    ${logicalCSS('margin-bottom', euiTheme.size.xs)};
  `,
});

export const euiToolTipAnchorStyles = () => ({
  // Elements
  euiToolTipAnchor: css`
    // disabled elements don't fire mouse events which means leaving a disabled element
    // wouldn't trigger the onMouseOut and hide the tooltip; disabling pointer events
    // on disabled elements means any mouse events remain handled by parent elements
    // https://jakearchibald.com/2017/events-and-disabled-form-fields/
    *[disabled] {
      pointer-events: none;
    }
  `,
  // Variants
  block: css`
    display: block;
  `,
  inlineBlock: css`
    display: inline-block; ;
  `,
});
