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

const iconSize = (size: string) => {
  return `
    ${logicalCSS('width', size)};
    ${logicalCSS('height', size)};
  `;
};

const getTokenColor = (
  euiTheme: UseEuiTheme['euiTheme'],
  colorMode: UseEuiTheme['colorMode'],
  color: number | string
) => {
  const iconColor =
    typeof color === 'number' ? visColors[color] : euiTheme.colors.darkShade;

  const isDarkMode = colorMode === 'DARK';

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

const getBackgroundColor = (color: number | string) => {
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
  rectangle: css`
    box-sizing: content-box;
    border-radius: ${euiTheme.border.radius.small};
  `,
  // Sizes
  xs: css`
    ${iconSize(euiTheme.size.m)};

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)};
    }
  `,
  s: css`
    ${iconSize(euiTheme.size.base)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)};
    }
  `,
  m: css`
    ${iconSize(euiTheme.size.l)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)};
    }
  `,
  l: css`
    ${iconSize(euiTheme.size.xl)}

    &[class*='-rectangle'] {
      ${logicalCSS('padding-horizontal', euiTheme.size.s)};
    }
  `,
  // colors
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
  emptyShade: css`
    color: ${euiTheme.colors.emptyShade};
  `,
  customBackground: css(getBackgroundColor(color)),
  // Fills
  light: css``,
  dark: css``,
  none: css``,
});
