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
    test('unitless and subtraction', () => {
      expect(mathWithUnits('5.5', (x) => x - 1.2)).toEqual('4.3');
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

  describe('weird edge cases', () => {
    it('returns undefined as-is', () => {
      expect(mathWithUnits(undefined, (x) => x * 3)).toEqual(undefined);
    });
    it('returns strings without numbers as-is', () => {
      expect(mathWithUnits('no number', (x) => x * 3)).toEqual('no number');
    });
    it('handles strings with numbers that are actually NaNs', () => {
      expect(mathWithUnits('34.23.12', (x) => x * 3)).toEqual('NaN');
    });
    it('ignores multiple values/units, only using the first match', () => {
      expect(mathWithUnits('10px 20px', (x) => x)).toEqual('10px');
    });
    it('ignores multiple percentage signs', () => {
      expect(mathWithUnits('100%%%', (x) => x)).toEqual('100%');
    });
  });
});
