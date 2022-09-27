/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiRangeVariables } from './range.styles';

export const euiRangeLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const { colorMode } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  const isColorDark = colorMode === 'DARK';

  const stripesBackground = isColorDark
    ? `repeating-linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4) 2px,
        rgba(0, 0, 0, 0.6) 2px,
        rgba(0, 0, 0, 0.6) 4px
      )`
    : `repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4) 2px,
      rgba(255, 255, 255, 0.6) 2px,
      rgba(255, 255, 255, 0.6) 4px
    )`;

  return {
    // Base
    euiRangeLevels: css`
      display: flex;
      justify-content: stretch;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: 0;
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
      background-color: ${euiTheme.colors.primary};
    `,
    success: css`
      background-color: ${euiTheme.colors.success};
    `,
    warning: css`
      background-color: ${euiTheme.colors.warning};
    `,
    danger: css`
      background-color: ${euiTheme.colors.danger};
    `,
    customColor: css``,
  };
};
