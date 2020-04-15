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

import { isColorDark } from './is_color_dark';

describe('isColorDark', () => {
  const DARK_COLORS = [
    [0, 104, 55],
    [165, 0, 38],
    [0, 0, 0],
    [219, 19, 116],
    [73, 0, 146],
    [70, 26, 10],
    [146, 0, 0],
  ];

  const LIGHT_COLORS = [
    [191, 161, 128],
    [249, 133, 16],
    [0, 179, 164],
    [212, 157, 170],
    [255, 255, 255],
    [254, 182, 219],
    [230, 194, 32],
  ];

  DARK_COLORS.forEach(color => {
    it(`should return true for dark color rgb(${color.join(', ')})`, () => {
      expect(isColorDark(color[0], color[1], color[2])).toBe(true);
    });
  });

  LIGHT_COLORS.forEach(color => {
    it(`should return false for light color rgb(${color.join(', ')})`, () => {
      expect(isColorDark(color[0], color[1], color[2])).toBe(false);
    });
  });
});
