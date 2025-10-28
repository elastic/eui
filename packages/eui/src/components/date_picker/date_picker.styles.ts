/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowMedium } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';
import {
  euiFormControlDisabledStyles,
  euiFormControlReadOnlyStyles,
  euiFormControlDefaultShadow,
  euiFormControlInvalidStyles,
} from '../form/form.styles';

export const euiDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDatePicker: css`
      display: block;
    `,

    inline: {
      inline: css`
        .euiFormControlLayout {
          ${logicalCSS('height', 'auto')}
          ${logicalCSS('width', 'fit-content')}
          border: none;
          padding: 0;

          /* removes form layout border */
          &::after {
            display: none;
          }
        }

        .euiFormControlLayout__childrenWrapper {
          flex-direction: column; /* Render form control icons below date picker */
        }

        .euiFormControlLayoutIcons {
          justify-content: center;
          ${logicalCSS('padding-bottom', euiTheme.size.s)}
        }
      `,
      // Skip css`` to avoid generating an Emotion className
      noShadow: `
        .euiFormControlLayout {
          background-color: transparent;
        }
      `,
      shadow: css`
        .euiFormControlLayout {
          background-color: ${euiTheme.colors.emptyShade};
          ${euiShadowMedium(euiThemeContext, {
            borderAllInHighContrastMode: true,
          })}
        }
      `,
      // Needs to come before shadow CSS so that it doesn't override their background-colors
      invalid: css`
        .euiFormControlLayout {
          ${euiFormControlDefaultShadow(euiThemeContext, { withBorder: false })}
          ${euiFormControlInvalidStyles(euiThemeContext)}
        }
      `,
      // Should come after shadow CSS to override their background-colors
      disabled: css`
        .euiFormControlLayout {
          ${euiFormControlDisabledStyles(euiThemeContext)}
        }
      `,
      readOnly: css`
        .euiFormControlLayout {
          ${euiFormControlReadOnlyStyles(euiThemeContext)}
        }
      `,
    },

    inGroup: css`
      .euiFormControlLayout__childrenWrapper {
        .euiPopover,
        .react-datepicker__input-container {
          ${logicalCSS('height', '100%')}
        }
      }
    `,
  };
};
