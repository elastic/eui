/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';
import { renderHook } from '../../test/rtl/render_hook';
import {
  shouldPublishFlyoutWidth,
  useEuiFlyoutMaximize,
  UseEuiFlyoutMaximize,
} from './use_flyout_maximize';

const defaultProps: UseEuiFlyoutMaximize = {
  enabled: true,
  flyoutId: 'flyout-1',
  isInManagedContext: false,
  isMainFlyout: false,
  ownChildFlyoutId: null,
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
        isMainFlyout: true,
        maximized: true,
        onMaximizeChange,
      });
      expect(result.current.isMaximized).toBe(true);

      // A child opening clears the main's flag in the reducer
      rerender({
        ...defaultProps,
        isInManagedContext: true,
        isMainFlyout: true,
        ownChildFlyoutId: 'child-1',
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
        isMainFlyout: true,
        ownChildFlyoutId: 'child-1',
      });

      expect(result.current.canMaximize).toBe(false);
    });

    it('is true for a main flyout without a child', () => {
      const { result } = render({
        isInManagedContext: true,
        isMainFlyout: true,
      });

      expect(result.current.canMaximize).toBe(true);
    });

    it('is true for a child flyout', () => {
      const { result } = render({ isInManagedContext: true });

      expect(result.current.canMaximize).toBe(true);
    });
  });
});

describe('shouldPublishFlyoutWidth', () => {
  it('holds every measurement while maximized', () => {
    expect(
      shouldPublishFlyoutWidth({
        isMaximized: true,
        width: 1200,
        heldWidth: undefined,
      })
    ).toBe(false);
  });

  it('skips the stale maximized sample on the first restored call', () => {
    expect(
      shouldPublishFlyoutWidth({
        isMaximized: false,
        width: 1200,
        heldWidth: 1200,
      })
    ).toBe(false);
  });

  it('publishes the next restored measurement', () => {
    expect(
      shouldPublishFlyoutWidth({
        isMaximized: false,
        width: 480,
        heldWidth: 1200,
      })
    ).toBe(true);
  });

  it('publishes normally when never maximized', () => {
    expect(
      shouldPublishFlyoutWidth({
        isMaximized: false,
        width: 480,
        heldWidth: undefined,
      })
    ).toBe(true);
  });

  it('ignores an empty measurement', () => {
    expect(
      shouldPublishFlyoutWidth({
        isMaximized: false,
        width: 0,
        heldWidth: undefined,
      })
    ).toBe(false);
  });
});
