/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react-hooks';

import { setEuiDevProviderWarning } from './provider';
import { useEuiTheme } from './hooks';

describe('useEuiTheme', () => {
  it('returns a context with theme variables, color mode, and modifications', () => {
    const { result } = renderHook(useEuiTheme);
    expect(result.current).toEqual({
      euiTheme: expect.any(Object),
      colorMode: 'LIGHT',
      modifications: {},
    });
  });

  it('logs, warns, or errors if a provider warning level has been set', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    setEuiDevProviderWarning('warn');

    renderHook(useEuiTheme);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('`EuiProvider` is missing')
    );

    setEuiDevProviderWarning(undefined);
    warnSpy.mockRestore();
  });

  it('consecutive calls return a stable object', () => {
    const { result, rerender } = renderHook(useEuiTheme);
    expect(result.all.length).toEqual(1);
    rerender({});
    expect(result.all.length).toEqual(2);

    expect(result.all[0]).toBe(result.all[1]);
  });
});
