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

export const euiRangeTrackSize = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    height: ${range.trackHeight};
    width: ${range.trackWidth};
  `;
};

export const euiRangeTrackStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiRangeTrack: css`
      height: 100%; // Don't overflow euiRangeWrapper
      flex-grow: 1;
      position: relative; // for positioning ticks/levels
      align-self: flex-start; // Adjust vertical alignment of input based on extras

      &::after {
        content: '';
        display: block;
        background: ${range.trackColor};
        border-radius: ${range.trackBorderRadius};
        position: absolute;
        top: ${range.trackTopPositionWithoutTicks};
        left: 0;
        ${euiRangeTrackSize(euiThemeContext)};
      }
    `,
    hasTicks: css`
      margin-left: 1em;
      margin-right: 1em;

      .euiRangeTooltip {
        top: ${euiTheme.size.xxs};
      }

      &::after {
        top: ${range.trackTopPositionWithTicks};
      }
    `,
    disabled: css`
      opacity: ${range.disabledOpacity};
    `,
    hasLevels: css``,
  };
};
