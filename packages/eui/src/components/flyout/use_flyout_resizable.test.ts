/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, renderHookAct as act } from '../../test/rtl/render_hook';
import { useEuiFlyoutResizable } from './use_flyout_resizable';

describe('useEuiFlyoutResizable', () => {
  const mockProps = {
    enabled: false,
    minWidth: 200,
    maxWidth: 1000,
    onResize: jest.fn(),
    side: 'right' as const,
    size: '50vw',
    referenceWidth: 1200,
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
    // 600px / 1200px referenceWidth = 50%
    await waitFor(() => {
      expect(result.current.size).toBe('50%');
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

  it('should return percentage size when enabled with a numeric size', async () => {
    const { result } = renderHook(() =>
      useEuiFlyoutResizable({
        ...mockProps,
        enabled: true,
        size: 400,
      })
    );

    // The hook converts numeric sizes to percentages in a useEffect,
    // so wait for the state update to apply.
    // 400 / 1200 (referenceWidth) * 100 = 33.33...%
    await waitFor(() => {
      expect(result.current.size).toBe(`${(400 / 1200) * 100}%`);
    });
  });

  describe('resize clamping', () => {
    it('should clamp solo flyout at 90% of referenceWidth', async () => {
      // referenceWidth = 1200, 90% = 1080
      const { result } = renderHook(() =>
        useEuiFlyoutResizable({
          ...mockProps,
          enabled: true,
          minWidth: 0,
          maxWidth: undefined,
          referenceWidth: 1200,
          size: '50vw',
        })
      );

      // Set a flyout ref that reports a very large offsetWidth (beyond 90%)
      const mockElement = createMockElement(1100);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      // Should clamp to 90% of 1200 = 1080px, output as 1080/1200*100 = 90%
      await waitFor(() => {
        expect(result.current.size).toBe('90%');
      });
    });

    it('should clamp flyout with sibling at 90% of referenceWidth minus siblingWidth', async () => {
      // referenceWidth = 1200, siblingWidth = 300, max = 1200*0.9 - 300 = 780
      const { result } = renderHook(() =>
        useEuiFlyoutResizable({
          ...mockProps,
          enabled: true,
          minWidth: 0,
          maxWidth: undefined,
          referenceWidth: 1200,
          siblingFlyoutWidth: 300,
          size: '50vw',
        })
      );

      // Set a flyout ref that reports width beyond the limit
      const mockElement = createMockElement(900);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      // Should clamp to 780px, output as 780/1200*100 = 65%
      await waitFor(() => {
        expect(result.current.size).toBe('65%');
      });
    });

    it('should output size as percentage of referenceWidth', async () => {
      const { result } = renderHook(() =>
        useEuiFlyoutResizable({
          ...mockProps,
          enabled: true,
          minWidth: 0,
          maxWidth: undefined,
          referenceWidth: 1000,
          size: '50vw',
        })
      );

      const mockElement = createMockElement(400);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      // 400 / 1000 * 100 = 40%
      await waitFor(() => {
        expect(result.current.size).toBe('40%');
      });
    });

    it('should use window.innerWidth when referenceWidth is not provided', async () => {
      // window.innerWidth is mocked to 1200 in beforeEach
      const { result } = renderHook(() =>
        useEuiFlyoutResizable({
          ...mockProps,
          enabled: true,
          minWidth: 0,
          maxWidth: undefined,
          referenceWidth: undefined,
          size: '50vw',
        })
      );

      const mockElement = createMockElement(600);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      // 600 / 1200 (window.innerWidth) * 100 = 50%
      await waitFor(() => {
        expect(result.current.size).toBe('50%');
      });
    });
  });

  describe('referenceWidth changes', () => {
    // The emitted size is a percentage of the reference width, which
    // `flyout.component.tsx` converts back with `containerRect.width * (pct / 100)`
    const toPixels = (size: string | number, referenceWidth: number) =>
      (parseFloat(size as string) / 100) * referenceWidth;

    it('preserves the pixel width for a numeric `size`', async () => {
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 400,
          },
        }
      );

      // 400 / 1200 * 100 = 33.33...%
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(400);
      });

      // The container shrinks. The flyout still fits, so it should stay at 400px
      // rather than scaling down to 400 * (1000 / 1200) = 333.33px
      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 1000,
        size: 400,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('40%');
      });
      expect(toPixels(result.current.size, 1000)).toBeCloseTo(400);

      // ...and the same on grow
      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 1600,
        size: 400,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('25%');
      });
      expect(toPixels(result.current.size, 1600)).toBeCloseTo(400);
    });

    it('re-clamps a numeric `size` when it no longer fits', async () => {
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 800,
          },
        }
      );

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });

      // 800px no longer fits within 90% of 600px, so it clamps to 540px
      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 600,
        size: 800,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('90%');
      });
      expect(toPixels(result.current.size, 600)).toBeCloseTo(540);
    });

    it('restores a numeric `size` when the referenceWidth grows back', async () => {
      // Clamping must not be destructive: shrinking below the requested width
      // and growing back again has to return the flyout to `size`
      const props = {
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        size: 800,
      };
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        { initialProps: { ...props, referenceWidth: 1200 } }
      );

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });

      // Shrink: 800 no longer fits within 90% of 600, so it clamps to 540
      rerender({ ...props, referenceWidth: 600 });
      await waitFor(() => {
        expect(toPixels(result.current.size, 600)).toBeCloseTo(540);
      });

      // Grow back: there is room for 800 again, so it must return to 800
      rerender({ ...props, referenceWidth: 1200 });
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });
    });

    it('restores the user-dragged width, not `size`, when the referenceWidth grows back', async () => {
      const props = {
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        size: 800,
      };
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        { initialProps: { ...props, referenceWidth: 1200 } }
      );

      const mockElement = createMockElement(800);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });

      // User drags to 700px
      act(() => {
        result.current.onMouseDown({ clientX: 800 } as ReactMouseEvent);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 900 }));
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mouseup'));
      });
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(700);
      });

      // Shrink so even 700 does not fit, then grow back
      rerender({ ...props, referenceWidth: 600 });
      await waitFor(() => {
        expect(toPixels(result.current.size, 600)).toBeCloseTo(540);
      });

      rerender({ ...props, referenceWidth: 1200 });

      // Back to the width the user chose, *not* the coded `size` of 800
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(700);
      });
    });

    it('re-clamps a numeric `size` to `maxWidth`', async () => {
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: 500,
            referenceWidth: 1200,
            size: 800,
          },
        }
      );

      // Already clamped to maxWidth on mount: 500 / 1200 * 100
      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(500);
      });

      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: 500,
        referenceWidth: 1000,
        size: 800,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('50%');
      });
      expect(toPixels(result.current.size, 1000)).toBeCloseTo(500);
    });

    it('preserves the percentage for a named `size`', async () => {
      // Named sizes are defined as percentages in `flyout.styles.ts`, so they
      // should keep scaling with the reference width
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 'm',
          },
        }
      );

      const mockElement = createMockElement(600);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      // 600 / 1200 * 100 = 50%
      await waitFor(() => {
        expect(result.current.size).toBe('50%');
      });

      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 800,
        size: 'm',
      });

      // Still 50%, i.e. 400px of the new 800px reference width
      await waitFor(() => {
        expect(result.current.size).toBe('50%');
      });
      expect(toPixels(result.current.size, 800)).toBeCloseTo(400);
    });

    it('does not call `onResize` when only the referenceWidth changes', async () => {
      const onResize = jest.fn();
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 800,
            onResize,
          },
        }
      );

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });

      // A user resize, which should call `onResize` and leave the hook in a
      // state where subsequent width changes would otherwise call it again
      act(() => {
        result.current.onKeyDown({
          key: 'ArrowRight',
          preventDefault: () => {},
        } as ReactKeyboardEvent);
      });
      await waitFor(() => {
        expect(onResize).toHaveBeenCalledWith(790);
      });
      onResize.mockClear();

      // A container resize re-clamps 790px down to 540px, but that is not a
      // user resize and must not be reported back to the consumer
      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 600,
        size: 800,
        onResize,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('90%');
      });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('does not call `onResize` when the referenceWidth and the `onResize` identity change together', async () => {
      // A parent rerender can hand down a new inline `onResize` in the same
      // render that a container resize lands in. The callback effect then
      // re-runs with the render's pre-update `callOnResize`, so resetting that
      // state in the constraint effect is not on its own enough to suppress it.
      const onResize = jest.fn();
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 800,
            onResize: (width: number) => onResize(width),
          },
        }
      );

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(800);
      });

      act(() => {
        result.current.onKeyDown({
          key: 'ArrowRight',
          preventDefault: () => {},
        } as ReactKeyboardEvent);
      });
      await waitFor(() => {
        expect(onResize).toHaveBeenCalledWith(790);
      });
      onResize.mockClear();

      // Note the fresh `onResize` identity alongside the new referenceWidth
      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 600,
        size: 800,
        onResize: (width: number) => onResize(width),
      });

      await waitFor(() => {
        expect(result.current.size).toBe('90%');
      });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('still calls `onResize` for a user resize that follows a container resize', async () => {
      // Guards against the container-resize suppression sticking around and
      // swallowing the next genuine user resize
      const onResize = jest.fn();
      const { result, rerender } = renderHook(
        (props) => useEuiFlyoutResizable(props),
        {
          initialProps: {
            ...mockProps,
            enabled: true,
            minWidth: 0,
            maxWidth: undefined,
            referenceWidth: 1200,
            size: 400,
            onResize,
          },
        }
      );

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(400);
      });

      rerender({
        ...mockProps,
        enabled: true,
        minWidth: 0,
        maxWidth: undefined,
        referenceWidth: 1000,
        size: 400,
        onResize,
      });

      await waitFor(() => {
        expect(result.current.size).toBe('40%');
      });
      expect(onResize).not.toHaveBeenCalled();

      // Now a real user resize — this one must be reported
      act(() => {
        result.current.onKeyDown({
          key: 'ArrowRight',
          preventDefault: () => {},
        } as ReactKeyboardEvent);
      });

      await waitFor(() => {
        expect(onResize).toHaveBeenCalledTimes(1);
      });
      expect(onResize).toHaveBeenCalledWith(390);
    });

    it('still calls `onResize` once with the final width after a drag ends', async () => {
      const onResize = jest.fn();
      const { result } = renderHook(() =>
        useEuiFlyoutResizable({
          ...mockProps,
          enabled: true,
          minWidth: 0,
          maxWidth: undefined,
          referenceWidth: 1200,
          size: 400,
          onResize,
        })
      );

      const mockElement = createMockElement(400);
      act(() => {
        result.current.setFlyoutRef(mockElement);
      });

      await waitFor(() => {
        expect(toPixels(result.current.size, 1200)).toBeCloseTo(400);
      });
      expect(onResize).not.toHaveBeenCalled();

      act(() => {
        result.current.onMouseDown({ clientX: 400 } as ReactMouseEvent);
      });
      act(() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }));
      });

      // Dragging alone should not call `onResize`
      expect(onResize).not.toHaveBeenCalled();

      act(() => {
        window.dispatchEvent(new MouseEvent('mouseup'));
      });

      // Right-side flyout: dragging 100px left grows it to 500px
      await waitFor(() => {
        expect(onResize).toHaveBeenCalledTimes(1);
      });
      expect(onResize).toHaveBeenCalledWith(500);
    });
  });
});
