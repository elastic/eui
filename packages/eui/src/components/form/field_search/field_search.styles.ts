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

export const euiFieldSearchStyles = (euiThemeContext: UseEuiTheme) => {
  const formStyles = euiFormControlStyles(euiThemeContext);

  return {
    euiFieldSearch: css`
      /* Fix for Safari to ensure that it renders like a normal text input
       * and doesn't add extra spacing around text */
      /* stylelint-disable property-no-vendor-prefix */
      -webkit-appearance: textfield;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
      }

      ${formStyles.shared}

      &:invalid {
        ${formStyles.invalid}
      }

      &:focus {
        ${formStyles.focus}
      }

      &:disabled {
        ${formStyles.disabled}
      }

      &[readOnly] {
        ${formStyles.readOnly}
      }

      &:autofill {
        ${formStyles.autoFill}
      }
    `,

    // Skip the css() on the default height to avoid generating a className
    uncompressed: formStyles.uncompressed,
    compressed: css(formStyles.compressed),

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // Layout modifiers
    inGroup: css(formStyles.inGroup),
  };
};
