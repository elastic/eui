/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiCanAnimate, euiFontSize, logicalCSS } from '../../global_styling';
import { UseEuiTheme, transparentize } from '../../services';
import { euiButtonColor } from '../../themes/amsterdam/global_styling/mixins/button';

export const euiListGroupItemStyles = (
  euiThemeContext: UseEuiTheme,
  isActive: boolean,
  isClickable: boolean,
  isDisabled: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiListGroupItem: css`
      padding: 0;
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
      ${logicalCSS('height', euiTheme.size.l)}
      border-radius: ${euiTheme.border.radius.small};
    `,
    s: css`
      ${euiFontSize(euiThemeContext, 's')};
      font-weight: ${euiTheme.font.weight.medium};
      letter-spacing: 0;
      ${logicalCSS('height', euiTheme.size.xl)}
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      ${euiFontSize(euiThemeContext, 'm')};
      ${logicalCSS('height', euiTheme.size.xl)}
      border-radius: ${euiTheme.border.radius.medium};
    `,
    l: css`
      ${euiFontSize(euiThemeContext, 'l')};
      ${logicalCSS('height', euiTheme.size.xxl)}
      border-radius: ${euiTheme.border.radius.medium};
    `,
    // Colors
    inherit: css`
      ${isActive &&
      !isDisabled &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};

      ${isClickable &&
      !isDisabled &&
      `
        &:hover,
        &:focus {
          background-color: ${
            euiButtonColor(euiThemeContext, 'text').backgroundColor
          };
        }
      `};
    `,
    primary: css`
      ${isActive &&
      !isDisabled &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'primary').backgroundColor
        };
      `};

      ${isClickable &&
      !isDisabled &&
      `
        &:hover,
        &:focus {
          background-color: ${
            euiButtonColor(euiThemeContext, 'primary').backgroundColor
          };
        }
      `};
    `,
    text: css`
      ${isActive &&
      !isDisabled &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};

      ${isClickable &&
      !isDisabled &&
      `
        &:hover,
        &:focus {
          background-color: ${
            euiButtonColor(euiThemeContext, 'text').backgroundColor
          };
      `};
    `,
    subdued: css`
      ${isActive &&
      !isDisabled &&
      `
        background-color: ${
          euiButtonColor(euiThemeContext, 'text').backgroundColor
        };
      `};

      ${isClickable &&
      !isDisabled &&
      `
        &:hover,
        &:focus {
          background-color: ${
            euiButtonColor(euiThemeContext, 'text').backgroundColor
          };
        }
      `};
    `,
    ghost: css`
      ${isActive &&
      !isDisabled &&
      `
        background-color: ${transparentize(euiTheme.colors.ghost, 0.1)};
      `};

      ${isClickable &&
      !isDisabled &&
      `
        &:hover,
        &:focus {
          background-color: ${transparentize(euiTheme.colors.ghost, 0.1)};
        }
      `};
    `,
    // Variants
    isDisabled: css`
      &,
      &:hover,
      &:focus {
        color: ${euiButtonColor(euiThemeContext, 'disabled').color};
        cursor: not-allowed;
        background-color: transparent;
        text-decoration: none;
      }
    `,
    isActive: css``,
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
      padding: ${euiTheme.size.xs} ${euiTheme.size.s};
      display: flex;
      align-items: center;
      flex-grow: 1;
      text-align: start;
      max-inline-size: 100%;
      font-weight: inherit;

      ${!isDisabled &&
      `
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      `}
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
    isDisabled: css`
      cursor: not-allowed;
    `,
  };
};

export const euiListGroupItemTextStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    // Base
    euiListGroupItem__text: css`
      padding: ${euiTheme.size.xs} ${euiTheme.size.s};
      display: flex;
      align-items: center;
      flex-grow: 1;
      text-align: start;
      max-inline-size: 100%;
      font-weight: inherit;
    `,
  };
};

export const euiListGroupItemLabelStyles = () => {
  return {
    // Base
    euiListGroupItem__label: css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
  };
};

export const euiListGroupItemExtraActionStyles = ({
  euiTheme,
}: UseEuiTheme) => {
  return {
    // Base
    euiListGroupItem__extraAction: css`
      opacity: 0;
      ${logicalCSS('margin-right', euiTheme.size.m)};

      ${euiCanAnimate} {
        transition: opacity ${euiTheme.animation.fast};
      }

      .euiListGroupItem:not(.euiListGroupItem-isDisabled):focus &,
      .euiListGroupItem:not(.euiListGroupItem-isDisabled):hover &,
      &.euiListGroupItem__extraAction-alwaysShow,
      &:focus {
        opacity: 1;
      }
    `,
    alwaysShow: css`
      opacity: 1;
    `,
  };
};

export const euiListGroupItemIconStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    // Base
    euiListGroupItem__icon: css`
      ${logicalCSS('margin-right', euiTheme.size.m)};
      flex-grow: 0;
      flex-shrink: 0;
    `,
  };
};

export const euiListGroupItemTooltipStyles = () => {
  return {
    // Base
    euiListGroupItem__tooltip: css`
      ${logicalCSS('width', '100%')};
    `,
  };
};
