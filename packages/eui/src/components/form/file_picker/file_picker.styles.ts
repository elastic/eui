/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiFormControlStyles } from '../form.styles';

export const euiFilePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const formStyles = euiFormControlStyles(euiThemeContext);

  return {
    euiFilePicker: css`
      position: relative;
    `,

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // The input is an invisible dropzone / button
    euiFilePicker__input: css`
      position: absolute;
      inset: 0;
      opacity: 0;

      &:hover {
        cursor: pointer;
      }

      &:hover:disabled {
        cursor: not-allowed;
      }

      &:disabled {
        opacity: 0;
      }
    `,
  };
};
