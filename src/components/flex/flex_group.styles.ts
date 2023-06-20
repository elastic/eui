/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiMaxBreakpoint, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiFlexGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlexGroup: css`
      display: flex;
      align-items: stretch;
      flex-grow: 1; /* Grow nested flex-groups by default */
    `,
    responsive: css`
      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        flex-wrap: wrap;

        & > .euiFlexItem {
          ${logicalCSS('width', '100%')}
          flex-basis: 100%;
        }
      }
    `,
    wrap: css`
      flex-wrap: wrap;
    `,
    gutterSizes: {
      none: css``,
      xs: css`
        gap: ${euiTheme.size.xs};
      `,
      s: css`
        gap: ${euiTheme.size.s};
      `,
      m: css`
        gap: ${euiTheme.size.m};
      `,
      l: css`
        gap: ${euiTheme.size.l};
      `,
      xl: css`
        gap: ${euiTheme.size.xxl};
      `,
    },
    justifyContent: {
      flexStart: css`
        justify-content: flex-start;
      `,
      flexEnd: css`
        justify-content: flex-end;
      `,
      spaceEvenly: css`
        justify-content: space-evenly;
      `,
      spaceBetween: css`
        justify-content: space-between;
      `,
      spaceAround: css`
        justify-content: space-around;
      `,
      center: css`
        justify-content: center;
      `,
    },
    alignItems: {
      stretch: css`
        align-items: stretch;
      `,
      flexStart: css`
        align-items: flex-start;
      `,
      flexEnd: css`
        align-items: flex-end;
      `,
      center: css`
        align-items: center;
      `,
      baseline: css`
        align-items: baseline;
      `,
    },
    direction: {
      row: css`
        flex-direction: row;
      `,
      rowReverse: css`
        flex-direction: row-reverse;
      `,
      column: css`
        flex-direction: column;
      `,
      columnReverse: css`
        flex-direction: column-reverse;
      `,
    },
  };
};
