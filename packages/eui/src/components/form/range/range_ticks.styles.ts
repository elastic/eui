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
  logicalCSSWithFallback,
  euiFontSize,
  mathWithUnits,
} from '../../../global_styling';
import { highContrastModeStyles } from '../../../global_styling/functions/high_contrast';

import { euiRangeVariables } from './range.styles';

const tickStyles = (
  euiThemeContext: UseEuiTheme,
  range: ReturnType<typeof euiRangeVariables>
) => {
  const { euiTheme } = euiThemeContext;
  return `
    position: absolute;
    ${logicalCSS('top', 0)};
    block-size: ${range.tickHeight};
    ${highContrastModeStyles(euiThemeContext, {
      none: `
        inline-size: ${range.tickWidth};
        background-color: ${range.tickColor};
      `,
      // Windows high contrast themes ignore background color but render borders
      forced: logicalCSS(
        'border-left',
        `${range.tickWidth} solid ${range.tickColor}`
      ),
    })}
    border-radius: ${euiTheme.border.radius.small};
  `;
};

export const euiRangeTicksStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTicks: css`
      position: absolute;
      inset-inline: 0;
      display: flex;
    `,
    isCustom: css`
      inset-inline: ${mathWithUnits(range.thumbWidth, (x) => x / 8)};
    `,
    // compressed and non-compressed styles
    regular: css`
      block-size: ${mathWithUnits(
        [range.height, range.thumbHeight],
        (x, y) => x - y
      )};
      inset-block-start: ${range.thumbHeight};
    `,
    compressed: css`
      block-size: ${mathWithUnits(
        [range.compressedHeight, range.trackBottomPositionWithTicks],
        (x, y) => x - y
      )};
      inset-block-start: ${mathWithUnits(
        [range.thumbHeight, range.trackHeight],
        (x, y) => x - (x - y) / 2
      )};
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

      &:disabled {
        cursor: not-allowed;
      }

      &:enabled:hover,
      &:focus {
        color: ${range.focusColor};
      }
    `,
    // compressed and non-compressed styles
    compressed: css`
      ${logicalCSS('padding-top', euiTheme.size.s)}

      &::before {
        ${logicalCSS('margin-top', euiTheme.size.xxs)}
      }
    `,
    regular: css`
      ${logicalCSS('padding-top', euiTheme.size.m)}
    `,
    selected: css`
      font-weight: ${euiTheme.font.weight.medium};
      color: ${range.focusColor};
    `,
    isCustom: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
    `,
    // Tick marks can use either a ::before pseudo element or a span __pseudo node
    hasPseudoTickMark: css`
      &::before {
        ${tickStyles(euiThemeContext, range)}
        content: '';
        inset-inline-start: calc(50% - ${range.thumbBorderWidth});
      }
    `,
    euiRangeTick__pseudo: css`
      ${tickStyles(euiThemeContext, range)}
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
  };
};
