/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react-hooks';

import { useEuiTheme } from './hooks';

describe('useEuiTheme', () => {
  it('consecutive calls return a stable object', () => {
    const { result, rerender } = renderHook(useEuiTheme);
    expect(result.all.length).toEqual(1);
    rerender({});
    expect(result.all.length).toEqual(2);

    expect(result.all[0]).toBe(result.all[1]);
  });
});
