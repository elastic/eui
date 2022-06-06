/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';

export const euiTimelineItemStyles = () => {
  return {
    euiTimelineItem: css`
      display: flex;

      &:first-child {
        > [class*='euiTimelineItemIcon-center']::before {
          ${logicalCSS('top', '50%')};
        }
      }

      &:last-child {
        > [class*='euiTimelineItemIcon-top']::before {
          display: none;
        }

        > [class*='euiTimelineItemIcon-center']::before {
          ${logicalCSS('top', '0')};
          ${logicalCSS('height', '50%')};
        }
      }
    `,
  };
};
