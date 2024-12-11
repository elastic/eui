/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiFontSize, logicalCSS, mathWithUnits } from '../../global_styling';
import { euiTitle } from '../title/title.styles';

export const euiSideNavItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const emphasizedBackgroundColor =
    euiTheme.components.sideNavItemEmphasizedBackground;

  return {
    euiSideNavItem: css``,
    emphasized: css`
      background-color: ${emphasizedBackgroundColor};
      color: ${euiTheme.colors.textHeading};

      /* The large y values allow the shadow to stretch beyond the side nav bounds to it's parents container */
      box-shadow: 100px 0 0 0 ${emphasizedBackgroundColor},
        -100px 0 0 0 ${emphasizedBackgroundColor};

      /* Remove any extra box-shadows from nested emphasized items */
      & & {
        background-color: transparent;
        box-shadow: none;
      }
    `,

    // Layout
    root: css`
      ${logicalCSS('padding-bottom', euiTheme.size.s)}

      & + & {
        ${logicalCSS('margin-top', euiTheme.size.s)}
        ${logicalCSS('padding-top', euiTheme.size.s)}
      }
    `,
    trunk: css`
      color: ${euiTheme.colors.textHeading};
    `,
    branch: css`
      position: relative;
      color: ${euiTheme.colors.textSubdued};

      /* Draw the vertical line to group an expanded item's child items together. */
      &::after {
        position: absolute;
        content: '';
        ${logicalCSS('vertical', 0)}
        ${logicalCSS('left', 0)}
        ${logicalCSS('border-left', euiTheme.border.thin)}
      }

      /* If this is actually the last item, we don't want the vertical line to stretch all the way down */
      &:last-of-type::after {
        ${logicalCSS('height', euiTheme.size.m)}
      }
    `,

    items: {
      euiSideNavItem__items: css``,
      rootWithIcon: css`
        ${logicalCSS('margin-left', euiTheme.size.l)}
      `,
      trunk: css`
        ${logicalCSS('width', '100%')} /* Needed for trunks with carets */
        ${logicalCSS('margin-left', euiTheme.size.s)}
      `,
      branch: css`
        ${logicalCSS('margin-left', euiTheme.size.base)}
      `,
    },
  };
};

export const euiSideNavItemButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const lineHeightOverride = euiFontSize(euiThemeContext, 'm').lineHeight;

  // Create padding around focus area without indenting the item itself.
  const paddingMarginOffset = `
    padding-inline: ${euiTheme.size.s};
    ${logicalCSS('margin-left', `-${euiTheme.size.s}`)}
    ${logicalCSS(
      'width',
      `calc(100% + ${mathWithUnits(euiTheme.size.s, (x) => x * 2)})`
    )};
  `;

  return {
    euiSideNavItemButton: css`
      display: block;
      ${logicalCSS('width', '100%')} /* Needed for nested items */
      padding-block: ${euiTheme.size.xxs};

      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${lineHeightOverride};

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
        color: ${euiTheme.colors.textDisabled};
      }
    `,
    selected: css`
      color: ${euiTheme.colors.textPrimary};
      font-weight: ${euiTheme.font.weight.bold};

      /* Restrict the underline to the button __label so it doesn't affect other components that might live within */
      .euiSideNavItemButton__label {
        text-decoration: underline;
      }
    `,
    emphasized: css`
      font-weight: ${euiTheme.font.weight.bold};
    `,

    // Layout
    root: css`
      ${logicalCSS('margin-bottom', euiTheme.size.xs)}
      padding-block: 0;
      ${paddingMarginOffset}
    `,
    trunk: css`
      ${paddingMarginOffset}
    `,
    branch: css`
      /* Absolutely position the horizontal tick connecting the item to the vertical line. */
      position: relative;
      padding-inline: ${euiTheme.size.s};

      &::after {
        position: absolute;
        content: '';
        ${logicalCSS('top', euiTheme.size.m)}
        ${logicalCSS('left', 0)}
        ${logicalCSS('width', euiTheme.size.xs)}
        ${logicalCSS('border-bottom', euiTheme.border.thin)}
      }
    `,

    // Child elements
    euiSideNavItemButton__content: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.s};
    `,
    label: {
      euiSideNavItemButton__label: css`
        flex-grow: 1;
      `,
      root: {
        ...euiTitle(euiThemeContext, 'xxs'),
        lineHeight: lineHeightOverride,
        color: 'inherit',
      },
    },
  };
};
