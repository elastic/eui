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

import { euiDataGridVariables } from '../../data_grid.styles';

export const euiDataGridHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { levels } = euiDataGridVariables(euiThemeContext);

  return {
    euiDataGridHeader: css`
      z-index: ${levels.stickyHeader};
      position: sticky;
      ${logicalCSS('top', 0)}
      ${logicalCSS('width', 'fit-content')}
      display: flex;
    `,
    euiDataGridHeaderDroppable: css`
      display: flex;
      ${logicalCSS('width', '100%')}

      &:not(:first-child)
        .euiDataGridHeaderCellDraggable:first-of-type
        .euiDataGridHeaderCell {
        ${logicalCSS('border-left', 'none')}
      }

      .euiDataGridHeaderCellDraggable:not(:first-of-type)
        .euiDataGridHeaderCell {
        ${logicalCSS('border-left', 'none')}
      }
    `,
    underline: css`
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS(
        'border-bottom',
        `${euiTheme.border.width.thick} solid ${euiTheme.colors.text}`
      )}
    `,
    shade: css`
      background-color: ${euiTheme.colors.lightestShade};

      // ensure correct background on drag
      .euiDataGridHeaderCellDraggable .euiDataGridHeaderCell {
        background-color: ${euiTheme.colors.lightestShade};
      }
    `,
  };
};
