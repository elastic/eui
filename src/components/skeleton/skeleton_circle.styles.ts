/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

import { euiSkeletonGradientAnimation } from './_skeleton';

export const euiSkeletonCircleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonCircle: css`
      display: block;
      ${euiSkeletonGradientAnimation(euiThemeContext, {
        slideSize: '-70%',
        gradientSize: '280%',
      })}
    `,
    // Sizes
    s: css`
      ${logicalCSS('width', euiTheme.size.l)};
      ${logicalCSS('height', euiTheme.size.l)};
      border-radius: 50%;
    `,
    m: css`
      ${logicalCSS('width', euiTheme.size.xl)};
      ${logicalCSS('height', euiTheme.size.xl)};
      border-radius: 50%;
    `,
    l: css`
      ${logicalCSS('width', euiTheme.size.xxl)};
      ${logicalCSS('height', euiTheme.size.xxl)};
      border-radius: 50%;
    `,
    xl: css`
      ${logicalCSS('width', `calc(${euiTheme.size.base} * 4)`)};
      ${logicalCSS('height', `calc(${euiTheme.size.base} * 4)`)};
      border-radius: 50%;
    `,
  };
};
