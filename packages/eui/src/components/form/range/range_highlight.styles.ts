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
    euiRangeHighlight: css`
      position: absolute;
      block-size: ${range.highlightHeight};
      inset-inline-start: 0;
      inline-size: 100%;
      overflow: hidden;
      z-index: ${range.highlightZIndex};
      pointer-events: none;
      inset-block-start: ${range.trackTopPositionWithoutTicks};
    `,
    hasTicks: css`
      inset-block-start: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeHighlightProgressStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeHighlight__progress: css`
      block-size: ${range.highlightHeight};
      border-radius: ${range.trackBorderRadius};
      background-color: ${range.highlightColor};

      /* Change highlight color to focus on keyboard focus and on mouse drag */
      .euiRangeSlider:focus-visible ~ .euiRangeHighlight &,
      .euiRangeThumb:focus-visible ~ .euiRangeHighlight &,
      .euiRangeDraggable:focus ~ .euiRangeHighlight & {
        background-color: ${range.focusColor};
      }
    `,
  };
};

export const euiRangeHighlightLevelsWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const euiRangeVars = euiRangeVariables(euiThemeContext);

  return {
    euiRangeHighlight__levelsWrapper: css`
      block-size: ${euiRangeVars.trackHeight};
      position: relative;
      overflow: hidden;
    `,
  };
};

export const euiRangeHighlightLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const euiRangeVars = euiRangeVariables(euiThemeContext);

  return {
    euiRangeHighlight__levels: css`
      background: transparent;
      block-size: ${euiRangeVars.trackHeight};
      inset-block-start: 0;
    `,
  };
};
