/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiDataGridPaginationStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiDataGrid__pagination: css`
    z-index: 2; /* Sits above the content above it */
    flex-grow: 0;
    ${logicalCSS('padding-top', euiTheme.size.xs)}

    .euiDataGrid--fullScreen & {
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}
      background-color: ${euiTheme.colors.lightestShade};

      /* Use box-shadow instead of border-top to avoid duplicating the border-bottom on grid cells */
      box-shadow: ${euiTheme.border.width.thin} 0 0
        ${euiTheme.border.width.thin} ${euiTheme.border.color};
    }
  `,
});
