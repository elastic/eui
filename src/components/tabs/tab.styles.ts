/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

import { euiTitle } from '../title/title.styles';

export const euiTabsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiTabs: css`
      display: flex;
      ${logicalCSS('max-width', '100%')};
      ${logicalCSS('overflow-x', 'auto')};
      ${logicalCSS('overflow-y', 'hidden')};
      position: relative;
      flex-shrink: 0;
    `,
    bottomBorder: css`
      box-shadow: inset 0 calc(${euiTheme.border.width.thin} * -1) 0
        ${euiTheme.border.color};
    `,

    size_s: css`
      .euiTab {
        padding: ${euiTheme.size.s} ${euiTheme.size.xs};

        & + .euiTab {
          ${logicalCSS('margin-left', euiTheme.size.m)};
        }
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xxxs')};
      }
    `,

    // DEFAULT
    size_m: css`
      .euiTab {
        padding: ${euiTheme.size.s} ${euiTheme.size.xs};

        & + .euiTab {
          ${logicalCSS('margin-left', euiTheme.size.base)};
        }
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xxs')};
      }
    `,

    size_l: css`
      .euiTab {
        padding: ${euiTheme.size.s} ${euiTheme.size.xs};

        & + .euiTab {
          ${logicalCSS('margin-left', euiTheme.size.l)};
        }
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xs')};
      }
    `,

    size_xl: css`
      .euiTab {
        padding: ${euiTheme.size.s} ${euiTheme.size.xs};

        & + .euiTab {
          ${logicalCSS('margin-left', euiTheme.size.xl)};
        }
      }

      .euiTab__content {
        font-size: calc(${euiTheme.size.base + euiTheme.size.xs});
      }

      line-height: calc(${euiFontSize(euiThemeContext, 'l').lineHeight} * 4.5);
      ${logicalCSS('height', `calc(${euiTheme.size.base} * 4.5`)}
    `,

    expanded: css`
      .euiTab {
        flex-basis: 0%;
        flex-grow: 1;
        justify-content: center;
      }
    `,
  };
};

export const euiTabStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean
) => {
  const { euiTheme } = euiThemeContext;
  const borderColor = isDisabled
    ? euiTheme.colors.disabledText
    : euiTheme.colors.primaryText;

  return {
    euiTab: css`
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      font-weight: ${euiTheme.font.weight.semiBold};

      &:focus {
        background-color: ${euiTheme.colors.ghost};
        outline-offset: -${euiTheme.focus.width};
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xxs')};
        color: ${euiTheme.colors.text};
      }
    `,

    euiTabSelected: css`
      box-shadow: inset 0 calc(${euiTheme.border.width.thick} * -1) 0
        ${borderColor};
      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xxs')};
        color: ${euiTheme.colors.primaryText};
      }
    `,

    euiTabDisabled: css`
      &:hover {
        cursor: not-allowed;
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, 'xxs')};
        color: ${euiTheme.colors.disabledText};
      }
    `,

    prepend: css`
      ${logicalCSS('margin-right', euiTheme.size.s)};
      color: ${euiTheme.colors[isDisabled ? 'disabledText' : 'text']};
    `,

    append: css`
      ${logicalCSS('margin-left', euiTheme.size.s)};
      color: ${euiTheme.colors[isDisabled ? 'disabledText' : 'text']};
    `,
  };
};
