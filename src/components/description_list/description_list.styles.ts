/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

export const euiDescriptionListStyles = () => {
  return {
    euiDescriptionList: css``,

    // Flex display for column and responsive column
    column: css`
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
    `,

    //Alignment modifiers
    center: css`
      text-align: center;
    `,
    left: css``,
  };
};
