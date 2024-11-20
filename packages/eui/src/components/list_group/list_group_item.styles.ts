/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiCanAnimate,
  euiFontSize,
  logicalCSS,
  logicalShorthandCSS,
  euiTextTruncate,
  euiTextBreakWord,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiButtonColor } from '../../global_styling/mixins/_button';

export const euiListGroupItemStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  const primaryBgColor =
    euiTheme.components.listGroupItemBackgroundPrimaryActive;
  const subduedBgColor =
    euiTheme.components.listGroupItemBackgroundSubduedActive;

  const backgroundHover = euiTheme.components.listGroupItemBackgroundHover;
  const backgroundPrimaryHover =
    euiTheme.components.listGroupItemBackgroundPrimaryHover;

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
      border-radius: ${euiTheme.border.radius.small};
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
    l: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
    // Colors
    colors: {
      isActive: {
        primary: css`
          background-color: ${primaryBgColor};
        `,
        text: css`
          background-color: ${subduedBgColor};
        `,
        subdued: css`
          background-color: ${subduedBgColor};
        `,
      },
      isClickable: {
        primary: css`
          &:hover,
          &:focus-within {
            background-color: ${backgroundPrimaryHover};
          }
        `,
        text: css`
          &:hover,
          &:focus-within {
            background-color: ${backgroundHover};
          }
        `,
        subdued: css`
          &:hover,
          &:focus-within {
            background-color: ${backgroundHover};
          }
        `,
      },
    },
  };
};

export const euiListGroupItemInnerStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiListGroupItem__inner: css`
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.xs} ${euiTheme.size.s}`
      )}
      display: flex;
      align-items: center;
      flex-grow: 1;
      max-inline-size: 100%;
      overflow: hidden;
      text-align: start;
      font-weight: inherit;
    `,
    // Sizes
    xs: css`
      ${euiFontSize(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.medium};
      letter-spacing: 0;
      ${logicalCSS('min-height', euiTheme.size.l)}
    `,
    s: css`
      ${euiFontSize(euiThemeContext, 's')}
      font-weight: ${euiTheme.font.weight.medium};
      letter-spacing: 0;
      ${logicalCSS('min-height', euiTheme.size.xl)}
    `,
    m: css`
      ${euiFontSize(euiThemeContext, 'm')}
      ${logicalCSS('min-height', euiTheme.size.xl)}
    `,
    l: css`
      ${euiFontSize(euiThemeContext, 'l')}
      ${logicalCSS('min-height', euiTheme.size.xxl)}
    `,
    // Colors
    primary: css`
      color: ${euiButtonColor(euiThemeContext, 'primary').color};
    `,
    text: css`
      color: ${euiButtonColor(euiThemeContext, 'text').color};
    `,
    subdued: css`
      color: ${euiTheme.colors.subduedText};
    `,
    ghost: css`
      color: ${euiTheme.colors.ghost};
    `,
    // Variants
    isDisabled: css`
      cursor: not-allowed;

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
    isClickable: css`
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    `,
    externalIcon: css`
      ${logicalCSS('margin-left', euiTheme.size.xs)}
    `,
  };
};

export const euiListGroupItemLabelStyles = {
  // Base
  euiListGroupItem__label: css``,
  truncate: css`
    ${euiTextTruncate()}
  `,
  wrapText: css`
    ${euiTextBreakWord()}
  `,
};

export const euiListGroupItemIconStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    // Base
    euiListGroupItem__icon: css`
      ${logicalCSS('margin-right', euiTheme.size.m)}
      flex-grow: 0;
      flex-shrink: 0;
    `,
  };
};

export const euiListGroupItemTooltipStyles = {
  // Base
  euiListGroupItem__tooltip: css`
    display: inline-flex; /* Allows the wrapped button/text to grow */
    ${logicalCSS('width', '100%')}
  `,
};
