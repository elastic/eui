/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

// Animation for moving flyout backwards in 3D space (z-axis) when inactive
const euiFlyoutSlideBack3D = keyframes`
  from {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  to {
    transform: translateZ(-500px) translateX(100%) scale(0.5);
    filter: blur(3px);
    opacity: 0.6;
  }
`;

// Animation for bringing flyout forward from 3D space when transitioning to active
const euiFlyoutSlideForward3D = keyframes`
  from {
    transform: translateZ(-500px) translateX(100%) scale(0.5);
    filter: blur(3px);
    opacity: 0.6;
  }
  to {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

export const euiManagedFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    managedFlyout: css`
      /* Base 3D context for all managed flyouts */
      perspective: 1000px;
      transform-style: preserve-3d;

      /* When flyout is inactive, animate backwards in 3D space */
      &[data-managed-flyout-active='false'] {
        ${euiCanAnimate} {
          animation: ${euiFlyoutSlideBack3D} ${euiTheme.animation.extraSlow}
            ${euiTheme.animation.resistance} forwards;
          pointer-events: none;
        }
      }

      /* When flyout is active, ensure it's on top and interactive */
      &[data-managed-flyout-active='true'] {
        z-index: ${parseInt(euiTheme.levels.flyout as string) + 1};
        pointer-events: auto;
      }
    `,
    // TODO: make this work eventually
    becomesActive: css`
      animation: ${euiFlyoutSlideForward3D} ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance} forwards;
    `,
    backgroundDefault: css`
      /* Default background for flyouts */
      background: ${euiTheme.colors.backgroundBasePlain};
    `,
    backgroundShaded: css`
      /* Shaded background for child flyouts */
      background: ${euiTheme.colors.backgroundBaseSubdued};
    `,
  };
};
