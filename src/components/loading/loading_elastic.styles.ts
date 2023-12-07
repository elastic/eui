/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate } from '../../global_styling';

const loadingElastic = keyframes`
  0% {
    transform: scale3d(.2, .2, -.7);
    opacity: .2;
  }

  40% {
    transform: scale3d(1, 1, 2);
    opacity: 1;
  }

  50% {
    transform: scale3d(.99, .99, 2);
  }

  70% {
    transform: scale3d(.96, .96, -2.5);
  }

  100% {
    transform: scale3d(.98, .98, 2);
  }
`;

export const euiLoadingElasticStyles = () => {
  return {
    euiLoadingElastic: css`
      position: relative;
      display: inline-block;

      & path {
        ${euiCanAnimate} {
          animation-name: ${loadingElastic};
          animation-fill-mode: forwards;
          animation-direction: alternate;
          transform-style: preserve-3d;
          animation-duration: 1s;
          animation-timing-function: cubic-bezier(0, 0.63, 0.49, 1);
          animation-iteration-count: infinite;
          transform-origin: 50% 50%;
        }

        /* Hide outline mainly for dark mode */
        &:nth-of-type(1) {
          display: none;
        }

        &:nth-of-type(2) {
          animation-delay: 0.035s;
        }

        &:nth-of-type(3) {
          animation-delay: 0.125s;
        }

        &:nth-of-type(4) {
          animation-delay: 0.155s;
        }

        &:nth-of-type(5) {
          animation-delay: 0.075s;
        }

        &:nth-of-type(6) {
          animation-delay: 0.06s;
        }
      }
    `,
  };
};
