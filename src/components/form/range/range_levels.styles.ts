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
    'url("data:image/svg+xml, %3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%206%22%3E%0A%20%20%3Crect%20width%3D%2224%22%20height%3D%226%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.5%22%2F%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22m12%206%206-6h-3l-3%203v3ZM18%206V3l-3%203h3ZM6%206l6-6H9L6%203v3Z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.5%22%2F%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12%206V3L9%206h3ZM0%206l6-6H3L0%203v3ZM6%206V3L3%206h3ZM18%206l6-6h-3l-3%203v3ZM24%206V3l-3%203h3Z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.5%22%2F%3E%0A%3C%2Fsvg%3E")';

  const stripesDarkEncodedSVGUrl =
    'url("data:image/svg+xml, %3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%206%22%3E%0A%20%20%3Crect%20width%3D%2224%22%20height%3D%226%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.5%22%2F%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22m12%206%206-6h-3l-3%203v3ZM18%206V3l-3%203h3ZM6%206l6-6H9L6%203v3Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.5%22%2F%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12%206V3L9%206h3ZM0%206l6-6H3L0%203v3ZM6%206V3L3%206h3ZM18%206l6-6h-3l-3%203v3ZM24%206V3l-3%203h3Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.5%22%2F%3E%0A%3C%2Fsvg%3E")';

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
