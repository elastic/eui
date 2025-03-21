/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import { preventForcedColors } from '../../../global_styling/functions/high_contrast';

export const euiColorPaletteDisplayStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const border = highContrastMode
    ? euiTheme.border.thin
    : // Border is a pseudo element with transparency
      `${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBaseFormsColorSwatch}`;

  return {
    euiColorPaletteDisplay: css`
      position: relative;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      ${preventForcedColors(euiThemeContext)}

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        border: ${border};
        border-radius: inherit;
      }
    `,

    // Sizes
    xs: css`
      ${logicalCSS('height', euiTheme.size.xs)}
      border-radius: ${euiTheme.size.xs};
    `,
    s: css`
      ${logicalCSS('height', euiTheme.size.s)}
      border-radius: ${euiTheme.size.s};
    `,
    m: css`
      ${logicalCSS('height', euiTheme.size.base)}
      border-radius: ${euiTheme.size.base};
    `,
  };
};
