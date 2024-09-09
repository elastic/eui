/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';

export const euiSelectableMessageStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSelectableMessage: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: ${euiTheme.size.s};
      text-align: center;
      word-wrap: break-word; /* Prevent really long input from overflowing the container */
    `,
    // Match border from selectable_list
    bordered: css`
      overflow: hidden;
      border: ${euiTheme.border.thin};
      border-radius: ${euiTheme.border.radius.medium};
    `,
  };
};
