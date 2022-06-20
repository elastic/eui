/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import chroma from 'chroma-js';
import { logicalCSS } from '../../global_styling';
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

const _iconSize = (size: string) => {
  return `
    ${logicalCSS('width', size)};
    ${logicalCSS('height', size)};
  `;
};

const _getTokenColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  color: number | string
) => {
  const iconColor =
    typeof color === 'number' ? visColors[color] : euiTheme.colors.darkShade;

  const isDarkMode = colorMode === 'DARK';

  // $euiTokenGrayColor: lightOrDarkTheme(
  //   $euiColorDarkShade,
  //   $euiColorMediumShade
  // );

  // $color: map-get(map-get($euiTokenTypes, $type), 'graphic');
  // $backgroundColor: tintOrShade($color, 90%, 70%);
  // $fillColor: makeHighContrastColor($color, $backgroundColor);

  const iconColorBehindText =
    typeof color === 'number'
      ? visColorsBehindText[color]
      : euiTheme.colors.darkShade;

  const backgroundColor = isDarkMode
    ? shade(iconColor, 0.7)
    : tint(iconColor, 0.9);

  const boxShadowColor = isDarkMode
    ? shade(iconColor, 0.6)
    : tint(iconColor, 0.7);

  const textColor = isColorDark(...chroma(iconColorBehindText).rgb())
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;

  return `
    // Without a background, the fill color should be the graphic color
    color: ${iconColor};
  

    &[class*='-light'] {
      color: ${makeHighContrastColor(iconColor)(backgroundColor)};
      background-color: ${backgroundColor};
      box-shadow: inset 0 0 0 1px ${boxShadowColor};
    }

    &[class*='-dark'] {
      background-color: ${iconColorBehindText};
      color: ${textColor};
    }

  `;
};

const _getBackgroundColor = (color: number | string) => {
  const iconColor = typeof color === 'number' ? visColors[color] : 'gray';

  return `
    background: ${iconColor};
  `;
};

export const euiTokenStyles = (
  { euiTheme, colorMode }: UseEuiTheme,
  color: string
) => ({
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
    // These are pretty small elements, the standard size
    // is just slightly too large.
    border-radius: ${euiTheme.border.radius.small};
  `,
  // Sizes
  xs: css(_iconSize(euiTheme.size.s)),
  s: css(_iconSize(euiTheme.size.base)),
  m: css(_iconSize(euiTheme.size.l)),
  l: css(_iconSize(euiTheme.size.xl)),
  // colors
  euiColorVis0: css(_getTokenColor(euiTheme, colorMode, 0)),
  euiColorVis1: css(_getTokenColor(euiTheme, colorMode, 1)),
  euiColorVis2: css(_getTokenColor(euiTheme, colorMode, 2)),
  euiColorVis3: css(_getTokenColor(euiTheme, colorMode, 3)),
  euiColorVis4: css(_getTokenColor(euiTheme, colorMode, 4)),
  euiColorVis5: css(_getTokenColor(euiTheme, colorMode, 5)),
  euiColorVis6: css(_getTokenColor(euiTheme, colorMode, 6)),
  euiColorVis7: css(_getTokenColor(euiTheme, colorMode, 7)),
  euiColorVis8: css(_getTokenColor(euiTheme, colorMode, 8)),
  euiColorVis9: css(_getTokenColor(euiTheme, colorMode, 9)),
  gray: css(_getTokenColor(euiTheme, colorMode, 'gray')),
  customColor: css`
    color: ${color};
  `,
  emptyShade: css`
    color: ${euiTheme.colors.emptyShade};
  `,
  customBackground: css(_getBackgroundColor(color)),
  // Fills
  light: css``,
  dark: css``,
  none: css``,
});
