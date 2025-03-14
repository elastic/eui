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

export const euiDataGridFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { levels } = euiDataGridVariables(euiThemeContext);

  return {
    euiDataGridFooter: css`
      display: flex;
      ${logicalCSS('width', 'fit-content')}
      background-color: ${euiTheme.colors.emptyShade};
    `,
    sticky: css`
      z-index: ${levels.stickyHeader}; /* Should sit above content and cell actions */
      position: sticky;
      ${logicalCSS('bottom', 0)}
    `,
    overline: css`
      ${logicalCSS(
        'border-top',
        `${euiTheme.border.width.thick} solid ${euiTheme.colors.textParagraph}`
      )}
    `,
    shade: css`
      background-color: ${euiTheme.colors.lightestShade};
    `,
    striped: css`
      .euiDataGrid--stripes & {
        background-color: ${euiTheme.colors.lightestShade};
      }
    `,

    euiDataGridFooterCell: css`
      flex: 0 0 auto;
      font-weight: ${euiTheme.font.weight.bold};
    `,
  };
};
