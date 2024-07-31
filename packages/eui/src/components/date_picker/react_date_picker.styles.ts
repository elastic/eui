/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Needs to use vanilla `css` to pass a className directly to react-datepicker
import { css } from '@emotion/css';

import { UseEuiTheme } from '../../services';
import { euiMaxBreakpoint, euiFontSize } from '../../global_styling';

export const euiReactDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiReactDatePicker: css`
      display: flex;
      justify-content: center;
      padding: ${euiTheme.size.s};
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      color: ${euiTheme.colors.text};
      border-radius: ${euiTheme.border.radius.medium};

      &.react-datepicker--non-interactive {
        pointer-events: none;
      }

      .react-datepicker__focusTrap {
        display: flex;
        justify-content: center;
      }

      /* On small screens put the times at the bottom */
      ${euiMaxBreakpoint(euiThemeContext, 's')} {
        &,
        .react-datepicker__focusTrap {
          flex-direction: column;
        }
      }
    `,
  };
};
