/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

import { euiSkeletonGradientAnimation } from './utils';

export const euiSkeletonTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonTitle: css`
      display: block;
      ${logicalCSS('width', '45%')}
      border-radius: ${euiTheme.border.radius.medium};
      ${euiSkeletonGradientAnimation(euiThemeContext)}
      ${preventForcedColors(euiThemeContext)}
    `,
    // Sizes
    l: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'l').lineHeight)}
    `,
    m: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'm').lineHeight)}
    `,
    s: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 's').lineHeight)}
    `,
    xs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xs').lineHeight)}
    `,
    xxs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xxs').lineHeight)}
    `,
    xxxs: css`
      ${logicalCSS('height', euiTitle(euiThemeContext, 'xxxs').lineHeight)}
      border-radius: ${euiTheme.border.radius.small};
    `,
  };
};
