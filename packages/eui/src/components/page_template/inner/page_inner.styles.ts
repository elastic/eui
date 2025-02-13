/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const euiPageInnerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiPageInner: css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      flex: 1 1 100%;
      /* Make sure that inner flex layouts don't get larger than this container */
      ${logicalCSS('max-width', '100%')}
      ${logicalCSS('min-width', '0')}
    `,

    panelled: css`
      background: ${euiThemeContext.euiTheme.colors.backgroundBasePlain};
      ${euiShadow(euiThemeContext, 'm')}
    `,

    border: {
      top: css`
        ${logicalCSS('border-top', euiTheme.border.thin)}
      `,

      left: css`
        ${logicalCSS('border-left', euiTheme.border.thin)}
      `,
    },
  };
};
