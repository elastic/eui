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
import { euiTitle } from '../title/title.styles';

import { euiSkeletonGradientAnimation } from './utils';

export const euiSkeletonTitleStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiSkeletonTitle: css`
      display: block;
      ${euiSkeletonGradientAnimation(euiThemeContext)}
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
