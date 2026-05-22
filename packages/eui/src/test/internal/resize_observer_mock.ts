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
  let callback: ResizeObserverCallback;

  const mockConstructor = jest.fn((cb: ResizeObserverCallback) => {
    callback = cb;
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    } as ResizeObserver;
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
 * @returns A mock ResizeObserverEntry object
 * @internal
 */
export const createMockResizeObserverEntry = (
  target: Element
): ResizeObserverEntry => {
  const contentRect = {
    x: 0,
    y: 0,
    width: 500,
    height: 100,
    top: 0,
    right: 500,
    bottom: 100,
    left: 0,
    toJSON: () => ({}),
  };

  return {
    target,
    contentRect,
    borderBoxSize: [] as any,
    contentBoxSize: [] as any,
    devicePixelContentBoxSize: [] as any,
  };
};
