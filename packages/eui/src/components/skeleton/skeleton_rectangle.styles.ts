/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';

import { euiSkeletonGradientAnimation } from './utils';

export const euiSkeletonRectangleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonRectangle: css`
      display: block;
      ${euiSkeletonGradientAnimation(euiThemeContext, {
        slideSize: '-75%',
        gradientSize: '400%',
      })}
      ${preventForcedColors(euiThemeContext)}
    `,
    // Border radius
    s: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
    none: css`
      border-radius: 0;
    `,
  };
};
