/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiRangeVariables } from './range.styles';

export const euiRangeTrackStyles = (euiThemeContext: UseEuiTheme) => {
  const { highContrastMode } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTrack: css`
      block-size: 100%; /* Don't overflow euiRangeWrapper */
      flex-grow: 1;
      position: relative; /* For positioning ticks/levels */
      align-self: flex-start; /* Adjust vertical alignment of input based on extras */

      &::after {
        content: '';
        display: block;
        position: absolute;
        inset-block-start: ${range.trackTopPositionWithoutTicks};
        inset-inline-start: 0;
        inline-size: ${range.trackWidth};
        /* Use border instead of height+background-color to account for Windows high contrast themes */
        border-block-start: ${range.trackHeight} solid ${range.trackColor};
        border-radius: ${range.trackBorderRadius};
        ${highContrastMode
          ? '@media (forced-colors:active) { opacity: 0.25; }'
          : ''}
      }
    `,
    hasTicks: css`
      margin-inline-start: 1em;
      margin-inline-end: 1em;

      &::after {
        inset-block-start: ${range.trackTopPositionWithTicks};
      }
    `,
    disabled: css`
      opacity: ${range.disabledOpacity};
    `,
    hasLevels: css``,
  };
};
