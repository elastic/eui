/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../src/services';
import { euiFontSize } from '../../../src/global_styling';

// Set on the grid element by the component
export const COLUMNS_VAR = '--contrastMatrixColumns';
export const ROWS_VAR = '--contrastMatrixRows';

const CELL_SIZE = '48px';

export const contrastMatrixStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 'xxs');
  const line = euiTheme.colors.borderBaseSubdued;

  const hairline = (size: string) =>
    `linear-gradient(${line}, ${line}) center / ${size} no-repeat`;

  const text = `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;

  return {
    slider: css`
      min-inline-size: 240px;
      max-inline-size: 320px;
    `,
    grid: css`
      display: inline-grid;
      grid-template-columns: auto ${CELL_SIZE} repeat(
          var(${COLUMNS_VAR}),
          ${CELL_SIZE}
        );
      grid-template-rows: auto ${CELL_SIZE} repeat(
          var(${ROWS_VAR}),
          ${CELL_SIZE}
        );
    `,
    cell: css`
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }

      > * {
        position: relative;
        z-index: 1;
      }
    `,
    colHeader: css`
      &::before {
        /* vertical line from the swatch center down into the matrix */
        background: ${hairline('1px 50%')};
        background-position: center bottom;
      }
    `,
    rowHeader: css`
      &::before {
        /* horizontal line from the swatch center across the matrix */
        background: ${hairline('50% 1px')};
        background-position: right center;
      }
    `,
    intersection: css`
      &::before {
        background: ${hairline('1px 100%')}, ${hairline('100% 1px')};
      }
    `,
    axisLabel: css`
      color: ${euiTheme.colors.textSubdued};
      ${text}
    `,
    backgroundLabel: css`
      justify-content: start;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      white-space: nowrap;
    `,
    valueLabel: css`
      justify-content: start;
    `,
    average: css`
      padding-inline-start: ${CELL_SIZE};
    `,
  };
};
