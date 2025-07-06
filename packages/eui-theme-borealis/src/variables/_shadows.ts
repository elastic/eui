/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import {
  computed,
  type _EuiThemeShadows,
  type _EuiThemeShadowLayer,
} from '@elastic/eui-theme-common';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';

export const shadows: _EuiThemeShadows = {
  xs: {
    values: {
      LIGHT: [
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
      DARK: [
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
      DARK: [
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
      DARK: [
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
      DARK: [
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
      DARK: [
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
      LIGHT: [
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
      DARK: [
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
    down: computed(
      ([values]) => formatMultipleBoxShadow(values),
      ['shadows.xlHover.values']
    ),
    up: computed(
      ([values]) => formatMultipleBoxShadow(values, true),
      ['shadows.xlHover.values']
    ),
  },
};

function formatMultipleBoxShadow(
  layers: _EuiThemeShadowLayer[],
  up: boolean = false
) {
  const [a, b, c] = layers;
  /* prettier-ignore */
  const shadowLayers = [
    `${a.x}px ${a.y}px ${a.blur}px ${a.spread}px ${formatColor(a.color, a.opacity)}`,
    `${b.x}px ${up ? -b.y : b.y}px ${b.blur}px ${b.spread}px ${formatColor(b.color, b.opacity)}`,
    `${c.x}px ${up ? -c.y : c.y}px ${c.blur}px ${c.spread}px ${formatColor(c.color, c.opacity)}`
  ];

  return shadowLayers.join(', ');
}

function formatColor(value: string, opacity: number) {
  return chroma(value).alpha(opacity).css('hsl');
}
