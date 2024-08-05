/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';

export const euiSelectableTemplateSitewideStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSelectableTemplateSitewide: css`
      /* Override .euiSelectable flex display, which fixes the anchor positioning for mobile popoverButtons */
      display: block;
    `,

    // Override EuiSelectable's default item underline
    euiSelectableTemplateSitewide__listItem: css`
      &:hover,
      &.euiSelectableListItem-isFocused {
        &:not([aria-disabled='true']) {
          .euiSelectableListItem__text {
            text-decoration: none;
          }

          .euiSelectableTemplateSitewide__listItemTitle {
            text-decoration: underline;
          }
        }
      }
    `,
  };
};
