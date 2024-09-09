/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS, mathWithUnits } from '../../../../global_styling';

export const euiAbsoluteTabDateFormStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiAbsoluteTabDateForm: css`
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${logicalCSS('padding-bottom', euiTheme.size.s)}
    `,
    euiAbsoluteTabDateForm__submit: css`
      flex-shrink: 0;
    `,
    euiAbsoluteTabDateForm__row: css`
      flex-grow: 1;

      /* CSS hack to make the help/error text extend to the submit button.
       * We can't actually put the submit button within an EuiFormRow due to
       * cloneElement limitations (https://github.com/elastic/eui/issues/2493#issuecomment-561278494)
       * TODO: Remove this and clean up DOM rendering once we can
       */
      .euiFormRow__text {
        ${logicalCSS(
          'margin-right',
          mathWithUnits(
            [euiTheme.size.xl, euiTheme.size.s],
            (submitButtonSize, gapSize) => -1 * (submitButtonSize + gapSize)
          )
        )}
      }
    `,
  };
};
