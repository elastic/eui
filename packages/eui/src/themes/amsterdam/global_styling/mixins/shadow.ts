/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, UseEuiTheme } from '../../../../services/theme';
import { getShadowColor } from '../functions';
import {
  _EuiThemeShadowSize,
  _EuiThemeShadowCustomColor,
} from '../../../../global_styling/variables/shadow';

export interface EuiShadowCustomColor {
  color?: string;
}

/**
 * euiSlightShadow
 */
export const euiShadowXSmall = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  return `
box-shadow:
  0 .8px .8px ${getShadowColor(color, 0.04, colorMode)},
  0 2.3px 2px ${getShadowColor(color, 0.03, colorMode)};
`;
};

/**
 * bottomShadowSmall
 */
export const euiShadowSmall = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  return `
box-shadow:
  0 .7px 1.4px ${getShadowColor(color, 0.07, colorMode)},
  0 1.9px 4px ${getShadowColor(color, 0.05, colorMode)},
  0 4.5px 10px ${getShadowColor(color, 0.05, colorMode)};
`;
};

/**
 * bottomShadowMedium
 */
export const euiShadowMedium = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  if (options?.property === 'filter') {
    // Using only one drop-shadow filter instead of multiple is more performant & prevents Safari bugs
    return `filter: drop-shadow(0 5.7px 9px ${getShadowColor(
      color,
      0.2,
      colorMode
    )});`;
  } else {
    return `box-shadow:
      0 .9px 4px ${getShadowColor(color, 0.08, colorMode)},
      0 2.6px 8px ${getShadowColor(color, 0.06, colorMode)},
      0 5.7px 12px ${getShadowColor(color, 0.05, colorMode)},
      0 15px 15px ${getShadowColor(color, 0.04, colorMode)};`;
  }
};

/**
 * bottomShadow
 */
export const euiShadowLarge = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  return `
box-shadow:
  0 1px 5px ${getShadowColor(color, 0.1, colorMode)},
  0 3.6px 13px ${getShadowColor(color, 0.07, colorMode)},
  0 8.4px 23px ${getShadowColor(color, 0.06, colorMode)},
  0 23px 35px ${getShadowColor(color, 0.05, colorMode)};
`;
};

/**
 * bottomShadowLarge
 */
export interface EuiShadowXLarge extends _EuiThemeShadowCustomColor {
  reverse?: boolean;
}
export const euiShadowXLarge = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: EuiShadowXLarge
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  const reverse = options?.reverse ?? false;

  return `
box-shadow:
  0 ${reverse ? '-' : ''}2.7px 9px ${getShadowColor(color, 0.13, colorMode)},
  0 ${reverse ? '-' : ''}9.4px 24px ${getShadowColor(color, 0.09, colorMode)},
  0 ${reverse ? '-' : ''}21.8px 43px ${getShadowColor(color, 0.08, colorMode)};
`;
};

/**
 * slightShadowHover
 */
export const euiSlightShadowHover = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  return `
box-shadow:
  0 1px 5px ${getShadowColor(color, 0.1, colorMode)},
  0 3.6px 13px ${getShadowColor(color, 0.07, colorMode)},
  0 8.4px 23px ${getShadowColor(color, 0.06, colorMode)},
  0 23px 35px ${getShadowColor(color, 0.05, colorMode)};
`;
};
export const useEuiSlightShadowHover = (
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiSlightShadowHover(euiThemeContext, { color });
};

/**
 * bottomShadowFlat
 *
 * Similar to shadow medium but without the bottom depth.
 * Useful for popovers that drop UP rather than DOWN.
 */
export const euiShadowFlat = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  options?: _EuiThemeShadowCustomColor
) => {
  if (highContrastMode) {
    return _highContrastBorderBottom(euiTheme);
  }

  const color = options?.color || euiTheme.colors.shadow;

  return `
box-shadow:
  0 0 .8px ${getShadowColor(color, 0.06, colorMode)},
  0 0 2px ${getShadowColor(color, 0.04, colorMode)},
  0 0 5px ${getShadowColor(color, 0.04, colorMode)},
  0 0 17px ${getShadowColor(color, 0.03, colorMode)};
`;
};
export const useEuiShadowFlat = (
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiShadowFlat(euiThemeContext, { color });
};

export const euiShadow = (
  euiThemeContext: UseEuiTheme,
  size: _EuiThemeShadowSize = 'l',
  options?: _EuiThemeShadowCustomColor
) => {
  if (euiThemeContext.highContrastMode) {
    return _highContrastBorderBottom(euiThemeContext.euiTheme);
  }

  switch (size) {
    case 'xs':
      return euiShadowXSmall(euiThemeContext, options);
    case 's':
      return euiShadowSmall(euiThemeContext, options);
    case 'm':
      return euiShadowMedium(euiThemeContext, options);
    case 'l':
      return euiShadowLarge(euiThemeContext, options);
    case 'xl':
      return euiShadowXLarge(euiThemeContext, options);

    default:
      console.warn('Please provide a valid size option to useEuiShadow');
      return '';
  }
};

export const useEuiShadow = (
  size: _EuiThemeShadowSize = 'l',
  color?: _EuiThemeShadowCustomColor['color']
) => {
  const euiThemeContext = useEuiTheme();
  return euiShadow(euiThemeContext, size, { color });
};

/**
 * Internal utilities for replacing shadows with high contrast borders instead
 */

const _highContrastBorderBottom = ({ border }: UseEuiTheme['euiTheme']) =>
  `box-shadow: 0 ${border.width.thin} 0 0 ${border.color};`;
