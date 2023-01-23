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
import { euiTitle } from '../title/title.styles';

export const euiSkeletonTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const gradientStartStop =
    euiThemeContext.colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiThemeContext.euiTheme.colors.lightShade, 0.12)
      : tint(euiThemeContext.euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
    euiThemeContext.colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiThemeContext.euiTheme.colors.lightShade, 0.24)
      : tint(euiThemeContext.euiTheme.colors.lightShade, 0.8);

  return {
    euiSkeleton__title: css`
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
          animation: ${euiAnimSkeletonGradient} 1.5s
            ${euiThemeContext.euiTheme.animation.resistance} infinite;
        }
      }
    `,
    // Sizes
    l: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'l').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
    m: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'm').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
    s: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 's').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
    xs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xs').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
    xxs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xxs').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
    xxxs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xxxs').lineHeight)};
      border-radius: ${euiThemeContext.euiTheme.border.radius.medium};
      ${logicalCSS('width', '45%')};
    `,
  };
};
