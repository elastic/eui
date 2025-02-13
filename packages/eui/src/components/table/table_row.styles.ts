/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate, logicalCSS } from '../../global_styling';

import { euiTableVariables } from './table.styles';

export const euiTableRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const rowColors = _rowColorVariables(euiThemeContext);
  const expandedAnimationCss = _expandedRowAnimation(euiThemeContext);

  const { cellContentPadding, mobileSizes, checkboxSize } =
    euiTableVariables(euiThemeContext);

  return {
    euiTableRow: css``,

    desktop: {
      desktop: css`
        &:hover {
          background-color: ${rowColors.hover};
        }
      `,
      expanded: css`
        background-color: ${rowColors.hover};
        ${expandedAnimationCss}
      `,
      clickable: css`
        &:hover {
          background-color: ${rowColors.clickable.hover};
          cursor: pointer;
        }

        &:focus {
          background-color: ${rowColors.clickable.focus};
        }
      `,
      selected: css`
        &,
        & + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.color};
        }

        &:hover,
        &:hover + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.hover};
        }
      `,
      // Offset expanded & selectable rows by the checkbox width to line up content with the 2nd column
      // Set on the `<td>` because padding can't be applied to `<tr>` elements directly
      checkboxOffset: css`
        & > .euiTableRowCell:first-child {
          ${logicalCSS('padding-left', checkboxSize)}
        }
      `,
    },

    mobile: {
      mobile: css`
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: ${cellContentPadding};
        ${logicalCSS('margin-bottom', cellContentPadding)}

        /* EuiPanel styling */
        ${euiShadow(euiThemeContext, 's')}
        background-color: ${euiTheme.colors.backgroundBasePlain};
        border-radius: ${euiTheme.border.radius.medium};
      `,
      selected: css`
        &,
        & + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.color};
        }
      `,
      /**
       * Left column offset (no border)
       * Used for selection checkbox, which will be absolutely positioned
       */
      hasLeftColumn: css`
        ${logicalCSS('padding-left', mobileSizes.checkbox.width)}
      `,
      /**
       * Right column styles + border
       * Used for cell actions and row expander arrow
       */
      hasRightColumn: css`
        ${logicalCSS('padding-right', mobileSizes.actions.width)}

        &::after {
          content: '';
          position: absolute;
          ${logicalCSS('vertical', 0)}
          ${logicalCSS('right', mobileSizes.actions.width)}
          ${logicalCSS('width', euiTheme.border.width.thin)}
          background-color: ${euiTheme.border.color};
        }
      `,
      /**
       * Bottom of card - expanded rows
       */
      expanded: css`
        ${logicalCSS('margin-top', `-${mobileSizes.actions.offset}`)}
        /* Padding accounting for the checkbox is already applied via the content */
        ${logicalCSS('padding-left', cellContentPadding)}

        ${logicalCSS('border-top', euiTheme.border.thin)}
        ${logicalCSS('border-top-left-radius', 0)}
        ${logicalCSS('border-top-right-radius', 0)}

        > .euiTableRowCell {
          ${logicalCSS('width', '100%')}
        }

        ${expandedAnimationCss}
      `,
    },
  };
};

const _expandedRowAnimation = ({ euiTheme }: UseEuiTheme) => {
  // Do not attempt to animate to height auto - down that road dragons lie
  // @see https://github.com/elastic/eui/pull/6826
  const expandRow = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-${euiTheme.size.m});
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  // Animation must be on the contents div inside, not the row itself
  return css`
    ${euiCanAnimate} {
      .euiTableCellContent {
        animation: ${euiTheme.animation.fast} ${euiTheme.animation.resistance} 1
          normal none ${expandRow};
      }
    }
  `;
};

const _rowColorVariables = ({ euiTheme }: UseEuiTheme) => ({
  hover: euiTheme.components.tableRowBackgroundHover,
  selected: {
    color: euiTheme.components.tableRowBackgroundSelected,
    hover: euiTheme.components.tableRowBackgroundSelectedHover,
  },
  clickable: {
    hover: euiTheme.components.tableRowInteractiveBackgroundHover,
    focus: euiTheme.components.tableRowInteractiveBackgroundFocus,
  },
});
