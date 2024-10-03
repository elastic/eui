/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS } from '../../../../global_styling';

import {
  euiDataGridCellOutlineStyles,
  euiDataGridCellOutlineSelectors,
} from '../cell/data_grid_cell.styles';

/**
 * Styles that apply to both control and non-control columns
 */
export const euiDataGridHeaderCellWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const { focusStyles, hoverStyles } =
    euiDataGridCellOutlineStyles(euiThemeContext);
  const { header: outlineSelectors } = euiDataGridCellOutlineSelectors();

  return {
    euiDataGridHeaderCell: css`
      position: relative; /* Needed for cell outline */
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      font-weight: ${euiTheme.font.weight.bold};

      ${outlineSelectors.focus} {
        ${focusStyles}
      }

      ${outlineSelectors.focusTrapped} {
        ${hoverStyles}
      }

      ${outlineSelectors.showActions} {
        &,
        & > [data-focus-lock-disabled] {
          gap: ${euiTheme.size.xxs};
        }
      }

      /* Workaround for focus trap */
      & > [data-focus-lock-disabled] {
        display: flex;
        align-items: center;
        ${logicalCSS('width', '100%')}
      }
    `,
  };
};
