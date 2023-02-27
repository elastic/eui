/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const euiBadgeGroupStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiBadgeGroup: css`
      display: inline-flex;
      flex-wrap: wrap;
      ${logicalCSS('max-width', '100%')}

      // Override the .euiBadge + .euiBadge CSS in badge.styles.ts
      .euiBadge + .euiBadge {
        ${logicalCSS('margin-left', 0)}
      }
    `,
    // Gutter sizes
    none: css``,
    s: css`
      gap: ${euiTheme.size.s};
    `,
    xs: css`
      gap: ${euiTheme.size.xs};
    `,
  };
};
