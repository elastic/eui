/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiPaletteColorBlind, shadeOrTint, UseEuiTheme } from '../../services';
import { euiCanAnimate, logicalCSS } from '../../global_styling';

export const euiLoadingChartStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiLoadingChart: css`
    overflow: hidden;
    display: inline-flex;
  `,
  m: css`
    ${logicalCSS('height', euiTheme.size.base)}
    gap: ${euiTheme.size.xxs};
  `,
  l: css`
    ${logicalCSS('height', euiTheme.size.l)}
    gap: ${euiTheme.size.xxs};
  `,
  xl: css`
    ${logicalCSS('height', euiTheme.size.xl)}
    gap: ${euiTheme.size.xs};
  `,
});

export const euiLoadingChartBarStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiLoadingChart__bar: css`
    ${logicalCSS('height', '100%')}
    display: inline-block;
  `,
  m: css`
    ${logicalCSS('width', euiTheme.size.xxs)}
    ${logicalCSS('margin-bottom', euiTheme.size.s)}
  `,
  l: css`
    ${logicalCSS('width', euiTheme.size.xs)}
    ${logicalCSS('margin-bottom', euiTheme.size.m)}
  `,
  xl: css`
    ${logicalCSS('width', euiTheme.size.s)}
    ${logicalCSS('margin-bottom', euiTheme.size.base)}
  `,
});

const barAnimation = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(66%);
  }

  100% {
    transform: translateY(0);
  }
`;

export const _barIndex = (
  index: number,
  mono: boolean,
  { euiTheme, colorMode }: UseEuiTheme
) => {
  const backgroundColor = mono
    ? shadeOrTint(euiTheme.colors.lightShade, index * 0.04, colorMode)
    : euiPaletteColorBlind()[index];

  return css`
    background-color: ${backgroundColor};
    /* Without the animation, the bars are all the same height,
       so we apply transforms which are overridden by the animation if animations are allowed */
    transform: translateY(${22 * index}%);

    ${euiCanAnimate} {
      animation: ${barAnimation} 1s ${`.${index}s`} infinite;
    }
  `;
};
