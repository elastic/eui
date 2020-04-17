/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
    .map(c => c / 255.0)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance <= 0.179;
}
