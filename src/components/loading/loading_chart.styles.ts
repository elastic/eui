/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiPaletteColorBlind, shadeOrTint, UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  euiCantAnimate,
} from '../../global_styling/variables/_animations';

export const euiLoadingChartStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiLoadingChart: css`
    overflow: hidden;
    display: inline-flex;
  `,
  m: css`
    height: ${euiTheme.size.base};
    gap: ${euiTheme.size.xxs};
  `,
  l: css`
    height: ${euiTheme.size.l};
    gap: ${euiTheme.size.xxs};
  `,
  xl: css`
    height: ${euiTheme.size.xl};
    gap: ${euiTheme.size.xs};
  `,
});

export const euiLoadingChartBarStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiLoadingChart__bar: css`
    height: 100%;
    display: inline-block;
  `,
  m: css`
    width: ${euiTheme.size.xxs};
    margin-block-end: ${euiTheme.size.s};
  `,
  l: css`
    width: ${euiTheme.size.xs};
    margin-block-end: ${euiTheme.size.m};
  `,
  xl: css`
    width: ${euiTheme.size.s};
    margin-block-end: ${euiTheme.size.base};
  `,
});

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
    ${euiCanAnimate(`animation: euiLoadingChart 1s ${`.${index}s`} infinite;`)}
    // Without the animation, the bars are all the same height, so we apply transforms only if they can't animate
    ${euiCantAnimate(`transform: translateY(${22 * index}%);`)}
  `;
};
