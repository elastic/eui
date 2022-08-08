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

export const euiRangeTrackSize = (
  euiThemeContext: UseEuiTheme,
  compressed?: boolean
) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    height: ${range.trackHeight};
    width: ${range.trackWidth};

    ${
      compressed &&
      `
        height: ${range.trackCompressedHeight};
      `
    }
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
        border-radius: ${range.trackRadius};
        position: absolute;
        left: 0;
        ${euiRangeTrackSize(euiThemeContext)}
      }

      .euiRangeTick {
        // removing 1px to prevent label getting cut in Safari
        padding-top: calc((${range.trackHeight} * 2) - 1px);
      }

      &:not(.euiRangeTrack--hasTicks)::after {
        top: calc(50% - (${range.trackHeight} / 2));
      }
    `,
    hasTicks: css`
      margin-left: 1em;
      margin-right: 1em;

      .euiRangeTooltip {
        top: ${euiTheme.size.xxs};
      }

      &::after {
        top: calc(${range.thumbHeight} - (${range.trackHeight} * 2));
      }
    `,
    disabled: css`
      opacity: ${range.disabledOpacity};
    `,
    hasLevels: css``,
    regular: css`
      .euiRangeTicks {
        height: calc(${range.height} - ${range.thumbHeight});
        top: ${range.thumbHeight};
      }
    `,
    compressed: css`
      &::after {
        ${euiRangeTrackSize(euiThemeContext, true)}
      }

      .euiRangeTicks {
        height: calc(${range.compressedHeight} + ${range.thumbHeight});
        top: ${range.trackHeight};
      }

      .euiRangeTick {
        padding-top: ${range.trackHeight}px;
      }

      &.euiRangeTrack--hasTicks::after {
        top: calc(${range.thumbHeight} - (${range.trackCompressedHeight} / 2));
      }

      &:not(.euiRangeTrack--hasTicks)::after {
        top: calc(50% - (${range.trackCompressedHeight} / 2));
      }

      .euiRangeThumb--hasTicks {
        top: 0;
      }
    `,
  };
};
