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
  euiFormControlDisabledStyles,
  euiFormControlReadOnlyStyles,
  euiFormControlDefaultShadow,
  euiFormControlInvalidStyles,
} from '../form.styles';

export const euiFormControlLayoutDelimitedStyles = (
  euiThemeContext: UseEuiTheme
) => {
  return {
    // Appended onto existing  `euiFormControlLayout` styles
    delimited: css``,
    disabled: css(euiFormControlDisabledStyles(euiThemeContext)),
    readOnly: css(euiFormControlReadOnlyStyles(euiThemeContext)),

    // Appended onto existing `euiFormControlLayout__childrenWrapper` styles
    childrenWrapper: {
      delimited: css`
        display: flex;
      `,
    },
  };
};
