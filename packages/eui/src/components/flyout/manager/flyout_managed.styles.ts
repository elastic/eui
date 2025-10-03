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
  LEVEL_MAIN,
  STAGE_ACTIVE,
  STAGE_BACKGROUNDED,
  STAGE_BACKGROUNDING,
  STAGE_CLOSING,
  STAGE_INACTIVE,
  STAGE_OPENING,
  STAGE_RETURNING,
} from './const';
import { _EuiFlyoutSide, DEFAULT_SIDE } from '../const';
import type { EuiFlyoutActivityStage, EuiFlyoutLevel } from './types';

/**
 * Emotion styles for managed flyouts.
 * Provides base 3D context and animations tied to managed flyout stages
 * via data attributes.
 */
export const euiManagedFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    stage: (
      activeStage: EuiFlyoutActivityStage,
      side: _EuiFlyoutSide = DEFAULT_SIDE,
      level: EuiFlyoutLevel
    ) => {
      // Animation for moving flyout backwards in 3D space (z-axis) when inactive
      const euiFlyoutSlideBack3D = keyframes`
        from {
          transform: translateZ(0) translateX(0) scale(1);
          filter: blur(0px);
          opacity: 1;
        }
        to {
          transform: translateZ(-1500px) translateX(${
            side === 'left' ? 'calc(-100vw - 100%)' : 'calc(100vw + 100%)'
          }) scale(0.5);
          filter: blur(3px);
          opacity: 0.6;
        }
      `;

      // Animation for bringing flyout forward from 3D space when transitioning to active
      const euiFlyoutSlideForward3D = keyframes`
        from {
          transform: translateZ(-500px) translateX(${
            side === 'left' ? 'calc(-100vw - 100%)' : 'calc(100vw + 100%)'
          }) scale(0.85);
          filter: blur(3px);
          opacity: 0.6;
        }
        to {
          transform: translateZ(0) translateX(0) scale(1);
          filter: blur(0px);
          opacity: 1;
        }
      `;
      // When flyout is becoming inactive, animate backwards in 3D space
      const inactiveTransition = css`
        ${euiCanAnimate} {
          animation: ${euiFlyoutSlideBack3D} ${euiTheme.animation.extraSlow}
            ${euiTheme.animation.resistance} forwards;
          pointer-events: none;
        }
      `;

      // When flyout is becoming active from a backgrounded state, animate forward in 3D space
      const returningTransition = css`
        ${euiCanAnimate} {
          animation: ${euiFlyoutSlideForward3D} ${euiTheme.animation.normal}
            ${euiTheme.animation.resistance} forwards;
        }
      `;

      const noTransition = css`
        ${euiCanAnimate} {
          animation: none;
          opacity: 1;
        }
      `;

      const activeFlyout = css`
        z-index: ${parseInt(euiTheme.levels.flyout as string) + 1};
        pointer-events: auto;
      `;

      const inactiveFlyout = css`
        ${side === 'left'
          ? logicalCSS('right', '100vw')
          : logicalCSS('left', '100vw')}
        transform: translateX(${side === 'left'
          ? 'calc(-100vw - 100%)'
          : 'calc(100vw + 100%)'});
      `;

      switch (activeStage) {
        case STAGE_OPENING:
          // Apply a higher z-index to opening main flyouts for seamless
          // transitions from previously active main flyouts
          return [level === LEVEL_MAIN && activeFlyout];

        case STAGE_ACTIVE:
          return [activeFlyout, noTransition];

        case STAGE_BACKGROUNDING:
          return [inactiveTransition];

        case STAGE_BACKGROUNDED:
          return [inactiveFlyout, noTransition];

        case STAGE_RETURNING:
          return [activeFlyout, returningTransition];

        case STAGE_INACTIVE:
          return [inactiveFlyout, noTransition];

        case STAGE_CLOSING:
          return [inactiveTransition];
      }
    },
    managedFlyout: css`
      /* Base 3D context for all managed flyouts */
      perspective: 1000px;
      transform-style: preserve-3d;
    `,
  };
};
