/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { euiMaxBreakpoint, logicalCSS } from '../../../../global_styling';
import { euiFormVariables } from '../../../form/form.styles';

export const euiDatePopoverContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { maxWidth } = euiFormVariables(euiThemeContext);

  return {
    euiDatePopoverContent: css`
      &,
      & .react-datepicker {
        ${logicalCSS('width', maxWidth)}
        ${logicalCSS('max-width', '100%')}

      ${euiMaxBreakpoint(euiThemeContext, 's')} {
          ${logicalCSS('width', '284px')}
        }
      }
    `,
  };
};
