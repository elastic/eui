/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

import { euiSkeletonGradientAnimation, _highContrastFallback } from './utils';

export const euiSkeletonRectangleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonRectangle: css`
      display: block;
      ${euiSkeletonGradientAnimation(euiThemeContext, {
        slideSize: '-75%',
        gradientSize: '350%',
      })}
    `,
    // Border radius
    s: css`
      border-radius: ${euiTheme.border.radius.small};
      ${_highContrastFallback(euiThemeContext)}
    `,
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
      ${_highContrastFallback(euiThemeContext, {
        borderRadius: euiTheme.border.radius.medium,
      })}
    `,
    none: css`
      border-radius: 0;
      ${_highContrastFallback(euiThemeContext, { borderRadius: 0 })}
    `,
  };
};
