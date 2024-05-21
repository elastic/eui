/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiPageTopBarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiPageTopBar: css`
      /* -1 makes the bar sit below serverless nav shadows */
      z-index: ${Number(euiTheme.levels.header) - 1};
      position: sticky;
      ${logicalCSS('top', 'var(--euiFixedHeadersOffset, 0)')}
      ${logicalCSS('horizontal', 0)}
    `,
    // Deliberately skipping css`` on the this to avoid an extra Emotion className
    unpanelled: `
      background-color: ${euiTheme.colors.body};
    `,
    panelled: css`
      background-color: ${euiTheme.colors.emptyShade};
    `,
    bordered: css`
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
    `,

    euiPageTopBar__content: css`
      display: flex;
      align-items: center;
    `,
    align: {
      left: css`
        justify-content: flex-start;
      `,
      right: css`
        justify-content: flex-end;
      `,
      center: css`
        justify-content: center;
      `,
    },
    sizes: {
      none: null,
      xs: css`
        gap: ${euiTheme.size.xs};
        padding-block: 0;
      `,
      s: css`
        gap: ${euiTheme.size.s};
        padding-block: ${euiTheme.size.xxs};
      `,
      m: css`
        gap: ${euiTheme.size.m};
        padding-block: ${euiTheme.size.xs};
      `,
      l: css`
        gap: ${euiTheme.size.l};
        padding-block: ${euiTheme.size.s};
      `,
      xl: css`
        gap: ${euiTheme.size.xl};
        padding-block: ${euiTheme.size.m};
      `,
    },
  };
};
