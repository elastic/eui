/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/css';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiDataGridFullScreenStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const fullScreenZIndex = Number(euiTheme.levels.header) - 2;

  return {
    'euiDataGrid--fullScreen': css`
      z-index: ${fullScreenZIndex};
      position: fixed;
      inset: 0;
      background-color: ${euiTheme.colors.emptyShade};
    `,
    // This is a vanilla className applied to the <body> when fullscreen is enabled.
    // It removes extra scrollbars + tweaks components to account for fixed headers
    euiDataGrid__restrictBody: css`
      ${logicalCSS('height', '100vh')}
      overflow: hidden;

      .euiHeader[data-fixed-header] {
        /* !important needed to override header inline styles */
        /* stylelint-disable-next-line declaration-no-important */
        z-index: ${fullScreenZIndex - 1} !important;
      }

      .euiOverlayMask[data-relative-to-header='below'] {
        ${logicalCSS('top', '0')}
      }

      .euiFlyout {
        ${logicalCSS('top', '0')}
        ${logicalCSS('height', '100%')}
      }
    `,
  };
};
