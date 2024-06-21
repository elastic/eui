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
  const { euiTheme } = euiThemeContext;

  const indicatorSize = euiTheme.size.m;

  const borderRadius = mathWithUnits(
    euiTheme.border.radius.medium,
    (x) => x / 2
  );

  return {
    euiSaturation: css`
      z-index: 3; /* Required to be above the hue slider, which can overlap */
      position: relative;
      ${logicalCSS('width', '100%')}
      ${logicalCSS('padding-bottom', '100%')}
      border-radius: ${borderRadius};
      touch-action: none; /* prevent TouchMove events from scrolling page */
    `,

    euiSaturation__lightness: css`
      position: absolute;
      inset: 0;
      ${logicalCSS('top', '-1px')} /* Hides a slight color inconsistency */

      border-radius: ${borderRadius};
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
    `,
    euiSaturation__saturation: css`
      position: absolute;
      inset: 0;
      ${logicalCSS('top', '-1px')} /* Hides a slight color inconsistency */

      border-radius: ${borderRadius};
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    `,

    euiSaturation__indicator: css`
      position: absolute;
      ${logicalSizeCSS(indicatorSize)}
      transform: translateX(-50%) translateY(-50%);
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.darkestShade};
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
