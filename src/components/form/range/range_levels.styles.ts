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
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeLevels: css`
      display: flex;
      justify-content: stretch;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      z-index: 2;
    `,
    hasTicks: css`
      inset-block-start: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeLevelStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeLevel: css`
      display: block;
      position: absolute;
      block-size: ${range.trackHeight};
      border-radius: ${range.trackBorderRadius};
      margin: ${euiTheme.size.xxs};
      margin-block-start: 0;
      margin-block-end: 0;

      &:first-child {
        margin-inline-start: 0;
      }

      &:last-child {
        margin-inline-end: 0;
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
