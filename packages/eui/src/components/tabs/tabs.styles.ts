/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, logicalCSSWithFallback } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiTabsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  return {
    euiTabs: css`
      display: flex;
      ${logicalCSS('max-width', '100%')}
      ${logicalCSSWithFallback('overflow-x', 'auto')}
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      position: relative;
      flex-shrink: 0;
    `,
    bottomBorder: !highContrastMode
      ? // By default, uses an inset box shadow to not increase/affect height
        css`
          box-shadow: inset 0 -${euiTheme.border.width.thin} 0 ${euiTheme.border.color};
        `
      : // However, Windows high contrast themes ignores box-shadow and only respects border-bottom
        css(logicalCSS('border-bottom', euiTheme.border.thin)),

    // sizes
    s: css`
      gap: ${euiTheme.size.m};
    `,
    m: css`
      gap: ${euiTheme.size.base};
    `,
    l: css`
      gap: ${euiTheme.size.l};
    `,
    xl: css`
      gap: ${euiTheme.size.xl};
    `,
  };
};
