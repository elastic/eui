/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, mathWithUnits, euiFontSize } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiTabStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const selectedUnderlineSize = highContrastMode
    ? mathWithUnits(euiTheme.border.thick, (x) => x * 2)
    : euiTheme.border.width.thick;

  return {
    euiTab: css`
      position: relative;
      display: flex;
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      gap: ${euiTheme.size.s};
      ${logicalCSS('padding-vertical', 0)}
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}

      /* Font-weight used by append/prepend nodes - the tab title receives a heavier weight */
      font-weight: ${euiTheme.font.weight.semiBold};
      color: ${euiTheme.colors.textHeading};

      &:focus {
        outline-offset: -${euiTheme.focus.width};
      }

      /* Selected underline - use a pseudo element instead of box-shadow for easier
         color setting, as well as Windows high contrast theme rendering */
      &::after {
        position: absolute;
        ${logicalCSS('bottom', 0)}
        ${logicalCSS('horizontal', 0)}
        ${logicalCSS('border-bottom-style', 'solid')}
        ${logicalCSS('border-bottom-width', selectedUnderlineSize)}
        pointer-events: none;
      }
    `,
    // variations
    expanded: css`
      flex-basis: 0%;
      flex-grow: 1;
      justify-content: center;
    `,
    selected: css`
      color: ${euiTheme.colors.textPrimary};

      &::after {
        content: '';
        border-color: ${euiTheme.colors.primary};
      }
    `,
    disabled: {
      disabled: css`
        cursor: not-allowed;
        color: ${euiTheme.colors.textDisabled};
      `,
      selected: css`
        &::after {
          content: '';
          border-color: ${euiTheme.colors.textDisabled};
        }
      `,
    },
  };
};

export const euiTabContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTab__content: css`
      font-weight: ${euiTheme.font.weight[euiTheme.font.title.weight]};
    `,
    // sizes
    s: css`
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      line-height: ${euiTheme.size.xl};
    `,
    m: css`
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${euiTheme.size.xxl};
    `,
    l: css`
      font-size: ${euiFontSize(euiThemeContext, 'm').fontSize};
      line-height: ${mathWithUnits(
        [euiTheme.size.xl, euiTheme.size.s],
        (x, y) => x + y
      )};
    `,
  };
};
