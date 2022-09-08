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
      block-size: calc(${range.height} / 2);
      position: absolute;
      inset-block-start: calc(${range.height} / 4);
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
      inset-block-start: 0;
    `,
    disabled: css``,
    euiRangeDraggle__inner: css`
      position: absolute;
      inset-inline-start: ${range.thumbWidth};
      inset-inline-end: ${range.thumbWidth};
      inset-block-start: 0;
      inset-block-end: 0;
    `,
  };
};
