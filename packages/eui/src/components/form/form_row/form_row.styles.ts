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
import { euiFormVariables } from '../form.styles';

export const euiFormRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { maxWidth } = euiFormVariables(euiThemeContext);

  return {
    euiFormRow: css`
      /* Coerce inline form elements to behave as block-level elements */
      display: flex;

      + .euiFormRow,
      + .euiButton {
        ${logicalCSS('margin-top', euiTheme.size.base)}
      }
    `,
    // Skip css`` to avoid generating an Emotion className
    formWidth: `
      ${logicalCSS('max-width', maxWidth)}
    `,
    fullWidth: css`
      ${logicalCSS('max-width', '100%')}
    `,
  };
};
