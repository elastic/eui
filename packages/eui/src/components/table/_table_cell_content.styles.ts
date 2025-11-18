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
  euiTextTruncate,
  euiTextBreakWord,
  logicalTextAlignCSS,
} from '../../global_styling';

export const euiTableCellContentStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiTableCellContent: css`
    display: flex;
    align-items: center; /* Vertically align all children */
  `,

  // Align
  left: null, // Default, no CSS needed
  right: css`
    justify-content: flex-end;
    ${logicalTextAlignCSS('right')}
  `,
  center: css`
    justify-content: center;
    text-align: center;
  `,

  // Text wrapping
  truncateText: css`
    ${euiTextTruncate()}

    /* Text truncation on flex parents doesn't work - this wrapper + extra CSS is required */
    .euiTableCellContent__text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
  wrapText: css`
    ${euiTextBreakWord()}
  `,

  // Action cells
  hasActions: {
    actions: css`
      gap: ${euiTheme.size.s};
    `,
    desktop: css`
      flex-wrap: wrap;
    `,
    mobile: css`
      flex-direction: column;
    `,
  },
});
