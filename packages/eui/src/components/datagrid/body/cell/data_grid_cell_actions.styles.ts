/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import {
  euiCanAnimate,
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../../../global_styling';
import { highContrastModeStyles } from '../../../../global_styling/functions/high_contrast';

import { euiDataGridVariables } from '../../data_grid.styles';
import {
  euiDataGridCellOutlineStyles,
  euiDataGridCellOutlineSelectors,
} from './data_grid_cell.styles';

export const euiDataGridCellActionsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { levels } = euiDataGridVariables(euiThemeContext);
  const borderWidth = euiTheme.border.width.thin;

  const cellOutline = euiDataGridCellOutlineStyles(euiThemeContext);
  const { actions: cellSelectors } = euiDataGridCellOutlineSelectors(
    '.euiDataGridRowCell'
  );

  return {
    euiDataGridRowCell__actionsWrapper: css`
      position: absolute;
      ${logicalCSS('left', 0)}
      ${logicalCSS('bottom', '100%')}

      /* Sit below sticky column headers */
      z-index: ${levels.stickyHeader - 1};

      /* The first row of cell actions need to be visible above the cell headers,
       * but other cell actions that scroll past the sticky headers should not */
      .euiDataGridRowCell[data-gridcell-visible-row-index='0'] > & {
        z-index: ${levels.stickyHeader + 1};
      }

      /* Increase non-visible hover zone, to reduce UX friction for
       * users mousing from the cell diagonally over to the actions */
      ${cellSelectors.hoverZone} & {
        ${logicalCSS('min-width', '50%')}
        ${logicalCSS('padding-right', euiTheme.size.base)}
      }
    `,

    euiDataGridRowCell__actions: css`
      position: relative;
      display: flex;
      gap: ${euiTheme.size.xxs};
      ${logicalCSS('width', 'fit-content')}
      padding-inline: ${euiTheme.size.xxs};
      ${logicalCSS('margin-bottom', `-${borderWidth}`)}

      background-color: ${cellOutline.focusColor};
      color: ${euiTheme.colors.emptyShade};
      border: ${borderWidth} solid ${cellOutline.focusColor};
      border-radius: ${cellOutline.borderRadius};
      ${logicalCSS('border-bottom-left-radius', 0)}

      /* Visual trickery - fill in the gap between the cell outline border-radius & the actions */
      &::after {
        content: '';
        position: absolute;
        ${logicalCSS('top', '100%')}
        ${logicalCSS('left', `-${borderWidth}`)}
        ${logicalSizeCSS(mathWithUnits(borderWidth, (x) => x * 2))}
        background-color: inherit;
      }

      /* When hovered and not focused, cell actions should match the gray focus outline */
      ${cellSelectors.hoverColor} & {
        background-color: ${cellOutline.hoverColor};
        border-color: ${cellOutline.hoverColor};
      }

      ${euiCanAnimate} {
        transform: scaleY(0);
        transform-origin: bottom;

        ${cellSelectors.showAnimation} & {
          animation-duration: ${euiTheme.animation.fast};
          animation-name: ${slideUp};
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        /* Delay the actions showing on hover only, show instantly otherwise */
        ${cellSelectors.hoverAnimation} & {
          animation-delay: ${euiTheme.animation.slow};
        }
      }
    `,

    euiDataGridRowCell__actionButtonIcon: css`
      ${logicalCSS('width', euiTheme.size.base)}
      ${logicalCSS(
        'height',
        mathWithUnits([euiTheme.size.base, euiTheme.size.xs], (x, y) => x + y)
      )}
      border-radius: 0;

      /* Force all cell action buttons to match EUI colors */
      /* stylelint-disable declaration-no-important */
      &,
      svg {
        background-color: transparent !important;
        color: currentColor !important;
        fill: currentColor !important;
      }
      /* stylelint-enable declaration-no-important */

      /* Remove button borders in high contrast mode */
      ${highContrastModeStyles(euiThemeContext, {
        preferred: 'border: none;',
      })}
    `,
  };
};

const slideUp = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;
