/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  formatMultipleBoxShadow,
  type _EuiThemeShadows,
  type _EuiThemeShadowPrimitives,
} from '@elastic/eui-theme-common';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';

/**
 * This structure holds "primitives" (or actual design tokens as they
 * would be stored in a design token repository).
 * Not exposing them in the theme object is intentional.
 * The term "primitive" seems appropriate but may change.
 */
export const shadowPrimitives: _EuiThemeShadowPrimitives = {
  xs: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.06,
        x: 0,
        y: 1,
        blur: 4,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.04,
        x: 0,
        y: 2,
        blur: 8,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.4,
        x: 0,
        y: 1,
        blur: 4,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.24,
        x: 0,
        y: 2,
        blur: 8,
        spread: 0,
      },
    ],
  },
  s: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.08,
        x: 0,
        y: 2,
        blur: 7,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.05,
        x: 0,
        y: 4,
        blur: 11,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.46,
        x: 0,
        y: 2,
        blur: 7,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.26,
        x: 0,
        y: 4,
        blur: 11,
        spread: 0,
      },
    ],
  },
  m: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.1,
        x: 0,
        y: 3,
        blur: 10,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.06,
        x: 0,
        y: 6,
        blur: 14,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.52,
        x: 0,
        y: 3,
        blur: 10,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.28,
        x: 0,
        y: 6,
        blur: 14,
        spread: 0,
      },
    ],
  },
  l: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.12,
        x: 0,
        y: 4,
        blur: 13,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.07,
        x: 0,
        y: 8,
        blur: 17,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.58,
        x: 0,
        y: 4,
        blur: 13,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.3,
        x: 0,
        y: 8,
        blur: 17,
        spread: 0,
      },
    ],
  },
  xl: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.14,
        x: 0,
        y: 5,
        blur: 16,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.08,
        x: 0,
        y: 10,
        blur: 20,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.64,
        x: 0,
        y: 5,
        blur: 16,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.32,
        x: 0,
        y: 10,
        blur: 20,
        spread: 0,
      },
    ],
  },
  xxl: {
    light: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.16,
        x: 0,
        y: 6,
        blur: 19,
        spread: 0,
      },
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 0.09,
        x: 0,
        y: 12,
        blur: 23,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SEMANTIC_COLORS.shade120,
        opacity: 1,
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
      },
      {
        color: '#000',
        opacity: 0.7,
        x: 0,
        y: 6,
        blur: 19,
        spread: 0,
      },
      {
        color: '#000',
        opacity: 0.34,
        x: 0,
        y: 12,
        blur: 23,
        spread: 0,
      },
    ],
  },
  flat: {
    light: [],
    dark: [],
  },
};

export const shadows: _EuiThemeShadows = {
  xs: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
        up: true,
      }),
    },
  },
  s: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark, {
        up: true,
      }),
    },
  },
  m: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.m.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.m.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.m.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.m.dark, {
        up: true,
      }),
    },
  },
  l: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.l.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.l.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.l.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.l.dark, {
        up: true,
      }),
    },
  },
  xl: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xl.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xl.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xl.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xl.dark, {
        up: true,
      }),
    },
  },
  hover: {
    base: {
      down: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1)),
        DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1)),
      },
      up: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1), {
          up: true,
        }),
        DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1), {
          up: true,
        }),
      },
    },
    xl: {
      down: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.xxl.light),
        DARK: formatMultipleBoxShadow(shadowPrimitives.xxl.dark),
      },
      up: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.xxl.light, {
          up: true,
        }),
        DARK: formatMultipleBoxShadow(shadowPrimitives.xxl.dark, {
          up: true,
        }),
      },
    },
  },
  // Falls back to `xs` (defined only to support legacy `euiShadowFlat` mixin)
  flat: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
        up: true,
      }),
    },
  },
};
