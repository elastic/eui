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

import { EuiTabsSizes } from './tabs';
import { EuiTitleSize } from '../title';
import { euiTitle } from '../title/title.styles';

type EuiTabSizeCSS = {
  padding: string;
  margin: string;
  titleSize: EuiTitleSize;
};

export const euiTabsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const tabSizeToCssPropertyMap: { [size in EuiTabsSizes]: EuiTabSizeCSS } = {
    s: {
      padding: `padding: ${euiTheme.size.xs}`,
      margin: `${logicalCSS('margin-left', euiTheme.size.m)}`,
      titleSize: 'xxxs',
    },
    m: {
      padding: `padding: ${euiTheme.size.s} ${euiTheme.size.xs}`,
      margin: `${logicalCSS('margin-left', euiTheme.size.base)}`,
      titleSize: 'xxs',
    },
    l: {
      padding: `padding: ${euiTheme.size.s} ${euiTheme.size.xs}`,
      margin: `${logicalCSS('margin-left', euiTheme.size.l)}`,
      titleSize: 'xs',
    },
    xl: {
      padding: `padding: ${euiTheme.size.s} ${euiTheme.size.xs}`,
      margin: `${logicalCSS('margin-left', euiTheme.size.xl)}`,
      titleSize: 'xs',
    },
  };

  const tabSizeStyles = (size: EuiTabsSizes) => {
    return css`
      .euiTab {
        ${tabSizeToCssPropertyMap[size].padding};

        & + .euiTab {
          ${tabSizeToCssPropertyMap[size].margin};
        }
      }

      .euiTab__content {
        ${euiTitle(euiThemeContext, tabSizeToCssPropertyMap[size].titleSize)};
      }
    `;
  };

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
      ${tabSizeStyles('s')};
    `,

    // DEFAULT
    size_m: css`
      ${tabSizeStyles('m')};
    `,

    size_l: css`
      ${tabSizeStyles('l')};
    `,

    size_xl: css`
      ${tabSizeStyles('xl')};

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
        color: ${euiTheme.colors.text};
      }
    `,

    euiTabSelected: css`
      box-shadow: inset 0 calc(${euiTheme.border.width.thick} * -1) 0
        ${borderColor};
      .euiTab__content {
        color: ${euiTheme.colors.primaryText};
      }
    `,

    euiTabDisabled: css`
      &:hover {
        cursor: not-allowed;
      }

      .euiTab__content {
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
