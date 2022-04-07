/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiTimelineItemStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiTimelineItem: css`
    display: flex;

    &:not(:last-of-type) {
      padding-bottom: ${euiTheme.size.xl};
    }

    &:first-of-type {
      > [class*='euiTimelineItemIcon-center']::before {
        top: 50%;
        // Adding to the height the padding bottom from the parent container
        height: calc(50% + ${euiTheme.size.xl});
      }
    }

    &:last-of-type {
      > [class*='euiTimelineItemIcon-top']::before {
        display: none;
      }

      > [class*='euiTimelineItemIcon-center']::before {
        top: 0;
        height: 50%;
      }
    }
  `,
});
