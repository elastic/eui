/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate, euiCantAnimate } from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

const sweep = keyframes`
  from {
    background-position: 100% 0;
  }

  to {
    background-position: 0% 0;
  }
`;

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(var(--euiShimmerTextDistance));
    filter: blur(var(--euiShimmerTextBlur));
  }
`;

const exit = keyframes`
  to {
    opacity: 0;
    transform: translateY(calc(var(--euiShimmerTextDistance) * -1));
    filter: blur(var(--euiShimmerTextBlur));
  }
`;

export const euiShimmeringTextStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const sweepDuration = `calc(${euiTheme.animation.extraSlow} * 3)`;

  return {
    euiShimmeringText: css`
      position: relative;
      display: inline-block;
      text-align: start;
      font-weight: ${euiTheme.font.weight.regular};
      --euiShimmerTextDistance: ${euiTheme.size.xs};
      --euiShimmerTextBlur: ${euiTheme.size.xxs};
    `,
    sizer: css`
      display: block;
      visibility: hidden;
      white-space: nowrap;
    `,
    line: css`
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      display: block;
      text-align: start;
      white-space: nowrap;
      color: ${euiTheme.colors.textSubdued};
    `,
    // The band is a third of a gradient three times the line width.
    loading: css`
      .euiShimmeringText__line::before {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: linear-gradient(
          90deg,
          transparent 0%,
          transparent 32%,
          ${euiTheme.colors.textHeading} 50%,
          transparent 68%,
          transparent 100%
        );
        background-size: 300% 100%;
        background-repeat: no-repeat;
        background-position: 100% 0;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;

        ${euiCanAnimate} {
          animation: ${sweep} ${sweepDuration} linear infinite;
        }

        ${highContrastModeStyles(euiThemeContext, {
          forced: 'content: none;',
        })}
      }
    `,
    enter: css`
      ${euiCanAnimate} {
        animation: ${enter} ${euiTheme.animation.slow}
          ${euiTheme.animation.resistance} both;
      }
    `,
    exit: css`
      ${euiCanAnimate} {
        animation: ${exit} ${euiTheme.animation.slow}
          ${euiTheme.animation.resistance} both;
      }

      ${euiCantAnimate} {
        display: none;
      }
    `,
  };
};
