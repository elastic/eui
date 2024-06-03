/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { mathWithUnits } from './math';

describe('mathWithUnits', () => {
  describe('extracts numerical values from CSS strings with units, performs math callbacks, and returns units as is', () => {
    test('px and multiplication', () => {
      expect(mathWithUnits('10px', (x) => x * 10)).toEqual('100px');
    });
    test('em and division', () => {
      expect(mathWithUnits('40%', (x) => x / 2)).toEqual('20%');
    });
    test('rem and addition', () => {
      expect(mathWithUnits('1rem', (x) => x + 2)).toEqual('3rem');
    });
    test('unitless and negative values', () => {
      expect(mathWithUnits('-5.5', (x) => x - 1.2)).toEqual('-6.7');
    });
    test('allows passing an optional unit if none is passed', () => {
      expect(mathWithUnits('0', (x) => x, 'vh')).toEqual('0vh');
    });
  });

  describe('handles numeric input types', () => {
    test('unitless', () => {
      expect(mathWithUnits(6, (x) => Math.pow(x, 2))).toEqual('36');
    });
    test('allows passing an optional unit', () => {
      expect(mathWithUnits(3.5, (x) => x % 1.5, 'px')).toEqual('0.5px');
    });
  });

  describe('multiple inputs', () => {
    it('accepts an array of inputs, parses each input, and returns them as a separate arg to the callback', () => {
      expect(
        mathWithUnits(['3px', '4px', '5px'], (x, y, z) => x + y + z)
      ).toEqual('12px');
    });
    it('allows mixing strings and numbers', () => {
      expect(mathWithUnits(['6px', 3], (x, y) => x / y)).toEqual('2px');
    });
    it('throws on multiple different unit types', () => {
      expect(() => mathWithUnits(['1px', '1em'], (x, y) => x + y)).toThrow(
        'Multiple units found'
      );
    });
    it('allows different unit types if an override unit is passed', () => {
      expect(mathWithUnits(['50%', '5rem'], (x, y) => x / y, 'px')).toEqual(
        '10px'
      );
    });
  });

  describe('weird edge cases', () => {
    it('throws on undefined', () => {
      expect(() => mathWithUnits(undefined, (x) => x * 3)).toThrow(
        'Invalid value type'
      );
    });
    it('throws on strings that do not contain numbers', () => {
      expect(() => mathWithUnits('no number', (x) => x * 3)).toThrow(
        'No valid numeric value found'
      );
    });
    it('throws on strings with numbers that are actually NaNs', () => {
      expect(() => mathWithUnits('34.23.12', (x) => x * 3)).toThrow(
        'No valid numeric value found'
      );
    });
    it('ignores multiple values/units, only using the first match', () => {
      expect(mathWithUnits('10px 20px', (x) => x)).toEqual('10px');
    });
    it('ignores multiple percentage signs', () => {
      expect(mathWithUnits('100%%%', (x) => x)).toEqual('100%');
    });
  });
});
