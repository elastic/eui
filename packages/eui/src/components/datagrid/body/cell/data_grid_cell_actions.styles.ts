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

import { euiDataGridVariables } from '../../data_grid.styles';

export const euiDataGridCellActionsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { levels } = euiDataGridVariables(euiThemeContext);

  const borderWidth = euiTheme.border.width.thin;
  const borderRadius = mathWithUnits(
    euiTheme.border.radius.medium,
    (x) => x / 2
  );

  const hasFocus = [
    ':focus', // cell has been clicked or keyboard navigated to
    '.euiDataGridRowCell--open', // always show when the cell expansion popover is open
    '[data-keyboard-closing]', // prevents the animation from replaying when keyboard focus is moved from the popover back to the cell
  ].join(', ');

  return {
    euiDataGridRowCell__actions: css`
      z-index: ${levels.stickyHeader - 1}; /* Sit below sticky column headers */
      display: flex;
      gap: ${euiTheme.size.xxs};
      padding-inline: ${euiTheme.size.xxs};
      ${logicalCSS('margin-bottom', `-${borderWidth}`)}

      background-color: var(--euiDataGridCellOutlineColor);
      color: ${euiTheme.colors.emptyShade};
      border: ${borderWidth} solid var(--euiDataGridCellOutlineColor);
      border-radius: ${borderRadius};
      ${logicalCSS('border-bottom-left-radius', 0)}

      /* The first row of cell actions need to be visible above the cell headers,
       * but other cell actions that scroll past the sticky headers should not */
      .euiDataGridRowCell[data-gridcell-visible-row-index='0'] > & {
        z-index: ${levels.stickyHeader + 1};
      }

      /* Positioning for cell actions & the cell expansion popover */
      &,
      & + [data-euiportal] > .euiPopover {
        position: absolute;
        ${logicalCSS('left', 0)}
        ${logicalCSS('bottom', '100%')}
      }

      /* Visual trickery - fill in the gap between the cell outline border-radius & the actions */
      &::after {
        content: '';
        position: absolute;
        ${logicalCSS('top', '100%')}
        ${logicalCSS('left', `-${borderWidth}`)}
        ${logicalSizeCSS(mathWithUnits(borderWidth, (x) => x * 2))}
        background-color: var(--euiDataGridCellOutlineColor);
      }
    `,
    visibility: css`
      /* If a cell is not hovered nor focused nor open via popover, don't show the actions */
      .euiDataGridRowCell:not(:hover, ${hasFocus}) & {
        display: none;
      }

      ${euiCanAnimate} {
        transform: scaleY(0);
        transform-origin: bottom;

        .euiDataGridRowCell:is(:hover, ${hasFocus}) & {
          animation-duration: ${euiTheme.animation.fast};
          animation-name: ${slideUp};
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        /* Delay the actions showing on hover only, show instantly otherwise */
        .euiDataGridRowCell:hover:not(${hasFocus}) & {
          animation-delay: ${euiTheme.animation.slow}; /* 2 */
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

      /* Manually increase the size of the expand cell icon - it's a bit small by default */
      &.euiDataGridRowCell__expandCell .euiIcon {
        ${logicalCSS('width', '120%')}
        ${logicalCSS('height', '100%')}
      }
    `,
  };
};

const slideUp = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;
