/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../../services';
import { _buttonStyles } from '../super_date_picker.styles';

export const euiDatePopoverButtonStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiDatePopoverButton: css`
      ${_buttonStyles(euiThemeContext)}
    `,
    now: css`
      /* !important needed to override date range picker nested styles */
      flex-grow: 0.5 !important; /* stylelint-disable-line declaration-no-important */
    `,
  };
};
