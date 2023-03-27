/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keyframes } from '@emotion/react';

export const euiAnimFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const euiAnimSlideInUp = (size: string) => keyframes`
   0% {
    opacity: 0;
    transform: translateY(${size});
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const euiAnimSlideX = (size: string) => keyframes`
  0% {
    transform: translateX(${size});
  }

  100% {
    transform: translateX(0);

  }
`;

export const euiAnimScale = keyframes`
  0% {
    opacity: 0;
  }

  1% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
