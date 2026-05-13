/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, mathWithUnits } from '@elastic/eui-theme-common';

import {
  euiFontSize,
  euiTextTruncate,
  highContrastModeStyles,
  logicalCSS,
} from '../../global_styling';

export const euiListItemVariables = ({ euiTheme }: UseEuiTheme) => {
  const spacing = {
    horizontal: euiTheme.size.s,
    vertical: euiTheme.size.xs,
  };

  const textPadding = {
    horizontal: euiTheme.size.xs,
    vertical: mathWithUnits(
      [spacing.vertical, euiTheme.size.xxs],
      (x, y) => x + y
    ),
  };

  return {
    spacing,
    textPadding,
  };
};

const listItemCommonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return `
    display: inline-flex; /* Necessary to make sure it doesn't force the whole popover to be too wide */
    align-items: center;
    ${logicalCSS('width', '100%')}
    border-radius: ${euiTheme.border.radius.small};
    line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
    font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    color: ${euiTheme.colors.textParagraph};
    overflow: hidden;
  `;
};

export const euiListItemLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { spacing, textPadding } = euiListItemVariables(euiThemeContext);

  // uses `aria-disabled` only as not all variants can have a native `:disabled` state
  const notDisabledSelector = `&:not([aria-disabled="true"])`;
  const sharedFlexStyles = `
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `;
  const highlightedStyles = `
    ${notDisabledSelector} {
      background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          text-decoration: underline;
        `,
      })}
    }
  `;

  return {
    euiListItemLayout: css`
      ${listItemCommonStyles(euiThemeContext)}
      ${logicalCSS('padding-horizontal', spacing.horizontal)}
    `,
    euiListItemLayout__action: css`
      display: flex;
      flex-grow: 1;
      ${logicalCSS('width', '100%')}
      color: inherit;
      overflow: hidden;
    `,
    euiListItemLayout__content: css`
      ${logicalCSS('width', '100%')}
      display: flex;
      align-items: center;
      gap: ${spacing.horizontal};
    `,
    euiListItemLayout__text: css`
      flex-grow: 1; /* Pushes appended content to the far right */
      ${logicalCSS('padding-vertical', textPadding.vertical)}
      ${euiFontSize(euiThemeContext, 's')}
      text-align: start;

      /* Workaround for decent alingment for custom flex wrapper content */
      > *:only-child,
      > *:first-child {
        vertical-align: middle;
      }

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

    euiListItemLayout__prepend: css`
      ${sharedFlexStyles}
      gap: ${spacing.horizontal};
    `,
    euiListItemLayout__append: css`
      ${sharedFlexStyles}
      gap: ${spacing.horizontal};
    `,
    euiListItemLayout__icon: css`
      ${sharedFlexStyles}
    `,
    isInteractive: css`
      cursor: pointer;

      &:hover {
        ${highlightedStyles}
      }
    `,
    isDisabled: css`
      color: ${euiTheme.colors.textDisabled};
      cursor: not-allowed;
      background-color: transparent;
    `,
    buttonIsDisabled: css`
      /* prevent user (mouse) interactions for custom disabled buttons.
      Covers user interaction only. Programmatic event handling is done in the \`useEuiDisabledElement\` hook */
      &[aria-disabled='true'] {
        pointer-events: none;

        > * {
          pointer-events: none;
        }
      }
    `,
    isFocused: css`
      ${highlightedStyles}
    `,
    isSelected: css`
      color: ${euiTheme.colors.textPrimary};
      background-color: ${euiTheme.colors.backgroundBaseInteractiveSelect};

      ${notDisabledSelector} {
        &:hover {
          background-color: ${euiTheme.colors
            .backgroundBaseInteractiveSelectHover};
        }
      }

      .euiIcon,
      .euiButtonIcon {
        color: inherit;
      }

      .euiListItemLayout__prepend,
      .euiListItemLayout__append {
        .euiIcon {
          color: ${euiTheme.colors.textPrimary};
        }
      }
    `,
    isSelectedFocused: css`
      ${notDisabledSelector} {
        background-color: ${euiTheme.colors
          .backgroundBaseInteractiveSelectHover};
      }
    `,
    tooltip: {
      isDisabled: css`
        cursor: not-allowed;
      `,
    },
    externalIcon: css`
      color: ${euiTheme.colors.textDisabled};
    `,
  };
};

export const euiListItemLayoutWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { spacing } = euiListItemVariables(euiThemeContext);

  return {
    euiListItemLayout__wrapper: css`
      ${listItemCommonStyles(euiThemeContext)}
      /* prevent items from collapsing inside flex layouts */
      flex-shrink: 0;
      list-style: none;
    `,
    hasExtraAction: css`
      ${logicalCSS('padding-right', spacing.horizontal)}
    `,
  };
};
