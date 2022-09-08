/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFormControlSize } from '../form.styles';
import { UseEuiTheme } from '../../../services';

export const euiRangeWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    // Base
    euiRangeWrapper: css`
      display: flex;
      align-items: center;

      > .euiFormControlLayout {
        /* 1 */
        inline-size: auto;

        &.euiFormControlLayout--group {
          flex-shrink: 0; /* 2 */
        }
      }
    `,
    regular: css`
      ${euiFormControlSize({
        euiThemeContext,
      })}
    `,
    compressed: css`
      ${euiFormControlSize({
        euiThemeContext,
        includeAlternates: 'compressed',
      })}
    `,
  };
};
