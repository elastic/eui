/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiProviderNestedCheck,
  useIsNestedEuiProvider,
} from './nested_context';
import { renderHook } from '../../../test/rtl/render_hook';

describe('useIsNestedEuiProvider', () => {
  it('is false if an EuiProviderNestedCheck wrapper has not yet been instantiated', () => {
    const { result } = renderHook(useIsNestedEuiProvider);

    expect(result.current).toEqual(false);
  });

  it('is true after an EuiProviderNestedCheck wrapper has been instantiated', () => {
    const { result } = renderHook(useIsNestedEuiProvider, {
      wrapper: EuiProviderNestedCheck,
    });

    expect(result.current).toEqual(true);
  });
});
