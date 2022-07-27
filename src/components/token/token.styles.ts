/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import chroma from 'chroma-js';
import { logicalCSS, logicalSizeCSS } from '../../global_styling';
import {
  UseEuiTheme,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  makeHighContrastColor,
  isColorDark,
  tint,
  shade,
} from '../../services';

const visColors = euiPaletteColorBlind();
const visColorsBehindText = euiPaletteColorBlindBehindText();

const getTokenColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  color: number | string
) => {
  const isVizColor = typeof color === 'number';

  const iconColor = isVizColor ? visColors[color] : euiTheme.colors.darkShade;

  const isDarkMode = colorMode === 'DARK';

  const backgroundDarkColor = isVizColor
    ? visColorsBehindText[color]
    : euiTheme.colors.darkShade;

  const backgroundLightColor = isDarkMode
    ? shade(iconColor, 0.7)
    : tint(iconColor, 0.9);

  const lightColor = makeHighContrastColor(iconColor)(backgroundLightColor);

  const boxShadowColor = isDarkMode
    ? shade(iconColor, 0.6)
    : tint(iconColor, 0.7);

  const darkColor = isColorDark(...chroma(backgroundDarkColor).rgb())
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;

  return `
    // Without a background, the fill color should be the graphic color
    color: ${iconColor};
  

    &[class*='-light'] {
      color: ${lightColor};
      background-color: ${backgroundLightColor};
      box-shadow: inset 0 0 0 1px ${boxShadowColor};
    }

    &[class*='-dark'] {
      color: ${darkColor};
      background-color: ${backgroundDarkColor};
    }
  `;
};

export const euiTokenStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Base
  euiToken: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 100%;
      margin: auto;
    }
  `,
  // Shapes
  circle: css`
    border-radius: 50%;
  `,
  square: css`
    border-radius: ${euiTheme.border.radius.small};
  `,
  rectangle: css`
    box-sizing: content-box;
    border-radius: ${euiTheme.border.radius.small};
  `,
  // Sizes
  xs: css`
    ${logicalSizeCSS(euiTheme.size.s, euiTheme.size.s)};

    &[class*='-square'] {
      border-radius: calc(${euiTheme.border.radius.small} / 2);
    }

    &[class*='-rectangle'] {
      ${logicalCSS(
        'padding-vertical',
        '1px'
      )}; // adds a small padding so that the icon is not touching the border
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)};
      border-radius: calc(${euiTheme.border.radius.small} / 2);
    }
  `,
  s: css`
    ${logicalSizeCSS(euiTheme.size.base, euiTheme.size.base)};

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)};
    }
  `,
  m: css`
    ${logicalSizeCSS(euiTheme.size.l, euiTheme.size.l)};

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)};
    }
  `,
  l: css`
    ${logicalSizeCSS(euiTheme.size.xl, euiTheme.size.xl)};

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)};
    }
  `,
  // Colors
  euiColorVis0: css(getTokenColor(euiTheme, colorMode, 0)),
  euiColorVis1: css(getTokenColor(euiTheme, colorMode, 1)),
  euiColorVis2: css(getTokenColor(euiTheme, colorMode, 2)),
  euiColorVis3: css(getTokenColor(euiTheme, colorMode, 3)),
  euiColorVis4: css(getTokenColor(euiTheme, colorMode, 4)),
  euiColorVis5: css(getTokenColor(euiTheme, colorMode, 5)),
  euiColorVis6: css(getTokenColor(euiTheme, colorMode, 6)),
  euiColorVis7: css(getTokenColor(euiTheme, colorMode, 7)),
  euiColorVis8: css(getTokenColor(euiTheme, colorMode, 8)),
  euiColorVis9: css(getTokenColor(euiTheme, colorMode, 9)),
  gray: css(getTokenColor(euiTheme, colorMode, 'gray')),
  customColor: css``,
  // Fills
  light: css``,
  dark: css``,
  none: css``,
});
