/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../../global_styling';
import { euiFormControlStyles, euiFormPlaceholderStyles } from '../form.styles';

export const euiFormControlButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formStyles = euiFormControlStyles(euiThemeContext);

  return {
    euiFormControlButton: css`
      ${formStyles.shared}
      ${formStyles.uncompressed}
      font-weight: ${euiTheme.font.weight.regular};
      transition: none;

      &:hover {
        &::before {
          display: none;
        }
      }

      &:focus {
        ${formStyles.focus}
      }

      &:disabled {
        ${formStyles.disabled}
      }
    `,
    isInvalid: css`
      ${formStyles.invalid}

      &:disabled {
        ${formStyles.invalid}
      }
    `,
    compressed: css`
      ${formStyles.compressed}
    `,
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),
    euiFormControlButton__content: css`
      justify-content: flex-start;
      ${logicalCSS('width', '100%')}
    `,
    textContent: css`
      flex: 1;
      text-align: start;
    `,
    placeholder: css`
      ${euiFormPlaceholderStyles(euiThemeContext)}
    `,
  };
};
