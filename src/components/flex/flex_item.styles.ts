/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

export const euiFlexItemStyles = () => {
  return {
    // 1. Allow EuiPanels to expand to fill the item.
    euiFlexItem: css`
      display: flex; /* 1 */
      flex-direction: column; /* 1 */
    `,
    growZero: css`
      flex-grow: 0;
      flex-basis: auto;
    `,
    grow: css`
      flex-basis: 0%;
    `,
    growSizes: {
      '1': css`
        flex-grow: 1;
      `,
      '2': css`
        flex-grow: 2;
      `,
      '3': css`
        flex-grow: 3;
      `,
      '4': css`
        flex-grow: 4;
      `,
      '5': css`
        flex-grow: 5;
      `,
      '6': css`
        flex-grow: 6;
      `,
      '7': css`
        flex-grow: 7;
      `,
      '8': css`
        flex-grow: 8;
      `,
      '9': css`
        flex-grow: 9;
      `,
      '10': css`
        flex-grow: 10;
      `,
    },
  };
};
