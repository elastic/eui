/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  euiCanAnimate,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { euiAnimSkeletonGradient } from '../../global_styling/utility/animations';
import { COLOR_MODES_STANDARD, shade, tint, UseEuiTheme } from '../../services';

const calculateLineSize = (
  euiThemeContext: UseEuiTheme,
  size: 'xs' | 's' | 'm'
) => {
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 'm', {
    customScale: size,
  });

  return `
    ${logicalCSS('height', fontSize)}
    ${logicalCSS(
      'margin-top',
      mathWithUnits([lineHeight, fontSize], (x, y) => x - y)
    )}
  `;
};

export const euiSkeletonCommonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  const gradientStartStop =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.12)
      : tint(euiTheme.colors.lightShade, 0.65);
  const gradientMiddle =
    colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightShade, 0.24)
      : tint(euiTheme.colors.lightShade, 0.8);

  return {
    euiSkeletonText: css`
      display: block;
      ${logicalCSS('width', '100%')}
      border-radius: ${euiTheme.border.radius.medium};
      background: ${gradientStartStop};
      overflow: hidden;

      // Offset via transform to more closely match placement of text
      transform: translateY(-25%);

      &:last-child:not(:only-child) {
        ${logicalCSS('width', '75%')}
      }

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
    // Sizes
    m: css`
      ${calculateLineSize(euiThemeContext, 'm')}
    `,
    s: css`
      ${calculateLineSize(euiThemeContext, 's')}
    `,
    xs: css`
      ${calculateLineSize(euiThemeContext, 'xs')}
    `,
    relative: css`
      ${logicalCSS('height', '1em')}
      ${logicalCSS('margin-top', '0.5em')}
    `,
  };
};
