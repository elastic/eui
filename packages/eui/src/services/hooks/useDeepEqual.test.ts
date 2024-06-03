/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl';
import { useDeepEqual } from './useDeepEqual';

describe('useDeepEqual', () => {
  it('returns the same referential object if no values change', () => {
    const { result, rerender } = renderHook(useDeepEqual, {
      initialProps: { hello: 'world' },
    });
    const first = result.current;

    rerender({ hello: 'world' });
    const second = result.current;

    expect(first).toBe(second);
  });

  it('returns a new referential object if values change', () => {
    const { result, rerender } = renderHook(useDeepEqual, {
      initialProps: { hello: 'world' },
    });
    const first = result.current;

    rerender({ hello: 'universe' });
    const second = result.current;

    expect(first).not.toBe(second);
  });

  it('returns a new referential object if values are added', () => {
    const { result, rerender } = renderHook(useDeepEqual, {
      initialProps: { hello: 'world' } as any,
    });
    const first = result.current;

    rerender({ hello: 'world', foo: 'bar' });
    const second = result.current;

    expect(first).not.toBe(second);
  });

  it('also works for arrays', () => {
    const { result, rerender } = renderHook(useDeepEqual, {
      initialProps: ['bar', 'baz'],
    });
    const first = result.current;

    rerender(['bar', 'baz']);
    const second = result.current;

    expect(first).toBe(second);

    rerender(['foo', 'bar', 'baz']);
    const third = result.current;

    expect(second).not.toBe(third);
  });
});
