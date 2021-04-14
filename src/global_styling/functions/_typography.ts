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

import { EuiThemeFont } from '../variables/_typography';

// Typography functions
// TODO: Can we automatically get some of these values without needing them manually?

// Calculates the line-height to the closest multiple of the baseline
// EX: A proper line-height for text is 1.5 times the font-size.
//     If our base font size (euiFontSize) is 16, and our baseline is 4. To ensure the
//     text stays on the baseline, we pass a multiplier to calculate a line-height.

export function fontSizeFromScale(base: number, scale: number) {
  const pixelValue = Math.round(base * scale);
  return `${pixelValue / base}rem`;
}

export function lineHeightFromBaseline(
  base: number,
  font: EuiThemeFont,
  scale: number
) {
  const { lineHeightMultiplier, baseline } = font;

  const pixelValue =
    Math.floor(Math.round(base * scale * lineHeightMultiplier) / baseline) *
    baseline;
  return `${pixelValue / base}rem`;
}
