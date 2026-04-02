/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  resolveWidthPropsAsStyle,
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
  WARNING_MESSAGE_NOT_RECOMMENDED_UNIT,
} from './utils';

describe('resolveWidthPropsAsStyle', () => {
  let originalConsoleWarn: typeof console.warn;

  beforeAll(() => {
    originalConsoleWarn = console.warn;
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  it('returns an empty style object when no style or width props are provided', () => {
    expect(resolveWidthPropsAsStyle(undefined, {})).toEqual({});
    expect(resolveWidthPropsAsStyle({}, {})).toEqual({});
  });

  it('warns when a not recommended unit is used', () => {
    expect(resolveWidthPropsAsStyle({}, { width: '10%' }));
    expect(console.warn).toHaveBeenCalledWith(
      WARNING_MESSAGE_NOT_RECOMMENDED_UNIT
    );
  });

  const testPropAndStyle = (name: string, warningMessage: string) => () => {
    it(`supports setting ${name} via the prop`, () => {
      expect(resolveWidthPropsAsStyle({}, { [name]: '123px' })).toEqual({
        [name]: '123px',
      });
    });

    it(`supports setting ${name} via the style`, () => {
      expect(resolveWidthPropsAsStyle({ [name]: '123px' }, {})).toEqual({
        [name]: '123px',
      });
    });

    it(`prefers \`${name}\` prop over \`style.${name}\``, () => {
      expect(
        resolveWidthPropsAsStyle({ [name]: '123px' }, { [name]: '456px' })
      ).toEqual({ [name]: '456px' });
    });

    it('calls console.warn() when set using both the prop and the style', () => {
      resolveWidthPropsAsStyle({ [name]: '123px' }, { [name]: '456px' });
      expect(console.warn).toHaveBeenCalledWith(warningMessage);
    });
  };

  describe('width', testPropAndStyle('width', WARNING_MESSAGE_WIDTH));

  describe('minWidth', testPropAndStyle('minWidth', WARNING_MESSAGE_MIN_WIDTH));

  describe('maxWidth', testPropAndStyle('maxWidth', WARNING_MESSAGE_MAX_WIDTH));
});
