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
import { CSSProperties } from '@emotion/serialize';

/**
 * Styles only applied to data header cell content, not control header cells
 */
export const euiDataGridHeaderCellStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { header } = euiDataGridCellOutlineSelectors('.euiDataGridHeaderCell');

  const hideAnimation = (
    margin: CSSProperties['margin'],
    translateX: string
  ) => `
    ${header.hideActions} & {
      ${logicalCSS('margin-left', margin)}
      transform: translateX(${translateX}) scale(0.01);
      opacity: 0;
    }
  `;

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
    euiDataGridHeaderCell__actions: {
      action: css`
        overflow: hidden;
        display: flex;
        max-inline-size: 24px;

        ${euiCanAnimate} {
          transition: transform ${euiTheme.animation.fast} ease-in,
            opacity ${euiTheme.animation.slow} ease-in,
            margin-left ${euiTheme.animation.fast} ease-in;

          /* Unset EuiButtonIcon animations */
          animation: none !important; /* stylelint-disable-line declaration-no-important */
        }
      `,
      start: css`
        ${hideAnimation(`-${euiTheme.size.m}`, '0%')}
      `,
      end: css`
        ${hideAnimation(`-${euiTheme.size.l}`, '50%')}
      `,
    },
  };
};
