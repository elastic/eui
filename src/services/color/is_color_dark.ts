/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * This function calculates if the specified color is "dark", which usually means
 * you need light text if you use it as a background color to fulfill WCAG contrast
 * requirement.
 * The color must be specified via its red, green and blue value in the range of
 * 0 to 255.
 * The formula is based on this Stackoverflow answer: https://stackoverflow.com/a/3943023
 * which itself is based upon the WCAG recommendation for color contrast.
 *
 * @param {number} red The red component in the range 0 to 255
 * @param {number} green The green component in the range 0 to 255
 * @param {number} blue The blue component in the range 0 to 255
 * @returns {boolean} True if the color is dark, false otherwise.
 */
export function isColorDark(red: number, green: number, blue: number): boolean {
  const [r, g, b] = [red, green, blue]
    .map((c) => c / 255.0)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance <= 0.179;
}
