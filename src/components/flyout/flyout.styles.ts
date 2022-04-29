/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate } from '../../global_styling';
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

export const euiComponentNameStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => {
  return {
    euiFlyout: css`
      border-left: ${euiTheme.border.thin};
      ${euiShadowXLarge(euiTheme, {}, colorMode)};
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
    'euiFlyout--outside': css`
      // match dropshadow
      ${euiShadowXLarge(euiTheme, {}, colorMode)}
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
    'euiFlyout--inside': css``,
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
