/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import {
  _EuiThemeShadows,
  _EuiThemeShadowLayer,
} from '../../../../global_styling/variables';
import { computed } from '../../../../services/theme/utils';

// in Amsterdam this is `color.shadow`, which computes to `ink` (#000)
const SHADOW_COLOR = '#000000';

export const shadows: _EuiThemeShadows = {
  xs: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.xs.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.xs.values']
    ),
  },
  s: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.s.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.s.values']
    ),
  },
  m: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.m.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.m.values']
    ),
  },
  l: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.l.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.l.values']
    ),
  },
  xl: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.xl.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.xl.values']
    ),
  },
  xlHover: {
    values: {
      LIGHT: [],
      DARK: [],
    },
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.xl.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.xl.values']
    ),
  },
  flat: {
    values: {
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.flat.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.flat.values']
    ),
  },
};

/**
 * Format an array of shadow "objects" into a string for CSS.
 * The "up" direction is built by making the y offset from layers
 * two and any subsequent layers, negative.
 *
 * @param layers
 * @param up - Modifies some values in order to get the "up" direction
 * @returns - A value for the CSS `box-shadow` property
 */
function formatMultipleBoxShadow(
  layers: _EuiThemeShadowLayer[],
  up: boolean = false
) {
  /* prettier-ignore */
  const shadowLayers = layers.map((layer, i) => {
    const y = (up && i > 0) ? -layer.y : layer.y;
    return `${layer.x}px ${y}px ${layer.blur}px ${layer.spread}px ${formatColor(layer.color, layer.opacity)}`;
  });

  return shadowLayers.join(', ');
}

function formatColor(value: string, opacity: number) {
  return chroma(value).alpha(opacity).css('hsl');
}
