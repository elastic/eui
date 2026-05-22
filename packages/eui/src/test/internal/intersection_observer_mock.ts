/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';

/**
 * Create a mock IntersectionObserver for testing.
 * This mock doesn't provide a real IntersectionObserver implementation
 * and should only be used for simple assertions.
 * Use Cypress to test more complex scenarios end to end.
 *
 * @example
 * const intersectionObserverMock = createIntersectionObserverMock();
 * global.IntersectionObserver = intersectionObserverMock.IntersectionObserver;
 *
 * // Later in test
 * intersectionObserverMock.triggerCallback([
 *   createMockIntersectionObserverEntry(element, true)
 * ]);
 * @internal
 */
export const createIntersectionObserverMock = () => {
  let callback: IntersectionObserverCallback;

  const mockConstructor = jest.fn((cb: IntersectionObserverCallback) => {
    callback = cb;
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: jest.fn(),
    };
  }) as jest.MockedClass<typeof IntersectionObserver>;

  return {
    IntersectionObserver: mockConstructor,
    /**
     * Manually trigger the IntersectionObserver callback.
     *
     * @param entries - Array of IntersectionObserverEntry objects
     * @param observer - Optional observer instance. Defaults to the first mock result
     */
    triggerCallback: (
      entries: IntersectionObserverEntry[],
      observer?: IntersectionObserver
    ) => {
      const obs = observer || mockConstructor.mock.results[0]?.value;
      act(() => {
        callback(entries, obs);
      });
    },
  };
};

/**
 * Create a mock IntersectionObserverEntry for testing IntersectionObserver.
 *
 * @param target - The element being observed
 * @param isIntersecting - Whether the element is intersecting
 * @param boundingClientRect - Customize values in the returned `boundingClientRect` and `intersectionRect` objects
 * @returns A mock IntersectionObserverEntry object
 * @internal
 */
export const createMockIntersectionObserverEntry = (
  target: Element,
  isIntersecting: boolean,
  boundingClientRect: Partial<
    IntersectionObserverEntry['boundingClientRect']
  > = {}
): IntersectionObserverEntry => {
  const _boundingClientRect = {
    x: 0,
    y: 0,
    width: 500,
    height: 100,
    top: 0,
    right: 500,
    bottom: 100,
    left: 0,
    toJSON: () => ({}),
    ...boundingClientRect,
  };

  return {
    target,
    isIntersecting,
    boundingClientRect: _boundingClientRect,
    intersectionRect: _boundingClientRect,
    rootBounds: null,
    intersectionRatio: isIntersecting ? 1 : 0,
    time: Date.now(),
  };
};
