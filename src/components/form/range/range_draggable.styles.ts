/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import {
  euiRangeVariables,
  euiRangeThumbFocus,
  euiRangeThumbBoxShadow,
} from './range.styles';

export const euiRangeDraggableStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeDraggable: css`
      height: calc(${range.height} / 2);
      position: absolute;
      top: calc(${range.height} / 4);
      pointer-events: none;
      z-index: 2;

      &:not(.euiRangeDraggable--disabled) {
        .euiRangeDraggle__inner {
          cursor: grab;
          pointer-events: all;

          &:active {
            cursor: grabbing;
          }
        }
      }

      &:focus {
        outline: none;

        ~ .euiRangeThumb {
          ${euiRangeThumbFocus(euiThemeContext)}
        }
      }

      // in Chrome/FF/Edge we don't want to focus on click
      &:focus:not(:focus-visible) {
        ~ .euiRangeThumb {
          ${euiRangeThumbBoxShadow(euiThemeContext)}
          outline: none;
        }
      }

      &:focus-visible {
        outline: none;

        ~ .euiRangeThumb {
          ${euiRangeThumbFocus(euiThemeContext)}
        }
      }
    `,
    hasTicks: css`
      top: 0;
    `,
    disabled: css``,
    euiRangeDraggle__inner: css`
      position: absolute;
      left: ${range.thumbWidth};
      right: ${range.thumbWidth};
      top: 0;
      bottom: 0;
    `,
  };
};
