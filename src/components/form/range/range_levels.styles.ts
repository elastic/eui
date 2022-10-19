/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { EuiRangeLevel } from './range_levels';
import { euiRangeVariables } from './range.styles';

export const euiRangeLevelColor = (
  color: EuiRangeLevel['color'],
  euiTheme: UseEuiTheme['euiTheme']
) => {
  switch (color) {
    case 'primary':
      return euiTheme.colors.primary;
    case 'success':
      return euiTheme.colors.success;
    case 'warning':
      return euiTheme.colors.warning;
    case 'danger':
      return euiTheme.colors.danger;
    default:
      return color;
  }
};

export const euiRangeLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const { colorMode } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  const isColorDark = colorMode === 'DARK';

  const stripesBackground = isColorDark
    ? `repeating-linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5) 2px,
        rgba(0, 0, 0, 0.7) 2px,
        rgba(0, 0, 0, 0.7) 4px
      )`
    : `repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5) 2px,
      rgba(255, 255, 255, 0.7) 2px,
      rgba(255, 255, 255, 0.7) 4px
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
