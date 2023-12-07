/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { _EuiThemeSize, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { EuiLoadingLogoSize } from './loading_logo';

const loadingPulsateAndFade = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    transform: scale(.5);
    opacity: .1;
  }

  100% {
    opacity: 0;
  }
`;

const loadingPulsate = keyframes`
  0% {
    opacity: .15;
  }

  50% {
    transform: scale(.5);
    opacity: .05;
  }

  100% {
    opacity: .15;
  }
`;

const loadingBounce = keyframes`
  50% {
    transform: translateY(-50%);
  }
`;

const loadingPadding: {
  [size in EuiLoadingLogoSize]: _EuiThemeSize;
} = {
  m: 'xxs',
  l: 'xs',
  xl: 's',
};

export const euiLoadingLogoStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiLoadingLogo: css`
      position: relative;
      display: inline-block;

      ${euiCanAnimate} {
        &::before,
        &::after {
          position: absolute;
          content: '';
          inline-size: 90%;
          inset-inline-start: 5%;
          border-radius: 50%;
          opacity: 0.2;
          z-index: 1;
        }

        &::before {
          box-shadow: 0 0 ${euiTheme.size.s} ${euiTheme.colors.fullShade};
          animation: 1s ${loadingPulsateAndFade}
            ${euiTheme.animation.resistance} infinite;
        }

        &::after {
          background-color: ${euiTheme.colors.fullShade};
          animation: 1s ${loadingPulsate} ${euiTheme.animation.resistance}
            infinite;
        }
      }
    `,

    /**
     * 1. Requires pixel math for animation
     * 2. Add a half the amount of animation distance padding to the top to give it more room
     */
    m: css`
      ${euiCanAnimate} {
        /* 2 */
        padding-block-start: ${euiTheme.size[loadingPadding.m]};
      }

      &::before,
      &::after {
        block-size: ${euiTheme.base * 0.25}px; /* 1 */
        inset-block-end: -${euiTheme.size.xs};
      }
    `,

    l: css`
      ${euiCanAnimate} {
        /* 2 */
        padding-block-start: ${euiTheme.size[loadingPadding.l]};
      }

      &::before,
      &::after {
        block-size: ${euiTheme.base * 0.375}px; /* 1 */
        inset-block-end: -${euiTheme.size.s};
      }
    `,

    xl: css`
      ${euiCanAnimate} {
        /* 2 */
        padding-block-start: ${euiTheme.size[loadingPadding.xl]};
      }

      &::before,
      &::after {
        block-size: ${euiTheme.base * 0.5}px; /* 1 */
        inset-block-end: -${euiTheme.size.m};
      }
    `,
  };
};

export const euiLoadingLogoIconStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiLoadingLogo__icon: css`
      display: inline-block;

      ${euiCanAnimate} {
        animation: 1s ${loadingBounce} ${euiTheme.animation.resistance} infinite;
      }
    `,
  };
};
