/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiFontSize, euiNumberFormat, logicalCSS } from '../../global_styling';

export const euiTableStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTable: css`
      ${euiFontSize(euiThemeContext, 's')}
      ${euiNumberFormat(euiThemeContext)}

      ${logicalCSS('width', '100%')}
      border: none;
      border-collapse: collapse;
      background-color: ${euiTheme.colors.emptyShade};
    `,
    layout: {
      fixed: css`
        table-layout: fixed;
      `,
      auto: css`
        table-layout: auto;
      `,
    },
  };
};

// The table caption needs to not be absolutely positioned, because for some reason
// it causes weird layout issues/double borders when used within a <table>
// Also needs to be !important to override euiScreenReaderOnly absolute positioning
export const euiTableCaptionStyles = css`
  /* stylelint-disable declaration-no-important */
  position: relative !important;
`;
