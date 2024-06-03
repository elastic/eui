/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, shade, tint } from '../../services';
import { euiCanAnimate, logicalCSS } from '../../global_styling';
import { euiAnimSlideX } from '../../global_styling/utility/animations';

type AnimationOptions = {
  slideSize?: string;
  gradientSize?: string;
};

export const euiSkeletonGradientAnimation = (
  { euiTheme, colorMode }: UseEuiTheme,
  { slideSize = '-53%', gradientSize = '220%' }: AnimationOptions = {}
) => {
  const gradientStartStop =
    colorMode === 'DARK'
      ? shade(euiTheme.colors.lightShade, 0.12)
      : tint(euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
    colorMode === 'DARK'
      ? shade(euiTheme.colors.lightShade, 0.24)
      : tint(euiTheme.colors.lightShade, 0.8);

  return css`
    background-color: ${gradientStartStop};

    ${euiCanAnimate} {
      overflow: hidden;
      isolation: isolate; // This is unfortunately necessary workaround that forces Safari to correctly respect border-radius

      &::after {
        content: '';
        display: block;
        ${logicalCSS('width', gradientSize)}
        ${logicalCSS('height', '100%')}
        background: linear-gradient(
          137deg,
          ${gradientStartStop} 45%,
          ${gradientMiddle} 50%,
          ${gradientStartStop} 55%
        );
        animation: ${euiAnimSlideX(slideSize)} 1.5s
          ${euiTheme.animation.resistance} infinite;
      }
    }
  `;
};
