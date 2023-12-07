/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../../services';

import { euiRangeLevelColor } from './range_levels_colors';
import { euiRangeVariables } from './range.styles';

export const euiRangeLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  const isColorDark = colorMode === 'DARK';
  const stripeColor = isColorDark ? euiTheme.colors.ink : euiTheme.colors.ghost;
  const stripesBackground = `repeating-linear-gradient(
    -45deg,
    ${transparentize(stripeColor, 0.5)},
    ${transparentize(stripeColor, 0.5)} 25%,
    ${transparentize(stripeColor, 0.7)} 25%,
    ${transparentize(stripeColor, 0.7)} 50%,
    ${transparentize(stripeColor, 0.5)} 50%
  )`;

  return {
    euiRangeLevels: css`
      display: flex;
      justify-content: stretch;
      position: absolute;
      inset-inline: 0;
      inset-block-start: ${range.trackTopPositionWithoutTicks};
      z-index: ${range.levelsZIndex};
    `,
    hasRange: css`
      &::after {
        content: '';
        position: absolute;
        block-size: ${range.trackHeight};
        inline-size: 100%;
        background-image: ${stripesBackground};
        background-size: ${euiTheme.size.xs} ${euiTheme.size.xs}; /* Percentage stops and background-size are both needed for Safari to render the gradient at fullWidth correctly */
        border-radius: ${range.trackBorderRadius};
      }
    `,
    hasTicks: css`
      inset-block-start: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeLevelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeLevel: css`
      display: block;
      position: absolute;
      block-size: ${range.trackHeight};
      margin-block: 0;

      &:first-child {
        margin-inline-start: 0;
        border-start-start-radius: ${range.trackBorderRadius};
        border-end-start-radius: ${range.trackBorderRadius};
      }

      &:last-child {
        margin-inline-end: 0;
        border-start-end-radius: ${range.trackBorderRadius};
        border-end-end-radius: ${range.trackBorderRadius};
      }
    `,
    primary: css`
      background-color: ${euiRangeLevelColor('primary', euiTheme)};
    `,
    success: css`
      background-color: ${euiRangeLevelColor('success', euiTheme)};
    `,
    warning: css`
      background-color: ${euiRangeLevelColor('warning', euiTheme)};
    `,
    danger: css`
      background-color: ${euiRangeLevelColor('danger', euiTheme)};
    `,
    customColor: css``,
  };
};
