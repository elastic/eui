/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiColorPaletteDisplayStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Border is a pseudo element with transparency
  const border = `${euiTheme.border.width.thin} solid ${transparentize(
    euiTheme.colors.darkestShade,
    0.2
  )}`;

  return {
    euiColorPaletteDisplay: css`
      position: relative;
      display: flex;
      flex-direction: row;
      ${logicalCSS('height', euiTheme.size.s)}
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        border: ${border};
        border-radius: inherit;
      }
    `,
  };
};
