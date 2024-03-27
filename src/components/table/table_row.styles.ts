/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, tint, shade, transparentize } from '../../services';

export const euiTableRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const rowColors = _rowColorVariables(euiThemeContext);

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
      mobile: css``,
      selected: css`
        &,
        & + .euiTableRow-isExpandedRow {
          background-color: ${rowColors.selected.color};
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
