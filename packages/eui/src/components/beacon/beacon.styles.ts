/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keyframes, css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  logicalCSS,
  logicalSizeCSS,
} from '../../global_styling';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';

const _colorCSS = (color: string) => {
  return `
    background-color: ${color};
    &:before,
    &:after {
      box-shadow: 0 0 1px 1px ${color};
    }
  `;
};

const euiBeaconPulseLarge = keyframes`
 0% {
    transform: scale(.1);
    opacity: 1;
  }

  70% {
    transform: scale(3);
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`;

const euiBeaconPulseSmall = keyframes`
   0% {
    transform: scale(.1);
    opacity: 1;
  }

  70% {
    transform: scale(2);
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`;

export const euiBeaconStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base
    euiBeacon: css`
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 50%;
      ${preventForcedColors(euiThemeContext)}

      svg {
        ${logicalSizeCSS('100%')}
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
        ${logicalSizeCSS('100%')}
        ${logicalCSS('left', 0)}
      ${logicalCSS('top', 0)}
      background-color: transparent;
        border-radius: 50%;
      }

      /* Without the animation, we only display one ring around the circle
       If the animation is allowed the transform and opacity are overriden */
      &::before {
        transform: scale(1.6);
        opacity: 0.4;
      }

      &::after {
        opacity: 0;
      }

      ${euiCanAnimate} {
        &::before {
          animation: ${euiBeaconPulseLarge} 2.5s infinite ease-out;
        }

        &::after {
          animation: ${euiBeaconPulseSmall} 2.5s infinite ease-out 0.25s;
        }
      }
    `,
    subdued: css(_colorCSS(euiTheme.colors.textSubdued)),
    primary: css(_colorCSS(euiTheme.colors.primary)),
    success: css(_colorCSS(euiTheme.colors.accentSecondary)),
    warning: css(_colorCSS(euiTheme.colors.warning)),
    danger: css(_colorCSS(euiTheme.colors.danger)),
    accent: css(_colorCSS(euiTheme.colors.accent)),
  };
};
