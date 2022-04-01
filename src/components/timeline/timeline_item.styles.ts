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
  // Base
  euiTimelineItem: css`
    display: flex;
    padding-bottom: ${euiTheme.size.base};
    min-height: calc(${euiTheme.size.base} * 3.5);

    &:last-of-type {
    .euiTimelineItemIcon {
      &::before {
        display: none;
      }
    }
  `,
  //  Vertical alignments
  top: css`
    .euiTimelineItemIcon {
      align-items: flex-start;
    }

    .euiTimelineItemEvent {
      align-self: flex-start;
    }
  `,
  center: css`
    .euiTimelineItemIcon {
      align-items: center;

      // when the vertical alignment is center the vertical line starts in the middle of the container
      &::before {
        top: 50%;
      }
    }

    .euiTimelineItemEvent {
      align-self: center;
    }
  `,
});
