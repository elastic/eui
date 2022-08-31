/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { EuiFlyoutPaddingSize } from './flyout';
import {
  euiCanAnimate,
  euiBreakpoint,
  logicalCSS,
  logicalCSSWithFallback,
  euiYScrollWithShadows,
  euiOverflowShadowStyles,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiShadowXLarge } from '../../themes/amsterdam/global_styling/mixins';
import { transparentize } from '../../services/color';
import { euiFormMaxWidth } from '../form/form.styles';

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

export const euiFlyoutStyles = (
  euiThemeContext: UseEuiTheme,
  paddingSize: EuiFlyoutPaddingSize
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const paddingModifierMap = {
    none: 0,
    s: `${euiTheme.size.s}px`,
    m: `${euiTheme.size.base}px`,
    l: `${euiTheme.size.l}px`,
  };

  const euiFormMaxWidthNumber: number = parseInt(
    euiFormMaxWidth(euiThemeContext).replace('px', ''),
    10
  );

  const euiSizeMediumNumber: number = parseInt(
    euiTheme.size.m.replace('px', ''),
    10
  );

  const flyoutSizes = {
    s: {
      min: Math.round(euiTheme.breakpoint.m * 0.5),
      width: '25vw',
      max: Math.round(euiTheme.breakpoint.s * 0.7),
    },

    m: {
      min: euiFormMaxWidthNumber + euiSizeMediumNumber * 2,
      width: '50vw',
      max: euiTheme.breakpoint.m,
    },

    l: {
      min: Math.round(euiTheme.breakpoint.m * 0.9),
      width: '75vw',
      max: Math.round(euiTheme.breakpoint.l),
    },
  };

  const calculateFooterPadding = (paddingSize: EuiFlyoutPaddingSize) => {
    const footerPaddingWithPixels = paddingModifierMap[paddingSize];

    // Removing the 'px' from the end of euiTheme.size.m to perform calculation
    const footerPaddingAmount =
      typeof footerPaddingWithPixels === 'string'
        ? parseInt(footerPaddingWithPixels.replace('px', ''))
        : footerPaddingWithPixels;

    const footerPaddingSizes = {
      none: `padding: ${footerPaddingWithPixels};`,
      s: `padding: ${footerPaddingWithPixels};`,
      m: `padding: ${footerPaddingAmount * 0.75}px ${footerPaddingWithPixels};`,
      l: `padding: ${footerPaddingAmount / 1.5}px ${footerPaddingWithPixels};`,
    };

    return footerPaddingSizes[paddingSize];
  };

  return {
    euiFlyout: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
      ${euiShadowXLarge(euiThemeContext)};
      position: fixed;
      ${logicalCSS('top', 0)}
      ${logicalCSS('right', 0)}
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('height', '100%')}
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
        ${logicalCSS('max-width', '90vw')}
      }
    `,

    // Close Button
    closeButton: css`
      background-color: ${transparentize(euiTheme.colors.emptyShade, 0.1)};
      position: absolute;
      ${logicalCSS('right', euiTheme.size.s)}
      ${logicalCSS('top', euiTheme.size.s)}
      z-index: 3;
    `,
    'closeButton--outside': css`
      // match dropshadow
      ${euiShadowXLarge(euiThemeContext)};
      ${logicalCSS('right', 'auto')}
      ${logicalCSS('left', 0)}
      // Override the hover and focus transitions of buttons
      animation: none !important;
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        transform: translateX(calc(-100% - ${euiTheme.size.l}));
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        transform: translateX(calc(-100% - ${euiTheme.size.xs}));
      }
    `,
    'closeButton--inside': css``,
    'closeButton--outside-left': css`
      ${logicalCSS('right', 0)}
      ${logicalCSS('left', 'auto')}
      
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        transform: translateX(calc(100% + ${euiTheme.size.l}));
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        transform: translateX(calc(100% + ${euiTheme.size.xs}));
      }
    `,

    // Flyout Sizes
    // Note: Dashes are used because s, m, l are size values for multiple props
    'flyoutSize--s': css`
      &.euiFlyout--maxWidth-default {
        ${logicalCSS('max-width', `${flyoutSizes.s.max}px`)}
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        ${logicalCSS('min-width', `${flyoutSizes.s.min}px`)}
        ${logicalCSS('width', flyoutSizes.s.width)}
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        ${logicalCSS('min-width', 0)}
        ${logicalCSS('width', `${flyoutSizes.s.min}px`)}
      }
    `,
    'flyoutSize--m': css`
      &.euiFlyout--maxWidth-default {
        ${logicalCSS('max-width', `${flyoutSizes.m.max}px`)}
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        ${logicalCSS('min-width', `${flyoutSizes.m.min}px`)}
        ${logicalCSS('width', flyoutSizes.m.width)}
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        ${logicalCSS('min-width', 0)}
        ${logicalCSS('width', `${flyoutSizes.m.min}px`)}
      }
    `,
    'flyoutSize--l': css`
      &.euiFlyout--maxWidth-default {
        ${logicalCSS('max-width', `${flyoutSizes.l.max}px`)}
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        ${logicalCSS('min-width', `${flyoutSizes.l.min}px`)}
        ${logicalCSS('width', `${flyoutSizes.l.min}px`)}
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        ${logicalCSS('min-width', 0)}
        ${logicalCSS('width', `${flyoutSizes.l.min}px`)}
      }
    `,

    // Side
    right: css``,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
      ${logicalCSS('border-left', 'none')}
      ${logicalCSS('left', 0)}
      ${logicalCSS('right', 'auto')}
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
      ${logicalCSS('border-left', euiTheme.border.thick)}
      // Make sure the header shadows are above
      z-index: ${Number(euiTheme.levels.header) - 1};
    `,
    'push--left': css`
      ${logicalCSS('border-left', 'none')}
      ${logicalCSS('border-right', euiTheme.border.thick)}
    `,

    // Header
    euiFlyoutHeader: css`
      .euiFlyoutHeader {
        flex-grow: 0;
        ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
        ${logicalCSS('padding-top', paddingModifierMap[paddingSize])}
      }
      .euiFlyoutHeader--hasBorder {
        ${logicalCSS('border-bottom', euiTheme.border.thin)}
        ${logicalCSS('padding-bottom', paddingModifierMap[paddingSize])}
      }
    `,

    // Body
    euiFlyoutBody: css`
      .euiFlyoutBody {
        flex-grow: 1;
        ${logicalCSSWithFallback('overflow-y', 'hidden')}
        ${logicalCSS('height', '100%')}
        .euiFlyoutBody__overflow {
          ${euiYScrollWithShadows(euiThemeContext)};
          &.euiFlyoutBody__overflow--hasBanner {
            ${euiOverflowShadowStyles(euiThemeContext, {
              direction: 'y',
              side: 'end',
            })};
          }
        }
        .euiFlyoutBody__overflowContent {
          padding: ${paddingModifierMap[paddingSize]};
        }
        .euiFlyoutBody__banner .euiCallOut {
          ${logicalCSSWithFallback('overflow-x', 'hidden')}
          border: none; // Remove border from callout when it is a flyout banner
          border-radius: 0; // Ensures no border-radius in all themes
          ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
        }
      }
    `,

    // Footer
    euiFlyoutFooter: css`
      .euiFlyoutFooter {
        background: ${euiTheme.colors.lightestShade};
        flex-grow: 0;
        ${calculateFooterPadding(paddingSize)}
      }
    `,
  };
};
