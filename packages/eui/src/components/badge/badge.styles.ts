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
import { UseEuiTheme } from '../../services';
import { euiBadgeColors } from './color_utils';

export const euiBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const badgeColors = euiBadgeColors(euiThemeContext);
  const setBadgeColorVars = (
    colors: ReturnType<typeof euiBadgeColors>['primary']
  ) => `
    --euiBadgeTextColor: ${colors.color};
    --euiBadgeBackgroundColor: ${colors.backgroundColor};
  `;

  return {
    euiBadge: css`
      display: inline-block;
      vertical-align: middle;
      ${logicalShorthandCSS('padding', `0 ${euiTheme.size.s}`)}
      ${logicalCSS('max-width', '100%')}
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      line-height: ${mathWithUnits(
        // Account for the border
        [euiTheme.size.base, euiTheme.border.width.thin],
        (x, y) => x + y * 2
      )};
      font-weight: ${euiTheme.font.weight.medium};
      white-space: nowrap;
      text-decoration: none;
      cursor: inherit;
      border: ${euiTheme.border.width.thin} solid transparent;
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.medium,
        (x) => x / 2
      )};
      /* The badge will only ever be as wide as its content
         So, make the text left aligned to ensure all badges line up the same */
      ${logicalTextAlignCSS('left')}

      /* Colors - inherit from CSS variables, which can be set via inline style */
      color: var(--euiBadgeTextColor, ${badgeColors.default.color});
      background-color: var(
        --euiBadgeBackgroundColor,
        ${badgeColors.default.backgroundColor}
      );

      /* Ensure that selected text is always visible by inverting badge and text colors */
      *::selection {
        color: var(
          --euiBadgeBackgroundColor,
          ${badgeColors.default.backgroundColor}
        );
        background-color: var(
          --euiBadgeTextColor,
          ${badgeColors.default.color}
        );
      }

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

    // Colors
    default: css`
      ${setBadgeColorVars(badgeColors.default)}
      border-color: ${badgeColors.default.borderColor};
    `,
    hollow: css`
      ${setBadgeColorVars(badgeColors.hollow)}
      border-color: ${badgeColors.hollow.borderColor};
    `,
    primary: css(setBadgeColorVars(badgeColors.primary)),
    accent: css(setBadgeColorVars(badgeColors.accent)),
    neutral: css(setBadgeColorVars(badgeColors.neutral)),
    success: css(setBadgeColorVars(badgeColors.success)),
    warning: css(setBadgeColorVars(badgeColors.warning)),
    risk: css(setBadgeColorVars(badgeColors.risk)),
    danger: css(setBadgeColorVars(badgeColors.danger)),
    disabled: css`
      ${setBadgeColorVars(badgeColors.disabled)}
      border-color: ${badgeColors.disabled.borderColor};

      /* Override selection color, since disabled badges have rgba backgrounds with opacity */
      *::selection {
        color: ${euiTheme.colors.emptyShade};
      }
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
        font-size: 0; /* Makes the button only as large as the icon so it aligns vertically better */

        &:focus {
          background-color: ${euiTheme.components
            .badgeIconButtonBackgroundHover};
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
          /* Remove margins from icon itself so that focus state doesn't include that space */
          margin: 0 !important; /* stylelint-disable-line declaration-no-important */
        }
      `,
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
