/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiShadow,
  euiShadowFlat,
  euiShadowMedium,
} from '../../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme, tint } from '../../../services';
import {
  euiCanAnimate,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';

export const openAnimationTiming = 'slow';

/**
 * 1. Can expand further, but it looks weird if it's smaller than the originating button.
 * 2. Animation happens on the panel. But don't animate position when using the attached mode like for inputs
 * 3. Make sure the panel stays within the window.
 * 4. Make the popover lighter on dark mode (too hard to distinguish from plain bgs otherwise), and set a CSS var for the arrow to use
 */

export const euiPopoverPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const translateDistance = euiTheme.size.s;
  const animationSpeed = euiTheme.animation[openAnimationTiming];

  const opacityTransition = `opacity ${euiTheme.animation.bounce} ${animationSpeed}`;
  const transformTransition = `transform ${
    euiTheme.animation.bounce
  } ${mathWithUnits(animationSpeed, (x) => x + 100)}`;

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

      ${euiCanAnimate} {
        /* 2 */
        transition: ${opacityTransition}, ${transformTransition};
      }

      &:focus {
        outline-offset: 0;
      }
    `,
    isOpen: css`
      opacity: 1;
      pointer-events: auto;
    `,

    /* 4 */
    light: css`
      --euiPopoverBackgroundColor: ${euiTheme.colors.emptyShade};
    `,
    dark: css`
      --euiPopoverBackgroundColor: ${tint(euiTheme.colors.emptyShade, 0.025)};
    `,

    // Regular popover with an arrow, a transform animation/transition, and a
    // drop shadow via `filter` (which automatically handles the arrow)
    hasTransform: {
      hasTransform: css`
        transform: translateY(0) translateX(0) translateZ(0); /* 2 */
        ${euiShadowMedium(euiThemeContext, { property: 'filter' })}

        ${euiCanAnimate} {
          transition: ${opacityTransition}, ${transformTransition}; /* 2 */
        }
      `,
      // Positions
      top: css`
        transform: translateY(${translateDistance}) translateZ(0);
      `,
      bottom: css`
        transform: translateY(-${translateDistance}) translateZ(0);
      `,
      left: css`
        transform: translateX(${translateDistance}) translateZ(0);
      `,
      right: css`
        transform: translateX(-${translateDistance}) translateZ(0);
      `,
    },

    // No arrow, transform, or filters
    isAttached: {
      isAttached: css`
        ${euiCanAnimate} {
          transition: ${opacityTransition}; /* 2 */
        }
      `,
      top: css`
        ${euiShadowFlat(euiThemeContext)}
      `,
      bottom: css`
        ${euiShadow(euiThemeContext, 'm')}
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
