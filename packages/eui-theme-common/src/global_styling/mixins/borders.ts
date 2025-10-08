/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services/theme/types';

const logicalSide = {
  left: 'inline-start',
  right: 'inline-end',
  top: 'block-start',
  bottom: 'block-end',
  horizontal: 'inline',
  vertical: 'block',
};

export const getBorderSide = (side: BorderSides) =>
  side === 'all' ? 'border' : `border-${logicalSide[side]}`;

export type BorderSides =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'horizontal'
  | 'vertical'
  | 'all';

/**
 * Defines styles for floating boarders applied in DARK mode via EUI shadow utils
 */
export const euiShadowFloatingBorderStyles = (
  euiThemeContext: UseEuiTheme,
  options: {
    side?: BorderSides;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: string;
  }
) => {
  return `
    /* create a containing block without using \`position\` to prevent CSS specificity issues and unexpected overrides;
    \`transform: translateZ(0)\` is the least likely to affect other behaviors (overflow, layout) */
    transform: translateZ(0);

    ${euiBorderStyles(euiThemeContext, options)}
  `;
};

/**
 * Shared style for floating borders.
 * Uses a pseudo element with `border` attribute to prevent both dimension changes due to
 * the border width as well as visible gaps due to the need of a transparent border in LIGHT mode.
 */
export const euiBorderStyles = (
  euiThemeContext: UseEuiTheme,
  options: {
    side?: BorderSides;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: string;
  }
) => {
  const { euiTheme } = euiThemeContext;
  const {
    side = 'all',
    borderColor = euiTheme.border.color,
    borderWidth = euiTheme.border.width.thin,
    borderStyle = 'solid',
  } = options;
  const borderProperty = getBorderSide(side);

  return `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      /* ensure to keep on top of flush content */
      z-index: 0;
      ${borderProperty}: ${borderWidth} ${borderStyle} ${borderColor};
      border-radius: inherit;
      pointer-events: none;
    }
  `;
};
