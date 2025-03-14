/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalSizeCSS, mathWithUnits } from '../../global_styling';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';

import { euiSkeletonGradientAnimation } from './utils';

export const euiSkeletonCircleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonCircle: css`
      display: block;
      border-radius: 50%;
      ${euiSkeletonGradientAnimation(euiThemeContext, {
        slideSize: '-70%',
        gradientSize: '350%',
      })}
      ${preventForcedColors(euiThemeContext)}
    `,
    // Sizes
    s: css`
      ${logicalSizeCSS(euiTheme.size.l)}
    `,
    m: css`
      ${logicalSizeCSS(euiTheme.size.xl)}
    `,
    l: css`
      ${logicalSizeCSS(euiTheme.size.xxl)}
    `,
    xl: css`
      ${logicalSizeCSS(mathWithUnits(euiTheme.size.base, (x) => x * 4))}
    `,
  };
};
