/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import { euiFormControlStyles, euiFormVariables } from '../form.styles';

export const euiTextAreaStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVars = euiFormVariables(euiThemeContext);

  return {
    euiTextArea: css`
      ${formStyles.shared}

      /* Give more spacing between multiple lines */
      line-height: ${euiTheme.font.lineHeightMultiplier};

      /* <textarea>s default to 'inline-block', which causes an extra 2-3px of
       * unnecessary height within its parent 'block' form control wrapper.
       * @see https://stackoverflow.com/a/27536461/4294462 */
      display: block;

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
    resize: {
      vertical: css`
        resize: vertical;
      `,
      horizontal: css`
        resize: horizontal;
      `,
      both: css`
        resize: both;
      `,
      none: css`
        resize: none;
      `,
    },

    // Skip the css() on the default height to avoid generating a className
    uncompressed: `
      ${logicalCSS('height', 'auto')}
      padding: ${formVars.controlPadding};
      border-radius: ${formVars.controlBorderRadius};
    `,
    compressed: css`
      ${logicalCSS('height', 'auto')}
      padding: ${formVars.controlCompressedPadding};
      border-radius: ${formVars.controlCompressedBorderRadius};
    `,

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // EuiFormControlLayout styles
    formControlLayout: {
      euiTextArea: css`
        /* TODO: Remove extra && specificity override once EuiFormControlLayout is converted to Emotion */
        && {
          ${logicalCSS('height', 'auto')}
        }

        .euiFormControlLayoutIcons {
          ${logicalCSS('top', 'auto')}
          ${logicalCSS('bottom', formVars.controlPadding)}
        }
      `,
    },
  };
};
