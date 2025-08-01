/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, hexToRgb } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../../global_styling/functions/high_contrast';
import { euiFormVariables } from '../form.styles';

export const euiRangeVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const trackHeight = '6px';
  const thumbHeight = euiTheme.size.base;
  const thumbWidth = euiTheme.size.base;
  const form = euiFormVariables(euiThemeContext);

  return {
    trackColor: euiTheme.colors.lightShade,
    highlightColor: highContrastMode
      ? euiTheme.colors.fullShade
      : euiTheme.colors.darkShade,
    focusColor: euiTheme.colors.primary,

    thumbHeight: thumbHeight,
    thumbWidth: thumbWidth,
    thumbBorderWidth: euiTheme.border.width.thick,
    thumbBorderColor: euiTheme.colors.emptyShade,
    get thumbBackgroundColor() {
      return this.highlightColor;
    },

    trackWidth: '100%',
    trackHeight: trackHeight,
    trackBorderWidth: '0px',
    get trackBorderColor() {
      return this.trackColor;
    },
    trackBorderRadius: euiTheme.border.radius.medium,

    tickHeight: trackHeight,
    tickWidth: euiTheme.size.xs,
    tickColor: highContrastMode
      ? euiTheme.colors.darkShade
      : euiTheme.colors.lightShade,

    disabledOpacity: 0.5,

    highlightHeight: trackHeight,

    height: form.controlHeight,
    compressedHeight: form.controlCompressedHeight,

    // position of the track and highlight relative to the parent container
    trackTopPositionWithTicks: mathWithUnits(
      [thumbHeight, trackHeight],
      (x, y) => (x - y) / 2
    ),
    trackBottomPositionWithTicks: mathWithUnits(
      [thumbHeight, trackHeight],
      (x, y) => x - (x - y) / 2
    ),
    trackTopPositionWithoutTicks: `calc(50% - (${trackHeight} / 2))`,

    // Z-indexes
    levelsZIndex: 1,
    highlightZIndex: 2,
    thumbZIndex: 3,
  };
};

export const euiRangeTrackPerBrowser = (content: string) => {
  return `
    &::-webkit-slider-runnable-track { ${content}; }
    &::-moz-range-track { ${content}; }
  `;
};

export const euiRangeThumbBorder = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    border: ${range.thumbBorderWidth} solid ${range.thumbBorderColor};
  `;
};

export const euiRangeThumbBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const shadowColor = `rgba(${hexToRgb(euiTheme.colors.shadow)}, .2)`;

  const range = euiRangeVariables(euiThemeContext);
  const borderWidth = range.thumbBorderWidth;
  const halfBorderWidth = mathWithUnits(borderWidth, (x) => x / 2);
  const largeBorderWidth = mathWithUnits(borderWidth, (x) => x * 2.5);

  return `
    box-shadow:
      0 0 0 ${halfBorderWidth} ${range.thumbBorderColor},
      0 ${borderWidth} ${borderWidth} -${halfBorderWidth} ${shadowColor},
      0 ${halfBorderWidth} ${largeBorderWidth} -${borderWidth} ${shadowColor};
  `;
};

export const euiRangeThumbFocusBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    outline: ${range.thumbBorderWidth} solid var(--euiRangeThumbColor, ${range.focusColor});
    outline-offset: 0;
    box-shadow: none; /* Unset inset box-shadow on high contrast modes */
  `;
};

export const euiRangeThumbStyle = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;

  const baseStyles = `
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    block-size: ${range.thumbHeight};
    inline-size: ${range.thumbWidth};
    box-sizing: border-box;  // required for firefox or the border makes the width and height to increase
  `;

  return highContrastModeStyles(euiThemeContext, {
    none: `
      ${baseStyles}
      background-color: var(--euiRangeThumbColor, ${
        range.thumbBackgroundColor
      });
      ${euiRangeThumbBoxShadow(euiThemeContext)};
      ${euiRangeThumbBorder(euiThemeContext)};
    `,
    preferred: `
      ${baseStyles}
      background-color: var(--euiRangeThumbColor, ${euiTheme.colors.emptyShade});
      border: ${range.thumbBorderWidth} solid var(--euiRangeThumbColor, ${euiTheme.colors.fullShade});
      box-shadow: inset 0 0 0 ${range.thumbBorderWidth} ${euiTheme.colors.emptyShade};
    `,
    forced: preventForcedColors(euiThemeContext),
  });
};

export const euiRangeThumbPerBrowser = (content: string) => {
  return `
    &::-webkit-slider-thumb { ${content}; }
    &::-moz-range-thumb { ${content}; }
  `;
};

export const euiRangeThumbFocus = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    ${euiRangeThumbBorder(euiThemeContext)};
    ${euiRangeThumbFocusBoxShadow(euiThemeContext)}
    background-color: var(--euiRangeThumbColor, ${range.focusColor});
  `;
};

export const euiRangeStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiRange: css``,
  hasInput: css``,
  euiRange__horizontalSpacer: css`
    inline-size: ${euiTheme.size.base};
  `,
  euiRange__slimHorizontalSpacer: css`
    inline-size: ${euiTheme.size.s};
  `,
});
