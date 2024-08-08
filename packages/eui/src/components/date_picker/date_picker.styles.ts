/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';
import { euiShadowMedium } from '../../themes/amsterdam/global_styling/mixins';

export const euiDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDatePicker: css`
      display: block;
    `,
    inline: css`
      .euiFormControlLayout {
        ${logicalCSS('height', 'auto')}
        ${logicalCSS('width', 'fit-content')}
        background-color: transparent;
        box-shadow: none;
        padding: 0;
      }

      /* TODO: Extra specificity required to override .euiFormControlLayoutDelimited styles */
      .euiFormControlLayoutDelimited .euiFormControlLayout__childrenWrapper {
        background-color: transparent;
        flex-direction: column; /* Render form control icons below date picker */
      }

      .euiFormControlLayoutIcons {
        justify-content: center;
        ${logicalCSS('padding-bottom', euiTheme.size.s)}
      }
    `,
    shadow: css`
      .euiFormControlLayout {
        ${euiShadowMedium(euiThemeContext)}
      }

      /* TODO: Extra specificity required to override .euiFormControlLayoutDelimited styles */
      .euiFormControlLayoutDelimited .euiFormControlLayout__childrenWrapper {
        background-color: ${euiTheme.colors.emptyShade};
      }
    `,
  };
};
