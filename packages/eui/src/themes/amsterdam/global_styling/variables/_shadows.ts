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
        opacity: 0.04 * 1,
        x: 0,
        y: 0.8,
        blur: 0.8,
        spread: 0,
      },
      {
        opacity: 0.03 * 1,
        x: 0,
        y: 2.3,
        blur: 2,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0.8,
        blur: 0.8,
        spread: 0,
      },
      {
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
        opacity: 0.07 * 1,
        x: 0,
        y: 0.7,
        blur: 1.4,
        spread: 0,
      },
      {
        opacity: 0.05 * 1,
        x: 0,
        y: 1.9,
        blur: 4,
        spread: 0,
      },
      {
        opacity: 0.05 * 1,
        x: 0,
        y: 4.5,
        blur: 10,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.07 * 3.5,
        x: 0,
        y: 0.7,
        blur: 1.4,
        spread: 0,
      },
      {
        opacity: 0.05 * 3.5,
        x: 0,
        y: 1.9,
        blur: 4,
        spread: 0,
      },
      {
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
        opacity: 0.08 * 1,
        x: 0,
        y: 0.9,
        blur: 4,
        spread: 0,
      },
      {
        opacity: 0.06 * 1,
        x: 0,
        y: 2.6,
        blur: 8,
        spread: 0,
      },
      {
        opacity: 0.05 * 1,
        x: 0,
        y: 5.7,
        blur: 12,
        spread: 0,
      },
      {
        opacity: 0.04 * 1,
        x: 0,
        y: 15,
        blur: 15,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.08 * 3.5,
        x: 0,
        y: 0.9,
        blur: 4,
        spread: 0,
      },
      {
        opacity: 0.06 * 3.5,
        x: 0,
        y: 2.6,
        blur: 8,
        spread: 0,
      },
      {
        opacity: 0.05 * 3.5,
        x: 0,
        y: 5.7,
        blur: 12,
        spread: 0,
      },
      {
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
        opacity: 0.1 * 1,
        x: 0,
        y: 1,
        blur: 5,
        spread: 0,
      },
      {
        opacity: 0.07 * 1,
        x: 0,
        y: 3.6,
        blur: 13,
        spread: 0,
      },
      {
        opacity: 0.06 * 1,
        x: 0,
        y: 8.4,
        blur: 23,
        spread: 0,
      },
      {
        opacity: 0.05 * 1,
        x: 0,
        y: 23,
        blur: 35,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.1 * 3.5,
        x: 0,
        y: 1,
        blur: 5,
        spread: 0,
      },
      {
        opacity: 0.07 * 3.5,
        x: 0,
        y: 3.6,
        blur: 13,
        spread: 0,
      },
      {
        opacity: 0.06 * 3.5,
        x: 0,
        y: 8.4,
        blur: 23,
        spread: 0,
      },
      {
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
        opacity: 0.13 * 1,
        x: 0,
        y: 2.7,
        blur: 9,
        spread: 0,
      },
      {
        opacity: 0.09 * 1,
        x: 0,
        y: 9.4,
        blur: 24,
        spread: 0,
      },
      {
        opacity: 0.08 * 1,
        x: 0,
        y: 21.8,
        blur: 43,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.13 * 3.5,
        x: 0,
        y: 2.7,
        blur: 9,
        spread: 0,
      },
      {
        opacity: 0.09 * 3.5,
        x: 0,
        y: 9.4,
        blur: 24,
        spread: 0,
      },
      {
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
        opacity: 0.06 * 1,
        x: 0,
        y: 0,
        blur: 0.8,
        spread: 0,
      },
      {
        opacity: 0.04 * 1,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        opacity: 0.04 * 1,
        x: 0,
        y: 0,
        blur: 5,
        spread: 0,
      },
      {
        opacity: 0.03 * 1,
        x: 0,
        y: 0,
        blur: 17,
        spread: 0,
      },
    ],
    dark: [
      {
        opacity: 0.06 * 3.5,
        x: 0,
        y: 0,
        blur: 0.8,
        spread: 0,
      },
      {
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0,
        blur: 2,
        spread: 0,
      },
      {
        opacity: 0.04 * 3.5,
        x: 0,
        y: 0,
        blur: 5,
        spread: 0,
      },
      {
        opacity: 0.03 * 3.5,
        x: 0,
        y: 0,
        blur: 17,
        spread: 0,
      },
    ],
  },
};

const shadowColors = {
  colors: {
    base: SHADOW_COLOR,
  },
};

const shadowsLight: _EuiThemeShadows = {
  ...shadowColors,
  xs: {
    down: formatMultipleBoxShadow(shadowPrimitives.xs.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.xs.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  s: {
    down: formatMultipleBoxShadow(shadowPrimitives.s.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.s.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  m: {
    down: formatMultipleBoxShadow(shadowPrimitives.m.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.m.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  l: {
    down: formatMultipleBoxShadow(shadowPrimitives.l.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.l.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  xl: {
    down: formatMultipleBoxShadow(shadowPrimitives.xl.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.xl.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  hover: {
    base: {
      down: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1), {
        color: shadowColors.colors.base,
      }),
      up: formatMultipleBoxShadow(shadowPrimitives.s.light.slice(1), {
        direction: 'up',
        color: shadowColors.colors.base,
      }),
    },
    xl: {
      down: 'none',
      up: 'none',
    },
  },
  flat: {
    down: formatMultipleBoxShadow(shadowPrimitives.flat.light, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.flat.light, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
};

const shadowsDark: _EuiThemeShadows = {
  ...shadowColors,
  xs: {
    down: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.xs.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  s: {
    down: formatMultipleBoxShadow(shadowPrimitives.s.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.s.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  m: {
    down: formatMultipleBoxShadow(shadowPrimitives.m.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.m.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  l: {
    down: formatMultipleBoxShadow(shadowPrimitives.l.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.l.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  xl: {
    down: formatMultipleBoxShadow(shadowPrimitives.xl.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.xl.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
  hover: {
    base: {
      down: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1), {
        color: shadowColors.colors.base,
      }),
      up: formatMultipleBoxShadow(shadowPrimitives.s.dark.slice(1), {
        direction: 'up',
        color: shadowColors.colors.base,
      }),
    },
    xl: {
      down: 'none',
      up: 'none',
    },
  },
  flat: {
    down: formatMultipleBoxShadow(shadowPrimitives.flat.dark, {
      color: shadowColors.colors.base,
    }),
    up: formatMultipleBoxShadow(shadowPrimitives.flat.dark, {
      direction: 'up',
      color: shadowColors.colors.base,
    }),
  },
};

export const shadows: _EuiThemeShadows = {
  LIGHT: shadowsLight,
  DARK: shadowsDark,
};
