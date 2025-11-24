/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiBorderStyles, euiShadow } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  highContrastModeStyles,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { cssSupportsHasWithNextSibling } from '../../global_styling/functions/supports';

import { euiTableVariables } from './table.styles';

export const euiTableRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const rowColors = _rowColorVariables(euiThemeContext);
  const expandedAnimationCss = _expandedRowAnimation(euiThemeContext);

  const { cellContentPadding, mobileSizes, checkboxSize } =
    euiTableVariables(euiThemeContext);

  const markedStyles = `
    :where(&.euiTableRow--marked):hover {
      background-color: ${rowColors.marked.hover};
    }
  `;

  return {
    euiTableRow: css`
      :where(&.euiTableRow--marked) {
        background-color: ${rowColors.marked.background};
      }
    `,

    desktop: {
      desktop: css`
        &:hover {
          background-color: ${rowColors.hover};
        }

        ${markedStyles}
      `,
      expanded: {
        expanded: css`
          ${expandedAnimationCss}
        `,
        // skipping adding a css class as it's a default style when expanded
        hasBackground: `
          background-color: ${rowColors.hover};
        `,
      },
      clickable: css`
        &:hover {
          background-color: ${rowColors.clickable.hover};
          cursor: pointer;
        }

        ${markedStyles}

        &:focus {
          background-color: ${rowColors.clickable.focus};
        }
      `,
      selected: css`
        &,
        & + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.background};
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

        border-radius: ${euiTheme.border.radius.medium};

        /* :has(+) is not supported in all environments (mainly not in older jsdom versions)
        TODO: Remove the wrapper once consumers have updated their jsdom to >= 24 */
        ${cssSupportsHasWithNextSibling(
          `
            &:has(+ .euiTableRow-isExpandedRow) {
              ${logicalCSS('border-bottom-left-radius', 0)}
              ${logicalCSS('border-bottom-right-radius', 0)}
            }
          `
        )}
      `,
      /* Omitting adding a class via css here as it's a default style on mobile, not a standalone prop-related style.
      Adding it separate allows better appliance control via props without the need to override the styles. */
      hasBorder: `
        ${highContrastModeStyles(euiThemeContext, {
          // uses pseudo-border to align dimensions with shadows applied by `hasBackground`
          none: `
            ${euiBorderStyles(euiThemeContext, { side: 'all' })}
            transform: translateZ(0);
          `,
          preferred: `
            border: ${euiTheme.border.thin}
          `,
        })}
      `,
      hasBackground: css`
        /* EuiPanel styling */
        ${euiShadow(euiThemeContext, 's', {
          borderAllInHighContrastMode: true,
        })}
        background-color: ${euiTheme.colors.backgroundBasePlain};

        ${highContrastModeStyles(euiThemeContext, {
          none: `
            border: none;
          `,
        })}
      `,
      selected: css`
        &,
        & + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.background};
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

        &::before {
          content: '';
          position: absolute;
          ${logicalCSS('vertical', 0)}
          ${logicalCSS('right', mobileSizes.actions.width)}
          ${logicalCSS('border-right', euiTheme.border.thin)}
        }
      `,
      /**
       * Bottom of card - expanded rows
       */
      expanded: css`
        ${logicalCSS(
          // On mobile, visually move the expanded row to join up with the
          // preceding table row via negative margins
          'margin-top',
          mathWithUnits(
            [cellContentPadding, euiTheme.border.width.thin],
            (x, y) => (x + y) * -1
          )
        )}
        /* Padding accounting for the checkbox is already applied via the content */
        ${logicalCSS('padding-left', cellContentPadding)}

        ${logicalCSS('border-top', euiTheme.border.thin)}
        ${logicalCSS('border-top-left-radius', 0)}
        ${logicalCSS('border-top-right-radius', 0)}

        &:after {
          ${logicalCSS('border-top', 'none')}
        }

        /* prevent the shadow from overlapping; uses 150% to add buffer for overflowing content
        NOTE: we might want to consider refactoring tables to use tbody grouping to apply styles for a row group */
        clip-path: polygon(-50% 0, 150% 0, 150% 150%, -50% 150%);

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
    background: euiTheme.components.tableRowBackgroundSelected,
    hover: euiTheme.components.tableRowBackgroundSelectedHover,
  },
  clickable: {
    hover: euiTheme.components.tableRowInteractiveBackgroundHover,
    focus: euiTheme.components.tableRowInteractiveBackgroundFocus,
  },
  marked: {
    background: euiTheme.components.tableRowBackgroundMarked,
    hover: euiTheme.components.tableRowBackgroundMarkedHover,
  },
});
