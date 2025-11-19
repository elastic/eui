/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling';

export const euiPageOuterStyles = {
  euiPageOuter: css`
    display: flex;
    flex-shrink: 0; /* Ensures Safari doesn't shrink height beyond contents */
    ${logicalCSS(
      'max-width',
      '100%' // Ensures Firefox doesn't expand width beyond bounds
    )}
  `,

  // Grow
  grow: css`
    flex-grow: 1;
  `,

  // Direction
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
};
