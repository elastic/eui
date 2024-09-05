/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';

export const euiDataGridScrollBarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Note that 'borders' *must* be rendered with inset box-shadow, because actual
  // `border` CSS will affect the relative position of the child scroll bar overlays
  // and cause them to be off by the width of the border
  const borderWidth = euiTheme.border.width.thin;
  const borderColor = euiTheme.border.color;

  return {
    euiDataGrid__scrollOverlay: css`
      position: absolute;
      inset: 0;
      ${logicalCSS('top', `-${borderWidth}`)} /* Overlaps the toolbar border */

      /* Ensure the underlying grid is still interactable */
      pointer-events: none;

      /* Ensure the scrolling data grid body always has border edges regardless of cell position */
      box-shadow: inset 0 0 0 ${borderWidth} ${borderColor};

      .euiDataGrid--bordersHorizontal & {
        box-shadow: inset 0 -${mathWithUnits(borderWidth, (x) => x * 2)} 0 -${borderWidth}
          ${borderColor};
      }
    `,
    // Ensure the horizontal scrollbar has a top border
    euiDataGrid__scrollBarOverlayBottom: css`
      position: absolute;
      inset-inline: 0;
      ${logicalCSS('height', borderWidth)}
      background-color: ${borderColor};
    `,
    // Ensure the vertical scrollbar has a left border
    euiDataGrid__scrollBarOverlayRight: css`
      position: absolute;
      ${logicalCSS('width', borderWidth)}
      background-color: ${borderColor};
    `,
    // Note: Scroll bar border positions are set via JS inline style, since
    // JS has access to the exact OS scrollbar width/height and CSS doesn't
  };
};
