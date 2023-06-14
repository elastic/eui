/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../../services';
import { euiCustomControl } from '../form.styles';

import {
  euiRangeThumbStyle,
  euiRangeThumbPerBrowser,
  euiRangeVariables,
  euiRangeTrackPerBrowser,
  euiRangeThumbFocus,
} from './range.styles';

export const euiRangeSliderStyles = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    // Base
    euiRangeSlider: css`
      appearance: none;
      background: transparent; /* Otherwise white in Chrome */
      inline-size: 100%; /* Ensures the slider expands to fill flex display */
      block-size: 100%; /* Inherits both regular and compressed heights from the range wrapper */
      position: relative;
      cursor: pointer; /* Keep cursor to full range bounds */
      z-index: ${range.thumbZIndex};

      ${euiRangeThumbPerBrowser(`
        ${euiCustomControl(euiThemeContext, { type: 'round' })}
        ${euiRangeThumbStyle(euiThemeContext)}
      `)}

      &:disabled {
        cursor: not-allowed;
        ${euiRangeThumbPerBrowser('cursor: not-allowed')}
      }

      /* Resets */
      /* stylelint-disable property-no-vendor-prefix */
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
      }
      /* stylelint-enable property-no-vendor-prefix */

      &:focus {
        outline: none;
      }

      /* Styles that should appear only on keyboard focus, not click */
      &:focus-visible {
        ${euiRangeThumbPerBrowser(euiRangeThumbFocus(euiThemeContext))}

        & ~ .euiRangeTooltip .euiRangeTooltip__value {
          transform: translateX(0) translateY(-50%) scale(1.1);
        }
      }
    `,
    hasTicks: css`
      block-size: ${range.thumbHeight}; /* the track has the same height as the thumb */
    `,
    hasRange: css`
      /* stylelint-disable no-extra-semicolons */
      ${euiRangeTrackPerBrowser(`
        background-color: transparent;
        border-color: ${transparentize(range.trackBorderColor, 0.6)}
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
    ${euiRangeThumbPerBrowser('background-color: currentcolor')}

    &:focus-visible {
      ${euiRangeThumbPerBrowser(
        euiRangeThumbFocus(euiThemeContext, 'currentcolor')
      )}
    }
  `,
});
