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
  euiFontSize,
  euiTextTruncate,
  logicalCSS,
} from '../../../global_styling';

export const euiSelectableListItemVariables = ({ euiTheme }: UseEuiTheme) => {
  const lighterBorder = euiTheme.components.selectableListItemBorderColor;
  return {
    border: `${euiTheme.border.width.thin} solid ${lighterBorder}`,
    paddingHorizontal: euiTheme.size.m,
    paddingVertical: euiTheme.size.xs,
  };
};

export const euiSelectableListItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { border, paddingHorizontal, paddingVertical } =
    euiSelectableListItemVariables(euiThemeContext);

  return {
    euiSelectableListItem: css`
      display: inline-flex; /* Necessary to make sure it doesn't force the whole popover to be too wide */
      ${logicalCSS('width', '100%')}
      line-height: ${euiFontSize(euiThemeContext, 'm').lineHeight};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      text-align: start;
      cursor: pointer;
      overflow: hidden;

      &:not(:last-of-type) {
        ${logicalCSS('border-bottom', border)}
      }

      &[aria-disabled='true'] {
        color: ${euiTheme.colors.textDisabled};
        cursor: not-allowed;
      }

      &:hover,
      &.euiSelectableListItem-isFocused {
        &:not([aria-disabled='true']) {
          color: ${euiTheme.colors.textPrimary};
          background-color: ${euiTheme.focus.backgroundColor};

          .euiSelectableListItem__text {
            text-decoration: underline;
          }
        }
      }
    `,
    padding: {
      none: css``,
      s: css`
        ${logicalCSS('padding-vertical', paddingVertical)}
        ${logicalCSS('padding-horizontal', paddingHorizontal)}
      `,
    },

    // Child elements

    euiSelectableListItem__content: css`
      ${logicalCSS('width', '100%')}
      display: flex;
      align-items: center;
    `,

    euiSelectableListItem__text: css`
      flex-grow: 1; /* Pushes appended content to the far right */
    `,
    textWrap: {
      truncate: css(euiTextTruncate()),
      wrap: css``,
    },

    euiSelectableListItem__prepend: css`
      flex-shrink: 0;
      ${logicalCSS('margin-right', paddingHorizontal)}
    `,
    euiSelectableListItem__append: css`
      flex-shrink: 0;
      ${logicalCSS('margin-left', paddingHorizontal)}
    `,
    get euiSelectableListItem__icon() {
      return this.euiSelectableListItem__prepend;
    },
  };
};
