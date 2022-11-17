/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiTabStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiTab: css`
      display: flex;
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      font-weight: ${euiTheme.font.weight.semiBold};
      gap: ${euiTheme.size.s};
      ${logicalCSS('padding-vertical', 0)}
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}

      &:focus {
        background-color: transparent;
        outline-offset: -${euiTheme.focus.width};
      }
    `,
    // variations
    expanded: css`
      flex-basis: 0%;
      flex-grow: 1;
      justify-content: center;
    `,
    selected: css`
      box-shadow: inset 0 -${euiTheme.border.width.thick} 0 ${euiTheme.colors.primary};
    `,
    disabled: {
      disabled: css`
        cursor: not-allowed;
        color: ${euiTheme.colors.disabledText};
      `,
      selected: css`
        box-shadow: inset 0 -${euiTheme.border.width.thick} 0 ${euiTheme.colors.disabledText};
      `,
    },
  };
};

export const euiTabContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTab__content: css`
      &:hover {
        text-decoration: none;
      }
    `,
    // sizes
    s: css`
      ${euiTitle(euiThemeContext, 'xxxs')};
      line-height: ${euiTheme.size.xl};
    `,
    m: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      line-height: ${euiTheme.size.xxl};
    `,
    l: css`
      ${euiTitle(euiThemeContext, 'xs')};
      line-height: ${mathWithUnits(
        [euiTheme.size.xl, euiTheme.size.s],
        (x, y) => x + y
      )};
    `,
    xl: css`
      ${euiTitle(euiThemeContext, 's')};
      line-height: ${mathWithUnits(
        [euiTheme.size.xxxl, euiTheme.size.s],
        (x, y) => x + y
      )};
    `,
    // variations
    selected: css`
      color: ${euiTheme.colors.primaryText};
    `,
    disabled: css`
      color: ${euiTheme.colors.disabledText};
    `,
  };
};
