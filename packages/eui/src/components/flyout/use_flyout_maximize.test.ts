/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';
import { renderHook } from '../../test/rtl/render_hook';
import { createMockState } from './manager/__mocks__';
import {
  getIsManagedFlyoutMaximized,
  resolveFlyoutWidth,
  useEuiFlyoutMaximize,
  UseEuiFlyoutMaximize,
} from './use_flyout_maximize';

const defaultProps: UseEuiFlyoutMaximize = {
  enabled: true,
  flyoutId: 'flyout-1',
  isInManagedContext: false,
  childFlyoutId: null,
};

describe('useEuiFlyoutMaximize', () => {
  const render = (initialProps: Partial<UseEuiFlyoutMaximize> = {}) =>
    renderHook((props: UseEuiFlyoutMaximize) => useEuiFlyoutMaximize(props), {
      initialProps: { ...defaultProps, ...initialProps },
    });

  describe('unmanaged', () => {
    it('toggles local state and reports each change', () => {
      const onMaximizeChange = jest.fn();
      const { result } = render({ onMaximizeChange });

      expect(result.current.isMaximized).toBe(false);
      expect(onMaximizeChange).not.toHaveBeenCalled();

      act(() => result.current.toggleMaximize());
      expect(result.current.isMaximized).toBe(true);
      expect(onMaximizeChange).toHaveBeenLastCalledWith(true);

      act(() => result.current.toggleMaximize());
      expect(result.current.isMaximized).toBe(false);
      expect(onMaximizeChange).toHaveBeenLastCalledWith(false);
      expect(onMaximizeChange).toHaveBeenCalledTimes(2);
    });

    it('is never maximized when disabled', () => {
      const { result } = render({ enabled: false });

      act(() => result.current.toggleMaximize());

      expect(result.current.isMaximized).toBe(false);
      expect(result.current.canMaximize).toBe(false);
    });
  });

  describe('managed', () => {
    it('reads the store flag and writes through setMaximized', () => {
      const setMaximized = jest.fn();
      const { result } = render({
        isInManagedContext: true,
        maximized: false,
        setMaximized,
      });

      act(() => result.current.toggleMaximize());

      expect(setMaximized).toHaveBeenCalledWith('flyout-1', true);
      // The flag only changes when the store does
      expect(result.current.isMaximized).toBe(false);
    });

    it('does not report the initial store value', () => {
      const onMaximizeChange = jest.fn();
      render({ isInManagedContext: true, maximized: true, onMaximizeChange });

      expect(onMaximizeChange).not.toHaveBeenCalled();
    });

    it('reports a store-driven restore', () => {
      const onMaximizeChange = jest.fn();
      const { result, rerender } = render({
        isInManagedContext: true,
        maximized: true,
        onMaximizeChange,
      });
      expect(result.current.isMaximized).toBe(true);

      // A child opening clears the main's flag in the reducer
      rerender({
        ...defaultProps,
        isInManagedContext: true,
        childFlyoutId: 'child-1',
        maximized: false,
        onMaximizeChange,
      });

      expect(result.current.isMaximized).toBe(false);
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
      expect(onMaximizeChange).toHaveBeenCalledWith(false);
    });
  });

  describe('canMaximize', () => {
    it('is false for a main flyout with its own child', () => {
      const { result } = render({
        isInManagedContext: true,
        childFlyoutId: 'child-1',
      });

      expect(result.current.canMaximize).toBe(false);
    });

    it('is true for a main flyout without a child, and for a child flyout', () => {
      const { result } = render({ isInManagedContext: true });

      expect(result.current.canMaximize).toBe(true);
    });
  });
});

describe('getIsManagedFlyoutMaximized', () => {
  const state = {
    ...createMockState(),
    flyouts: [
      { flyoutId: 'flyout-1', level: 'main' as const, maximized: true },
    ],
  };

  it('is true when the button is enabled and the store flag is set', () => {
    expect(
      getIsManagedFlyoutMaximized(
        { showMaximizeButton: true },
        state,
        'flyout-1'
      )
    ).toBe(true);
  });

  it('is false when the button is not enabled', () => {
    expect(getIsManagedFlyoutMaximized({}, state, 'flyout-1')).toBe(false);
  });

  it('is false for a flyout without the store flag', () => {
    expect(
      getIsManagedFlyoutMaximized(
        { showMaximizeButton: true },
        state,
        'flyout-2'
      )
    ).toBe(false);
  });
});

describe('resolveFlyoutWidth', () => {
  it('passes widths through when never maximized', () => {
    expect(resolveFlyoutWidth({}, false, 480)).toEqual({
      hold: { trusted: 480 },
      width: 480,
    });
  });

  it('stands in the last restored width while maximized', () => {
    expect(resolveFlyoutWidth({ trusted: 480 }, true, 1200)).toEqual({
      hold: { trusted: 480, held: 1200 },
      width: 480,
    });
  });

  it('treats the first restored sample as the stale maximized width', () => {
    const hold = { trusted: 480, held: 1200 };

    expect(resolveFlyoutWidth(hold, false, 1200)).toEqual({
      hold,
      width: 480,
    });
  });

  it('takes the next restored measurement', () => {
    expect(
      resolveFlyoutWidth({ trusted: 480, held: 1200 }, false, 500)
    ).toEqual({ hold: { trusted: 500 }, width: 500 });
  });

  it('drops the hold when the measurement is missing', () => {
    // A push flyout falling back to overlay detaches the resize observer; the
    // width it had before must not return when it pushes again
    const detached = resolveFlyoutWidth({ trusted: 480 }, false, 0);
    expect(detached).toEqual({ hold: {}, width: 0 });

    expect(resolveFlyoutWidth(detached.hold, false, 0).width).toBe(0);
  });
});
