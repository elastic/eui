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

import { euiTableVariables } from './table.styles';

export const euiTableCellCheckboxStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { cellContentPadding, mobileSizes, checkboxSize } =
    euiTableVariables(euiThemeContext);

  const sharedCheckboxStyles = `
    ${logicalCSS('width', checkboxSize)}
    vertical-align: middle;
  `;

  return {
    euiTableHeaderCellCheckbox: css`
      ${sharedCheckboxStyles}
    `,
    euiTableRowCellCheckbox: css`
      ${sharedCheckboxStyles}
    `,
    desktop: css`
      ${logicalCSS('border-vertical', euiTheme.border.thin)}
    `,
    mobile: css`
      position: absolute;
      ${logicalCSS('top', cellContentPadding)}
      ${logicalCSS('left', mobileSizes.checkbox.offset)}
    `,
  };
};
