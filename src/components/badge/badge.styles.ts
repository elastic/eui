/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  euiFocusRing,
  euiTextTruncate,
  logicalCSS,
  logicalShorthandCSS,
  logicalTextAlignCSS,
  mathWithUnits,
} from '../../global_styling';
import { euiButtonColor } from '../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme, tint, transparentize } from '../../services';

export const euiBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  return {
    euiBadge: css`
      display: inline-block;
      vertical-align: middle;
      ${logicalShorthandCSS('padding', `0 ${euiTheme.size.s}`)}
      ${logicalCSS('max-width', '100%')}
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      line-height: ${euiTheme.base + 2}px; // Accounts for the border
      font-weight: ${euiTheme.font.weight.medium};
      white-space: nowrap;
      text-decoration: none;
      cursor: default;
      background-color: transparent;
      border: ${euiTheme.border.width.thin} solid transparent;
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.medium,
        (x) => x / 2
      )};
      // The badge will only ever be as wide as its content
      // So, make the text left aligned to ensure all badges line up the same
      ${logicalTextAlignCSS('left')}

      &:focus-within {
        ${euiFocusRing(euiThemeContext)}
      }

      & + .euiBadge {
        ${logicalCSS('margin-left', euiTheme.size.xs)}
      }
    `,
    clickable: css`
      &:not(:disabled) {
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }

      &:focus {
        ${euiFocusRing(euiThemeContext)}
      }

      &:disabled {
        cursor: not-allowed;
      }
    `,
    disabled: css`
      // Using !important to override inline styles
      color: ${euiButtonColor(euiThemeContext, 'disabled').color} !important;
      background-color: ${euiButtonColor(euiThemeContext, 'disabled')
        .backgroundColor} !important;
    `,
    // Hollow has a border and is mostly used for autocompleters.
    hollow: css`
      background-color: ${euiTheme.colors.emptyShade};
      border-color: ${colorMode === 'DARK'
        ? tint(euiTheme.border.color, 0.15)
        : euiTheme.border.color};
      color: ${euiTheme.colors.text};
    `,

    // Content wrapper
    euiBadge__content: css`
      ${logicalCSS(
        // Ensure proper height in case of just displaying an icon
        'min-height',
        `${mathWithUnits(
          euiTheme.border.width.thin,
          (x) => euiTheme.base + x * 2
        )}`
      )}
      display: flex;
      align-items: center;
      overflow: hidden;
    `,

    // Text
    text: {
      euiBadge__text: css`
        ${euiTextTruncate()}
        cursor: inherit;
      `,
      clickable: css`
        cursor: pointer;
      `,
    },

    // Icon
    icon: {
      euiBadge__icon: css``,
      right: css`
        &:not(:only-child) {
          ${logicalCSS('margin-left', euiTheme.size.xs)}
        }
      `,
      left: css`
        &:not(:only-child) {
          ${logicalCSS('margin-right', euiTheme.size.xs)}
        }
      `,
    },

    // Clickable icons (iconOnClick)
    iconButton: {
      euiBadge__iconButton: css`
        font-size: 0; // Makes the button only as large as the icon so it aligns vertically better

        &:focus {
          background-color: ${transparentize(euiTheme.colors.ghost, 0.8)};
          color: ${euiTheme.colors.ink};
          border-radius: ${mathWithUnits(
            euiTheme.border.radius.small,
            (x) => x / 2
          )};
        }

        &:disabled {
          cursor: not-allowed;
        }

        .euiBadge__icon {
          // Remove margins from icon itself so that focus state doesn't include that space
          margin: 0 !important;
        }
      }`,
      right: css`
        ${logicalCSS('margin-left', euiTheme.size.xs)}
      `,
      left: css`
        ${logicalCSS('margin-right', euiTheme.size.xs)}
      `,
    },

    // Used in badges with both onClick & iconOnClick
    euiBadge__childButton: css`
      ${euiTextTruncate()}
      text-align: inherit;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;

      &:disabled {
        cursor: not-allowed;
      }

      &:not(:disabled) {
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    `,
  };
};
