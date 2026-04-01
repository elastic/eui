/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';

import { useEuiWindowEvent } from './hooks';

describe('useEuiWindowEvent', () => {
  let windowAddCount = 0;
  let windowRemoveCount = 0;

  beforeAll(() => {
    // React 16 and 17 register a bunch of error listeners which we don't need to capture
    window.addEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowAddCount++;
    });
    window.removeEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowRemoveCount++;
    });
  });

  beforeEach(() => {
    // Reset counts
    windowAddCount = 0;
    windowRemoveCount = 0;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('attaches handler to window event on mount', () => {
    const handler = () => null;
    renderHook(() => useEuiWindowEvent('click', handler));
    expect(window.addEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    );
    expect(windowAddCount).toEqual(1);
  });

  test('removes handler on unmount', () => {
    const handler = () => null;
    const { unmount } = renderHook(() => useEuiWindowEvent('click', handler));
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    );
    expect(windowRemoveCount).toEqual(1);
  });

  test('removes and re-attaches handler when event name changes', () => {
    const handler = () => null;
    const { rerender } = renderHook(
      ({ event }: { event: keyof WindowEventMap }) =>
        useEuiWindowEvent(event, handler),
      { initialProps: { event: 'click' as keyof WindowEventMap } }
    );

    expect(windowAddCount).toEqual(1);

    rerender({ event: 'keydown' });

    expect(windowRemoveCount).toEqual(1);
    expect(windowAddCount).toEqual(2);
  });

  test('does not remove or re-attach handler when an inline arrow function is passed', () => {
    const { rerender } = renderHook(() =>
      useEuiWindowEvent('click', () => null)
    );

    expect(windowAddCount).toEqual(1);

    rerender();

    expect(windowAddCount).toEqual(1);
    expect(windowRemoveCount).toEqual(0);
  });

  test('calls the latest handler reference when the event fires', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // Restore real addEventListener/removeEventListener before mounting
    // so the hook registers a real listener on the window
    const realAddEventListener = EventTarget.prototype.addEventListener;
    const realRemoveEventListener = EventTarget.prototype.removeEventListener;

    window.addEventListener = realAddEventListener.bind(window);
    window.removeEventListener = realRemoveEventListener.bind(window);

    const { rerender, unmount } = renderHook(
      ({ handler }: { handler: () => void }) =>
        useEuiWindowEvent('click', handler),
      { initialProps: { handler: handler1 } }
    );

    // Swap to handler2 — handlerRef.current is updated, no re-registration
    rerender({ handler: handler2 });

    window.dispatchEvent(new MouseEvent('click'));

    // Only the latest handler should fire via handlerRef.current
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler1).not.toHaveBeenCalled();

    unmount();

    // Restore mocks for any tests that run after this one
    window.addEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowAddCount++;
    });
    window.removeEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowRemoveCount++;
    });
  });
});
