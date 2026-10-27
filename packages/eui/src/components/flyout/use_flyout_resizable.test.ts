/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { KeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
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

  describe('constraint changes', () => {
    const props = {
      ...mockProps,
      enabled: true,
      minWidth: 0,
      maxWidth: undefined,
      referenceWidth: 1200,
      size: 800,
    };

    it('keeps the pixel width of a numeric `size` and restores it after a clamp', async () => {
      const onResize = jest.fn();
      const { result, rerender } = renderHook(useEuiFlyoutResizable, {
        initialProps: { ...props, onResize },
      });
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });

      // 800 / 1600 * 100 = 50%, not scaled up to 1067px
      rerender({ ...props, onResize, referenceWidth: 1600 });
      await waitFor(() => expect(result.current.size).toBe('50%'));

      // Clamped to 90% of 600 = 540px
      rerender({ ...props, onResize, referenceWidth: 600 });
      await waitFor(() => expect(result.current.size).toBe('90%'));

      rerender({ ...props, onResize, referenceWidth: 1200 });
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });

      expect(onResize).not.toHaveBeenCalled();
    });

    it('re-clamps on window resize when `referenceWidth` is not provided', async () => {
      const { result } = renderHook(useEuiFlyoutResizable, {
        initialProps: { ...props, referenceWidth: undefined },
      });
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });

      // Clamped to 90% of 800 = 720px
      act(() => {
        window.innerWidth = 800;
        window.dispatchEvent(new Event('resize'));
      });
      await waitFor(() => expect(result.current.size).toBe('90%'));

      // 800 / 1600 * 100 = 50%
      act(() => {
        window.innerWidth = 1600;
        window.dispatchEvent(new Event('resize'));
      });
      await waitFor(() => expect(result.current.size).toBe('50%'));
    });

    it('restores the user-resized width after a clamp and only reports the user resize', async () => {
      const onResize = jest.fn();
      const { result, rerender } = renderHook(useEuiFlyoutResizable, {
        initialProps: { ...props, onResize },
      });
      act(() => result.current.setFlyoutRef(createMockElement(800)));
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });

      // Right-side flyout: dragging 100px left grows it to 900px
      act(() => {
        result.current.onMouseDown({ clientX: 400 } as ReactMouseEvent);
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }));
        window.dispatchEvent(new MouseEvent('mouseup'));
      });
      expect(onResize).toHaveBeenCalledTimes(1);
      expect(onResize).toHaveBeenCalledWith(900);

      rerender({ ...props, onResize, referenceWidth: 600 });
      await waitFor(() => expect(result.current.size).toBe('90%'));

      rerender({ ...props, onResize, referenceWidth: 1200 });
      await waitFor(() => expect(result.current.size).toBe('75%'));

      expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('does not call `onResize` or lose the requested width when an interaction does not change the width', async () => {
      const onResize = jest.fn();
      const { result, rerender } = renderHook(useEuiFlyoutResizable, {
        initialProps: { ...props, onResize, referenceWidth: 600 },
      });
      act(() => result.current.setFlyoutRef(createMockElement(540)));
      await waitFor(() => expect(result.current.size).toBe('90%'));

      // Click without dragging
      act(() => {
        result.current.onMouseDown({ clientX: 400 } as ReactMouseEvent);
        window.dispatchEvent(new MouseEvent('mouseup'));
      });
      // Non-resize key, and a grow step that the clamp turns into a no-op
      act(() => {
        result.current.onKeyDown({ key: 'Tab' } as KeyboardEvent);
      });
      act(() => {
        result.current.onKeyDown({
          key: 'ArrowLeft',
          preventDefault: () => {},
        } as KeyboardEvent);
      });
      expect(result.current.size).toBe('90%');
      expect(onResize).not.toHaveBeenCalled();

      rerender({ ...props, onResize, referenceWidth: 1200 });
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });
    });

    it('keeps scaling a named `size` proportionally', async () => {
      const { result, rerender } = renderHook(useEuiFlyoutResizable, {
        initialProps: { ...props, size: 'm' },
      });
      act(() => result.current.setFlyoutRef(createMockElement(600)));
      await waitFor(() => expect(result.current.size).toBe('50%'));

      rerender({ ...props, size: 'm', referenceWidth: 800 });
      await waitFor(() => expect(result.current.size).toBe('50%'));
    });
  });

  describe('reset when a child flyout opens', () => {
    const props = {
      ...mockProps,
      enabled: true,
      minWidth: 0,
      maxWidth: undefined,
      referenceWidth: 1200,
      size: 'm' as string | number,
      childFlyoutId: null as string | null,
      // 300px at the 1200px reference width
      childFlyoutSize: 's',
      isStacked: false,
    };

    // Right-side flyout: dragging left grows it
    const dragBy = (
      result: { current: ReturnType<typeof useEuiFlyoutResizable> },
      pixels: number
    ) => {
      act(() => {
        result.current.onMouseDown({ clientX: 400 } as ReactMouseEvent);
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: 400 - pixels })
        );
        window.dispatchEvent(new MouseEvent('mouseup'));
      });
    };

    const setup = async (overrides: Partial<typeof props> = {}) => {
      const onResize = jest.fn();
      const onWidthReset = jest.fn();
      const initialProps = { ...props, onResize, onWidthReset, ...overrides };
      const element = createMockElement(
        typeof initialProps.size === 'number' ? initialProps.size : 600
      );
      const hook = renderHook(useEuiFlyoutResizable, { initialProps });
      act(() => hook.result.current.setFlyoutRef(element));
      return { ...hook, element, initialProps, onResize, onWidthReset };
    };

    it('resets a dragged named `size` and reports the new width', async () => {
      const { result, rerender, initialProps, onResize, onWidthReset } =
        await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      dragBy(result, 300);
      expect(result.current.size).toBe('75%');
      expect(onResize).toHaveBeenLastCalledWith(900);

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('50%');
      expect(onWidthReset).toHaveBeenCalledTimes(1);
      expect(onWidthReset).toHaveBeenCalledWith(600);
      expect(onResize).toHaveBeenCalledTimes(2);
      expect(onResize).toHaveBeenLastCalledWith(600);
    });

    it('resets a dragged numeric `size` to the clamped number', async () => {
      const { result, rerender, initialProps, onResize } = await setup({
        size: 800,
      });
      await waitFor(() => {
        expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      });

      dragBy(result, 100);
      expect(result.current.size).toBe('75%');

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe(`${(800 / 1200) * 100}%`);
      expect(onResize).toHaveBeenLastCalledWith(800);
    });

    it('keeps a dragged width that still fits beside the child', async () => {
      const { result, rerender, initialProps, onResize, onWidthReset } =
        await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      // 700 + 300 = 1000px, within 90% of 1200px
      dragBy(result, 100);
      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe(`${(700 / 1200) * 100}%`);
      expect(onWidthReset).not.toHaveBeenCalled();
      expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('does not reset beside a `fill` child', async () => {
      const { result, rerender, initialProps, onWidthReset } = await setup({
        childFlyoutSize: 'fill',
      });
      await waitFor(() => expect(result.current.size).toBe('50%'));

      dragBy(result, 300);
      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('75%');
      expect(onWidthReset).not.toHaveBeenCalled();
    });

    it('does not reset when the layout is already stacked', async () => {
      const { result, rerender, initialProps, onWidthReset } = await setup({
        isStacked: true,
      });
      await waitFor(() => expect(result.current.size).toBe('50%'));

      dragBy(result, 300);
      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('75%');
      expect(onWidthReset).not.toHaveBeenCalled();
    });

    it('keeps a width dragged narrower than `size`', async () => {
      const { result, rerender, initialProps, onResize, onWidthReset } =
        await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      dragBy(result, -200);
      expect(result.current.size).toBe(`${(400 / 1200) * 100}%`);

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe(`${(400 / 1200) * 100}%`);
      expect(onWidthReset).not.toHaveBeenCalled();
      expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('does not reset a width that was not dragged', async () => {
      const { result, rerender, initialProps, onResize, onWidthReset } =
        await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('50%');
      expect(onWidthReset).not.toHaveBeenCalled();
      expect(onResize).not.toHaveBeenCalled();
    });

    it('does not reset when a child is open on the first render', async () => {
      const { result, onResize, onWidthReset } = await setup({
        childFlyoutId: 'child-a',
      });
      await waitFor(() => expect(result.current.size).toBe('50%'));

      expect(onWidthReset).not.toHaveBeenCalled();
      expect(onResize).not.toHaveBeenCalled();
    });

    it('resets again when a different child replaces the first', async () => {
      const { result, rerender, initialProps, onResize } = await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      dragBy(result, 300);
      expect(result.current.size).toBe('75%');

      rerender({ ...initialProps, childFlyoutId: 'child-b' });
      expect(result.current.size).toBe('50%');
      expect(onResize).toHaveBeenLastCalledWith(600);
    });

    it('does not reset when the child closes or the same child re-renders', async () => {
      const { result, rerender, initialProps, onWidthReset } = await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      dragBy(result, 300);

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('75%');

      rerender({ ...initialProps, childFlyoutId: null });
      expect(result.current.size).toBe('75%');
      expect(onWidthReset).not.toHaveBeenCalled();
    });

    it('does not reset when the container resizes while a child is open', async () => {
      const { result, rerender, initialProps, onWidthReset } = await setup();
      await waitFor(() => expect(result.current.size).toBe('50%'));

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      dragBy(result, 300);

      rerender({
        ...initialProps,
        childFlyoutId: 'child-a',
        referenceWidth: 1600,
      });
      await waitFor(() => expect(result.current.size).toBe('75%'));
      expect(onWidthReset).not.toHaveBeenCalled();
    });

    it('renders at `size` when the reference width is not measured yet', async () => {
      const { result, rerender, initialProps, onResize, onWidthReset } =
        await setup({ referenceWidth: 0 });

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('m');
      expect(onWidthReset).not.toHaveBeenCalled();
      expect(onResize).not.toHaveBeenCalled();
    });

    it('does nothing when resizing is disabled', async () => {
      const { result, rerender, initialProps, onWidthReset } = await setup({
        enabled: false,
      });

      rerender({ ...initialProps, childFlyoutId: 'child-a' });
      expect(result.current.size).toBe('m');
      expect(onWidthReset).not.toHaveBeenCalled();
    });
  });
});
