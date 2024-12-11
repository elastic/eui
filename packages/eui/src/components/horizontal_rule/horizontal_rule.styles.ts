/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';

export const euiHorizontalRuleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiHorizontalRule: css`
      border: none;
      ${highContrastModeStyles(euiThemeContext, {
        none: `
          ${logicalCSS('height', euiTheme.border.width.thin)}
          background-color: ${euiTheme.border.color};
        `,
        // Windows high contrast themes ignore background colors
        forced: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
      /* Ensure when used in flex group, it retains its size */
      flex-shrink: 0;
      flex-grow: 0;
    `,

    // Sizes
    full: css`
      ${logicalCSS('width', '100%')}
    `,
    half: css`
      ${logicalCSS('width', '50%')}
      ${logicalCSS('margin-horizontal', 'auto')}
    `,
    quarter: css`
      ${logicalCSS('width', '25%')}
      ${logicalCSS('margin-horizontal', 'auto')}
    `,

    // Margins
    none: '',
    xs: css`
      margin-block: ${euiTheme.size.s};
    `,
    s: css`
      margin-block: ${euiTheme.size.m};
    `,
    m: css`
      margin-block: ${euiTheme.size.base};
    `,
    l: css`
      margin-block: ${euiTheme.size.l};
    `,
    xl: css`
      margin-block: ${euiTheme.size.xl};
    `,
    xxl: css`
      margin-block: ${euiTheme.size.xxl};
    `,
  };
};
