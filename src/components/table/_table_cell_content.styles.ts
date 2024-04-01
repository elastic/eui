/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalTextAlignCSS } from '../../global_styling';

export const euiTableCellContentStyles = {
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
};
