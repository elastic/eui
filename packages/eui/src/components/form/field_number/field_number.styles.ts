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

export const euiFieldNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { colorMode } = euiThemeContext;

  const formStyles = euiFormControlStyles(euiThemeContext);

  return {
    euiFieldNumber: css`
      ${formStyles.shared}

      /* Force the browser number stepper UI to follow EUI's light/dark mode */
      color-scheme: ${colorMode === 'DARK' ? 'dark' : 'light'};

      &:is(:invalid, [aria-invalid='true']):not(
          .euiFormControlLayoutDelimited__input,
          :focus
        ) {
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
    controlOnly: css`
      .euiFormControlLayout--group & {
        ${formStyles.inGroup}
      }
    `,
  };
};
