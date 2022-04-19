/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keyframes, css } from '@emotion/react';
import { euiPaletteColorBlind } from '../../services';

const visColors = euiPaletteColorBlind();

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

export const euiBeaconStyles = () => ({
  // Base
  euiBeacon: css`
    position: relative;
    background-color: ${visColors[0]};
    border-radius: 50%;

    &:before,
    &:after {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 0 0 1px 1px ${visColors[0]};
    }

    &:before {
      animation: ${euiBeaconPulseLarge} 2.5s infinite ease-out;
    }

    &:after {
      animation: ${euiBeaconPulseSmall} 2.5s infinite ease-out 0.25s;
    }
  `,
});
