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
import { getShadowColor } from '../../../themes/amsterdam/global_styling/functions';
import { UseEuiTheme } from '../../../services';
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
 */

export const euiPopoverPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

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
      transform: translateY(0) translateX(0) translateZ(0); /* 2 */
      ${euiShadowMedium(euiThemeContext, { property: 'filter' })}

      ${euiCanAnimate} {
        /* 2 */
        transition: ${opacityTransition}, ${transformTransition};
      }

      &:focus {
        outline-offset: 0;
      }
    `,

    // Is visible / open
    isOpen: css`
      opacity: 1;
      pointer-events: auto;
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

    // Attached version overrides
    attached: {
      attached: css`
        filter: none; /* Necessary to remove the base shadow */
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

    // Overrides for drag & drop contexts within popovers. This is required because
    // the fixed positions of drag and drop don't work inside of transformed elements
    hasDragDrop: {
      hasDragDrop: css`
        transform: none;
        /* Filter also causes a stacking context that interferes with the positioned children,
           so we disable it and recreate the shadow via box-shadow instead */
        filter: none;
        ${euiShadowMedium(euiThemeContext, { property: 'box-shadow' })}

        ${euiCanAnimate} {
          transition: ${opacityTransition}; /* 2 */
        }
      `,
      // The offset transforms must be recreated in margins
      top: css`
        margin-block-start: ${translateDistance};
        /* Existing box-shadow of the popover is sufficient to see the arrow */
      `,
      bottom: css`
        margin-block-start: -${translateDistance};

        .euiPopover__arrow {
          filter: drop-shadow(
            0 -6px 6px ${getShadowColor(euiTheme.colors.shadow, 0.12, colorMode)}
          );
        }
      `,
      left: css`
        margin-inline-start: ${translateDistance};

        .euiPopover__arrow {
          filter: drop-shadow(
            6px 0 6px ${getShadowColor(euiTheme.colors.shadow, 0.12, colorMode)}
          );
        }
      `,
      right: css`
        margin-inline-start: -${translateDistance};

        .euiPopover__arrow {
          filter: drop-shadow(
            -6px 0 6px ${getShadowColor(euiTheme.colors.shadow, 0.12, colorMode)}
          );
        }
      `,
    },
  };
};
