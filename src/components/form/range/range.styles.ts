/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import {
  euiFormControlHeight,
  euiFormControlCompressedHeight,
} from '../form.styles';

export const euiRangeVariables = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const trackHeight = '6px';
  const trackCompressedHeight = euiTheme.size.xs;

  return {
    trackColor: euiTheme.colors.lightShade,
    highlightColor: euiTheme.colors.darkShade,

    thumbHeight: euiTheme.size.base,
    thumbWidth: euiTheme.size.base,
    thumbBorderColor: euiTheme.colors.emptyShade,
    thumbBackgroundColor: euiTheme.colors.darkShade, // same as highlightColor

    trackWidth: '100%',
    trackHeight: trackHeight,
    trackCompressedHeight: trackCompressedHeight,
    trackBorderWidth: 0,
    trackBorderColor: euiTheme.colors.lightShade, // same as trackColor
    trackRadius: euiTheme.border.radius.medium,

    tickHeight: trackHeight,
    tickWidth: euiTheme.size.xs,

    disabledOpacity: 0.5,

    highlightHeight: trackHeight,
    highlightCompressedHeight: trackCompressedHeight,

    height: euiFormControlHeight(euiThemeContext),
    compressedHeight: euiFormControlCompressedHeight(euiThemeContext),
  };
};

const euiRangeTrackSize = ({
  euiThemeContext,
  compressed = false,
}: {
  euiThemeContext: UseEuiTheme;
  compressed: boolean;
}) => {
  if (compressed) {
    return `
    width: ${euiRangeVariables(euiThemeContext).trackWidth};
    height: ${euiRangeVariables(euiThemeContext).trackCompressedHeight};
    `;
  } else {
    return `
    width: ${euiRangeVariables(euiThemeContext).trackWidth};
    height: ${euiRangeVariables(euiThemeContext).trackHeight};
    `;
  }
};

const euiRangeTrackPerBrowser = (content: string) => {
  return `
    &::-webkit-slider-runnable-track { ${content}; }
    &::-moz-range-track { ${content}; }
    &::-ms-fill-lower {${content}; }
    &::-ms-fill-upper { ${content}; }
  `;
};

const euiRangeThumbBorder = (euiThemeContext: UseEuiTheme) => {
  return `
    border: 2px solid ${euiRangeVariables(euiThemeContext).thumbBorderColor};
  `;
};

const euiRangeThumbBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return `
    border: 2px solid ${euiRangeVariables(euiThemeContext).trackHeight};
    box-shadow: 0 0 0 1px ${
      euiRangeVariables(euiThemeContext).thumbBorderColor
    },
    0 2px 2px -1px rgba(${euiTheme.colors.shadow}, .2),
    0 1px 5px -2px rgba(${euiTheme.colors.shadow}, .2);
  `;
};

const euiRangeThumbFocusBoxShadow = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return `
    box-shadow: 0 0 0 2px ${euiTheme.focus.color};
  `;
};

const euiRangeThumbStyle = (euiThemeContext: UseEuiTheme) => {
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

const euiRangeThumbPerBrowser = (content: string) => {
  return `
    &::-webkit-slider-thumb { ${content}; }
    &::-moz-range-thumb  { ${content}; }
    &::-ms-thumb {${content}; }
  `;
};

const euiRangeThumbFocus = (euiThemeContext: UseEuiTheme) => {
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
