/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  useEuiBreakpoint,
  _isValidBreakpointArray,
  _validBreakpointSizes,
} from './_responsive';

const validBreakpointKeys = [
  undefined,
  '0',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'infinity',
];

describe('_isValidBreakpointArray determines if the euiBreakpoint parameter array is invalid', () => {
  it('should return false if the array contains two elements and they are 0 and infinity', () => {
    expect(_isValidBreakpointArray(['0', 'infinity'])).toBeFalsy();
  });

  it('should return false if the array contains two elements and they both undefined', () => {
    expect(_isValidBreakpointArray([undefined, undefined])).toBeFalsy();
  });

  it('should return false if the array contains one element and it is 0', () => {
    expect(_isValidBreakpointArray(['0'])).toBeFalsy();
  });

  it('should return false if the array contains one element and it is undefined', () => {
    expect(_isValidBreakpointArray([undefined])).toBeFalsy();
  });

  it('should return false if the array contains one element and it is infinity', () => {
    expect(_isValidBreakpointArray(['infinity'])).toBeFalsy();
  });

  it('should return false if the array contains two elements and they are equal', () => {
    expect(_isValidBreakpointArray(['m', 'm'])).toBeFalsy();
  });

  it('should return false if the array contains two elements and the first element is larger than the second', () => {
    expect(_isValidBreakpointArray(['xl', 's'])).toBeFalsy();
  });
});

describe('test each possible two breakpoint combination', () => {
  const possibleTwoElementBreakpointCombinations = [];
  for (let i = 0; i < validBreakpointKeys.length; i++) {
    for (let inner = 1; inner < validBreakpointKeys.length; inner++) {
      // If the breakpoint is undefined, don't add quotes to make it a string
      possibleTwoElementBreakpointCombinations.push([
        validBreakpointKeys[i] === undefined
          ? undefined
          : `${validBreakpointKeys[i]}`,
        validBreakpointKeys[inner] === undefined
          ? undefined
          : `${validBreakpointKeys[inner]}`,
      ]);
    }
  }

  test.each(possibleTwoElementBreakpointCombinations)(
    'useEuiBreapoint returns a media query for two element breakpoint combinations (%s and %s)',
    (sizeA, sizeB) => {
      expect(
        testCustomHook(() =>
          useEuiBreakpoint([
            sizeA as _validBreakpointSizes,
            sizeB as _validBreakpointSizes,
          ])
        ).return
      ).toMatchSnapshot();
    }
  );
});

describe('test each possible single breakpoint combination', () => {
  validBreakpointKeys.forEach((size) => {
    it(`${size}`, () => {
      expect(
        testCustomHook(() => useEuiBreakpoint([size as _validBreakpointSizes]))
          .return
      ).toMatchSnapshot();
    });
  });
});
