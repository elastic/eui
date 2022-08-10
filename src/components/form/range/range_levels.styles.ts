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
      left: 0;
      right: 0;
      z-index: 2;
    `,
    hasTicks: css`
      top: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeLevelStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiRangeLevel: css`
      display: block;
      position: absolute;
      height: 6px;
      border-radius: 6px;
      margin: 2px;
      margin-top: 0;
      margin-bottom: 0;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
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
