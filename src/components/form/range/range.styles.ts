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
