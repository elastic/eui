/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { hexToRgb } from './hex_to_rgb';
import { rgbToHsv } from './rgb_to_hsv';
import { HEX, HSV } from './color_types';

export function hexToHsv(hex: HEX): HSV {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsv({ r, g, b });
}
