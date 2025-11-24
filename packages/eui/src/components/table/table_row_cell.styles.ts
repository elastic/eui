/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  euiFontSize,
  euiTextTruncate,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../global_styling';

import { euiTableVariables } from './table.styles';

export const euiTableRowCellStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { mobileSizes } = euiTableVariables(euiThemeContext);

  // Unsets the extra strut caused by inline-block display of buttons/icons/tooltips.
  // Without this, the row height jumps whenever actions are disabled.
  const hasIcons = `line-height: 1;`;

  return {
    euiTableRowCell: css`
      color: ${euiTheme.colors.textParagraph};
    `,
    rowHeader: css`
      /* Unset the automatic browser bolding and center alignment applied to [th] elements */
      font-weight: ${euiTheme.font.weight.regular};
      ${logicalTextAlignCSS('left')}
    `,
    isExpander: css`
      ${hasIcons}
    `,
    hasActions: css`
      ${hasIcons}
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
        .euiBasicTableAction-showOnHover {
          opacity: 0;

          ${euiCanAnimate} {
            transition: opacity ${euiTheme.animation.normal}
              ${euiTheme.animation.resistance};
          }
        }

        &:focus-within,
        .euiTableRow-hasActions:hover & {
          .euiBasicTableAction-showOnHover {
            opacity: 1;
          }
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
      `,
      get actions() {
        // Note: Visible-on-hover actions on desktop always show on mobile
        return css`
          ${this.rightColumnContent}
          ${logicalCSS('top', mobileSizes.actions.offset)}

          /* Handled here to ensure a stable Emotion style order 
          See https://github.com/elastic/eui/issues/8231 */
          .euiTableCellContent {
            padding: 0;
          }
        `;
      },
      get expander() {
        return css`
          ${this.rightColumnContent}
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
            ${logicalCSS('border-top', euiTheme.border.thin)}
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
      color: ${euiTheme.colors.textSubdued};
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
