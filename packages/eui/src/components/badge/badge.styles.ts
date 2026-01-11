/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, SerializedStyles } from '@emotion/react';
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
import { type BadgeColor } from './badge';

export const euiBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const badgeColors = euiBadgeColors(euiThemeContext);
  const defaultBadgeColors = badgeColors.fill.default;

  const setBadgeColorVars = (
    colors: ReturnType<typeof euiBadgeColors>['fill']['primary']
  ) => `
    --euiBadgeTextColor: ${colors.color};
    --euiBadgeBackgroundColor: ${colors.backgroundColor};
  `;

  const inlinePadding = mathWithUnits(
    // Account for the (usually transparent) border so that the visual
    // padding is of size s
    [euiTheme.size.s, euiTheme.border.width.thin],
    (size, borderWidth) => size - borderWidth
  );

  return {
    euiBadge: css`
      display: inline-block;
      vertical-align: middle;
      ${logicalShorthandCSS('padding', `0 ${inlinePadding}`)}
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

      /* border radius is intentionally larger to protect against external
         customizations that might affect badge height */
      border-radius: ${euiTheme.size.l};

      /* The badge will only ever be as wide as its content
         So, make the text left aligned to ensure all badges line up the same */
      ${logicalTextAlignCSS('left')}

      /* Colors - inherit from CSS variables, which can be set via inline style */
      color: var(--euiBadgeTextColor, ${defaultBadgeColors.color});
      background-color: var(
        --euiBadgeBackgroundColor,
        ${defaultBadgeColors.backgroundColor}
      );

      /* Ensure that selected text is always visible by inverting badge and text colors */
      *::selection {
        color: var(
          --euiBadgeBackgroundColor,
          ${defaultBadgeColors.backgroundColor}
        );
        background-color: var(--euiBadgeTextColor, ${defaultBadgeColors.color});
      }

      &:focus-within {
        ${euiFocusRing(euiThemeContext)}
      }

      & + .euiBadge {
        ${logicalCSS('margin-left', euiTheme.size.xs)}
      }
    `,
    iconOnly: css`
      padding-inline: ${mathWithUnits(
        // Account for the border
        [euiTheme.size.xs, euiTheme.border.width.thin],
        (size, borderWidth) => size - borderWidth
      )};
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

    colors: {
      fill: {
        default: css`
          ${setBadgeColorVars(badgeColors.fill.default)}
          border-color: ${badgeColors.fill.default.borderColor};
        `,
        hollow: css`
          ${setBadgeColorVars(badgeColors.hollow)}
          border-color: ${badgeColors.hollow.borderColor};
        `,
        primary: css(setBadgeColorVars(badgeColors.fill.primary)),
        accent: css(setBadgeColorVars(badgeColors.fill.accent)),
        neutral: css(setBadgeColorVars(badgeColors.fill.neutral)),
        success: css(setBadgeColorVars(badgeColors.fill.success)),
        warning: css(setBadgeColorVars(badgeColors.fill.warning)),
        risk: css(setBadgeColorVars(badgeColors.fill.risk)),
        danger: css(setBadgeColorVars(badgeColors.fill.danger)),
      },
      base: {
        default: css`
          ${setBadgeColorVars(badgeColors.base.default)}
          border-color: ${badgeColors.base.default.borderColor};
        `,
        hollow: css`
          ${setBadgeColorVars(badgeColors.hollow)}
          border-color: ${badgeColors.hollow.borderColor};
        `,
        primary: css(setBadgeColorVars(badgeColors.base.primary)),
        accent: css(setBadgeColorVars(badgeColors.base.accent)),
        neutral: css(setBadgeColorVars(badgeColors.base.neutral)),
        success: css(setBadgeColorVars(badgeColors.base.success)),
        warning: css(setBadgeColorVars(badgeColors.base.warning)),
        risk: css(setBadgeColorVars(badgeColors.base.risk)),
        danger: css(setBadgeColorVars(badgeColors.base.danger)),
      },
    } satisfies Record<string, Record<BadgeColor, SerializedStyles>>,

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
        padding-inline: ${euiTheme.size.xxs};
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
          ${logicalCSS('margin-left', euiTheme.size.xxs)}
        }
      `,
      left: css`
        &:not(:only-child) {
          ${logicalCSS('margin-right', euiTheme.size.xxs)}
        }
      `,
    },

    // Clickable icons (iconOnClick)
    iconButton: {
      euiBadge__iconButton: css`
        font-size: 0; /* Makes the button only as large as the icon so it aligns vertically better */

        &:disabled {
          cursor: not-allowed;
        }

        .euiBadge__icon {
          /* Remove margins from icon itself so that focus state doesn't include that space */
          margin: 0 !important; /* stylelint-disable-line declaration-no-important */
        }
      `,
      right: css`
        ${logicalCSS('margin-left', euiTheme.size.xxs)}
      `,
      left: css`
        ${logicalCSS('margin-right', euiTheme.size.xxs)}
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
