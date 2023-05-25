/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiInlineEditReadModeStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiInlineEditReadMode: css``,

    // Override the cursor and allow users to highlight text when read mode is in the read only state
    // Once EuiEmptyButton has been converted to Emotion, remove this extra selector
    isReadOnly: css`
      &.euiButtonEmpty:disabled {
        cursor: text;
        color: ${euiTheme.colors.text};
        user-select: text;
      }
    `,
  };
};
