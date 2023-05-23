/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { euiShadowMedium } from '../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme } from '../../services';
import { euiFormVariables } from '../form/form.styles';

export const euiDatePickerRangeStyles = (euiThemeContext: UseEuiTheme) => {
  const { controlLayoutGroupInputHeight } = euiFormVariables(euiThemeContext);

  return {
    euiDatePickerRange: css`
      .euiFieldText.euiDatePicker {
        // Needed for correct focus/invalid box-shadow styles
        ${logicalCSS('height', controlLayoutGroupInputHeight)}
      }
    `,
  };
};

export const euiDatePickerRangeInlineStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    inline: css`
      .euiFormControlLayoutDelimited {
        // Reset form control styling
        ${logicalCSS('height', 'auto')}
        ${logicalCSS('width', 'fit-content')}
        ${logicalCSS('max-width', '100%')}
        background-color: transparent;
        box-shadow: none;

        .euiFormControlLayout__childrenWrapper {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-rows: auto;
          align-items: stretch;
          background-color: transparent;
        }

        // Fix --group height when append/prepend are present
        &.euiFormControlLayout--group {
          & > *,
          .euiFormControlLayoutDelimited__delimiter {
            ${logicalCSS('height', 'auto')}
          }
        }

        // Display form control icons below both date pickers
        .euiFormControlLayoutIcons {
          justify-content: center;
          grid-column: 1 / span 3;
          ${logicalCSS('height', 'auto')}
          ${logicalCSS('padding-bottom', euiTheme.size.s)}
        }
      }

      // Make sure the inline date picker sets is absolute positioning based off the correct parent
      .react-datepicker {
        position: relative;
      }

      // The time list creates some weird spacing when inline. Remove its padding to make it less horizontally unbalanced
      .react-datepicker__time-list {
        padding: 0;
      }
    `,
    shadow: css`
      .euiFormControlLayoutDelimited {
        ${euiShadowMedium(euiThemeContext)}

        .euiFormControlLayout__childrenWrapper {
          background-color: ${euiTheme.colors.emptyShade};
        }
      }
    `,
  };
};
