/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import { euiShadow } from '../../../themes/amsterdam/global_styling/mixins';
import { euiCustomControl } from '../form.styles';

import {
  euiRangeThumbStyle,
  euiRangeThumbPerBrowser,
  euiRangeVariables,
  euiRangeTrackPerBrowser,
  euiRangeThumbFocus,
  euiRangeThumbBoxShadow,
} from './range.styles';

export const euiRangeSliderStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiRangeSlider: css`
      block-size: ${range.height};
      appearance: none;
      background: transparent; // Otherwise white in Chrome
      inline-size: 100%; // ensures the slider expands to fill flex display
      position: relative;
      cursor: pointer; // Keep cursor to full range bounds
      z-index: ${range.thumbZIndex};

      &:disabled {
        cursor: not-allowed;

        ${euiRangeThumbPerBrowser(`
          cursor: not-allowed;
          border-color: ${range.thumbBorderColor};
          background-color: ${range.thumbBackgroundColor};
          box-shadow: none;
        `)}

        ~ .euiRangeThumb {
          cursor: not-allowed;
          border-color: ${range.thumbBorderColor};
          background-color: ${range.thumbBackgroundColor};
          box-shadow: none;
        }
      }

      ${euiRangeThumbPerBrowser(`
        ${euiCustomControl(euiThemeContext, {
          type: 'round',
        })};
        ${euiRangeThumbStyle(euiThemeContext)};
      `)}

      &:focus-visible,
      &[class*="-hasFocus"] {
        ~ .euiRangeThumb {
          border-color: ${range.thumbBorderColor};
        }

        ~ .euiRangeHighlight .euiRangeHighlight__progress {
          background-color: ${euiTheme.colors.primary};
        }

        ~ .euiRangeTooltip .euiRangeTooltip__value {
          ${euiShadow(euiThemeContext, 'm')};
          transform: translateX(0) translateY(-50%) scale(1.1);
        }
      }

      // Resets

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-block-start: ${mathWithUnits(
          [range.trackBorderWidth, range.trackHeight, range.thumbHeight],
          (x, y, z) => (x * 2 + y) / 2 - z / 4
        )};
      }

      &::-moz-focus-outer {
        border: none;
      }

      &:focus {
        ${euiRangeThumbPerBrowser(euiRangeThumbFocus(euiThemeContext))}

        ${euiRangeTrackPerBrowser('background-color: transparent')}

        outline: none;

        ~ .euiRangeHighlight .euiRangeHighlight__progress {
          background-color: ${euiTheme.colors.primary};
        }
      }

      // in Chrome/FF/Edge we don't want to focus on click
      &:focus:not(:focus-visible) {
        ${euiRangeThumbPerBrowser(`
          ${euiRangeThumbBoxShadow(euiThemeContext)}
          background-color: ${range.thumbBackgroundColor};  
        `)}

        ~ .euiRangeHighlight .euiRangeHighlight__progress {
          background-color: ${range.highlightColor};
        }
      }
    `,
    hasTicks: css`
      block-size: ${range.thumbHeight}; // the track has the same height as the thumb
    `,
    hasFocus: css``,
    hasRange: css`
      ${euiRangeTrackPerBrowser(`
        background-color: transparent;
        border-color: ${transparentize(range.trackBorderColor, 0.6)};
      `)}
    `,
    hasLevels: css`
      ${euiRangeThumbPerBrowser(
        `background-color: ${range.thumbBackgroundColor}`
      )}
    `,
  };
};

export const euiRangeSliderThumbStyles = (euiThemeContext: UseEuiTheme) => ({
  thumb: css`
    &,
    &:focus:not(:focus-visible) {
      ${euiRangeThumbPerBrowser('background-color: currentcolor')}
    }

    &:focus {
      ${euiRangeThumbPerBrowser(
        euiRangeThumbFocus(euiThemeContext, 'currentcolor')
      )}
    }
  `,
});
