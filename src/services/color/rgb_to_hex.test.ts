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
