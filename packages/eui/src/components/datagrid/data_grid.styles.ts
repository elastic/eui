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

      /* Note: Several Kibana custom renderers are using the .euiDataGridRow classes
       * directly for styles, hence why we're defining it here as opposed to applying
       * it directly on the row element via Emotion. However, we also need to use
       * :where to reduce specificity / allow easier overrides via rowClasses */

      *:where(& .euiDataGridRow) {
        background-color: ${euiTheme.colors.emptyShade};
      }

      *:where(&.euiDataGrid--stripes .euiDataGridRow--striped) {
        background-color: ${euiTheme.colors.lightestShade};
      }

      *:where(&.euiDataGrid--rowHoverHighlight .euiDataGridRow:hover) {
        background-color: ${euiTheme.colors.highlight};
      }
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
