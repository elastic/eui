/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  createResizeObserverMock,
  createMockResizeObserverEntry,
} from './resize_observer_mock';

describe('createResizeObserverMock', () => {
  it('works with a single ResizeObserver', () => {
    const mock = createResizeObserverMock();
    const callback = jest.fn();

    const observer = new mock.ResizeObserver(callback);
    const element = document.createElement('div');
    const entry = createMockResizeObserverEntry(element);

    mock.triggerCallback([entry]);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([entry], observer);
  });

  it('works with multiple ResizeObservers independently', () => {
    const mock = createResizeObserverMock();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const observer1 = new mock.ResizeObserver(callback1);
    const observer2 = new mock.ResizeObserver(callback2);

    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    const entry1 = createMockResizeObserverEntry(element1);
    const entry2 = createMockResizeObserverEntry(element2);

    // Trigger first observer
    mock.triggerCallback([entry1], observer1);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith([entry1], observer1);
    expect(callback2).not.toHaveBeenCalled();

    // Trigger second observer
    mock.triggerCallback([entry2], observer2);

    expect(callback1).toHaveBeenCalledTimes(1); // Still only called once
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith([entry2], observer2);
  });

  it('defaults to the first observer when no observer is specified', () => {
    const mock = createResizeObserverMock();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const observer1 = new mock.ResizeObserver(callback1);
    new mock.ResizeObserver(callback2); // Create second but don't use

    const element = document.createElement('div');
    const entry = createMockResizeObserverEntry(element);

    // Trigger without specifying observer - should use first
    mock.triggerCallback([entry]);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith([entry], observer1);
    expect(callback2).not.toHaveBeenCalled();
  });

  it('throws an error when triggering with an invalid observer', () => {
    const mock = createResizeObserverMock();
    const callback = jest.fn();
    new mock.ResizeObserver(callback);

    const element = document.createElement('div');
    const entry = createMockResizeObserverEntry(element);

    // Create a fake observer not from this mock
    const fakeObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    } as ResizeObserver;

    expect(() => {
      mock.triggerCallback([entry], fakeObserver);
    }).toThrow(
      'No callback found for observer. Make sure the observer was created by this mock.'
    );
  });
});
