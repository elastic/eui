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

export const euiDataGridToolbarStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiDataGrid__controls: css`
      z-index: 2; /* Needs to sit above the content below it */
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${euiTheme.size.base};
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      background-color: ${euiTheme.colors.emptyShade};
    `,
    euiDataGrid__rightControls: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      column-gap: ${euiTheme.size.s};
      ${logicalCSS('padding-right', euiTheme.size.xs)}

      /* Keep this right-aligned if hasRoomForGridControls is hiding dataControls */
      &:only-child {
        ${logicalCSS('margin-left', 'auto')}
      }
    `,
    euiDataGrid__leftControls: css`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${euiTheme.size.xxs};
    `,
  };
};
