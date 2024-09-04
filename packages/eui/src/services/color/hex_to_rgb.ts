/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Convert hexadecimal color into an array of RGB integer values
// Modified from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

import type { rgbDef } from './color_types';
import { hex, valid } from 'chroma-js';

export function hexToRgb(hexCode: string): rgbDef {
  //Create a new chroma-js color from hexCode provided
  const color = hex(hexCode);

  //If color valid convert from HEX to RGB
  if (valid(color)) {
    const rgb = color.rgb();
    return rgb;
  }

  // fallback to prevent errors
  return [0, 0, 0];
}
