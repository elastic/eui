/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

const _gapAdjustment = (gap: string) => {
  return `
    gap: ${gap};

    // The vertical line height needs to be adjusted with the gap size
    [class*='euiTimelineItem-']:not(:last-child)::before {
      ${logicalCSS('height', `calc(100% + ${gap})`)};
    }
  `;
};

// The vertical line should only appear when the EuiTimelineItem's
// are wrapped in a EuiTimeline. That's why these styles live here.
const timelineVerticalLine = (euiTheme: UseEuiTheme['euiTheme']) => {
  return `  
    [class*='euiTimelineItem-']::before {
      content: '';
      position: absolute;
      ${logicalCSS('top', 0)};
      ${logicalCSS('left', `calc(${euiTheme.size.xxl} / 2)`)};
      ${logicalCSS('width', euiTheme.size.xxs)};
      background-color: ${euiTheme.colors.lightShade};
    }

    > [class*='euiTimelineItem-center']:first-child::before {
      ${logicalCSS('top', '50%')};
    }
  
    > [class*='euiTimelineItem-center']:last-child:not(:only-child)::before {
      ${logicalCSS('height', '50%')};
    }
  `;
};

export const euiTimelineStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiTimeline: css`
      display: flex;
      flex-direction: column;
      ${timelineVerticalLine(euiTheme)}
    `,
    m: css(_gapAdjustment(euiTheme.size.base)),
    l: css(_gapAdjustment(euiTheme.size.l)),
    xl: css(_gapAdjustment(euiTheme.size.xl)),
  };
};
