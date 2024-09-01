/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { mathWithUnits } from '../../../../global_styling';

export const euiDataGridCellOutlineStyles = ({ euiTheme }: UseEuiTheme) => {
  const focusColor = euiTheme.colors.primary;
  const hoverColor = euiTheme.colors.darkShade;
  const outlineWidth = euiTheme.border.width.thick;
  const borderRadius = mathWithUnits(
    euiTheme.border.radius.medium,
    (x) => x / 2
  );

  // Note: We use a pseudo element for the 'outline' over any other CSS approaches
  // (outline, border, box-shadow) because it gives us the most control and reduces
  // overlap with other cells or inner elements
  return {
    borderRadius,
    focusColor,
    focusStyles: `
      /* Remove outline as we're handling it manually. Needed to override global styles */
      &:focus:focus-visible {
        outline: none;
      }

      &::after {
        content: '';
        /* We want this to be visually on top of cell content but not interactive */
        z-index: 2;
        pointer-events: none;
        position: absolute;
        inset: 0;
        border: ${outlineWidth} solid ${focusColor};
        border-radius: ${borderRadius};
      }
    `,
    hoverColor,
    hoverStyles: `
      &::after {
        border-color: ${hoverColor};
      }
    `,
    rowCellFocusSelectors: [
      ':focus', // cell has been clicked or keyboard navigated to
      '.euiDataGridRowCell--open', // always show when the cell expansion popover is open
      '[data-keyboard-closing]', // prevents the animation from replaying when keyboard focus is moved from the popover back to the cell
    ].join(', '),
  };
};

export const euiDataGridRowCellStyles = (euiThemeContext: UseEuiTheme) => {
  const cellOutline = euiDataGridCellOutlineStyles(euiThemeContext);

  return {
    euiDataGridRowCell: css`
      position: relative; /* Needed for .euiDataGridRowCell__actions */

      &:hover,
      ${cellOutline.rowCellFocusSelectors} {
        ${cellOutline.focusStyles}
      }

      &:hover:not(${cellOutline.rowCellFocusSelectors}) {
        ${cellOutline.hoverStyles}
      }
    `,
  };
};
