/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  euiFontSize,
  euiNumberFormat,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';

export const euiTableVariables = ({ euiTheme }: UseEuiTheme) => {
  const cellContentPadding = euiTheme.size.s;
  const compressedCellContentPadding = euiTheme.size.xs;

  const mobileSizes = {
    actions: {
      width: euiTheme.size.xxl,
      offset: mathWithUnits(cellContentPadding, (x) => x * 2),
    },
    checkbox: {
      width: mathWithUnits(
        [euiTheme.size.xl, euiTheme.size.xs],
        (x, y) => x + y
      ),
      offset: mathWithUnits(cellContentPadding, (x) => x / 2),
    },
  };

  const checkboxSize = euiTheme.size.xl;

  return {
    cellContentPadding,
    compressedCellContentPadding,
    mobileSizes,
    checkboxSize,
  };
};

export const euiTableStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { cellContentPadding, compressedCellContentPadding } =
    euiTableVariables(euiThemeContext);

  return {
    euiTable: css`
      ${euiNumberFormat(euiThemeContext)}
      ${logicalCSS('width', '100%')}
      border: none;
      border-collapse: collapse;
    `,
    layout: {
      fixed: css`
        table-layout: fixed;
      `,
      auto: css`
        table-layout: auto;
      `,
    },
    hasBackground: css`
      background-color: ${euiTheme.colors.backgroundBasePlain};
    `,
    /**
     * 1. The padding on the `.euiTableCellContent` div allows the ellipsis to show if the
     * content is truncated. If the padding was on the cell, the ellipsis would be cropped.
     * 2. The `:where()` selector sets the specificity to 0, allowing consumers to more easily
     * override our CSS if needed
     */
    uncompressed: css`
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${euiFontSize(euiThemeContext, 'm').lineHeight};

      /* 1 & 2 */
      & :where(.euiTableCellContent) {
        padding: ${cellContentPadding};
      }
    `,
    compressed: css`
      ${euiFontSize(euiThemeContext, 'xs')}

      /* 1 & 2 */
      & :where(.euiTableCellContent) {
        padding: ${compressedCellContentPadding};
      }
    `,
    /**
     * Responsive/mobile vs desktop styles
     * Individual row/cells handle their own desktop vs mobile styles
     */
    desktop: css``,
    mobile: css`
      thead {
        display: none; /* Use mobile versions of selecting and filtering instead */
      }

      tfoot {
        display: none; /* Not supporting responsive footer content */
      }
    `,
  };
};

// The table caption needs to not be absolutely positioned, because for some reason
// it causes weird layout issues/double borders when used within a <table>
// Also needs to be !important to override euiScreenReaderOnly absolute positioning
export const euiTableCaptionStyles = css`
  /* stylelint-disable declaration-no-important */
  position: relative !important;
`;
