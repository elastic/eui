/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { euiCanAnimate, logicalCSS } from '../../../../global_styling';

export const euiDataGridDraggableHeaderStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiDataGridHeaderDroppable: css`
      display: flex;
    `,

    // The resizer must be positioned outside the draggable component to ensure both work independently
    euiDataGridHeaderCellDraggableWrapper: css`
      position: relative;

      .euiDataGridColumnResizer::after {
        ${logicalCSS('margin-left', `-${euiTheme.border.width.thick}`)}
      }
    `,

    // override internal styling from @hello-pangea/dnd to ensure positioning
    euiDataGridHeaderCellDraggable: css`
      display: flex;
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
  };
};
