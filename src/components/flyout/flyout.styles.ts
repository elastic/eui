/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  euiCanAnimate,
  euiYScrollWithShadows,
  euiOverflowShadowStyles,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiShadowXLarge } from '../../themes/amsterdam/global_styling/mixins';
import { transparentize } from '../../services/color';
import { EuiFlyoutPaddingSize } from './flyout_types';

const euiFlyout = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  75% {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const getFlyoutPadding = (
  paddingSize: EuiFlyoutPaddingSize,
  { euiTheme }: UseEuiTheme
) => {
  const paddingModifiers = {
    none: 0,
    s: euiTheme.size.s,
    m: euiTheme.size.base,
    l: euiTheme.size.l,
  };

  return paddingModifiers[paddingSize];
};

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  // Removing the 'px' from the end of euiTheme.size.m to perform calculation
  //euiTheme.form.maxWidth is a CSS Property based on maxWidth and has the potential to be a
  // string or a number.
  const euiFormMaxWidth =
    typeof euiTheme.form.maxWidth === 'string'
      ? parseInt(euiTheme.form.maxWidth.replace('px', ''), 10)
      : euiTheme.form.maxWidth;

  const euiSizeMedium: number = parseInt(euiTheme.size.m.replace('px', ''), 10);

  const flyoutSizes = {
    s: {
      min: Math.round(euiTheme.breakpoint.m * 0.5),
      width: '25vw',
      max: Math.round(euiTheme.breakpoint.s * 0.7),
    },

    m: {
      min: euiFormMaxWidth && euiFormMaxWidth + euiSizeMedium * 2,
      width: '50vw',
      max: euiTheme.breakpoint.m,
    },

    l: {
      min: Math.round(euiTheme.breakpoint.m * 0.9),
      width: '75vw',
      max: Math.round(euiTheme.breakpoint.l),
    },
  };

  return {
    euiFlyout: css`
      border-left: ${euiTheme.border.thin};
      ${euiShadowXLarge(euiThemeContext)};
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      z-index: ${euiTheme.levels.header};
      background: ${euiTheme.colors.emptyShade};
      display: flex;
      flex-direction: column;
      align-items: stretch;
      clip-path: polygon(-50% 0, 100% 0, 100% 100%, -50% 100%);
      ${euiCanAnimate} {
        animation: ${euiFlyout} ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance};
      }
      &:focus {
        outline: none;
      }
    `,
    euiFlyout__closeButton: css`
      background-color: ${transparentize(euiTheme.colors.emptyShade, 0.1)};
      position: absolute;
      right: ${euiTheme.size.s};
      top: ${euiTheme.size.s};
      z-index: 3;
    `,
    outside: css`
      // match dropshadow
      ${euiShadowXLarge(euiThemeContext)};
      right: auto;
      left: 0;
      // Override the hover and focus transitions of buttons
      // sass-lint:disable-block no-important
      transform: translateX(calc(-100% - #{${euiTheme.size.l}})) !important;
      animation: none !important;

      .euiFlyout--left & {
        left: auto;
        right: 0;
        transform: translateX(calc(100% + #{${euiTheme.size.l}})) !important;
      }
    `,
    inside: css``,
    euiFlyoutBody__banner: css`
      overflow-x: hidden;
    `,

    // Flyout Sizes
    // Note: Dashes are used because s, m, l are size values for multiple props
    'flyoutSize--s': css`
      min-width: ${flyoutSizes.s.min}px;
      width: ${flyoutSizes.s.width};
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.s.max}px;
      }
    `,
    'flyoutSize--m': css`
      min-width: ${flyoutSizes.m.min}px;
      width: ${flyoutSizes.m.width};
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.m.max}px;
      }
    `,
    'flyoutSize--l': css`
      min-width: ${flyoutSizes.l.min}px;
      width: ${flyoutSizes.l.width};
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.l.max}px;
      }
    `,

    // Padding Modifiers
    'flyoutPadding--none': css`
      padding: ${getFlyoutPadding('none', euiThemeContext)};
    `,
    'flyoutPadding--s': css`
      padding: ${getFlyoutPadding('s', euiThemeContext)};
    `,
    'flyoutPadding--m': css`
      padding: ${getFlyoutPadding('m', euiThemeContext)};
    `,
    'flyoutPadding--l': css`
      padding: ${getFlyoutPadding('l', euiThemeContext)};
    `,
  };
};

export const euiFlyoutHeaderStyles = (
  paddingSize: EuiFlyoutPaddingSize,
  euiThemeContext: UseEuiTheme
) => {
  const euiTheme = euiThemeContext.euiTheme;
  return {
    euiFlyoutHeader: css`
      flex-grow: 0;
    `,
    border: css`
      border-bottom: ${euiTheme.border.thin};
      padding-bottom: ${getFlyoutPadding(paddingSize, euiThemeContext)};
    `,

    // Padding Modifiers
    padding: css`
      padding: ${getFlyoutPadding(paddingSize, euiThemeContext)}
        ${getFlyoutPadding(paddingSize, euiThemeContext)} 0;
    `,
  };
};

export const euiFlyoutBodyStyles = (
  paddingSize: EuiFlyoutPaddingSize,
  euiThemeContext: UseEuiTheme
) => {
  return {
    euiFlyoutBody: css`
      flex-grow: 1;
      overflow-y: hidden;
      height: 100%;
    `,
    overflow: css`
      ${euiYScrollWithShadows(euiThemeContext)};
      padding: ${getFlyoutPadding(paddingSize, euiThemeContext)};
    `,
    'overflow--hasBanner': css`
      ${euiOverflowShadowStyles(euiThemeContext, {
        direction: 'y',
        side: 'end',
      })};
    `,
    banner: css`
      .euiCallOut {
        border: none; // Remove border from callout when it is a flyout banner
        border-radius: 0; // Ensures no border-radius in all themes
        padding-left: ${getFlyoutPadding(paddingSize, euiThemeContext)};
        padding-right: ${getFlyoutPadding(paddingSize, euiThemeContext)};
      }
    `,
  };
};

export const euiFlyoutFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  return {
    euiFlyoutFooter: css`
      background: ${euiTheme.colors.lightestShade};
    `,
    none: css``,
    s: css``,
    m: css``,
    l: css``,
  };
};
