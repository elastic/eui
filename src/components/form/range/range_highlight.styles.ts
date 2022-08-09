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

export const euiRangeHighlightStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeHighlight: css`
      position: absolute;
      height: ${range.highlightHeight};
      left: 0;
      width: 100%;
      overflow: hidden;
      z-index: 1;
      pointer-events: none;
      top: ${range.trackTopPositionWithoutTicks};
    `,
    hasTicks: css`
      top: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeHighlightProgressStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const range = euiRangeVariables(euiThemeContext);
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiRangeHighlight__progress: css`
      height: ${range.highlightHeight};
      border-radius: ${range.trackBorderRadius};
      background-color: ${range.highlightColor};
      border-color: ${range.highlightColor};
    `,
    hasFocus: css`
      background-color: ${euiTheme.colors.primary};
    `,
  };
};
