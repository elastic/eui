/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate, logicalCSS, _FontScaleOptions } from '../../global_styling';
import { COLOR_MODES_STANDARD, shade, tint, UseEuiTheme } from '../../services';

const skeletonGradient = keyframes`
  0% {
    transform: translateX(-53%);
  }

  100% {
    transform: translateX(0);
  }
`;

export const euiSkeletonHeadingStyles = (
  euiThemeContext: UseEuiTheme,
) => {
  const gradientStartStop =
  euiThemeContext.colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiThemeContext.euiTheme.colors.lightShade, 0.12)
      : tint(euiThemeContext.euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
  euiThemeContext.colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiThemeContext.euiTheme.colors.lightShade, 0.24)
      : tint(euiThemeContext.euiTheme.colors.lightShade, 0.8);

  const skeletonHeadingSizes = {
    h1: '2.4286rem',
    h2: '1.9286rem',
    h3: '1.5714rem',
    h4: '1.1429rem',
    h5: '1rem',
    h6: '0.8571rem',
  }

  return {
    euiSkeleton__heading: css`
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
          animation: ${skeletonGradient} 1.5s
            ${euiThemeContext.euiTheme.animation.resistance} infinite;
        }
      }
    `,
    // Sizes
    h1: css`
      height: ${skeletonHeadingSizes.h1};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `,
    h2: css`
      height: ${skeletonHeadingSizes.h2};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `,
    h3: css`
      height: ${skeletonHeadingSizes.h3};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `,
    h4: css`
      height: ${skeletonHeadingSizes.h4};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `,
    h5: css`
      height: ${skeletonHeadingSizes.h5};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `,
    h6: css`
      height: ${skeletonHeadingSizes.h6};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      width: 45%;
    `
  };
};
