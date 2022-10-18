/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiTabStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTab: css`
      display: flex;
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      font-weight: ${euiTheme.font.weight.semiBold};
      gap: ${euiTheme.size.s};

      &:focus {
        background-color: transparent;
        outline-offset: -${euiTheme.focus.width};
      }

      .euiTab__content {
        color: ${euiTheme.colors.text};

        &:hover {
          text-decoration: underline;
        }
      }
    `,

    selected: css`
      box-shadow: inset 0 calc(${euiTheme.border.width.thick} * -1) 0
        ${euiTheme.colors.primary};
      .euiTab__content {
        color: ${euiTheme.colors.primaryText};
      }
    `,

    disabled: css`
      cursor: not-allowed;

      .euiTab {
        box-shadow: inset 0 calc(${euiTheme.border.width.thin} * -1) 0
          ${euiTheme.colors.disabledText};
      }

      .euiTab__prepend,
      .euiTab__append {
        color: ${euiTheme.colors.disabledText};
      }

      .euiTab.euiTab__isSelected {
        box-shadow: inset 0 calc(${euiTheme.border.width.thick} * -1) 0
          ${euiTheme.colors.disabledText};
      }

      /* Specificity to get the color applied properly */
      span.euiTab__content {
        color: ${euiTheme.colors.disabledText};

        &:hover {
          text-decoration: none;
        }
      }
    `,
  };
};
