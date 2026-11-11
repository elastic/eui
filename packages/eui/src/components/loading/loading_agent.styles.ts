/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate, logicalSizeCSS } from '../../global_styling';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';

const pulse = keyframes`
  0%,
  45%,
  100% {
    fill: var(--euiAgentLoaderColorOff);
  }

  15% {
    fill: var(--euiAgentLoaderColorOn);
  }
`;

export const euiAgentLoaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  // One cycle is the fast token × 8.
  const cycle = `${Math.round(
    parseFloat(euiTheme.animation.fast ?? '') * 8
  )}ms`;

  return {
    euiAgentLoader: css`
      flex-shrink: 0;
      display: inline-flex;
      --euiAgentLoaderColorOff: ${euiTheme.colors.lightShade};
      --euiAgentLoaderColorOn: ${euiTheme.colors.textSubdued};
      ${preventForcedColors(euiThemeContext)}
    `,
    svg: css`
      inline-size: 100%;
      block-size: 100%;
    `,
    dot: css`
      fill: var(--euiAgentLoaderColorOff);

      ${euiCanAnimate} {
        animation: ${pulse} ${cycle} ${euiTheme.animation.resistance} infinite;
      }
    `,
    ring: css`
      ${euiCanAnimate} {
        animation-delay: ${euiTheme.animation.fast};
      }
    `,
    // s 12px, m 16px, l 24px
    s: css`
      ${logicalSizeCSS(euiTheme.size.m)}
    `,
    m: css`
      ${logicalSizeCSS(euiTheme.size.base)}
    `,
    l: css`
      ${logicalSizeCSS(euiTheme.size.l)}
    `,
  };
};
