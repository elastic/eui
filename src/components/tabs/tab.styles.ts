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
import { EuiThemeComputed } from '../../services/theme/types';

const selectedStyles = (euiTheme: EuiThemeComputed, isDisabled: boolean) => {
  const selectedColor = isDisabled
    ? euiTheme.colors.disabledText
    : euiTheme.colors.primaryText;
  return css`
    box-shadow: inset 0 calc(${euiTheme.border.thick} - 1) 0 ${selectedColor};
  `;
};

export const euiTabsStyles = ({ euiTheme }: UseEuiTheme) => {
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
  };
};

export const euiTabsExpandedStyles = () => {
  return {
    euiTabsExpanded: css`
      flex-basis: 0%;
      flex-grow: 1;
      justify-content: center;
    `,
  };
};

export const euiTabStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean
) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiTab: css`
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      font-weight: ${euiTheme.font.weight.semiBold};

      &:focus {
        background-color: ${euiTheme.colors.lightestShade};
        outline-offset: -${euiTheme.focus.width};
      }
    `,

    euiTabContentBase: css`
      color: ${euiTheme.colors.text};
    `,

    euiTabContentSelected: css`
      color: ${euiTheme.colors.primaryText};
    `,

    euiTabContentDisabled: css`
      color: ${euiTheme.colors.disabledText};
    `,

    size_s: css`
      padding: ${euiTheme.size.s};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    `,

    // DEFAULT
    size_m: css`
      padding: ${euiTheme.size.m} ${euiTheme.size.base};
      font-size: ${euiFontSize(euiThemeContext, 'm').fontSize};
    `,

    size_l: css`
      padding: ${euiTheme.size.m} ${euiTheme.size.base};
      font-size: ${euiFontSize(euiThemeContext, 'm').fontSize};
    `,

    size_xl: css`
      padding: ${euiTheme.size.s} ${euiTheme.size.l};
      font-size: ${euiFontSize(euiThemeContext, 'l').fontSize};
      line-height: calc(${euiFontSize(euiThemeContext, 'l').lineHeight} * 4.5);
      ${logicalCSS('height', `calc(${euiTheme.size.base} * 4.5`)}
    `,

    prepend: css`
      ${logicalCSS('margin-right', euiTheme.size.s)};
      color: ${euiTheme.colors[isDisabled ? 'disabledText' : 'text']};
    `,

    append: css`
      ${logicalCSS('margin-left', euiTheme.size.s)};
      color: ${euiTheme.colors[isDisabled ? 'disabledText' : 'text']};
    `,

    isSelected: css`
      ${selectedStyles(euiTheme, isDisabled)};
    `,
  };
};
