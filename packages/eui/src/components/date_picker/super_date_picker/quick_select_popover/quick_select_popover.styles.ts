/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS } from '../../../../global_styling';
import { euiFormMaxWidth } from '../../../form/form.styles';

export const euiQuickSelectPopoverStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  return {
    euiQuickSelectPopover: css`
      ${logicalCSS('width', formMaxWidth)}
      ${logicalCSS('max-width', '100%')}
    `,
    euiQuickSelectPopoverButton: css`
      ${logicalCSS('border-top-right-radius', 0)}
      ${logicalCSS('border-bottom-right-radius', 0)}

      /* Adds slightly more width between the calendar icon and the dropdown arrow */
      .euiIcon {
        ${logicalCSS('width', euiTheme.size.base)}
      }
    `,
    euiQuickSelectPopoverButton__content: css`
      gap: ${euiTheme.size.xs};
    `,
  };
};
