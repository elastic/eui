/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../../services';
import {
  euiRangeThumbStyle,
  euiRangeThumbPerBrowser,
  euiRangeVariables,
  euiRangeTrackSize,
  euiRangeTrackPerBrowser,
  euiRangeThumbFocus,
  euiRangeThumbBoxShadow,
} from './range.styles';
import { euiCustomControl } from '../form.styles';
import { euiShadow } from '../../../themes/amsterdam/global_styling/mixins';

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
      &.euiRangeSlider--hasFocus {
        ~ .euiRangeThumb {
          border-color: ${range.thumbBorderColor};
        }

        ~ .euiRangeHighlight .euiRangeHighlight__progress {
          background-color: ${euiTheme.colors.primary};
        }

        ~ .euiRangeTooltip .euiRangeTooltip__value {
          ${euiShadow(euiThemeContext, 'm')};

          &.euiRangeTooltip__value--right,
          &.euiRangeTooltip__value--left {
            transform: translateX(0) translateY(-50%) scale(1.1);
          }
        }
      }

      // Resets

      // Disable linter for these very unique vendor controls
      // sass-lint:disable-block no-vendor-prefixes
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-block-start: ${(-parseInt(range.trackBorderWidth) * 2 +
          parseInt(range.trackHeight)) /
          2 -
        parseInt(range.thumbHeight) / 4}px;
      }

      &::-moz-focus-outer {
        border: none;
      }

      &::-ms-track {
        ${euiRangeTrackSize(euiThemeContext)};
        background: transparent;
        border-color: transparent;
        border-width: ${parseInt(range.thumbHeight) / 2}px 0;
        color: transparent;
      }

      &:focus {
        ${euiRangeThumbPerBrowser(euiRangeThumbFocus(euiThemeContext))}

        ${euiRangeTrackPerBrowser(`
          background-color: transparent;
        `)}

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
  };
};
