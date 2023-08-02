/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

export const euiCollapsibleNavBetaStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCollapsibleNavBeta: css`
      .euiFlyoutFooter {
        background-color: ${euiTheme.colors.emptyShade};
        ${logicalCSS('border-top', euiTheme.border.thin)}
      }
    `,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
    `,
    right: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
    `,
    isSmallestScreen: css`
      /* Override EuiFlyout's max-width */
      &.euiFlyout {
        ${logicalCSS('max-width', '100% !important')}
      }
    `,
  };
};
