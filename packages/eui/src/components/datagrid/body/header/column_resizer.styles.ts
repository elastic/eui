/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS, mathWithUnits } from '../../../../global_styling';

// Resizer straddles the column border and is an invisible hitzone for dragging
export const euiDataGridColumnResizerStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const clickableWidth = euiTheme.size.base;
  const positionOffset = mathWithUnits(clickableWidth, (x) => x / -2);

  const indicatorWidth = mathWithUnits(
    [euiTheme.border.width.thin, euiTheme.border.width.thick],
    (x, y) => x + y
  ); // Odd number because it straddles a border
  const indicatorOffset = `-${euiTheme.border.width.thin}`;

  return {
    euiDataGridColumnResizer: css`
      z-index: 2; /* Needs to be a level above the cells themselves in case of overlaps */
      position: absolute;
      ${logicalCSS('vertical', 0)}
      ${logicalCSS('right', positionOffset)}
      cursor: ew-resize;
      opacity: 0;

      &:hover,
      &:active {
        opacity: 1;
      }

      /* Center a vertical line within the button above */
      &::after {
        content: '';
        position: absolute;
        ${logicalCSS('vertical', 0)}
        ${logicalCSS('left', positionOffset)}
        ${logicalCSS('margin-left', indicatorOffset)}
        ${logicalCSS('width', indicatorWidth)}
        background-color: ${euiTheme.colors.primary};
      }
    `,
    /* Because the resizer sits in the negative space to the right of the column,
     * it can cause the full grid to be a few pixels longer than it actually is.
     * So for the last cell, we don't use negative positioning and the borders from
     * the cell will match the container. */
    isLastColumn: css`
      ${logicalCSS('right', 0)}
      ${logicalCSS('width', euiTheme.size.s)}

      &::after {
        ${logicalCSS('left', 'auto')}
        ${logicalCSS('right', 0)}
      }
    `,
    isDragging: css`
      opacity: 1;
    `,
  };
};
