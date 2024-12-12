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
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

export const euiTimelineItemIconStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiTimelineItemIcon: css`
      display: flex;
      position: relative;
      flex-grow: 0;
      justify-content: center;
      ${logicalCSS('margin-right', euiTheme.size.base)}
    `,
    euiTimelineItemIcon__content: css`
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          & > * {
            border: ${euiTheme.border.thin};
          }
        `,
      })}
    `,
    //  Vertical alignments
    top: css`
      align-items: flex-start;
    `,
    center: css`
      align-items: center;
    `,
  };
};
