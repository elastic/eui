/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../../services';
import { EuiRangeLevel, EuiRangeLevelColor } from './range_levels';
import { euiRangeVariables } from './range.styles';

export const euiRangeLevelColor = (
  color: EuiRangeLevel['color'],
  euiTheme: UseEuiTheme['euiTheme']
) => {
  const COLORS: EuiRangeLevelColor[] = [
    'primary',
    'success',
    'warning',
    'danger',
  ];

  const isNamedColor = COLORS.includes(color as EuiRangeLevelColor);

  return isNamedColor ? euiTheme.colors[color as EuiRangeLevelColor] : color;
};

export const euiRangeLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const { colorMode, euiTheme } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  const isColorDark = colorMode === 'DARK';
  const stripeColor = isColorDark ? euiTheme.colors.ink : euiTheme.colors.ghost;
  const stripesBackground = `repeating-linear-gradient(
        -45deg,
        ${transparentize(stripeColor, 0.5)},
        ${transparentize(stripeColor, 0.5)} 2px,
        ${transparentize(stripeColor, 0.7)} 2px,
        ${transparentize(stripeColor, 0.7)} 4px
      )`;

  return {
    // Base
    euiRangeLevels: css`
      display: flex;
      justify-content: stretch;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: ${range.trackTopPositionWithoutTicks};
      z-index: ${range.levelsZIndex};
    `,
    hasRange: css`
      &::after {
        content: '';
        position: absolute;
        block-size: ${range.trackHeight};
        inline-size: 100%;
        background: ${stripesBackground};
        border-radius: ${range.trackBorderRadius};
      }

      .euiRangeHighlight &::after {
        display: none;
      }

      .euiRangeHighlight & {
        position: absolute;
        inset-block-start: 0;
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
      margin-block-start: 0;
      margin-block-end: 0;

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
