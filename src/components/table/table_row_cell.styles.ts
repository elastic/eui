/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiFontSize, euiTextTruncate, logicalCSS } from '../../global_styling';

import { euiTableVariables } from './table.styles';

export const euiTableRowCellStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { mobileSizes } = euiTableVariables(euiThemeContext);

  return {
    euiTableRowCell: css`
      color: ${euiTheme.colors.text};
    `,

    hasActions: css`
      /* Unsets the extra strut caused by inline-block display of buttons/icons/tooltips.
         Without this, the row height jumps whenever actions are disabled. */
      line-height: 1;

      /* TODO: Move this to EuiTableCellContent, once we're further along in the Emotion conversion */
      .euiTableCellContent {
        display: flex;
        align-items: center;
        gap: ${euiTheme.size.s};
      }
    `,

    // valign
    middle: css`
      vertical-align: middle;
    `,
    baseline: css`
      vertical-align: baseline;
    `,
    top: css`
      vertical-align: top;
    `,
    bottom: css`
      vertical-align: bottom;
    `,

    desktop: {
      desktop: css`
        ${logicalCSS('border-vertical', euiTheme.border.thin)}
      `,
      actions: css`
        /* TODO: Move this to EuiTableCellContent, once we're further along in the Emotion conversion */
        .euiTableCellContent {
          flex-wrap: wrap;
        }
      `,
    },

    mobile: {
      mobile: css`
        ${logicalCSS('min-width', '50%')}
      `,
      enlarge: css`
        ${euiFontSize(euiThemeContext, 'm')}
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

    euiTableRowCell__mobileHeader: css`
      /* Always truncate */
      ${euiTextTruncate()}
      font-size: ${euiFontSize(euiThemeContext, 's', {
        customScale: 'xxs',
      }).fontSize};

      display: block;
      color: ${euiTheme.colors.darkShade};
      padding: ${euiTheme.size.s};
      /* Pull up cell content closer */
      padding-block-end: 0;
      margin-block-end: -${euiTheme.size.s};

      /* Aligns contents of cells if header is empty */
      .euiTableRowCell:not(:only-child) & {
        ${logicalCSS('min-height', euiTheme.size.l)}
      }
    `,
  };
};
