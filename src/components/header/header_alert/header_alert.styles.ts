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

export const euiHeaderAlertStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiHeaderAlert: css`
      position: relative;
      ${logicalCSS('min-width', '300px')}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', euiTheme.size.l)}
        ${logicalCSS('padding-bottom', euiTheme.size.l)}
        ${logicalCSS('border-bottom', euiTheme.border.thin)}
      }
    `,
  };
};
