/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { _EuiFlyoutPaddingSize, EuiFlyoutSize } from './flyout';
import { euiCanAnimate, euiBreakpoint, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiShadowXLarge } from '../../themes/amsterdam/global_styling/mixins';
import { transparentize } from '../../services/color';

const euiFlyoutSlideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  75% {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const euiFlyoutSlideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  75% {
    opacity: 1;
    transform: translateX(0%);
}
`;

export const euiFlyoutCloseButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiFlyout__closeButton: css`
      position: absolute;
      ${logicalCSS('right', euiTheme.size.s)}
      ${logicalCSS('top', euiTheme.size.s)}
      z-index: 3;
    `,
    inside: css`
      background-color: ${transparentize(euiTheme.colors.emptyShade, 0.9)};
    `,
    outside: css`
      // match dropshadow
      ${euiShadowXLarge(euiThemeContext)};
      // Override the hover and focus transitions of buttons
      animation: none !important;
    `,
    outsideSide: {
      right: css`
        ${logicalCSS('right', 'auto')}
        ${logicalCSS('left', 0)}

        ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
          transform: translateX(calc(-100% - ${euiTheme.size.l})) !important;
        }
        ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
          transform: translateX(calc(-100% - ${euiTheme.size.xs})) !important;
        }
      `,
      left: css`
        ${logicalCSS('right', 0)}
        ${logicalCSS('left', 'auto')}

        ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
          transform: translateX(calc(100% + ${euiTheme.size.l})) !important;
        }
        ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
          transform: translateX(calc(100% + ${euiTheme.size.xs})) !important;
        }
      `,
    },
  };
};

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiFlyout: css`
      ${euiShadowXLarge(euiThemeContext)};
      position: fixed;
      ${logicalCSS('top', 0)}
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('height', '100%')}
      z-index: ${euiTheme.levels.flyout};
      background: ${euiTheme.colors.emptyShade};
      display: flex;
      flex-direction: column;
      align-items: stretch;
      &:focus {
        outline: none;
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        ${logicalCSS('max-width', '90vw')}
      }
    `,

    // Flyout Sizes
    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}
    `,
    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}
    `,
    l: css`
      ${composeFlyoutSizing(euiThemeContext, 'l')}
    `,

    // Side
    right: css`
      clip-path: polygon(-50% 0, 100% 0, 100% 100%, -50% 100%);
      ${logicalCSS('border-left', euiTheme.border.thin)}
      ${logicalCSS('right', 0)}
      ${euiCanAnimate} {
        animation: ${euiFlyoutSlideInRight} ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance};
      }
    `,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
      ${logicalCSS('left', 0)}
      clip-path: polygon(0 0, 150% 0, 150% 100%, 0 100%);
      ${euiCanAnimate} {
        animation: ${euiFlyoutSlideInLeft};
      }
    `,

    // Type
    overlay: css``,
    push: css`
      box-shadow: none;
      clip-path: none;
      animation-duration: 0s !important; // Don't animate on loading a docked nav
      // Make sure the header shadows are above
      z-index: ${Number(euiTheme.levels.flyout) - 1};
    `,
    pushSide: {
      right: css`
        ${logicalCSS('border-left', euiTheme.border.thick)}
      `,
      left: css`
        ${logicalCSS('border-right', euiTheme.border.thick)}
      `,
    },

    // Padding
    paddingSizes: {
      none: css`
        ${composeFlyoutPadding(euiThemeContext, 'none')}
      `,
      s: css`
        ${composeFlyoutPadding(euiThemeContext, 's')}
      `,
      m: css`
        ${composeFlyoutPadding(euiThemeContext, 'm')}
      `,
      l: css`
        ${composeFlyoutPadding(euiThemeContext, 'l')}
      `,
    },
  };
};

const composeFlyoutSizing = (
  euiThemeContext: UseEuiTheme,
  size: EuiFlyoutSize
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const flyoutSizes = {
    s: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.5)}px`,
      width: '25vw',
      max: `${Math.round(euiTheme.breakpoint.s * 0.7)}px`,
    },

    m: {
      min: `${euiTheme.breakpoint.m * 0.8}px`,
      width: '50vw',
      max: euiTheme.breakpoint.m,
    },

    l: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.9)}px`,
      width: '75vw',
      max: `${Math.round(euiTheme.breakpoint.l)}px`,
    },
  };

  return `
    ${logicalCSS('max-width', flyoutSizes[size].max)}

    ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
      ${logicalCSS('min-width', flyoutSizes[size].min)}
      ${logicalCSS('width', flyoutSizes[size].width)}
    }
    ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
      ${logicalCSS('min-width', 0)}
      ${logicalCSS('width', flyoutSizes[size].min)}
    }
  `;
};

const composeFlyoutPadding = (
  euiThemeContext: UseEuiTheme,
  paddingSize: _EuiFlyoutPaddingSize
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const paddingModifierMap = {
    none: 0,
    s: euiTheme.size.s,
    m: euiTheme.size.base,
    l: euiTheme.size.l,
  };

  // Footer padding
  const footerPaddingSizes = {
    none: 0,
    s: euiTheme.size.s,
    m: `${parseInt(euiTheme.size.base, 10) * 0.75}px ${euiTheme.size.base};`,
    l: `${parseInt(euiTheme.size.l, 10) / 1.5}px ${euiTheme.size.l};`,
  };

  return `
    .euiFlyoutHeader {
      ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
      ${logicalCSS('padding-top', paddingModifierMap[paddingSize])}
    }

    [class*='euiFlyoutHeader-hasBorder'] {
      ${logicalCSS('padding-bottom', paddingModifierMap[paddingSize])}
    }

    .euiFlyoutBody__overflowContent {
      padding: ${paddingModifierMap[paddingSize]};
    }

    .euiFlyoutBody__banner .euiCallOut {
      ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
    }

    .euiFlyoutFooter {
      padding: ${footerPaddingSizes[paddingSize]};
    }
  `;
};
