/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { HSV, RGB } from './color_types';
import { hsv, valid } from 'chroma-js';

export function hsvToRgb({ h, s, v }: HSV): RGB {
  //Create a new chroma-js color from HSV provided
  const color = hsv(h, s, v);

  //If color valid convert HSV to RGB
  if (valid(color)) {
    const [r, g, b] = color.rgb();
    return { r, g, b };
  }

  // fallback to prevent errors
  return { r: 0, g: 0, b: 0 };
}
