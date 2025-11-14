/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../../test/rtl';
import { useFlyoutId } from './hooks';

// Mock the warnOnce service but keep other actual exports (e.g., useGeneratedHtmlId)
jest.mock('../../../services', () => {
  const actual = jest.requireActual('../../../services');
  return {
    ...actual,
    warnOnce: jest.fn(),
  };
});

describe('useFlyoutId', () => {
  it('should return a stable ID when no id is provided', () => {
    const { result, rerender } = renderHook(() => useFlyoutId());

    const firstId = result.current;
    rerender();
    const secondId = result.current;

    expect(firstId).toBe(secondId);
    expect(typeof firstId).toBe('string');
    expect(firstId).toMatch(/^flyout-_generated-id-\d+$/);
  });

  it('should return the provided id when given', () => {
    const customId = 'my-custom-flyout-id';
    const { result } = renderHook(() => useFlyoutId(customId));

    expect(result.current).toBe(customId);
  });

  it('should return a stable ID when id is provided', () => {
    const customId = 'my-custom-flyout-id';
    const { result, rerender } = renderHook(() => useFlyoutId(customId));

    const firstId = result.current;
    rerender();
    const secondId = result.current;

    expect(firstId).toBe(secondId);
    expect(firstId).toBe(customId);
  });
});
