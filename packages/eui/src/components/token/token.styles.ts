/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import chroma from 'chroma-js';
import {
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../global_styling';
import {
  UseEuiTheme,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  makeHighContrastColor,
  isColorDark,
  tint,
  shade,
} from '../../services';
import type { TokenFill } from './token_types';
import { TOKEN_COLOR_TO_ICON_COLOR_MAP } from './token_map';
import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

const getTokenColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  fill: TokenFill,
  color: number | string
) => {
  const { hasVisColorAdjustment } = euiTheme.flags;
  // use inside function as they are not returning constants,
  // but internally depend on EUI_VIS_COLOR_STORE to update per theme
  const visColors = euiPaletteColorBlind();
  const visColorsBehindText = euiPaletteColorBlindBehindText();

  const isVizColor = typeof color === 'number';

  const iconColor = isVizColor ? visColors[color] : euiTheme.colors.darkShade;

  const isDarkMode = colorMode === 'DARK';

  const backgroundDarkColor = isVizColor
    ? visColorsBehindText[color]
    : euiTheme.colors.darkShade;

  const backgroundLightColor = isDarkMode
    ? shade(iconColor, 0.9)
    : tint(iconColor, 0.9);

  const getIconVisColor = (
    euiTheme: UseEuiTheme['euiTheme'],
    color: number
  ) => {
    const iconColorKey =
      `euiColorVis${color}` as keyof typeof TOKEN_COLOR_TO_ICON_COLOR_MAP;
    const iconColorToken = TOKEN_COLOR_TO_ICON_COLOR_MAP[
      iconColorKey
    ] as keyof _EuiThemeVisColors;

    return euiTheme.colors.vis[iconColorToken];
  };

  const lightColor = hasVisColorAdjustment
    ? makeHighContrastColor(iconColor)(backgroundLightColor)
    : isVizColor
    ? shade(getIconVisColor(euiTheme, color), 0.3)
    : iconColor;

  const boxShadowColor = isDarkMode
    ? shade(iconColor, 0.6)
    : tint(iconColor, 0.2);

  const darkColor = isColorDark(...chroma(backgroundDarkColor).rgb())
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;

  switch (fill) {
    case 'none':
      return `
        // Without a background, the fill color should be the graphic color
        color: ${iconColor};
      `;
    case 'light':
      return `
        color: ${lightColor};
        background-color: ${backgroundLightColor};
        box-shadow: inset 0 0 0 1px ${boxShadowColor};
      `;
    case 'dark':
      return `
        color: ${darkColor};
        background-color: ${backgroundDarkColor};
      `;
  }
};

export const euiTokenStyles = (
  { euiTheme, colorMode }: UseEuiTheme,
  fill: TokenFill
) => ({
  // Base
  euiToken: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      ${logicalCSS('height', '100%')}
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
    ${logicalSizeCSS(euiTheme.size.s)}

    &[class*='-square'],
    &[class*='-rectangle'] {
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};
    }

    &[class*='-rectangle'] {
      /* adds a small padding so that the icon is not touching the border */
      ${logicalCSS('padding-vertical', '1px')}
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
    }
  `,
  s: css`
    ${logicalSizeCSS(euiTheme.size.base)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
    }
  `,
  m: css`
    ${logicalSizeCSS(euiTheme.size.l)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
    }
  `,
  l: css`
    ${logicalSizeCSS(euiTheme.size.xl)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
    }
  `,
  // Colors
  euiColorVis0: css(getTokenColor(euiTheme, colorMode, fill, 0)),
  euiColorVis1: css(getTokenColor(euiTheme, colorMode, fill, 1)),
  euiColorVis2: css(getTokenColor(euiTheme, colorMode, fill, 2)),
  euiColorVis3: css(getTokenColor(euiTheme, colorMode, fill, 3)),
  euiColorVis4: css(getTokenColor(euiTheme, colorMode, fill, 4)),
  euiColorVis5: css(getTokenColor(euiTheme, colorMode, fill, 5)),
  euiColorVis6: css(getTokenColor(euiTheme, colorMode, fill, 6)),
  euiColorVis7: css(getTokenColor(euiTheme, colorMode, fill, 7)),
  euiColorVis8: css(getTokenColor(euiTheme, colorMode, fill, 8)),
  euiColorVis9: css(getTokenColor(euiTheme, colorMode, fill, 9)),
  gray: css(getTokenColor(euiTheme, colorMode, fill, 'gray')),
  customColor: css``,
  // Fills
  light: css``,
  dark: css``,
  none: css``,
});
