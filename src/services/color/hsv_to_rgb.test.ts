/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
