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

import { hsvToRgb } from './hsv_to_rgb';

describe('hsvToRgb', () => {
  test('hsvToRgb accurately converts hsv to rgb', () => {
    // white
    expect(hsvToRgb({ h: 0, s: 0, v: 1 })).toMatchObject({
      r: 255,
      g: 255,
      b: 255,
    });
    // black
    expect(hsvToRgb({ h: 0, s: 0, v: 0 })).toMatchObject({
      r: 0,
      g: 0,
      b: 0,
    });
    // red
    expect(hsvToRgb({ h: 0, s: 1, v: 1 })).toMatchObject({
      r: 255,
      g: 0,
      b: 0,
    });
    // yellow
    expect(hsvToRgb({ h: 60, s: 1, v: 1 })).toMatchObject({
      r: 255,
      g: 255,
      b: 0,
    });
    // Pure green
    expect(hsvToRgb({ h: 120, s: 1, v: 1 })).toMatchObject({
      r: 0,
      g: 255,
      b: 0,
    });
    // cyan
    expect(hsvToRgb({ h: 180, s: 1, v: 1 })).toMatchObject({
      r: 0,
      g: 255,
      b: 255,
    });
    // blue
    expect(hsvToRgb({ h: 240, s: 1, v: 1 })).toMatchObject({
      r: 0,
      g: 0,
      b: 255,
    });
    // magenta
    expect(hsvToRgb({ h: 300, s: 1, v: 1 })).toMatchObject({
      r: 255,
      g: 0,
      b: 255,
    });
  });
});
