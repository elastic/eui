/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { hsvToRgb } from './hsv_to_rgb';
import { rgbToHex } from './rgb_to_hex';
import { HEX, HSV } from './color_types';

export function hsvToHex({ h, s, v }: HSV): HEX {
  const { r, g, b } = hsvToRgb({ h, s, v });
  return rgbToHex(`rgb(${r}, ${g}, ${b})`);
}
