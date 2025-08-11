/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate, logicalCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';
import {
  PROPERTY_STAGE,
  STAGE_ACTIVE,
  STAGE_BACKGROUNDED,
  STAGE_BACKGROUNDING,
  STAGE_CLOSING,
  STAGE_INACTIVE,
  STAGE_OPENING,
  STAGE_RETURNING,
} from './const';

// Animation for moving flyout backwards in 3D space (z-axis) when inactive
const euiFlyoutSlideBack3D = keyframes`
  from {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  to {
    transform: translateZ(-1500px) translateX(calc(100vw - 100%)) scale(0.5);
    filter: blur(3px);
    opacity: 0.6;
  }
`;

// Animation for bringing flyout forward from 3D space when transitioning to active
const euiFlyoutSlideForward3D = keyframes`
  from {
    transform: translateZ(-500px) translateX(calc(100vw - 100%)) scale(0.85);
    filter: blur(3px);
    opacity: 0.6;
  }
  to {
    transform: translateZ(0) translateX(0) scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

/**
 * Emotion styles for managed flyouts.
 * Provides base 3D context and animations tied to managed flyout stages
 * via data attributes. Returns:
 * - `managedFlyout`: core styles reacting to stage attributes (opening, active,
 *   backgrounding, returning, closing, etc.)
 * - `becomesActive`: helper animation for future/conditional use
 */
export const euiManagedFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    managedFlyout: css`
      /* Base 3D context for all managed flyouts */
      perspective: 1000px;
      transform-style: preserve-3d;

      /* When flyout is inactive, animate backwards in 3D space */
      &[${PROPERTY_STAGE}='${STAGE_CLOSING}'],
      &[${PROPERTY_STAGE}='${STAGE_BACKGROUNDING}'] {
        ${euiCanAnimate} {
          animation: ${euiFlyoutSlideBack3D} ${euiTheme.animation.extraSlow}
            ${euiTheme.animation.resistance} forwards;
          pointer-events: none;
        }
      }

      /* When flyout is active, ensure it's on top and interactive */
      &[${PROPERTY_STAGE}='${STAGE_RETURNING}'] {
        animation: ${euiFlyoutSlideForward3D} ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance} forwards;
      }

      /* When flyout is active, ensure it's on top and interactive */
      &[${PROPERTY_STAGE}='${STAGE_ACTIVE}'],
      &[${PROPERTY_STAGE}='${STAGE_OPENING}'] {
        z-index: ${parseInt(euiTheme.levels.flyout as string) + 1};
        pointer-events: auto;
      }

      /* When flyout is active, ensure it's on top and interactive */
      &[${PROPERTY_STAGE}='${STAGE_ACTIVE}'],
      &[${PROPERTY_STAGE}='${STAGE_INACTIVE}'] {
        animation: none;
        opacity: 1;
      }

      &[${PROPERTY_STAGE}='${STAGE_INACTIVE}'],
      &[${PROPERTY_STAGE}='${STAGE_BACKGROUNDED}'] {
        ${logicalCSS('left', '100vw')}
      }
    `,
    // TODO: make this work eventually
    becomesActive: css`
      animation: ${euiFlyoutSlideForward3D} ${euiTheme.animation.normal}
        ${euiTheme.animation.resistance} forwards;
    `,
  };
};
