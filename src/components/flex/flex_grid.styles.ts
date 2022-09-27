/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

// Note: the only way to get column direction working with `display: grid`
// the same way `display: flex` works is to manually set `grid-template-rows`,
// calculated based on the number of children in the grid
export const euiFlexGridStyles = (
  euiThemeContext: UseEuiTheme,
  gridTemplateRows = 0
) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlexGrid: css`
      display: grid;
    `,
    responsive: css`
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        grid-template-columns: repeat(1, 1fr);
        grid-auto-flow: row;
      }
    `,
    direction: {
      row: css``,
      column: css`
        grid-auto-flow: column;
        grid-template-rows: repeat(${gridTemplateRows}, 1fr);
      `,
    },
    columnCount: {
      '1': css`
        grid-template-columns: repeat(1, 1fr);
      `,
      '2': css`
        grid-template-columns: repeat(2, 1fr);
      `,
      '3': css`
        grid-template-columns: repeat(3, 1fr);
      `,
      '4': css`
        grid-template-columns: repeat(4, 1fr);
      `,
    },
    // It's basically not a grid at all with zero columns.
    // Honestly, I'm not totally sure what the use case is for this
    zeroColumns: {
      noColumns: css`
        display: flex;
        flex-wrap: wrap;

        & > .euiFlexItem {
          flex-grow: 0;
        }
      `,
      responsive: css`
        ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
          & > .euiFlexItem {
            flex-basis: 100%;
          }
        }
      `,
    },
    gutterSizes: {
      none: css``,
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
        gap: ${euiTheme.size.xl};
      `,
    },
  };
};
