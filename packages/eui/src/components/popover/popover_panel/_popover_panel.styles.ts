/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  euiShadow,
  euiShadowFlat,
  euiShadowMedium,
} from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../../services';
import { euiCanAnimate, logicalCSS } from '../../../global_styling';
import { euiPanelBorderStyles } from '../../panel/panel.styles';

export const openAnimationTiming = 'extraFast';

const euiPopoverPanelAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/**
 * 1. Can expand further, but it looks weird if it's smaller than the originating button.
 * 2. Animation happens on the panel
 * 3. Make sure the panel stays within the window.
 * 4. Make the popover lighter on dark mode (too hard to distinguish from plain bgs otherwise), and set a CSS var for the arrow to use
 */

export const euiPopoverPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const animationSpeed = euiTheme.animation[openAnimationTiming];

  const hasShadow = !highContrastMode;

  return {
    // Base
    euiPopover__panel: css`
      position: absolute;
      ${logicalCSS('min-width', `${euiTheme.base * 7}px`)} /* 1 */
      ${logicalCSS('max-width', `calc(100vw - ${euiTheme.size.xl})`)} /* 3 */
      backface-visibility: hidden;
      pointer-events: none;
      opacity: 0; /* 2 */
      background-color: var(--euiPopoverBackgroundColor); /* 4 */

      ${euiPanelBorderStyles(euiThemeContext)}

      &:focus {
        outline-offset: 0;
      }
    `,
    isOpen: css`
      opacity: 1;
      pointer-events: auto;

      ${euiCanAnimate} {
        animation: ${euiPopoverPanelAnimation} ${animationSpeed} ease-out both;
      }
    `,

    /* 4 */
    light: css`
      --euiPopoverBackgroundColor: ${euiTheme.components
        .popoverPanelBackground};
    `,
    dark: css`
      --euiPopoverBackgroundColor: ${euiTheme.components
        .popoverPanelBackground};
    `,

    // Regular popover with an arrow and a drop shadow via `filter`
    // (which automatically handles the arrow)
    hasTransform: {
      hasTransform: css`
        transform: translateZ(0);
        ${hasShadow
          ? euiShadowMedium(euiThemeContext, { property: 'filter' })
          : ''}
      `,
      // Positions
      top: css``,
      bottom: css``,
      left: css``,
      right: css``,
    },

    // No arrow, transform, or filters
    isAttached: {
      isAttached: css``,
      top: css`
        ${hasShadow ? euiShadowFlat(euiThemeContext) : ''}
      `,
      bottom: css`
        ${hasShadow ? euiShadow(euiThemeContext, 'm') : ''}
      `,
      get left() {
        return this.bottom;
      },
      get right() {
        return this.bottom;
      },
    },
  };
};
