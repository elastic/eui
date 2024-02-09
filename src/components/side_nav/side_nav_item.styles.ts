/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiFontSize, logicalCSS } from '../../global_styling';

export const euiSideNavItemButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSideNavItemButton: css`
      display: block;
      ${logicalCSS('width', '100%')} /* Needed for nested items */
      padding-block: ${euiTheme.size.xxs};

      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${euiFontSize(euiThemeContext, 'm').lineHeight};

      /* Text-align defaults to center, so we have to override that. */
      text-align: start;
      /* Color the text at the item level and then have the button inherit so overrides are easier */
      color: inherit;

      &:is(a, button):not(:disabled) {
        &:hover {
          cursor: pointer;
        }

        &:hover,
        &:focus {
          /* Restrict the underline to the button __label so it doesn't affect other components that might live within */
          .euiSideNavItemButton__label {
            text-decoration: underline;
          }
        }
      }

      &:disabled {
        cursor: not-allowed;
        color: ${euiTheme.colors.disabledText};
      }
    `,
    isSelected: css`
      color: ${euiTheme.colors.primaryText};
      font-weight: ${euiTheme.font.weight.bold};

      /* Restrict the underline to the button __label so it doesn't affect other components that might live within */
      .euiSideNavItemButton__label {
        text-decoration: underline;
      }
    `,
  };
};
