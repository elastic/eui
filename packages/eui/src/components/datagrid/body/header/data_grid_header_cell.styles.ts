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
  euiTextTruncate,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../../../global_styling';
import { euiDataGridCellOutlineSelectors } from '../cell/data_grid_cell.styles';

/**
 * Styles only applied to data header cell content, not control header cells
 */
export const euiDataGridHeaderCellStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { header } = euiDataGridCellOutlineSelectors('.euiDataGridHeaderCell');

  return {
    euiDataGridHeaderCell__content: css`
      flex-grow: 1; /* ensures content stretches and allows for manual layout styles to apply */
      ${euiTextTruncate()}
    `,
    // Numeric and currency schemas are aligned to the right
    right: css`
      ${logicalTextAlignCSS('right')}
    `,

    euiDataGridHeaderCell__popover: css`
      /* Align the button to the right */
      ${logicalCSS('margin-left', 'auto')}
      /* Remove inline struts from EuiButtonIcon */
      line-height: 0;
    `,
    euiDataGridHeaderCell__actions: css`
      overflow: hidden;
      display: flex;

      ${header.hideActions} & {
        ${logicalCSS('width', 0)}
        opacity: 0;
      }

      ${euiCanAnimate} {
        transition: inline-size ${euiTheme.animation.fast} ease-in,
          opacity ${euiTheme.animation.slow} ease-in;

        /* Unset EuiButtonIcon animations */
        transform: none !important; /* stylelint-disable-line declaration-no-important */
        animation: none !important; /* stylelint-disable-line declaration-no-important */
      }
    `,

    canDrag: {
      // The resizer must be positioned outside the draggable component to ensure both work independently
      euiDataGridHeaderCellDraggableWrapper: css`
        position: relative;

        .euiDataGridColumnResizer::after {
          ${logicalCSS('margin-left', `-${euiTheme.border.width.thick}`)}
        }
      `,
      euiDataGridHeaderCellDraggable: css`
        /* override internal styling from @hello-pangea/dnd to ensure positioning */

        display: flex;
        ${logicalCSS('width', '100%')}
        ${logicalCSS('height', '100%')}
      `,
      // Add more visual affordance to keyboard drags (raises cell slightly to show green droppable bg)
      // Using animation as transition doesn't seem to work (a tale as old as EuiDataGrid...)
      isKeyboardDragging: css`
        animation-name: ${keyframes`
          from { transform: translateY(0); }
          to { transform: translateY(-${euiTheme.size.s}); }
        `};
        animation-iteration-count: 1;
        animation-fill-mode: forwards;

        ${euiCanAnimate} {
          animation-duration: ${euiTheme.animation.fast};
        }
      `,
      // Ensure correct cell background colors on drag
      underline: css`
        background-color: ${euiTheme.colors.emptyShade};
      `,
      shade: css`
        background-color: ${euiTheme.colors.lightestShade};
      `,
      noLeadingBorder: css`
        ${logicalCSS('border-left', 'none !important')}
      `,
    },
  };
};
