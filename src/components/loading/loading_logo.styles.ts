/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiCanAnimate } from '../../global_styling/variables/_animations';
import { UseEuiTheme } from '../../services';

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

const loadingAnimationDistance = { m: 's', l: 'm', xl: 'base' };

export const euiLoadingLogoStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiLoadingLogo: css`
      position: relative;
      display: inline-block;

      ${euiCanAnimate} {
        &:before,
        &:after {
          position: absolute;
          content: '';
          width: 90%;
          inset-inline-start: 5%;
          border-radius: 50%;
          opacity: 0.2;
          z-index: 1;
        }
      }

      &:before {
        box-shadow: 0 0 ${euiTheme.size.s} ${euiTheme.colors.fullShade};
        animation: 1s ${loadingPulsateAndFade} ${euiTheme.animation.resistance}
          infinite;
      }

      &:after {
        background-color: ${euiTheme.colors.fullShade};
        animation: 1s ${loadingPulsate} ${euiTheme.animation.resistance}
          infinite;
      }
      /* } */
    `,

    /**
     * 1. Requires pixel math for animation.
     */
    m: css`
      padding-block-start: ${euiTheme.size[loadingAnimationDistance.m]};

      &:before,
      &:after {
        height: ${euiTheme.size.xs};
        inset-block-end: -${euiTheme.size.xs};
      }
    `,

    l: css`
      padding-block-start: ${euiTheme.size[loadingAnimationDistance.l]};

      &:before,
      &:after {
        height: ${euiTheme.size.s};
        inset-block-end: -${euiTheme.size.s};
      }
    `,

    xl: css`
      padding-block-start: ${euiTheme.size[loadingAnimationDistance.xl]};

      &:before,
      &:after {
        height: ${euiTheme.size.s};
        inset-block-end: -${euiTheme.size.m};
      }
    `,
  };
};

export const euiLoadingLogoIconStyles = ({ euiTheme }: UseEuiTheme) => {
  function loadingBounce(size: any) {
    return keyframes`
      50% {
        transform: translateY(-${
          euiTheme.size[loadingAnimationDistance[size]]
        });
      }
    `;
  }

  return {
    euiLoadingLogo__icon: css`
      ${euiCanAnimate} {
        animation: 1s ${loadingBounce('m')} ${euiTheme.animation.resistance}
          infinite;
      }
    `,

    m: css`
      animation-name: ${loadingBounce('m')};
    `,

    l: css`
      animation-name: ${loadingBounce('l')};
    `,

    xl: css`
      animation-name: ${loadingBounce('xl')};
    `,
  };
};
