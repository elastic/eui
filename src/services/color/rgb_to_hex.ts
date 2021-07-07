/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

function asHex(value: string): string {
  const hex = parseInt(value, 10).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(rgb: string): string {
  const withoutWhitespace = rgb.replace(/\s+/g, '');
  const rgbMatch = withoutWhitespace.match(
    /^rgba?\((\d+),(\d+),(\d+)(?:,(?:1(?:\.0*)?|0(?:\.\d+)?))?\)$/i
  );
  if (!rgbMatch) {
    return '';
  }

  const [, r, g, b] = rgbMatch;

  return `#${asHex(r)}${asHex(g)}${asHex(b)}`;
}
