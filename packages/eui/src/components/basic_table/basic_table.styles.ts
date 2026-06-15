/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import {
  logicalCSS,
  euiCantAnimate,
  highContrastModeStyles,
  preventForcedColors,
  euiMinBreakpoint,
} from '../../global_styling';
import type { UseEuiTheme } from '../../services';
import type { EuiTableProps } from '../table';
import { EUI_BASIC_TABLE_PANEL_CLASS_NAME } from './use_panel_props';

const tableLoadingLine = keyframes`
  from {
    ${logicalCSS('left', 0)}
    ${logicalCSS('width', 0)}
  }

  20% {
    ${logicalCSS('left', 0)}
    ${logicalCSS('width', '40%')}
  }

  80% {
    ${logicalCSS('left', '60%')}
    ${logicalCSS('width', '40%')}
  }

  100% {
    ${logicalCSS('left', '100%')}
    ${logicalCSS('width', 0)}
  }
`;

export const euiBasicTableBodyLoading = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return css`
    position: relative;
    overflow: hidden;

    &::before {
      position: absolute;
      content: '';
      ${logicalCSS('width', '100%')}
      ${logicalCSS('height', euiTheme.border.width.thick)}
      background-color: ${euiTheme.colors.primary};
      animation: ${tableLoadingLine} 1s linear infinite;

      ${euiCantAnimate} {
        animation: none;
        background: repeating-linear-gradient(
          -45deg,
          ${euiTheme.colors.backgroundBasePlain},
          ${euiTheme.colors.backgroundBasePlain} ${euiTheme.size.xs},
          ${euiTheme.colors.primary} ${euiTheme.size.xs},
          ${euiTheme.colors.primary} ${euiTheme.size.s}
        );

        ${highContrastModeStyles(euiThemeContext, {
          forced: `
              ${preventForcedColors(euiThemeContext)}
            `,
        })}
      }
    }
  `;
};

/**
 * @internal
 */
export const euiBasicTableWrapperPanelledStyles =
  (responsiveBreakpoint: EuiTableProps['responsiveBreakpoint']) =>
  (theme: UseEuiTheme) => {
    const { euiTheme } = theme;

    const styles = css`
      border: ${euiTheme.border.thin};
      border-block-end-width: 0;
      /* Offset for the wrapper border to be rendered without being obstructed
       * by the child EuiTable's border */
      padding-block-start: ${euiTheme.border.width.thin};
      border-radius: ${euiTheme.border.radius.medium};

      .euiTable {
        border-radius: ${euiTheme.border.radius.medium};
      }

      /* Reset top border radius when there are panels above. */
      .${EUI_BASIC_TABLE_PANEL_CLASS_NAME} + .euiBasicTable & {
        border-start-start-radius: 0;
        border-start-end-radius: 0;

        .euiTable {
          border-start-start-radius: 0;
          border-start-end-radius: 0;
        }
      }

      /* Reset bottom border radius when there are panels below.
       * &:not(:last-child) detects whether the pagination bar is displayed */
      &:not(:last-child),
      &:has(+ .${EUI_BASIC_TABLE_PANEL_CLASS_NAME}) {
        border-end-start-radius: 0;
        border-end-end-radius: 0;

        .euiTable {
          border-end-start-radius: 0;
          border-end-end-radius: 0;
        }
      }
    `;

    if (responsiveBreakpoint === true) {
      return null;
    }

    if (!responsiveBreakpoint) {
      return styles;
    }

    return css`
      ${euiMinBreakpoint(theme, responsiveBreakpoint)} {
        ${styles}
      }
    `;
  };

// Fix to make the loading indicator position correctly in Safari
// For whatever annoying reason, Safari doesn't respect `position: relative;`
// on `tbody` without `position: relative` on the parent `table`
export const safariLoadingWorkaround = css`
  position: relative;
`;
