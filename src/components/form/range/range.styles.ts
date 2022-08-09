/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, hexToRgb } from '../../../services';
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

    thumbHeight: thumbHeight,
    thumbWidth: thumbWidth,
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

    // position of the track and hihglight relative to the parent container
    trackTopPositionWithTicks: `calc((${thumbHeight} - ${trackHeight}) / 2)`,
    trackBottomPositionWithTicks: `calc(${thumbHeight} - ((${thumbHeight} - ${trackHeight}) / 2))`,
    trackTopPositionWithoutTicks: `calc(50% - (${trackHeight} / 2))`,
  };
};

export const euiRangeTrackSize = (euiThemeContext: UseEuiTheme) => {
  return `
    width: ${euiRangeVariables(euiThemeContext).trackWidth};
    height: ${euiRangeVariables(euiThemeContext).trackHeight};
    `;
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
  return `
    border: 2px solid ${euiRangeVariables(euiThemeContext).thumbBorderColor};
  `;
};

export const euiRangeThumbBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return `
    box-shadow: 0 0 0 1px ${
      euiRangeVariables(euiThemeContext).thumbBorderColor
    },
    0 2px 2px -1px rgba(${hexToRgb(euiTheme.colors.shadow)}, .2),
    0 1px 5px -2px rgba(${hexToRgb(euiTheme.colors.shadow)}, .2);
  `;
};

export const euiRangeThumbFocusBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return `
    box-shadow: 0 0 0 2px ${euiTheme.focus.color};
  `;
};

export const euiRangeThumbStyle = (euiThemeContext: UseEuiTheme) => {
  return `
    ${euiRangeThumbBoxShadow(euiThemeContext)};
    ${euiRangeThumbBorder(euiThemeContext)};
    cursor: pointer;
    background-color: ${
      euiRangeVariables(euiThemeContext).thumbBackgroundColor
    };
    padding: 0;
    height: ${euiRangeVariables(euiThemeContext).thumbHeight};
    width: ${euiRangeVariables(euiThemeContext).thumbWidth};
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

export const euiRangeThumbFocus = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return `
   ${euiRangeThumbBorder(euiThemeContext)};
   ${euiRangeThumbFocusBoxShadow(euiThemeContext)};
   background-color: ${euiTheme.colors.primary};
  `;
};

export const euiRangeStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiRange: css``,
  euiRange__horizontalSpacer: css`
    width: ${euiTheme.size.base};
  `,
  euiRange__slimHorizontalSpacer: css`
    width: ${euiTheme.size.s};
  `,
});
