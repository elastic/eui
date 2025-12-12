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
  euiDisabledSelector,
  highContrastModeStyles,
} from '../../../global_styling';

export const euiSplitButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const primaryDisabledSelector = `.euiSplitButtonActionPrimary:is(${euiDisabledSelector})`;
  const secondaryDisabledSelector = `.euiSplitButtonActionSecondary:is(${euiDisabledSelector})`;
  const dividerSelector = `.euiSplitButton__divider`;

  return {
    euiSplitButton: css`
      display: inline-flex;
      flex-wrap: nowrap;

      &:has(${primaryDisabledSelector}):has(${secondaryDisabledSelector}) {
        ${dividerSelector} {
          ${highContrastModeStyles(euiThemeContext, {
            // When both buttons are disabled set as visual gap
            none: `
              border-color: transparent;
            `,
            // When both buttons are disabled set a disabled divider color
            preferred: `
              border-color: ${euiTheme.colors.borderBaseDisabled};
            `,
          })}
        }
      }
    `,
    // When both buttons are enabled set as visual gap
    fill: css`
      &:not(:has(${primaryDisabledSelector})):not(
          :has(${secondaryDisabledSelector})
        ) {
        ${dividerSelector} {
          border-color: transparent;
        }
      }
    `,
  };
};

export const euiSplitButtonActionStyles = {
  euiSplitButtonActionPrimary: css`
    z-index: 0;
    border-inline-end: none;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  `,
  euiSplitButtonActionSecondary: css`
    border-inline-start: none;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  `,
};

export const euiSplitButtonDividerStyles = (
  euiThemeContext: UseEuiTheme,
  color: string
) => {
  const { euiTheme } = euiThemeContext;

  return {
    divider: css`
      /* uses a border to ensure proper rendering in Windows high contrast themes */
      border-inline-start: ${euiTheme.border.width.thin} solid ${color};
    `,
  };
};
