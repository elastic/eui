/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate, euiBreakpoint } from '../../global_styling';
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

const euiFlyoutLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  75% {
    opacity: 1;
    transform: translateX(0%);
}
`;

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  // Removing the 'px' from the end of euiTheme.size.m to perform calculation
  // euiTheme.form.maxWidth is a CSS Property based on maxWidth and has the potential to be a
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

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        max-width: 90vw !important;
      }
    `,

    // Close Button
    closeButton: css`
      background-color: ${transparentize(euiTheme.colors.emptyShade, 0.1)};
      position: absolute;
      right: ${euiTheme.size.s};
      top: ${euiTheme.size.s};
      z-index: 3;
    `,
    'closeButton--outside': css`
      // match dropshadow
      ${euiShadowXLarge(euiThemeContext)};
      right: auto;
      left: 0;
      // Override the hover and focus transitions of buttons
      // sass-lint:disable-block no-important
      animation: none !important;

      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        transform: translateX(calc(-100% - #{${euiTheme.size.l}}));
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        transform: translateX(calc(-100% - #{${euiTheme.size.xs}}));
      }
    `,
    'closeButton--inside': css``,
    'closeButton--outside-left': css`
      left: auto;
      right: 0;

      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        transform: translateX(calc(100% + #{${euiTheme.size.l}})) !important;
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        transform: translateX(calc(100% + #{${euiTheme.size.xs}})) !important;
      }
    `,

    // Flyout Sizes
    // Note: Dashes are used because s, m, l are size values for multiple props
    'flyoutSize--s': css`
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.s.max}px;
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        min-width: ${flyoutSizes.s.min}px;
        width: ${flyoutSizes.s.width};
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        min-width: 0;
        width: ${flyoutSizes.s.min}px;
      }
    `,
    'flyoutSize--m': css`
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.m.max}px;
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        min-width: ${flyoutSizes.m.min}px;
        width: ${flyoutSizes.m.width};
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        min-width: 0;
        width: ${flyoutSizes.m.min}px;
      }
    `,
    'flyoutSize--l': css`
      &.euiFlyout--maxWidth-default {
        max-width: ${flyoutSizes.l.max}px;
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        min-width: ${flyoutSizes.l.min}px;
        width: ${flyoutSizes.l.width};
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        min-width: 0;
        width: ${flyoutSizes.l.min}px;
      }
    `,

    // Side
    right: css``,
    left: css`
      border-right: ${euiTheme.border.thin};
      border-left: none;
      right: auto;
      left: 0;
      clip-path: polygon(0 0, 150% 0, 150% 100%, 0 100%);
      ${euiCanAnimate} {
        animation: ${euiFlyoutLeft};
      }
    `,

    // Type
    overlay: css``,
    push: css`
      box-shadow: none;
      clip-path: none;
      animation-duration: 0s !important; // Don't animate on loading a docked nav
      border-left: ${euiTheme.border.thick};
      // Make sure the header shadows are above
      z-index: ${Number(euiTheme.levels.header) - 1};
    `,
    'push--left': css`
      border-left: none;
      border-right: ${euiTheme.border.thick};
    `,
  };
};
