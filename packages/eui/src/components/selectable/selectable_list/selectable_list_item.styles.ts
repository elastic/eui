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
  highContrastModeStyles,
  logicalCSS,
  logicalShorthandCSS,
  mathWithUnits,
} from '../../../global_styling';

export const euiSelectableListItemVariables = ({ euiTheme }: UseEuiTheme) => {
  return {
    spacingHorizontal: euiTheme.size.s,
    spacingVertical: euiTheme.size.xs,
  };
};

export const euiSelectableListItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { spacingHorizontal, spacingVertical } =
    euiSelectableListItemVariables(euiThemeContext);

  const textPadding = {
    horizontal: euiTheme.size.xs,
    vertical: mathWithUnits(
      [spacingVertical, euiTheme.size.xxs],
      (x, y) => x + y
    ),
  };

  const sharedFlexStyles = `
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `;

  return {
    euiSelectableListItem: css`
      display: inline-flex; /* Necessary to make sure it doesn't force the whole popover to be too wide */
      ${logicalCSS('width', '100%')}
      border-radius: ${euiTheme.border.radius.small};
      min-block-size: ${euiTheme.size.xl};
      ${logicalShorthandCSS('padding', `0 ${spacingHorizontal}`)}
      line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      text-align: start;
      cursor: pointer;
      overflow: hidden;

      &[aria-disabled='true'] {
        color: ${euiTheme.colors.textDisabled};
        cursor: not-allowed;
      }

      &:not([aria-disabled='true']) {
        &:hover,
        &.euiSelectableListItem-isFocused {
          background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};

          ${highContrastModeStyles(euiThemeContext, {
            preferred: `
              text-decoration: underline;
            `,
          })}
        }
      }
    `,
    singleSelection: css`
      color: ${euiTheme.colors.textPrimary};
      background-color: ${euiTheme.colors.backgroundBaseInteractiveSelect};

      &:not([aria-disabled='true']) {
        &:hover,
        &.euiSelectableListItem-isFocused {
          background-color: ${euiTheme.colors
            .backgroundBaseInteractiveSelectHover};
        }

        .euiSelectableListItem__prepend,
        .euiSelectableListItem__append {
          .euiIcon {
            color: ${euiTheme.colors.textPrimary};
          }
        }
      }
    `,

    // Child elements
    euiSelectableListItem__content: css`
      ${logicalCSS('width', '100%')}
      display: flex;
      align-items: center;
      gap: ${spacingHorizontal};
    `,

    euiSelectableListItem__text: css`
      flex-grow: 1; /* Pushes appended content to the far right */
      ${logicalCSS('padding-horizontal', textPadding.horizontal)}
      ${logicalCSS('padding-vertical', textPadding.vertical)}

      /* Apply expected text spacing for flat children for user convenience.
      Requires manual handling if nested */
      > * + * {
        ${logicalCSS('margin-top', euiTheme.size.xxs)}
      }
    `,
    textWrap: {
      truncate: css(euiTextTruncate()),
      wrap: css``,
    },

    euiSelectableListItem__prepend: css`
      ${sharedFlexStyles}
      gap: ${spacingHorizontal};
    `,
    euiSelectableListItem__append: css`
      ${sharedFlexStyles}
      gap: ${spacingHorizontal};
    `,
    euiSelectableListItem__icon: css`
      ${sharedFlexStyles}
    `,
  };
};
