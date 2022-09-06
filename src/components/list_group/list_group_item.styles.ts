/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiCanAnimate, euiFontSize } from '../../global_styling';
import { UseEuiTheme, transparentize } from '../../services';
import { euiButtonColor } from '../../themes/amsterdam/global_styling/mixins/button';

export const euiListGroupItemStyles = (
  euiThemeContext: UseEuiTheme,
  isActive: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiListGroupItem: css`
      padding: 0;
      border-radius: ${euiTheme.border.radius.medium};
      display: flex;
      align-items: center;
      position: relative;

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.fast};
      }
    `,
    // Sizes
    xs: css`
      ${euiFontSize(euiThemeContext, 'xs')};
      font-weight: ${euiTheme.font.weight.medium};
      letter-spacing: 0;
    `,
    s: css`
      ${euiFontSize(euiThemeContext, 's')};
      font-weight: ${euiTheme.font.weight.medium};
      letter-spacing: 0;
    `,
    m: css`
      ${euiFontSize(euiThemeContext, 'm')};
    `,
    l: css`
      ${euiFontSize(euiThemeContext, 'l')};
    `,
    // Colors
    inherit: css`
      ${isActive &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};
    `,
    primary: css`
      ${isActive &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'primary').backgroundColor
        };
      `};
    `,
    text: css`
      ${isActive &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};
    `,
    subdued: css`
      ${isActive &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};
    `,
    ghost: css`
      ${isActive &&
      `
        background-color: ${transparentize(euiTheme.colors.ghost, 0.1)};
      `};
    `,
    // Variants
    isActive: css``,
    isDisabled: css`
      color: red;
      cursor: not-allowed;
      background-color: transparent;
      text-decoration: none;
    `,
    isClickable: css``,
    wrapText: css`
      .euiListGroupItem__button,
      .euiListGroupItem__text {
        inline-size: 100%;
        word-break: break-word;
      }

      .euiListGroupItem__label {
        white-space: inherit;
      }
    `,
  };
};

export const euiListGroupItemButtonStyles = (
  euiThemeContext: UseEuiTheme,
  isActive: boolean,
  isDisabled: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiListGroupItem__button: css`
      display: flex;
      align-items: center;
      flex-grow: 1;
      text-align: start;
      max-inline-size: 100%;
      font-weight: inherit;
    `,
    // Colors
    inherit: css`
      ${!isDisabled &&
      `
        color: inherit;
      `}
    `,
    primary: css`
      ${!isDisabled &&
      `
        color: ${euiButtonColor(euiThemeContext, 'primary').color};
      `}
    `,
    text: css`
      ${!isDisabled &&
      `
      color: ${euiButtonColor(euiThemeContext, 'text').color};
      `}
    `,
    subdued: css`
      ${!isDisabled &&
      `
        color: ${euiTheme.colors.subduedText};
      `}
    `,
    ghost: css`
      ${!isDisabled &&
      `
        color: ${euiTheme.colors.ghost};
      `}
    `,
  };
};
