/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  logicalSizeCSS,
  logicalCSSWithFallback,
  euiFontSize,
} from '../../../global_styling';
import { euiRangeVariables } from './range.styles';

const tickStyles = ({ euiTheme }: UseEuiTheme, range: any) => {
  return `
    position: absolute;
    ${logicalCSS('top', 0)};
    ${logicalSizeCSS(euiTheme.size.xs, euiTheme.size.xs)};
    background-color: ${euiTheme.colors.lightShade};
    inline-size: ${range.tickWidth};
    block-size: ${range.tickHeight};
    border-radius: 100%;
    border-radius: ${euiTheme.border.radius.small};
  `;
};

export const euiRangeTicksStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTicks: css`
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      display: flex;
    `,
    isCustom: css`
      inset-inline-start: (${range.thumbWidth} / 8);
      inset-inline-end: (${range.thumbWidth} / 8);
    `,
    // compressed and non-compressed styles
    regular: css`
      block-size: calc(${range.height} - ${range.thumbHeight});
      inset-block-start: ${range.thumbHeight};
    `,
    compressed: css`
      block-size: calc(
        ${range.compressedHeight} - ${range.trackBottomPositionWithTicks}
      );
      inset-block-start: calc(
        ${range.thumbHeight} -
          ((${range.thumbHeight} - ${range.trackHeight}) / 2)
      );
    `,
  };
};

export const euiRangeTickStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTick: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      text-overflow: ellipsis;
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      position: absolute;
      transform: translateX(-50%);

      &::before {
        background-color: ${euiTheme.colors.lightShade};
        border-radius: ${euiTheme.border.radius.small};
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:enabled:hover,
      &:focus {
        color: ${euiTheme.colors.primary};
      }
    `,
    // compressed and non-compressed styles
    compressed: css`
      ${logicalCSS('padding-top', euiTheme.size.s)};

      &::before {
        ${logicalCSS('margin-top', euiTheme.size.xxs)};
      }
    `,
    regular: css`
      ${logicalCSS('padding-top', euiTheme.size.m)};
    `,
    euiRangeTick__pseudo: css`
      ${tickStyles(euiThemeContext, range)};
    `,
    selected: css`
      font-weight: ${euiTheme.font.weight.medium};
      color: ${euiTheme.colors.primary};
    `,
    isCustom: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
    `,
    isMin: css`
      transform: translateX(0);

      .euiRangeTick__pseudo {
        inset-inline-start: 0;
      }
    `,
    isMax: css`
      transform: translateX(0);

      .euiRangeTick__pseudo {
        inset-inline-end: 0;
      }
    `,
    hasPseudoTickMark: css`
      &::before {
        border: 2px solid red;
      }
    `,
    hasTickMark: css`
      &::before {
        ${tickStyles(euiThemeContext, range)}
        content: '';
        inset-inline-start: calc(50% - ${euiTheme.size.xs});
      }
    `,
  };
};
