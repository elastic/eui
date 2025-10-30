/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook, act, waitFor } from '@testing-library/react';
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

  // Mock DOM element with offsetWidth
  const createMockElement = (offsetWidth = 600) =>
    ({ offsetWidth, style: { direction: 'ltr' } } as HTMLElement);

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock window.innerWidth for getFlyoutMinMaxWidth calculations
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    // Mock getComputedStyle
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      direction: 'ltr',
    } as CSSStyleDeclaration);
  });

  it('should not measure flyout width when disabled', () => {
    const { result } = renderHook(() =>
      useEuiFlyoutResizable({
        ...mockProps,
        enabled: false,
        size: '50vw',
      })
    );

    const mockElement = createMockElement(600);

    // Set the flyout ref (this would normally trigger measurement)
    act(() => {
      result.current.setFlyoutRef(mockElement);
    });

    // Should return the original responsive size, not a measured pixel value
    expect(result.current.size).toBe('50vw');
  });

  it('should return original size instead of measured width when disabled', async () => {
    const { result, rerender } = renderHook(
      (props) => useEuiFlyoutResizable(props),
      {
        initialProps: {
          ...mockProps,
          enabled: true,
          size: '50vw',
        },
      }
    );

    const mockElement = createMockElement(600);

    // Set the flyout ref while enabled (this should measure the width)
    act(() => {
      result.current.setFlyoutRef(mockElement);
    });

    // Wait for the useEffect to run and measure the width
    await waitFor(() => {
      expect(result.current.size).toBe(600);
    });

    // Now disable resizing with a different size
    rerender({
      ...mockProps,
      enabled: false,
      size: '400px',
    });

    // Should return original size, not the previously measured width
    expect(result.current.size).toBe('400px');
  });

  it('should not update flyout width when size changes while disabled', () => {
    const { result, rerender } = renderHook(
      (props) => useEuiFlyoutResizable(props),
      {
        initialProps: {
          ...mockProps,
          enabled: false,
          size: 300,
        },
      }
    );

    const mockElement = createMockElement(600);
    act(() => {
      result.current.setFlyoutRef(mockElement);
    });

    // Should return original size
    expect(result.current.size).toBe(300);

    // Change the size while disabled
    rerender({
      ...mockProps,
      enabled: false,
      size: 500,
    });

    // Should return the new original size, not trigger any measurement
    expect(result.current.size).toBe(500);
  });

  it('should return original size when enabled but not measured yet', () => {
    const { result } = renderHook(() =>
      useEuiFlyoutResizable({
        ...mockProps,
        enabled: true,
        size: 400,
      })
    );

    // When enabled but no flyout width measured yet, should return original size
    expect(result.current.size).toBe(400);
  });
});
