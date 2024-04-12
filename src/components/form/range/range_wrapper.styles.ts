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
    euiRangeWrapper: css`
      display: flex;
      align-items: center;

      > .euiFormControlLayout {
        /* There's no way to target the layout of the extra input, so we must
         * use the descendant selector to allow the width to shrink. */
        inline-size: auto;
      }
    `,
    regular: css`
      ${euiFormControlSize(euiThemeContext)}
    `,
    compressed: css`
      ${euiFormControlSize(euiThemeContext, { compressed: true })}
    `,
    fullWidth: css`
      max-inline-size: 100%;
    `,
  };
};
