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
import { euiFontSize, mathWithUnits } from '../../../global_styling';

export const euiRangeTooltipStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeTooltip: css`
      /* Keeps tooltip (value) aligned to percentage of actual slider */
      display: block;
      position: absolute;
      inset-inline-start: 0;
      inset-block: 0;
      inline-size: calc(100% - ${range.thumbWidth});
      margin-inline-start: ${mathWithUnits(range.thumbWidth, (x) => x / 2)};
      pointer-events: none;
      z-index: ${range.thumbZIndex};
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

  const arrowSize = euiTheme.size.m;
  const arrowSizeInt = parseInt(arrowSize, 10);
  const arrowMinusSize = `${(arrowSizeInt / 2 - 1) * -1}px`; // Shift arrow 1px more than half its size to account for border radius

  return {
    euiRangeTooltip__value: css`
      position: absolute;
      inset-block-start: 50%;
      max-inline-size: ${mathWithUnits(euiTheme.size.base, (x) => x * 16)};
      padding-block: ${euiTheme.size.xxs};
      padding-inline: ${euiTheme.size.s};
      transform: translateX(0) translateY(-50%);

      ${euiFontSize(euiThemeContext, 's')}
      line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
      color: ${euiTheme.colors.ghost};
      background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      border: ${euiTheme.border.width.thin} solid
        ${euiToolTipBackgroundColor(euiTheme, colorMode)};
      border-radius: ${euiTheme.border.radius.small};

      &::before {
        content: '';
        position: absolute;
        inset-block-end: 50%;
        inline-size: ${arrowSize};
        block-size: ${arrowSize};
        transform-origin: center;
        transform: translateY(50%) rotateZ(45deg);
        background-color: ${euiToolTipBackgroundColor(euiTheme, colorMode)};
        border-radius: ${mathWithUnits(
          euiTheme.border.radius.small,
          (x) => x / 2
        )};
      }
    `,
    left: css`
      margin-inline-end: ${euiTheme.size.l};

      &::before {
        inset-inline-end: ${arrowMinusSize};
      }
    `,
    right: css`
      margin-inline-start: ${euiTheme.size.l};

      &::before {
        inset-inline-start: ${arrowMinusSize};
      }
    `,
    hasTicks: css`
      inset-block-start: ${mathWithUnits(range.thumbWidth, (x) => x / 2)};
    `,
  };
};
