/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadowXLarge } from '@elastic/eui-theme-common';

import { _EuiFlyoutPaddingSize } from './flyout';
import { euiCanAnimate, logicalCSS, mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { composeFlyoutSizing, maxedFlyoutWidth } from './flyout_shared.styles';

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

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  return {
    euiFlyout: css`
      position: fixed;
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('top', 'var(--euiFixedHeadersOffset, 0)')}
      ${logicalCSS('height', 'inherit')}
      z-index: ${euiTheme.levels.flyout};
      background: ${euiTheme.colors.emptyShade};
      display: flex;
      flex-direction: column;
      align-items: stretch;

      &:focus {
        /* Remove focus ring because of tabindex=0 */
        outline: none;
      }

      /* FIXME Debug */
      &.euiFlyout--hasChild--stacked {
        border-block-start: 50px solid cyan;
      }

      ${maxedFlyoutWidth(euiThemeContext)}
    `,

    /**
     * Flyout sizes
     *
     * When a child flyout is stacked on top of the parent, the parent flyout size updates to fill the space required by the child.
     * FIXME: make sure that effect does not cause a child flyout to "push" the page content. Child flyouts should always overlay.
     */
    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}
    `,
    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}

      &.euiFlyout--hasChild--stacked.euiFlyout--hasChild--s {
        /* when a size "s" child flyout is stacked on top of a size "m" parent, the parent flyout size is lowered to match the child. */
        ${composeFlyoutSizing(euiThemeContext, 's')}
      }
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

      &.euiFlyout--hasChild {
        clip-path: none;
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
    overlay: {
      overlay: css`
        ${euiShadowXLarge(euiThemeContext, {
          borderAllInHighContrastMode: true,
        })}

        &:has(.euiResizableButton) {
          border-inline: none;
        }
      `,
      left: css`
        border-inline-end: ${colorMode === 'DARK'
          ? `${euiTheme.border.width.thin} solid
          ${euiTheme.colors.borderBaseFloating}`
          : 'none'};
      `,
      right: css`
        border-inline-start: ${colorMode === 'DARK'
          ? `${euiTheme.border.width.thin} solid
          ${euiTheme.colors.borderBaseFloating}`
          : 'none'};
      `,
    },
    push: {
      push: css`
        clip-path: none;
        /* Make sure the header shadows are above */
        z-index: ${Number(euiTheme.levels.flyout) - 1};
      `,
      right: css`
        ${logicalCSS('border-left', euiTheme.border.thick)}
      `,
      left: css`
        ${logicalCSS('border-right', euiTheme.border.thick)}
      `,
      noAnimation: css`
        /* Don't animate on loading a docked nav */
        animation-duration: 0s !important; /* stylelint-disable-line declaration-no-important */
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
