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
  getFlyoutPixelWidth,
  getIsManagedChildFlyout,
  getIsManagedFlyoutMaximized,
  resolveFlyoutWidth,
  useEuiFlyoutMaximize,
  UseEuiFlyoutMaximize,
} from './use_flyout_maximize';

const defaultProps: UseEuiFlyoutMaximize = {
  enabled: true,
  flyoutId: 'flyout-1',
  isInManagedContext: false,
  isChildFlyout: false,
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

    it('reports a change that comes from the store', () => {
      const onMaximizeChange = jest.fn();
      const { result, rerender } = render({
        isInManagedContext: true,
        maximized: true,
        onMaximizeChange,
      });
      expect(result.current.isMaximized).toBe(true);

      rerender({
        ...defaultProps,
        isInManagedContext: true,
        maximized: false,
        onMaximizeChange,
      });

      expect(result.current.isMaximized).toBe(false);
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
      expect(onMaximizeChange).toHaveBeenCalledWith(false);
    });
  });

  describe('canMaximize', () => {
    it('is false for a child flyout', () => {
      const { result } = render({
        isInManagedContext: true,
        isChildFlyout: true,
      });

      expect(result.current.canMaximize).toBe(false);
    });

    it('is true for a main flyout', () => {
      const { result } = render({ isInManagedContext: true });

      expect(result.current.canMaximize).toBe(true);
    });
  });
});

describe('getIsManagedChildFlyout', () => {
  const state = {
    ...createMockState(),
    flyouts: [
      { flyoutId: 'main-1', level: 'main' as const },
      { flyoutId: 'child-1', level: 'child' as const },
    ],
  };

  it('reads the level from the store entry', () => {
    expect(getIsManagedChildFlyout(state, 'child-1')).toBe(true);
    expect(getIsManagedChildFlyout(state, 'main-1')).toBe(false);
  });

  it('is false for a flyout that is not registered', () => {
    expect(getIsManagedChildFlyout(state, 'unknown')).toBe(false);
    expect(getIsManagedChildFlyout(undefined, 'child-1')).toBe(false);
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

  it('is false for a child flyout, even with the store flag set', () => {
    const childState = {
      ...createMockState(),
      flyouts: [
        { flyoutId: 'child-1', level: 'child' as const, maximized: true },
      ],
    };

    expect(
      getIsManagedFlyoutMaximized(
        { showMaximizeButton: true },
        childState,
        'child-1'
      )
    ).toBe(false);
  });
});

describe('getFlyoutPixelWidth', () => {
  it('returns a number of pixels as is', () => {
    expect(getFlyoutPixelWidth(400, 1000)).toBe(400);
  });

  it('resolves a percentage against the reference width', () => {
    expect(getFlyoutPixelWidth('42.5%', 1000)).toBe(425);
  });

  it('resolves a named size against the reference width', () => {
    expect(getFlyoutPixelWidth('m', 1000)).toBe(500);
  });

  it('leaves room for a side-by-side sibling of a fill flyout', () => {
    expect(getFlyoutPixelWidth('fill', 1000, 300)).toBe(600);
    expect(getFlyoutPixelWidth('m', 1000, 300)).toBe(500);
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
