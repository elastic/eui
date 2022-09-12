/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { _EuiFlyoutPaddingSize } from './flyout';
import { euiCanAnimate, euiBreakpoint, logicalCSS } from '../../global_styling';
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

export const euiFlyoutCloseButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiFlyout__closeButton: css`
      background-color: ${transparentize(euiTheme.colors.emptyShade, 0.1)};
      position: absolute;
      ${logicalCSS('right', euiTheme.size.s)}
      ${logicalCSS('top', euiTheme.size.s)}
      z-index: 3;
    `,
    outside: css`
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
    inside: css``,
    outsideLeft: css`
      ${logicalCSS('right', 0)}
      ${logicalCSS('left', 'auto')}
      
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        transform: translateX(calc(100% + ${euiTheme.size.l}));
      }
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        transform: translateX(calc(100% + ${euiTheme.size.xs}));
      }
    `,
  };
};

export const euiFlyoutStyles = (
  euiThemeContext: UseEuiTheme,
  paddingSize: _EuiFlyoutPaddingSize
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const euiFormMaxWidthNumber = parseInt(euiFormMaxWidth(euiThemeContext), 10);

  const euiSizeMediumNumber = parseInt(euiTheme.size.m, 10);

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

    // Flyout Sizes
    s: css`
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
    m: css`
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
    l: css`
      &.euiFlyout--maxWidth-default {
        ${logicalCSS('max-width', `${flyoutSizes.l.max}px`)}
      }
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
        ${logicalCSS('min-width', `${flyoutSizes.l.min}px`)}
        ${logicalCSS('width', flyoutSizes.l.width)}
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
    pushLeft: css`
      ${logicalCSS('border-left', 'none')}
      ${logicalCSS('border-right', euiTheme.border.thick)}
    `,

    // Padding
    paddingSizes: {
      none: css`
        ${composeFlyoutPadding(euiThemeContext, paddingSize)}
      `,
      s: css`
        ${composeFlyoutPadding(euiThemeContext, paddingSize)}
      `,
      m: css`
        ${composeFlyoutPadding(euiThemeContext, paddingSize)}
      `,
      l: css`
        ${composeFlyoutPadding(euiThemeContext, paddingSize)}
      `,
    },
  };
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

  const flyoutPadding = css`
    .euiFlyoutHeader {
      ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
      ${logicalCSS('padding-top', paddingModifierMap[paddingSize])}
    }

    .euiFlyoutHeader--hasBorder {
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
  return flyoutPadding;
};
