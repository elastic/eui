/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import { euiRangeVariables, euiRangeThumbFocus } from './range.styles';

export const euiRangeDraggableStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeDraggable: css`
      block-size: ${mathWithUnits(range.height, (x) => x / 2)};
      position: absolute;
      inset-block-start: ${mathWithUnits(range.height, (x) => x / 4)};
      pointer-events: none;
      z-index: ${range.thumbZIndex};

      &:focus {
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
  };
};

export const euiRangeDraggableInnerStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeDraggable__inner: css`
      position: absolute;
      inset-inline: ${range.thumbWidth};
      inset-block: 0;
    `,
    enabled: css`
      cursor: grab;
      pointer-events: all;

      &:active {
        cursor: grabbing;
      }
    `,
    disabled: css``,
  };
};
