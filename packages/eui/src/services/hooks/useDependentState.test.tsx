/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl';

import { useDependentState } from './useDependentState';

describe('useDependentState', () => {
  it('sets the base state', () => {
    // this is a huge abuse of closure scope
    // but allows for jest's built in mock expecting
    let sourceValue = 2;
    const doubler = jest.fn(() => {
      return sourceValue * 2;
    });

    const { result, rerender } = renderHook(() =>
      useDependentState(doubler, [sourceValue])
    );
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith();
    expect(result.current[0]).toEqual(4); // 2 * 2

    doubler.mockClear();

    // update the source value, force a re-render, and run checks
    sourceValue = 4;
    rerender();
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith(4); // check previous state value
    expect(result.current[0]).toEqual(8); // new value should be 4 * 2
  });
});
