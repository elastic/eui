/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../global_styling';

export const euiSaturationStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const indicatorSize = euiTheme.size.m;

  const borderRadius = mathWithUnits(
    euiTheme.border.radius.medium,
    (x) => x / 2
  );

  return {
    euiSaturation: css`
      z-index: 3; /* Required to be above the hue slider, which can overlap */
      position: relative;
      aspect-ratio: 1 / 1;
      ${logicalCSS('width', '100%')}
      ${highContrastMode ? `border: ${euiTheme.border.thin};` : ''}
      border-radius: ${borderRadius};
      touch-action: none; /* prevent TouchMove events from scrolling page */

      &:focus,
      &:focus-within {
        outline: none; /* Hide focus ring from tabindex=0 */

        .euiSaturation__indicator {
          outline: none; /* Standardize indicator focus ring */
          box-shadow: 0 0 0 ${euiTheme.focus.width} ${euiTheme.colors.primary};
          border-color: ${euiTheme.colors.primary};
        }
      }
    `,

    euiSaturation__svg: css`
      position: absolute;
      ${logicalSizeCSS('100%')}
      border-radius: ${borderRadius};
      pointer-events: none;
    `,

    euiSaturation__lightness: css`
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
    `,
    euiSaturation__saturation: css`
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    `,

    euiSaturation__indicator: css`
      position: absolute;
      ${logicalSizeCSS(indicatorSize)}
      transform: translateX(-50%) translateY(-50%);
      ${highContrastMode ? `background-color: ${euiTheme.colors.ghost};` : ''}
      border: ${euiTheme.border.width.thin} solid ${highContrastMode
        ? euiTheme.colors.ink
        : euiTheme.colors.darkestShade};
      border-radius: 100%;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 100%;
        border: ${euiTheme.border.width.thin} solid
          ${euiTheme.colors.lightestShade};
      }
    `,
  };
};
