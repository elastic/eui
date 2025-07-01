/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import {
  euiFormControlStyles,
  euiFormControlDefaultShadow,
  euiFormControlText,
} from '../../form/form.styles';

export const euiComboBoxInputStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );
  const formStyles = euiFormControlStyles(euiThemeContext);

  return {
    // Wrapper which visually mimics a form control
    euiComboBoxInputWrapper: css`
      ${euiFormControlDefaultShadow(euiThemeContext)}
      display: flex;

      ${isRefreshVariant &&
      `
        &:focus-within {
          ${formStyles.focus}
        }
      `}
    `,
    multiSelect: css`
      flex-wrap: wrap;
    `,
    uncompressed: `
      ${formStyles.uncompressed}
      ${logicalCSS('height', 'auto')}
      ${logicalCSS('padding-vertical', euiTheme.size.s)}
      ${logicalCSS(
        'padding-left',
        isRefreshVariant ? euiTheme.size.m : euiTheme.size.s
      )}
      column-gap: ${euiTheme.size.s};
      row-gap: ${euiTheme.size.xs};
    `,
    compressed: css`
      ${formStyles.compressed}
      ${logicalCSS('height', 'auto')}
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-left', euiTheme.size.xs)}
      column-gap: ${euiTheme.size.xs};
      row-gap: ${euiTheme.size.xxs};
    `,
    plainText: {
      plainText: css`
        align-items: center;
        cursor: text;
      `,
      compressed: `
        ${logicalCSS('padding-left', euiTheme.size.s)}
      `,
      uncompressed: `
        ${logicalCSS('padding-left', euiTheme.size.m)}
      `,
    },

    invalid: css(formStyles.invalid),
    disabled: css(formStyles.disabled),
    open: css`
      ${formStyles.focus}
    `,
    inGroup: css(formStyles.inGroup),

    // Actual input element, which has variable width depending on its value
    euiComboBoxInput: css`
      /* Force input height to expand to fill this element. */
      ${logicalCSS('height', euiTheme.size.l)}
      ${logicalCSS('min-width', '2px')}
      ${logicalCSS('max-width', '100%')}

      /* Reset input appearance to mimic text */
      ${euiFormControlText(euiThemeContext)}
      background: transparent;

      &:disabled {
        color: ${euiTheme.colors.textDisabled};
      }

      /* Ensure that no input states are visible on the hidden input */
      /* stylelint-disable declaration-no-important */
      appearance: none !important;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      /* stylelint-enable declaration-no-important */
    `,

    // EuiFormControlLayout overrides
    formLayout: {
      euiComboBox__formControlLayout: css``,
      // Allow the form control to expand to any height to accommodate multiple rows of pills
      multiSelect: css`
        ${logicalCSS('height', 'auto')}
      `,
    },
  };
};
