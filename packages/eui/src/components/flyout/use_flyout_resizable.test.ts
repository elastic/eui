/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';
import { useEuiFlyoutResizable } from './use_flyout_resizable';

describe('useEuiFlyoutResizable', () => {
  const mockProps = {
    enabled: false,
    minWidth: 200,
    maxWidth: 1000,
    onResize: jest.fn(),
    side: 'right' as const,
    size: '50vw',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return original size when disabled (resizable=false)', () => {
    const { result } = renderHook(() =>
      useEuiFlyoutResizable({
        ...mockProps,
        enabled: false,
        size: '50vw',
      })
    );

    // Should return the original responsive size, not a pixel value
    expect(result.current.size).toBe('50vw');
  });

  it('should return original size when enabled but not measured yet (resizable=true)', () => {
    const { result } = renderHook(() =>
      useEuiFlyoutResizable({
        ...mockProps,
        enabled: true,
        size: 400, // Use number size for simpler testing
      })
    );

    // When enabled but no flyout width measured yet, should return original size
    expect(result.current.size).toBe(400);
  });
});
