/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import type { UseEuiTheme } from '../../../services';

export const euiTableStickyHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  wrapper: css`
    position: sticky;
    inset-block-start: var(--euiTableStickyHeaderOffsetTop, 0);
    z-index: var(--euiTableStickyHeaderZIndex, 1);

    /* Remove from document flow by setting height to zero and allowing overflow.
       This addresses the issue of having duplicated headers or having
       to switch styles during scrolling, which often leads to a slight flicker
       due to imperfect scroll timing synchronization, and comes with
       added performance cost. */
    block-size: 0;
    overflow-block: visible;
  `,
  innerWrapper: css`
    /* Setting position: sticky and overflow properties on the same element
       causes the stickiness to break */
    overflow-inline: hidden;
  `,
  table: css`
    pointer-events: auto;
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
