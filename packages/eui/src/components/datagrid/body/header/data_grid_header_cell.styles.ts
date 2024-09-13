/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

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
    euiDataGridHeaderCell__button: css`
      overflow: hidden;

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
    euiDataGridHeaderCellDraggable: css`
      /* override internal styling from @hello-pangea/dnd to ensure positioning */
      ${logicalCSS('top', '0 !important')}
      display: 'flex';
      ${logicalCSS('width', '100%')}
    `,
    euiDataGridHeaderCell__draggableIcon: css`
      position: relative;
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
      border-radius: ${euiTheme.border.radius.small};
      outline: none;

      svg {
        flex: 0 0 auto; /* Ensure icon doesn't shrink */
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        ${logicalCSS('height', euiTheme.base)}

        ${header.hideActions} & {
          ${logicalCSS('width', 0)}
          opacity: 0;
        }

        ${euiCanAnimate} {
          transition: inline-size ${euiTheme.animation.fast} ease-in,
            opacity ${euiTheme.animation.slow} ease-in;
        }
      }
    `,
  };
};
