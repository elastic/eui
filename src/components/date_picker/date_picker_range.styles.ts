/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
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
