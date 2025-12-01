/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiMinBreakpoint, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiPageStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiPage: css`
      display: flex;
      /* Ensure Safari doesn't shrink height beyond contents */
      flex-shrink: 0;
      /* Ensure Firefox doesn't expand width beyond bounds */
      ${logicalCSS('max-width', '100%')}
    `,

    // Grow
    grow: css`
      flex-grow: 1;
    `,

    // Direction
    column: css`
      flex-direction: column;
    `,

    row: css`
      flex-direction: column;

      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        flex-direction: row;
      }
    `,

    // Max widths
    restrictWidth: css`
      ${logicalCSS('margin-horizontal', 'auto')}
    `,
  };
};
