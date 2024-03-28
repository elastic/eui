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

export const euiTableRowCellStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { mobileSizes } = euiTableVariables(euiThemeContext);

  return {
    euiTableRowCell: css`
      color: ${euiTheme.colors.text};
    `,

    desktop: css`
      ${logicalCSS('border-vertical', euiTheme.border.thin)}
    `,

    mobile: {
      mobile: css`
        ${logicalCSS('min-width', '50%')}
      `,
      rightColumnContent: `
        position: absolute;
        ${logicalCSS('right', 0)}
        ${logicalCSS('min-width', '0')}
        ${logicalCSS('width', mobileSizes.actions.width)}

        /* TODO: Move this to EuiTableCellContent, once we're further along in the Emotion conversion */
        .euiTableCellContent {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${euiTheme.size.s};
          padding: 0;
        }
      `,
      get actions() {
        return css`
          ${this.rightColumnContent}
          ${logicalCSS('top', mobileSizes.actions.offset)}
        `;
      },
      get expander() {
        return css`
          ${this.rightColumnContent}
          ${logicalCSS('bottom', mobileSizes.actions.offset)}
        `;
      },
      /**
       * Custom actions may not be icons and therefore may not fit in a column
       * If they're the last cell, we can create a pseudo "row"/"border-top"
       * that mimicks the visual separation that the right column has
       */
      customActions: css`
        &:last-child {
          ${logicalCSS('width', '100%')}

          &::before {
            content: '';
            position: absolute;
            ${logicalCSS('horizontal', 0)}
            ${logicalCSS('height', euiTheme.border.width.thin)}
            background-color: ${euiTheme.border.color};
          }

          /* Minor vertical alignment of cell content */
          .euiTableCellContent {
            position: relative;
            ${logicalCSS('top', euiTheme.size.xs)}
          }
        }
      `,
    },
  };
};
