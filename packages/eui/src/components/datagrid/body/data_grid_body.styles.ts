/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiScrollBarStyles, logicalSizeCSS } from '../../../global_styling';

export const euiDataGridBodyStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiDataGridBody: css`
      ${euiScrollBarStyles(euiThemeContext)}
    `,
    virtualized: css`
      scroll-padding: 0;
    `,
    customRender: css`
      ${logicalSizeCSS('100%')}
      overflow: auto;
    `,
  };
};
