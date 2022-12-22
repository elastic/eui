/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate, logicalCSS } from '../../global_styling';
import { COLOR_MODES_STANDARD, shade, tint, UseEuiTheme } from '../../services';

const loadingContentGradient = keyframes`
  0% {
    transform: translateX(-53%);
  }

  100% {
    transform: translateX(0);
  }
`;

export const euiSkeletonItemStyles = (
  { euiTheme, colorMode }: UseEuiTheme,
  propsHeight?: string,
  propsWidth?: string,
  squared?: boolean,
) => {
  const gradientStartStop =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.12)
      : tint(euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.24)
      : tint(euiTheme.colors.lightShade, 0.8);

      console.log('ITEM', squared, propsHeight, propsWidth)

  return {
    euiSkeleton__item: css`
      display: block;
      background: ${gradientStartStop};
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        ${logicalCSS('width', '220%')}
        ${logicalCSS('height', '100%')}
        background: linear-gradient(
          137deg,
          ${gradientStartStop} 45%,
          ${gradientMiddle} 50%,
          ${gradientStartStop} 55%
        );

        ${euiCanAnimate} {
          animation: ${loadingContentGradient} 1.5s
            ${euiTheme.animation.resistance} infinite;
        }
      }
    `,
    // Sizes
    s: css`
      ${logicalCSS('height', euiTheme.size.l)};
      ${logicalCSS('width', `calc(${euiTheme.size.l} * ${squared ? 1 : 3})`)};
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      ${logicalCSS('height', euiTheme.size.xl)};
      ${logicalCSS('width', `calc(${euiTheme.size.xl} * ${squared ? 1 : 2})`)};
      border-radius: ${euiTheme.border.radius.medium};
    `,
    l: css`
      ${logicalCSS('height', euiTheme.size.xxl)};
      ${logicalCSS('width', `calc(${euiTheme.size.xxl} * ${squared ? 1 : 2})`)};
      border-radius: ${euiTheme.border.radius.medium};
    `,
    xl: css`
      ${logicalCSS('height', `calc(${euiTheme.size.base} * 4)`)};
      ${logicalCSS('width', `calc(${euiTheme.size.base} * ${squared ? 4 : 8})`)};
      border-radius: ${euiTheme.border.radius.medium};
    `,
    customSize: css`
      width: ${propsWidth};
      height: ${propsHeight};
      border-radius: ${euiTheme.border.radius.medium};
    `,
  };
};

// xxs: "2px"
// xs: "4px"
// s: "8px"
// m: "12px"
// xl: "16px"
// l: "24px"
// xl: "32px"
// xxl: "40px"
// xxxl: "48px"
// xxxxl: "64px"
