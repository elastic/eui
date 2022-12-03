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
import { euiFormVariables } from '../form.styles';

export const euiRangeVariables = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const trackHeight = '6px';
  const thumbHeight = euiTheme.size.base;
  const thumbWidth = euiTheme.size.base;
  const form = euiFormVariables(euiThemeContext);

  return {
    trackColor: euiTheme.colors.lightShade,
    highlightColor: euiTheme.colors.darkShade,
    focusColor: euiTheme.colors.primary,

    thumbHeight: thumbHeight,
    thumbWidth: thumbWidth,
    thumbBorderWidth: euiTheme.border.width.thick,
    thumbBorderColor: euiTheme.colors.emptyShade,
    thumbBackgroundColor: euiTheme.colors.darkShade, // same as highlightColor

    trackWidth: '100%',
    trackHeight: trackHeight,
    trackBorderWidth: '0px',
    trackBorderColor: euiTheme.colors.lightShade, // same as trackColor
    trackBorderRadius: euiTheme.border.radius.medium,

    tickHeight: trackHeight,
    tickWidth: euiTheme.size.xs,

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
    &::-ms-fill-lower {${content}; }
    &::-ms-fill-upper { ${content}; }
  `;
};

export const euiRangeThumbBorder = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    border: ${range.thumbBorderWidth} solid ${range.thumbBorderColor};
  `;
};

export const euiRangeThumbBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
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
    box-shadow: 0 0 0 ${range.thumbBorderWidth} ${range.focusColor};
  `;
};

export const euiRangeThumbStyle = (euiThemeContext: UseEuiTheme) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
    ${euiRangeThumbBoxShadow(euiThemeContext)};
    ${euiRangeThumbBorder(euiThemeContext)};
    cursor: pointer;
    background-color: ${range.thumbBackgroundColor};
    padding: 0;
    block-size: ${range.thumbHeight};
    inline-size: ${range.thumbWidth};
    box-sizing: border-box;  // required for firefox or the border makes the width and height to increase
  `;
};

export const euiRangeThumbPerBrowser = (content: string) => {
  return `
    &::-webkit-slider-thumb { ${content}; }
    &::-moz-range-thumb  { ${content}; }
    &::-ms-thumb {${content}; }
  `;
};

export const euiRangeThumbFocus = (
  euiThemeContext: UseEuiTheme,
  color?: string
) => {
  const range = euiRangeVariables(euiThemeContext);

  return `
   ${euiRangeThumbBorder(euiThemeContext)};
   ${euiRangeThumbFocusBoxShadow(euiThemeContext)};
   background-color: ${color || range.focusColor};
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
