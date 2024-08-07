/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  euiScrollBarStyles,
  euiTextBreakWord,
} from '../../../global_styling';

export const LIST_MAX_HEIGHT = 200;

export const euiComboBoxOptionListStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiComboBoxOptionList: css`
      ${logicalCSS('max-height', `${LIST_MAX_HEIGHT}px`)}
      overflow: hidden;

      /* Kibana FTR affordance - without this, Selenium complains about the overlaid
        text intercepting the button click. Since 'title' is always present, and
        users can't highlight or copy combobox options anyway, we might as well
        disable clicks on text */
      .euiTextTruncate {
        pointer-events: none;
      }
    `,

    euiComboBoxOptionList__virtualization: css`
      ${euiScrollBarStyles(euiThemeContext)}
    `,

    euiComboBoxOptionsList__empty: css`
      padding: ${euiTheme.size.s};
      text-align: center;
      /* Prevent really long input from overflowing the container */
      ${euiTextBreakWord()}
    `,
  };
};
