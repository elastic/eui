/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { hsvToRgb } from './hsv_to_rgb';
import { rgbToHex } from './rgb_to_hex';
import { HEX, HSV } from './color_types';

export function hsvToHex({ h, s, v }: HSV): HEX {
  const { r, g, b } = hsvToRgb({ h, s, v });
  return rgbToHex(`rgb(${r}, ${g}, ${b})`);
}
