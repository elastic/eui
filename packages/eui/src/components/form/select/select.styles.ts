/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiFormControlStyles, euiFormVariables } from '../form.styles';

export const euiSelectStyles = (euiThemeContext: UseEuiTheme) => {
  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVariables = euiFormVariables(euiThemeContext);

  return {
    euiSelect: css`
      appearance: none;
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

    // Ensure text descenders don't get cut off
    // by making line-height match the input height
    lineHeight: {
      removePadding: `padding-block: 0;`,
      uncompressed: `line-height: ${formVariables.controlHeight};`,
      compressed: `line-height: ${formVariables.controlCompressedHeight};`,
      inGroup: {
        uncompressed: `line-height: ${formVariables.controlLayoutGroupInputHeight}`,
        compressed: `line-height: ${formVariables.controlLayoutGroupInputCompressedHeight}`,
      },
    },
  };
};
