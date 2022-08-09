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
  euiRangeThumbStyle,
  euiRangeThumbFocus,
  euiRangeVariables,
} from './range.styles';
import { euiCustomControl } from '../form.styles';

export const euiRangeThumbStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeThumb: css`
      ${euiCustomControl({ euiThemeContext: euiThemeContext, type: 'round' })};
      ${euiRangeThumbStyle(euiThemeContext)};
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: calc((${range.thumbHeight} / 2) * -1);
      pointer-events: none;
      z-index: 2; // higher than .euiRangeHighlight that is 1

      &:focus {
        ${euiRangeThumbFocus(euiThemeContext)};
        outline: none;
      }

      &:focus:focus-visible {
        outline: none;
      }
    `,
    hasTicks: css`
      top: 0;
      margin-top: 0;
    `,
  };
};
