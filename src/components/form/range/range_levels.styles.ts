/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiRangeLevelColor } from './range_levels_colors';
import { euiRangeVariables } from './range.styles';

export const euiRangeLevelsStyles = (euiThemeContext: UseEuiTheme) => {
  const { colorMode } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  const isColorDark = colorMode === 'DARK';

  const stripesLightEncodedSVGUrl =
    'url("data:image/svg+xml, %3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%206%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23a)%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.5%22%3E%0A%20%20%20%20%3Crect%20width%3D%2220%22%20height%3D%226%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%22.8%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22m0%205%205-5H2.5L0%202.5V5ZM5%205V2.5L2.5%205H5ZM0%2010l5-5H2.5L0%207.5V10ZM5%205l5-5H7.5L5%202.5V5ZM10%205V2.5L7.5%205H10ZM5%2010l5-5H7.5L5%207.5V10ZM10%205l5-5h-2.5L10%202.5V5ZM15%205V2.5L12.5%205H15ZM10%2010l5-5h-2.5L10%207.5V10ZM15%205l5-5h-2.5L15%202.5V5ZM20%205V2.5L17.5%205H20ZM15%2010l5-5h-2.5L15%207.5V10Z%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22a%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2220%22%20height%3D%226%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E")';

  const stripesDarkEncodedSVGUrl =
    'url("data:image/svg+xml, %3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%206%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23a)%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.5%22%3E%0A%20%20%20%20%3Crect%20width%3D%2220%22%20height%3D%226%22%2F%3E%0A%20%20%20%20%3Cg%20opacity%3D%22.8%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22m0%205%205-5H2.5L0%202.5V5ZM5%205V2.5L2.5%205H5ZM0%2010l5-5H2.5L0%207.5V10ZM5%205l5-5H7.5L5%202.5V5ZM10%205V2.5L7.5%205H10ZM5%2010l5-5H7.5L5%207.5V10ZM10%205l5-5h-2.5L10%202.5V5ZM15%205V2.5L12.5%205H15ZM10%2010l5-5h-2.5L10%207.5V10ZM15%205l5-5h-2.5L15%202.5V5ZM20%205V2.5L17.5%205H20ZM15%2010l5-5h-2.5L15%207.5V10Z%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22a%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2220%22%20height%3D%226%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E")';

  const stripesBg = isColorDark
    ? stripesDarkEncodedSVGUrl
    : stripesLightEncodedSVGUrl;

  return {
    // Base
    euiRangeLevels: css`
      display: flex;
      justify-content: stretch;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: ${range.trackTopPositionWithoutTicks};
      z-index: ${range.levelsZIndex};
    `,
    hasRange: css`
      &::after {
        content: '';
        position: absolute;
        block-size: ${range.trackHeight};
        inline-size: 100%;
        background-image: ${stripesBg};
        background-repeat: repeat;
        border-radius: ${range.trackBorderRadius};
      }
    `,
    hasTicks: css`
      inset-block-start: ${range.trackTopPositionWithTicks};
    `,
  };
};

export const euiRangeLevelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeLevel: css`
      display: block;
      position: absolute;
      block-size: ${range.trackHeight};
      margin-block-start: 0;
      margin-block-end: 0;

      &:first-child {
        margin-inline-start: 0;
        border-start-start-radius: ${range.trackBorderRadius};
        border-end-start-radius: ${range.trackBorderRadius};
      }

      &:last-child {
        margin-inline-end: 0;
        border-start-end-radius: ${range.trackBorderRadius};
        border-end-end-radius: ${range.trackBorderRadius};
      }
    `,
    primary: css`
      background-color: ${euiRangeLevelColor('primary', euiTheme)};
    `,
    success: css`
      background-color: ${euiRangeLevelColor('success', euiTheme)};
    `,
    warning: css`
      background-color: ${euiRangeLevelColor('warning', euiTheme)};
    `,
    danger: css`
      background-color: ${euiRangeLevelColor('danger', euiTheme)};
    `,
    customColor: css``,
  };
};
