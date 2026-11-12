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

export const COLUMNS_VAR = '--colorGridColumns';
export const CELL_SIZE_VAR = '--colorGridCellSize';
export const CELL_COLOR_VAR = '--colorGridCellColor';

export const colorGridStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 'xs');
  const columns = `repeat(var(${COLUMNS_VAR}), var(${CELL_SIZE_VAR}))`;

  const text = `
    font-family: ${euiTheme.font.familyCode};
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;

  return {
    grid: css`
      display: inline-grid;
      grid-template-columns: ${columns};
      gap: 1px;
      background-color: ${euiTheme.colors.borderBaseSubdued};
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseSubdued};
    `,
    cell: css`
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: var(${CELL_SIZE_VAR});
      inline-size: var(${CELL_SIZE_VAR});
      background-color: ${euiTheme.colors.backgroundBasePlain};
      color: ${euiTheme.colors.plainDark};
      font-weight: ${euiTheme.font.weight.medium};
      ${text}
    `,
    interactive: css`
      appearance: none;
      margin: 0;
      padding: 0;
      border: 0;
      cursor: pointer;

      &:hover:not([aria-pressed='true']) {
        background-color: var(${CELL_COLOR_VAR});
      }

      &:focus-visible {
        z-index: 1;
      }
    `,
    labels: css`
      display: inline-grid;
      grid-template-columns: ${columns};
      text-align: center;
      color: ${euiTheme.colors.textDisabled};
      ${text}
    `,
    usedLabel: css`
      color: ${euiTheme.colors.textParagraph};
      font-weight: ${euiTheme.font.weight.bold};
    `,
  };
};
