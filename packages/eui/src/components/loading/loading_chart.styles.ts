/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { _EuiThemeComponentColors } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  euiCantAnimate,
  logicalCSS,
} from '../../global_styling';

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

export const BARS_COUNT = 4;

export const euiLoadingChartBarStyles = ({ euiTheme }: UseEuiTheme) => {
  const backgroundColors = outputNthChildCss((index) => {
    const token =
      `loadingChartMonoBackground${index}` as keyof _EuiThemeComponentColors;
    const color = euiTheme.components[token];

    return `background-color: ${color}`;
  });

  return {
    euiLoadingChart__bar: css`
      ${logicalCSS('height', '100%')}
      display: inline-block;

      ${euiCanAnimate} {
        animation: ${barAnimation} 1s infinite;

        ${outputNthChildCss((index) => `animation-delay: 0.${index}s`)}
      }
      ${euiCantAnimate} {
        ${outputNthChildCss((index) => `transform: translateY(${22 * index}%)`)}
      }

      ${backgroundColors}
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
  };
};

/**
 * Small utility helper for generating nth-child CSS for each bar
 */
const outputNthChildCss = (css: (index: number) => string) =>
  Array.from(
    { length: BARS_COUNT },
    (_, index) => `
  &:nth-child(${index + 1}) {
    ${css(index)}
  }`
  ).join();

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
