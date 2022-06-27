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

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  //const colorMode = euiThemeContext.colorMode;

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
    'euiFlyout--small': css`
        min-width: ${Math.round(euiTheme.breakpoint.m * 0.5)}
        width: 25vw,
        &.euiFlyout--maxWidth-default {
            max-width: ${Math.round(euiTheme.breakpoint.s * 0.7)}
        }
    `,
    // 'euiFlyout--medium': css`
    //     min-width: ${euiTheme.form.maxWidth + euiTheme.size.m * 2}
    //     width: 25vw,
    //     &.euiFlyout--maxWidth-default {
    //         max-width: ${Math.round(euiTheme.breakpoint.s * 0.7)}
    //     }
    // `,
  };
};

export const euiFlyoutHeaderStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiFlyoutHeader: css`
      flex-grow: 0;
    `,
    border: css`
      border-bottom: ${euiTheme.border.thin};
    `,
  };
};

export const euiFlyoutBodyStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiFlyoutBody: css`
      flex-grow: 1;
      overflow-y: hidden;
      height: 100%;
    `,
    overflow: css`
      ${euiYScrollWithShadows(euiThemeContext)};
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
      }
    `,
  };
};

export const euiFlyoutFooterStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiFlyoutFooter: css`
      background: ${euiTheme.colors.lightestShade};
    `,
  };
};
