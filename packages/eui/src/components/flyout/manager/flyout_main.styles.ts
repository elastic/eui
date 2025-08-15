/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

/**
 * Emotion styles for the main (parent) managed flyout.
 * Adds subtle borders when a child flyout is present, depending on side.
 *
 * Returns an object with:
 * - `hasChildFlyout.left` and `.right`: border styles to separate from child.
 */
export const euiMainFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const {
    euiTheme: {
      border: { thin },
    },
  } = euiThemeContext;

  return {
    hasChildFlyout: {
      left: css`
        box-shadow: none;
        border-inline-end: ${thin};
      `,
      right: css`
        box-shadow: none;
        border-inline-start: ${thin};
      `,
    },
  };
};
