/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiYScroll, logicalCSS, mathWithUnits } from '../../../global_styling';

export const euiDataGridKeyboardShortcutsStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDataGrid__keyboardShortcuts: css`
      ${logicalCSS('max-height', '80vh')}
      ${logicalCSS(
        'max-width',
        mathWithUnits(euiTheme.size.xxl, (x) => x * 10)
      )}
      padding: ${euiTheme.size.m};
      ${euiYScroll(euiThemeContext)}

      .euiDescriptionList {
        row-gap: 0; /* Row spacing handled by default EuiText dd/dt styles */
      }
    `,
  };
};
