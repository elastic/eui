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
      display: flex;
      align-items: center;
      ${logicalCSS('width', '100%')} /* Needed for nested items */
      padding-block: ${euiTheme.size.xxs};
      gap: ${euiTheme.size.s};

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
        color: ${euiTheme.colors.disabledText};
      }
    `,
    selected: css`
      color: ${euiTheme.colors.primaryText};
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
        ${logicalCSS('height', euiTheme.border.width.thin)}
        background-color: ${euiTheme.border.color};
      }
    `,

    // Child elements
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
