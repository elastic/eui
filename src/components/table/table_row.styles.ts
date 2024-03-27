/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, tint, shade, transparentize } from '../../services';
import {
  euiBackgroundColor,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';

export const euiTableRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const rowColors = _rowColorVariables(euiThemeContext);

  const cellContentPadding = euiTheme.size.s;
  const mobileColumns = {
    actions: {}, // TODO
    checkbox: {
      width: mathWithUnits(
        [euiTheme.size.xl, euiTheme.size.xs],
        (x, y) => x + y
      ),
      offset: mathWithUnits(cellContentPadding, (x) => x / 2),
    },
  };

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
        background-color: ${euiBackgroundColor(euiThemeContext, 'plain')};
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
       * Used for selection checkbox
       */
      selectable: css`
        ${logicalCSS('padding-left', mobileColumns.checkbox.width)}

        .euiTableRowCellCheckbox {
          position: absolute;
          ${logicalCSS('top', cellContentPadding)}
          ${logicalCSS('left', mobileColumns.checkbox.offset)}
        }
      `,
    },
  };
};

const _rowColorVariables = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  hover:
    colorMode === 'DARK'
      ? euiTheme.colors.lightestShade
      : tint(euiTheme.colors.lightestShade, 0.5),
  selected: {
    color:
      colorMode === 'DARK'
        ? shade(euiTheme.colors.primary, 0.7)
        : tint(euiTheme.colors.primary, 0.96),
    hover:
      colorMode === 'DARK'
        ? shade(euiTheme.colors.primary, 0.75)
        : tint(euiTheme.colors.primary, 0.9),
  },
  clickable: {
    hover: transparentize(euiTheme.colors.primary, 0.05),
    focus: transparentize(euiTheme.colors.primary, 0.1),
  },
});
