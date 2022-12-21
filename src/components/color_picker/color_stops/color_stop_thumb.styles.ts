/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import {
  euiRangeVariables,
  euiRangeThumbFocus,
} from '../../form/range/range.styles';
import { euiColorPickerVariables } from '../color_picker.styles';

export const euiColorStopThumbStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    // Base
    euiColorStopThumb: css`
      &:not(:disabled) {
        inset-block-start: 0;
        margin-block-start: 0;
        pointer-events: auto;
        cursor: grab;

        &:active {
          cursor: grabbing;
        }
      }
    `,
    isPopoverOpen: css`
      ${euiRangeThumbFocus(euiThemeContext)};
    `,
  };
};

export const euiColorStopThumbPopoverStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiColorStopThumbPopover: css`
      position: absolute;
      inset-block-start: 50%;
      inline-size: ${range.thumbWidth};
      block-size: ${range.thumbHeight};
      margin-block-start: ${mathWithUnits(range.thumbHeight, (x) => x * -0.5)};

      .euiColorStopThumbPopover__anchor {
        position: absolute;
        inline-size: 100%;
        block-size: 100%;

        // Background color can potentially have opacity
        // Pseudo element placed below the thumb to prevent the track from showing through
        &::before {
          content: '';
          display: block;
          position: absolute;
          inset-inline-start: 0;
          inset-block-start: 0;
          block-size: ${range.thumbHeight};
          inline-size: ${range.thumbWidth};
          border-radius: ${range.thumbHeight};
          background: ${euiTheme.colors.emptyShade};
        }
      }
    `,
    isLoadingPanel: css`
      visibility: hidden !important; // Overrides a stateful class on EuiPopover -> EuiPanel
    `,
    hasFocus: css`
      z-index: ${range.thumbZIndex};
    `,
  };
};

export const euiColorStopStyles = (euiThemeContext: UseEuiTheme) => {
  const colorPicker = euiColorPickerVariables(euiThemeContext);

  return {
    // Base
    euiColorStop: css`
      inline-size: ${colorPicker.width};
    `,
  };
};
