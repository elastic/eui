/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  UseEuiTheme,
  COLOR_MODES_STANDARD,
  tint,
  shade,
} from '../../../services';
import { euiRangeVariables } from './range.styles';
import { euiFontSize } from '../../../global_styling';

export const euiRangeTooltipStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTooltip: css`
      // Keeps tooltip (value) aligned to percentage of actual slider
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: calc(100% - ${range.thumbWidth});
      margin-left: calc(${range.thumbWidth} / 2);
      pointer-events: none;
      z-index: 3; // higher than thumbs that are 2
    `,
  };
};

const euiToolTipBackgroundColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode']
) =>
  colorMode === COLOR_MODES_STANDARD.dark
    ? shade(euiTheme.colors.emptyShade, 1)
    : tint(euiTheme.colors.fullShade, 0.25);

export const euiRangeTooltipValueStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme, colorMode } = euiThemeContext;

  /*
   * 1. Shift arrow 1px more than half its size to account for border radius
   */
  const arrowSize = euiTheme.size.m;
  const arrowSizeInt = parseInt(arrowSize, 10);
  const arrowMinusSize = `${(arrowSizeInt / 2 - 1) * -1}px`; /* 1 */

  return {
    euiRangeTooltip__value: css`
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
      border: 1px solid ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      position: absolute;
      padding: ${euiTheme.size.xxs} ${euiTheme.size.s};
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      color: ${euiTheme.colors.ghost};
      max-width: 256px;
      border-radius: ${euiTheme.border.radius.small};
      top: 50%;
      transition: box-shadow ${euiTheme.animation.normal}
          ${euiTheme.animation.resistance},
        transform ${euiTheme.animation.normal} ${euiTheme.animation.resistance};

      &::after,
      &::before {
        content: '';
        position: absolute;
        bottom: calc(${arrowSize} / 2);
        left: 50%;
        transform-origin: center;
        background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
        width: ${arrowSize};
        height: ${arrowSize};
        border-radius: 2px;
      }

      &::before {
        background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      }
    `,
    left: css`
      margin-right: ${euiTheme.size.l};
      transform: translateX(0) translateY(-50%);

      &:before,
      &:after {
        left: auto;
        right: ${arrowMinusSize};
        bottom: 50%;
        transform: translateY(50%) rotateZ(45deg);
      }

      &::before {
        margin-right: -1px;
      }
    `,
    right: css`
      margin-left: ${euiTheme.size.l};
      transform: translateX(0) translateY(-50%);

      &:before,
      &:after {
        left: ${arrowMinusSize};
        bottom: 50%;
        transform: translateY(50%) rotateZ(45deg);
      }

      &::before {
        margin-left: -1px;
      }
    `,
    hasTicks: css`
      top: ${range.trackHeight};
    `,
  };
};
