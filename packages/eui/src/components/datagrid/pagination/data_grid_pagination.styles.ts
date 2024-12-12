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

export const euiDataGridPaginationStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiDataGrid__pagination: css`
    z-index: 2; /* Sits above the content above it */
    flex-grow: 0;
    ${logicalCSS('padding-top', euiTheme.size.xs)}

    .euiDataGrid--fullScreen & {
      position: relative;
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}
      background-color: ${euiTheme.colors.lightestShade};

      /* Use a pseudo element instead of:
       * 1. border-top directly on the element, to avoid duplicating the border-bottom on grid cells
       * 2. box-shadow, so that the border renders on Windows high contrast themes
       */
      &::before {
        content: '';
        position: absolute;
        ${logicalCSS('top', `-${euiTheme.border.width.thin}`)}
        ${logicalCSS('horizontal', 0)}
        ${logicalCSS('border-top', euiTheme.border.thin)}
        pointer-events: none;
      }
    }
  `,
});
