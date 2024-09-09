/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormMaxWidth } from '../form/form.styles';

export const euiListGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  return {
    // Base
    euiListGroup: css`
      display: flex;
      flex-direction: column;
    `,
    // Variants
    flush: css`
      padding: 0;
      border: none;

      /* Override the default border radius */
      .euiListGroupItem {
        border-radius: 0;
      }
    `,
    bordered: css`
      border-radius: ${euiTheme.border.radius.medium};
      border: ${euiTheme.border.thin};
    `,
    maxWidthDefault: css`
      ${logicalCSS('max-width', formMaxWidth)}
    `,
    // Gutter sizes
    none: css``,
    s: css`
      padding: ${euiTheme.size.s};
      gap: ${euiTheme.size.s};
    `,
    m: css`
      padding: ${euiTheme.size.base};
      gap: ${euiTheme.size.base};
    `,
  };
};
