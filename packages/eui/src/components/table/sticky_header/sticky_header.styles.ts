/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

export const euiTableStickyHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  wrapper: css`
    position: sticky;
    inset-block-start: var(--euiTableStickyHeaderOffsetTop, 0);
    z-index: var(--euiTableStickyHeaderZIndex, 1);
    overflow-inline: hidden;
  `,
  header: css`
    th::after {
      content: '';
      display: block;
      inline-size: 100%;
      block-size: ${euiTheme.border.width.thin};
      background-color: ${euiTheme.border.color};
    }
  `,
});
