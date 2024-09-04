/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { rgb, valid } from 'chroma-js';

export function rgbToHex(rgbString: string): string {
  const withoutWhitespace = rgbString.replace(/\s+/g, '');
  const rgbMatch = withoutWhitespace.match(
    /^rgba?\((\d+),(\d+),(\d+)(?:,(?:1(?:\.0*)?|0(?:\.\d+)?))?\)$/i
  );
  if (!rgbMatch) {
    return '';
  }

  //Automatically converts rgb constants to number as chroma don't take strings
  const [, r, g, b] = rgbMatch.map(Number);

  //Create a new chroma-js color from RGB provided
  const color = rgb(r, g, b);

  //If color valid convert RGB to HEX
  if (valid(color)) {
    return color.hex();
  }

  // fallback to prevent errors
  return '';
}
