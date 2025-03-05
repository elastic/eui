/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiFontSize, mathWithUnits } from '../../../global_styling';
import { _popoverArrowStyles } from '../../../services/popover';
import { euiRangeVariables } from './range.styles';

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

export const euiRangeTooltipValueStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme, colorMode } = euiThemeContext;

  const toolTipBackgroundColor = euiTheme.components.tooltipBackground;
  const borderColor =
    colorMode === 'DARK' ? toolTipBackgroundColor : 'transparent';

  const arrowSize = euiTheme.size.m;
  const arrowOffset = euiTheme.size.l;
  const arrowStyles = _popoverArrowStyles(euiThemeContext, arrowSize);

  return {
    euiRangeTooltip__value: css`
      position: absolute;
      inset-block-start: 50%;
      max-inline-size: ${mathWithUnits(euiTheme.size.base, (x) => x * 16)};
      padding-block: ${euiTheme.size.xxs};
      padding-inline: ${euiTheme.size.s};
      transform: translateY(-50%);

      ${euiFontSize(euiThemeContext, 's')}
      line-height: ${euiFontSize(euiThemeContext, 's').lineHeight};
      color: ${euiTheme.colors.ghost};
      background-color: ${toolTipBackgroundColor};
      border: ${euiTheme.border.width.thin} solid ${toolTipBackgroundColor};
      border: ${euiTheme.border.width.thin} solid ${borderColor};
      border-radius: ${euiTheme.border.radius.small};

      &::before {
        content: '';
        ${arrowStyles._arrowStyles}
        inset-block-start: 50%;
        margin-block-start: ${mathWithUnits(arrowSize, (x) => x / -2)};
        background-color: inherit;
        border: inherit;
      }
    `,
    left: css`
      margin-inline-end: ${arrowOffset};

      &::before {
        ${arrowStyles.positions.left}
        inset-inline-start: 100%;
      }
    `,
    right: css`
      margin-inline-start: ${arrowOffset};

      &::before {
        ${arrowStyles.positions.right}
        inset-inline-end: 100%;
      }
    `,
    hasTicks: css`
      inset-block-start: ${mathWithUnits(range.thumbWidth, (x) => x / 2)};
    `,
  };
};
