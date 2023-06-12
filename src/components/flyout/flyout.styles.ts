/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { _EuiFlyoutPaddingSize, EuiFlyoutSize } from './flyout';
import {
  euiCanAnimate,
  euiMaxBreakpoint,
  euiMinBreakpoint,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiShadowXLarge } from '../../themes/amsterdam/global_styling/mixins';
import { transparentize } from '../../services/color';
import { euiFormVariables } from '../form/form.styles';

export const euiFlyoutSlideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  75% {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const euiFlyoutSlideInLeft = keyframes`
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
      /* Match dropshadow */
      ${euiShadowXLarge(euiThemeContext)}
      /* Override the hover and focus transitions of buttons */
      animation: none !important; /* stylelint-disable-line declaration-no-important */
    `,
    outsideSide: {
      // `transforms` pull in close buttons a little
      // `!important` is necessary here to override the hover/focus transitions of buttons
      right: css`
        /* stylelint-disable declaration-no-important */
        ${logicalCSS('left', 0)}

        ${euiMaxBreakpoint(euiThemeContext, 'm')} {
          transform: translateX(calc(-100% - ${euiTheme.size.xs})) !important;
        }
        ${euiMinBreakpoint(euiThemeContext, 'm')} {
          transform: translateX(calc(-100% - ${euiTheme.size.l})) !important;
        }
        /* stylelint-enable declaration-no-important */
      `,
      left: css`
        /* stylelint-disable declaration-no-important */
        ${logicalCSS('right', 0)}

        ${euiMaxBreakpoint(euiThemeContext, 'm')} {
          transform: translateX(calc(100% + ${euiTheme.size.xs})) !important;
        }
        ${euiMinBreakpoint(euiThemeContext, 'm')} {
          transform: translateX(calc(100% + ${euiTheme.size.l})) !important;
        }
        /* stylelint-enable declaration-no-important */
      `,
    },
  };
};

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiFlyout: css`
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
        /* Remove focus ring because of tabindex=0 */
        outline: none;
      }

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        /* 1. Leave only a small sliver exposed on small screens so users understand that this is not a new page
           2. If a custom maxWidth is set, we need to override it. */
        ${logicalCSS('max-width', '90vw !important')}
      }
    `,

    // Flyout sizes
    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}
    `,
    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}
    `,
    l: css`
      ${composeFlyoutSizing(euiThemeContext, 'l')}
    `,
    noMaxWidth: css`
      ${logicalCSS('max-width', 'none')}
    `,

    // Side
    right: css`
      clip-path: polygon(-50% 0, 100% 0, 100% 100%, -50% 100%);
      ${logicalCSS('right', 0)}

      ${euiCanAnimate} {
        animation: ${euiFlyoutSlideInRight} ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance};
      }
    `,
    // Left-side flyouts should only be used for navigation
    left: css`
      ${logicalCSS('left', 0)}
      clip-path: polygon(0 0, 150% 0, 150% 100%, 0 100%);

      ${euiCanAnimate} {
        animation: ${euiFlyoutSlideInLeft} ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance};
      }
    `,

    // Type
    overlay: css`
      ${euiShadowXLarge(euiThemeContext)}
    `,
    push: css`
      clip-path: none;
      /* Don't animate on loading a docked nav */
      animation-duration: 0s !important; /* stylelint-disable-line declaration-no-important */
      /* Make sure the header shadows are above */
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
  const form = euiFormVariables(euiThemeContext);

  // 1. Calculating the minimum width based on the screen takeover breakpoint
  const flyoutSizes = {
    s: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.5)}px`, // 1.
      width: '25vw',
      max: `${Math.round(euiTheme.breakpoint.s * 0.7)}px`,
    },

    m: {
      // Calculated for forms plus padding
      min: `${mathWithUnits(form.maxWidth, (x) => x + 24)}`,
      width: '50vw',
      max: `${euiTheme.breakpoint.m}px`,
    },

    l: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.9)}px`, // 1.
      width: '75vw',
      max: `${euiTheme.breakpoint.l}px`,
    },
  };

  return `
    ${logicalCSS('max-width', flyoutSizes[size].max)}

    ${euiMaxBreakpoint(euiThemeContext, 'm')} {
      ${logicalCSS('min-width', 0)}
      ${logicalCSS('width', flyoutSizes[size].min)}
    }
    ${euiMinBreakpoint(euiThemeContext, 'm')} {
      ${logicalCSS('min-width', flyoutSizes[size].min)}
      ${logicalCSS('width', flyoutSizes[size].width)}
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
    m: `${mathWithUnits(euiTheme.size.base, (x) => x * 0.75)} ${
      euiTheme.size.base
    };`,
    l: `${mathWithUnits(euiTheme.size.l, (x) => x / 1.5)} ${euiTheme.size.l};`,
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
