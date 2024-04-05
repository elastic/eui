/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import {
  UseEuiTheme,
  makeHighContrastColor,
  tintOrShade,
} from '../../services';
import {
  euiFontSize,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../global_styling';

import { euiTableVariables } from './table.styles';

export const euiTableHeaderFooterCellStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme, colorMode } = euiThemeContext;

  // euiFontSize returns an object, so we keep object notation here to merge into css``
  const sharedStyles = {
    ...euiFontSize(euiThemeContext, 'xs'),
    fontWeight: euiTheme.font.weight.semiBold,
    color: euiTheme.colors.title,
    verticalAlign: 'middle',
  };

  return {
    euiTableHeaderCell: css`
      ${sharedStyles}
    `,
    euiTableHeaderCell__content: css`
      /* Spacing between text and sort icon */
      gap: ${euiTheme.size.xs};
    `,
    euiTableHeaderCell__button: css`
      ${logicalCSS('width', '100%')}
      font-weight: inherit;

      /* Tint the sortable icon a bit further */
      .euiTableSortIcon--sortable {
        color: ${makeHighContrastColor(
          // Tint it arbitrarily high, the contrast util will take care of lowering back down to WCAG
          tintOrShade(euiTheme.colors.subduedText, 0.9, colorMode),
          3 // 3:1 ratio from https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
        )(euiTheme.colors.emptyShade)};
      }

      &:hover,
      &:focus {
        color: ${euiTheme.colors.primaryText};
        text-decoration: underline;

        .euiTableSortIcon--sortable {
          color: ${euiTheme.colors.primaryText};
        }
      }
    `,
    euiTableFooterCell: css`
      ${sharedStyles}
      background-color: ${euiTheme.colors.lightestShade};
    `,
  };
};

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

      /* Without this the visually hidden checkbox doesn't line up properly with the custom render 🙃
         TODO: Could be removed if we use inset: 0 on checkboxes once they're converted to Emotion */
      ${logicalTextAlignCSS('left')}
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
