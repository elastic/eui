/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';

/**
 * Create a mock ResizeObserver for testing.
 * This mock doesn't provide a real ResizeObserver implementation
 * and should only be used for simple assertions.
 * Use Cypress to test more complex scenarios end to end.
 *
 * @example
 * const resizeObserverMock = createResizeObserverMock();
 * global.ResizeObserver = resizeObserverMock.ResizeObserver;
 *
 * // Later in test
 * resizeObserverMock.triggerCallback([createMockResizeObserverEntry(element)]);
 * @internal
 */
export const createResizeObserverMock = () => {
  const callbackMap = new WeakMap<ResizeObserver, ResizeObserverCallback>();

  const mockConstructor = jest.fn((cb: ResizeObserverCallback) => {
    const observer = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    } as ResizeObserver;

    callbackMap.set(observer, cb);

    return observer;
  }) as jest.MockedClass<typeof ResizeObserver>;

  return {
    ResizeObserver: mockConstructor,
    /**
     * Manually trigger the ResizeObserver callback.
     *
     * @param entries - Array of ResizeObserverEntry objects
     * @param observer - Optional observer instance. Defaults to the first mock result
     */
    triggerCallback: (
      entries: ResizeObserverEntry[],
      observer?: ResizeObserver
    ) => {
      const obs = observer || mockConstructor.mock.results[0]?.value;
      const callback = callbackMap.get(obs);

      if (!callback) {
        throw new Error(
          'No callback found for observer. Make sure the observer was created by this mock.'
        );
      }

      act(() => {
        callback(entries, obs);
      });
    },
  };
};

/**
 * Create a mock ResizeObserverEntry for testing ResizeObserver events
 *
 * @param target - The element being observed
 * @param contentRect - Customize values in the returned `contentRect` object
 * @returns A mock ResizeObserverEntry object
 * @internal
 */
export const createMockResizeObserverEntry = (
  target: Element,
  contentRect: Partial<ResizeObserverEntry['contentRect']> = {}
): ResizeObserverEntry => {
  const _contentRect = {
    x: 0,
    y: 0,
    width: 500,
    height: 100,
    top: 0,
    right: 500,
    bottom: 100,
    left: 0,
    toJSON: () => ({}),
    ...contentRect,
  };

  return {
    target,
    contentRect: _contentRect,
    borderBoxSize: [] as any,
    contentBoxSize: [] as any,
    devicePixelContentBoxSize: [] as any,
  };
};
