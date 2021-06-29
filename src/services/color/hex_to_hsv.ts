/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { hexToRgb } from './hex_to_rgb';
import { rgbToHsv } from './rgb_to_hsv';
import { HEX, HSV } from './color_types';

export function hexToHsv(hex: HEX): HSV {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsv({ r, g, b });
}
