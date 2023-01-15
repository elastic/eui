/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiCanAnimate, logicalCSS } from '../../global_styling';
import { euiAnimSkeletonGradient } from '../../global_styling/utility/animations';
import { COLOR_MODES_STANDARD, shade, tint, UseEuiTheme } from '../../services';

export const euiSkeletonItemStyles = (
  { euiTheme, colorMode }: UseEuiTheme,
  propsWidth?: string,
  propsHeight?: string
) => {
  const gradientStartStop =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.12)
      : tint(euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.24)
      : tint(euiTheme.colors.lightShade, 0.8);

  return {
    euiSkeleton__item: css`
      display: block;
      background: ${gradientStartStop};
      overflow: hidden;

      ${logicalCSS('width', propsWidth)};
      ${logicalCSS('height', propsHeight)};

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
          animation: ${euiAnimSkeletonGradient} 1.5s
            ${euiTheme.animation.resistance} infinite;
        }
      }
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
    none: css`
      border-radius: none;
    `,
  };
};
