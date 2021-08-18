/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { useEuiTheme } from '../../services/theme/hooks';
import { lightness, tint, transparentize } from '../../services/color';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 */

export const useSlightShadow = ({
  color,
  opacity,
}: {
  color?: string;
  opacity?: number;
} = {}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.3)
    .css();
  return `box-shadow: 0 2px 2px -1px ${rgba};`;
};

export const useBottomShadowSmall = ({
  color,
  opacity,
}: {
  color?: string;
  opacity?: number;
} = {}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.3)
    .css();
  return `
  box-shadow:
    0 2px 2px -1px ${rgba},
    0 1px 5px -2px ${rgba};
  `;
};

export const useBottomShadowMedium = ({
  color,
  opacity,
}: {
  color?: string;
  opacity?: number;
} = {}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.2)
    .css();
  return `
  box-shadow:
    0 6px 12px -1px ${rgba},
    0 4px 4px -1px ${rgba},
    0 2px 2px 0 ${rgba};
  `;
};

// Similar to shadow medium but without the bottom depth. Useful for popovers
// that drop UP rather than DOWN.
export const useBottomShadowFlat = ({
  color,
  opacity,
}: {
  color?: string;
  opacity?: number;
} = {}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const rgba = chroma(color || colors.shadow)
    .alpha(opacity || 0.2)
    .css();
  return `
  box-shadow:
    0 0 12px -1px ${rgba},
    0 0 4px -1px ${rgba},
    0 0 2px 0 ${rgba};
  `;
};

// adjustBorder allows the border color to match the drop shadow better so that there's better
// distinction between element bounds and the shadow (crisper borders)
export const useBottomShadow = ({
  color: _color,
  opacity,
  adjustBorders,
}: {
  color?: string;
  opacity?: number;
  adjustBorders?: boolean;
} = {}) => {
  const {
    euiTheme: { border, colors },
  } = useEuiTheme();
  const color = _color || colors.shadow;
  const rgba = chroma(color)
    .alpha(opacity || 0.2)
    .css();

  const adjustedBorders =
    adjustBorders && !(lightness(border.color) < 50)
      ? `
  border-color: ${tint(color, 0.75)};
  border-top-color: ${tint(color, 0.8)};
  border-bottom-color: ${tint(color, 0.55)};
  `
      : '';

  return `
  box-shadow:
    0 12px 24px 0 ${rgba},
    0 6px 12px 0 ${rgba},
    0 4px 4px 0 ${rgba},
    0 2px 2px 0 ${rgba};
  ${adjustedBorders}
  `;
};

export const useBottomShadowLarge = ({
  color: _color,
  opacity,
  adjustBorders,
  reverse,
}: {
  color?: string;
  opacity?: number;
  adjustBorders?: boolean;
  reverse?: boolean;
} = {}) => {
  const {
    euiTheme: { border, colors },
  } = useEuiTheme();
  const color = _color || colors.shadow;
  const rgba = chroma(color)
    .alpha(opacity || 0.1)
    .css();

  // Never adjust borders if the border color is already on the dark side (dark theme)
  const adjustedBorders =
    adjustBorders && !(lightness(border.color) < 50)
      ? `
    border-color: ${tint(color, 0.75)};
    border-top-color: ${tint(color, 0.8)};
    border-bottom-color: ${tint(color, 0.55)};
    `
      : '';

  if (reverse) {
    return `
    box-shadow:
      0 -40px 64px 0 ${rgba},
      0 -24px 32px 0 ${rgba},
      0 -16px 16px 0 ${rgba},
      0 -8px 8px 0 ${rgba};
      ${adjustedBorders}
    `;
  } else {
    return `
    box-shadow:
      0 40px 64px 0 ${rgba},
      0 24px 32px 0 ${rgba},
      0 16px 16px 0 ${rgba},
      0 8px 8px 0 ${rgba},
      0 4px 4px 0 ${rgba},
      0 2px 2px 0 ${rgba};
      ${adjustedBorders}
    `;
  }
};

export const useSlightShadowHover = ({
  color,
  opacity: _opacity,
}: {
  color?: string;
  opacity?: number;
} = {}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const opacity = _opacity || 0.3;
  const rgba1 = chroma(color || colors.shadow)
    .alpha(opacity)
    .css();
  const rgba2 = chroma(color || colors.shadow)
    .alpha(opacity / 2)
    .css();
  return `
  box-shadow:
    0 4px 8px 0 ${rgba2},
    0 2px 2px -1px ${rgba1};
  `;
};

export const useSlightShadowActive = useSlightShadowHover;

export const useOverflowShadow = ({
  direction: _direction,
  side: _side,
}: {
  direction?: 'y' | 'x';
  side?: 'both' | 'start' | 'end';
} = {}) => {
  const direction = _direction || 'y';
  const side = _side || 'both';
  const {
    euiTheme: { size },
  } = useEuiTheme();
  const hideHeight = `calc(${size.base} * 0.75 * 1.25)`;
  const gradientStart = `
  ${transparentize('red', 0.9)} 0%,
  ${transparentize('red', 0)} ${hideHeight};
  `;
  const gradientEnd = `
  ${transparentize('red', 0)} calc(100% - ${hideHeight}),
  ${transparentize('red', 0.9)} 100%;
  `;
  let gradient = '';
  if (side) {
    if (side === 'both') {
      gradient = `${gradientStart}, ${gradientEnd}`;
    } else if (side === 'start') {
      gradient = `${gradientStart}`;
    } else {
      gradient = `${gradientEnd}`;
    }
  }

  if (direction === 'y') {
    return `mask-image: linear-gradient(to bottom, ${gradient})`;
  } else {
    return `mask-image: linear-gradient(to right, ${gradient})`;
  }
};
