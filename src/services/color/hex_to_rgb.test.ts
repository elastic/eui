/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { hexToRgb } from './hex_to_rgb';

describe('hexToRgb ', () => {
  it('should handle 3 digit codes without a hash prefix', () => {
    expect(hexToRgb('0a8')).toEqual([0, 170, 136]);
  });

  it('should handle 3 digit codes with a hash prefix', () => {
    expect(hexToRgb('#0a8')).toEqual([0, 170, 136]);
  });

  it('should handle 6 digit codes without a hash prefix', () => {
    expect(hexToRgb('00aa88')).toEqual([0, 170, 136]);
  });

  it('should handle 6 digit codes with a hash prefix', () => {
    expect(hexToRgb('#00aa88')).toEqual([0, 170, 136]);
  });
});
