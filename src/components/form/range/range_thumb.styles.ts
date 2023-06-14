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
      ${euiCustomControl(euiThemeContext, { type: 'round' })}
      ${euiRangeThumbStyle(euiThemeContext)}
      content: '';
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: 50%;
      margin-block-start: ${mathWithUnits(
        range.thumbHeight,
        (x) => (x / 2) * -1
      )};
      pointer-events: none;
      z-index: ${range.thumbZIndex};

      &:focus {
        ${euiRangeThumbFocus(euiThemeContext)}
        outline: none;
      }
    `,
    hasTicks: css`
      inset-block-start: 0;
      margin-block-start: 0;
    `,
  };
};
