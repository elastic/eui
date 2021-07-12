/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HSV, RGB } from './color_types';

export function hsvToRgb({ h, s, v }: HSV): RGB {
  h /= 60;

  const fn = (n: number) => {
    const k = (n + h) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const r = fn(5);
  const g = fn(3);
  const b = fn(1);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
