/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, logicalSizeCSS } from '../../global_styling';

export const euiDataGridStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDataGrid: css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      ${logicalCSS('height', '100%')}
      overflow: hidden;
    `,
    // Sits below the controls above it and pagination below it
    euiDataGrid__content: css`
      z-index: 1;
      position: relative;
      flex-grow: 1;
      ${logicalSizeCSS('100%')}
      ${logicalCSS('max-width', '100%')}
      overflow: hidden;
      background-color: ${euiTheme.colors.body};
      font-feature-settings: 'tnum' 1; /* Tabular numbers */
    `,
    // Wrapper around EuiDataGrid
    euiDataGrid__focusWrap: css`
      ${logicalCSS('height', '100%')}
    `,
  };
};
