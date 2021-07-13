/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { rgbToHex } from './rgb_to_hex';

describe('rgbToHex ', () => {
  describe('validation', () => {
    it('should return an empty string for malformed input', () => {
      expect(rgbToHex('fred')).toEqual('');
      expect(rgbToHex('rgb(fred')).toEqual('');
      expect(rgbToHex('rgb(fred, bob, banana')).toEqual('');
      expect(rgbToHex('rgb(0, 3, 5')).toEqual('');
      expect(rgbToHex('rgba(0, 3, 5')).toEqual('');
      expect(rgbToHex('rgba(0, 3, 5, 99)')).toEqual('');
    });
  });

  describe('rgb()', () => {
    it('should handle rgb() without whitespace', () => {
      expect(rgbToHex('rgb(12,34,56)')).toEqual('#0c2238');
    });

    it('should handle rgb() with whitespace', () => {
      expect(rgbToHex('rgb ( 12 , 34 , 56 )')).toEqual('#0c2238');
    });
  });

  describe('rgba()', () => {
    it('should handle no whitespace', () => {
      expect(rgbToHex('rgba(12,34,56,0.4)')).toEqual('#0c2238');
    });

    it('should handle whitespace', () => {
      expect(rgbToHex('rgba ( 12 , 34 , 56 , 0.4 )')).toEqual('#0c2238');
    });

    it('should handle integer maximum alpha', () => {
      expect(rgbToHex('rgba(12,34,56,1)')).toEqual('#0c2238');
    });

    it('should handle decimal maximum alpha', () => {
      expect(rgbToHex('rgba(12,34,56,1.00000)')).toEqual('#0c2238');
    });

    it('should handle integer zero alpha', () => {
      expect(rgbToHex('rgba(12,34,56,0)')).toEqual('#0c2238');
    });

    it('should handle decimal zero alpha', () => {
      expect(rgbToHex('rgba(12,34,56,0.0000)')).toEqual('#0c2238');
    });
  });
});
