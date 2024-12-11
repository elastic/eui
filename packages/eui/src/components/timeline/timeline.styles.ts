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

const _gutterSizeAdjustment = (gutterSize: string) => {
  return `
    gap: ${gutterSize};

    // The vertical line height needs to be adjusted with the gutter size
    [class*='euiTimelineItem-']:not(:last-child) > [class*='euiTimelineItemIcon-']::before {
      ${logicalCSS('height', `calc(100% + ${gutterSize})`)};
    }
  `;
};

// The vertical line should only appear when the EuiTimelineItem's
// are wrapped in a EuiTimeline. That's why these styles live here.
const timelineVerticalLine = ({ euiTheme }: UseEuiTheme) => {
  return `  
    [class*='euiTimelineItem-'] > [class*='euiTimelineItemIcon-']::before {
      content: '';
      position: absolute;
      ${logicalCSS('top', 0)};
      ${logicalCSS('border-left', euiTheme.border.thick)};
    }

    > [class*='euiTimelineItem-center']:first-child > [class*='euiTimelineItemIcon-']::before {
      ${logicalCSS('top', '50%')};
    }
  
    > [class*='euiTimelineItem-center']:last-child:not(:only-child) > [class*='euiTimelineItemIcon-']::before {
      ${logicalCSS('height', '50%')};
    }
  `;
};

export const euiTimelineStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiTimeline: css`
      display: flex;
      flex-direction: column;
      ${timelineVerticalLine(euiThemeContext)}
    `,
    m: css(_gutterSizeAdjustment(euiTheme.size.base)),
    l: css(_gutterSizeAdjustment(euiTheme.size.l)),
    xl: css(_gutterSizeAdjustment(euiTheme.size.xl)),
  };
};
