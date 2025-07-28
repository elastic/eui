/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  formatMultipleBoxShadow,
  _EuiThemeShadows,
  type _EuiThemeShadowPrimitives,
} from '@elastic/eui-theme-common';

// in Amsterdam this is `color.shadow`, which computes to `ink` (#000)
const SHADOW_COLOR = '#000000';

export const shadowPrimitives: _EuiThemeShadowPrimitives = {
  xs: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 1,
        x: 0,
        y: 0.8,
        blur: 0.8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.03 * 1,
        x: 0,
        y: 2.3,
        blur: 2,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0.8,
        blur: 0.8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.03 * 3.5,
        x: 0,
        y: 2.3,
        blur: 2,
        spread: 0,
      },
    ],
  },
  s: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.07 * 1,
        x: 0,
        y: 0.7,
        blur: 1.4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 1,
        x: 0,
        y: 1.9,
        blur: 4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 1,
        x: 0,
        y: 4.5,
        blur: 10,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.07 * 3.5,
        x: 0,
        y: 0.7,
        blur: 1.4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 3.5,
        x: 0,
        y: 1.9,
        blur: 4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 3.5,
        x: 0,
        y: 4.5,
        blur: 10,
        spread: 0,
      },
    ],
  },
  m: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.08 * 1,
        x: 0,
        y: 0.9,
        blur: 4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 1,
        x: 0,
        y: 2.6,
        blur: 8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 1,
        x: 0,
        y: 5.7,
        blur: 12,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 1,
        x: 0,
        y: 15,
        blur: 15,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.08 * 3.5,
        x: 0,
        y: 0.9,
        blur: 4,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 3.5,
        x: 0,
        y: 2.6,
        blur: 8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 3.5,
        x: 0,
        y: 5.7,
        blur: 12,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 3.5,
        x: 0,
        y: 15,
        blur: 15,
        spread: 0,
      },
    ],
  },
  l: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.1 * 1,
        x: 0,
        y: 1,
        blur: 5,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.07 * 1,
        x: 0,
        y: 3.6,
        blur: 13,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 1,
        x: 0,
        y: 8.4,
        blur: 23,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 1,
        x: 0,
        y: 23,
        blur: 35,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.1 * 3.5,
        x: 0,
        y: 1,
        blur: 5,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.07 * 3.5,
        x: 0,
        y: 3.6,
        blur: 13,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 3.5,
        x: 0,
        y: 8.4,
        blur: 23,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.05 * 3.5,
        x: 0,
        y: 23,
        blur: 35,
        spread: 0,
      },
    ],
  },
  xl: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.13 * 1,
        x: 0,
        y: 2.7,
        blur: 9,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.09 * 1,
        x: 0,
        y: 9.4,
        blur: 24,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.08 * 1,
        x: 0,
        y: 21.8,
        blur: 43,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.13 * 3.5,
        x: 0,
        y: 2.7,
        blur: 9,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.09 * 3.5,
        x: 0,
        y: 9.4,
        blur: 24,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.08 * 3.5,
        x: 0,
        y: 21.8,
        blur: 43,
        spread: 0,
      },
    ],
  },
  xxl: {
    light: [],
    dark: [],
  },
  flat: {
    light: [
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 1,
        x: 0,
        y: 0,
        blur: 0.8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 1,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 1,
        x: 0,
        y: 0,
        blur: 5,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.03 * 1,
        x: 0,
        y: 0,
        blur: 17,
        spread: 0,
      },
    ],
    dark: [
      {
        color: SHADOW_COLOR,
        opacity: 0.06 * 3.5,
        x: 0,
        y: 0,
        blur: 0.8,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0,
        blur: 5,
        spread: 0,
      },
      {
        color: SHADOW_COLOR,
        opacity: 0.03 * 3.5,
        x: 0,
        y: 0,
        blur: 17,
        spread: 0,
      },
    ],
  },
};

export const shadows: _EuiThemeShadows = {
  xs: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xs.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
  s: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
  m: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.m.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.m.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.m.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.m.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
  l: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.l.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.l.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.l.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.l.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
  xl: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xl.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xl.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.xl.light, { up: true }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.xl.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
  hover: {
    base: {
      down: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1)),
        DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1), {
          colorMode: 'DARK',
        }),
      },
      up: {
        LIGHT: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1), {
          up: true,
        }),
        DARK: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1), {
          up: true,
          colorMode: 'DARK',
        }),
      },
    },
    xl: {
      down: {
        LIGHT: 'none',
        DARK: 'none',
      },
      up: {
        LIGHT: 'none',
        DARK: 'none',
      },
    },
  },
  flat: {
    down: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.flat.light),
      DARK: formatMultipleBoxShadow(shadowPrimitives.flat.dark, {
        colorMode: 'DARK',
      }),
    },
    up: {
      LIGHT: formatMultipleBoxShadow(shadowPrimitives.flat.light, {
        up: true,
      }),
      DARK: formatMultipleBoxShadow(shadowPrimitives.flat.dark, {
        up: true,
        colorMode: 'DARK',
      }),
    },
  },
};
