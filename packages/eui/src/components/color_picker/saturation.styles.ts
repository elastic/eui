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
  const borderRadius = euiTheme.border.radius.small;
  // Without this slight decrease in border radius, the color can be seen
  // peeking through the top left corner of the saturation gradient
  const gradientBorderRadius = mathWithUnits(borderRadius, (x) => x - 1);

  return {
    euiSaturation: css`
      z-index: 3; /* Required to be above the hue slider, which can overlap */
      position: relative;
      aspect-ratio: 1 / 1;
      ${logicalCSS('width', '100%')}
      border-radius: ${borderRadius};
      touch-action: none; /* prevent TouchMove events from scrolling page */

      &:focus,
      &:focus-within {
        outline: none; /* Hide focus ring from tabindex=0 */

        .euiSaturation__indicator {
          ${highContrastMode
            ? `outline: ${euiTheme.border.thin};`
            : `
              outline: none; /* Standardize indicator focus ring */
              box-shadow: 0 0 0 ${euiTheme.focus.width} ${euiTheme.colors.primary};
              border-color: ${euiTheme.colors.primary};
            `}
        }
      }

      ${highContrastMode === 'forced' ? 'forced-color-adjust: none;' : ''}
      ${highContrastMode
        ? // The border must be in an overlaid pseudo element to not affect the
          // width/height and position of the indicator, or cause border-radius issues
          `&::after {
            z-index: 1;
            content: '';
            position: absolute;
            inset: 0;
            border: ${euiTheme.border.thin};
            border-radius: inherit;
            pointer-events: none;
          }`
        : ''}
    `,

    euiSaturation__lightness: css`
      position: absolute;
      inset: 0;
      border-radius: ${gradientBorderRadius};
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
    `,
    euiSaturation__saturation: css`
      position: absolute;
      inset: 0;
      border-radius: ${gradientBorderRadius};
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    `,

    euiSaturation__indicator: css`
      z-index: 2;
      position: absolute;
      ${logicalSizeCSS(indicatorSize)}
      transform: translateX(-50%) translateY(-50%);
      border-radius: 100%;
      ${highContrastMode
        ? `
        border: ${euiTheme.border.width.thick} solid ${euiTheme.colors.ink};
        background-color: ${euiTheme.colors.ghost};

        &:focus-visible {
          outline: ${euiTheme.border.thin};
          outline-offset: 0;
        }`
        : `
        border: ${euiTheme.border.width.thin} solid ${euiTheme.colors.darkestShade};

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100%;
          border: ${euiTheme.border.width.thin} solid
            ${euiTheme.colors.lightestShade};
        }`}
    `,
  };
};
