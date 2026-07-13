/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';

import { render } from '../../test/rtl';
import { createResizeObserverMock } from '../../test/internal';
import { useLayoutObserver } from './use_layout_observer';

jest.mock('../observer/resize_observer/resize_observer', () => ({
  hasResizeObserver: true,
}));

const createMockEntry = (inlineSize: number): ResizeObserverEntry => ({
  target: document.createElement('div'),
  contentRect: new DOMRect(),
  borderBoxSize: [{ inlineSize, blockSize: 100 }],
  contentBoxSize: [],
  devicePixelContentBoxSize: [],
});

const Component = ({ size }: { size: 's' | 'm' }) => {
  const ref = useLayoutObserver(size);
  return <div ref={ref} data-test-subj="element" />;
};

describe('useLayoutObserver', () => {
  let resizeObserverMock: ReturnType<typeof createResizeObserverMock>;

  beforeEach(() => {
    resizeObserverMock = createResizeObserverMock();
    global.ResizeObserver = resizeObserverMock.ResizeObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a ResizeObserver on mount', () => {
    render(<Component size="m" />);

    expect(resizeObserverMock.ResizeObserver).toHaveBeenCalledTimes(1);
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Component size="m" />);
    const observerInstance =
      resizeObserverMock.ResizeObserver.mock.results[0]?.value;

    unmount();

    expect(observerInstance?.disconnect).toHaveBeenCalledTimes(1);
  });

  it('re-observes when size prop changes', () => {
    const { rerender } = render(<Component size="s" />);
    const firstObserver =
      resizeObserverMock.ResizeObserver.mock.results[0]?.value;

    rerender(<Component size="m" />);

    expect(firstObserver?.disconnect).toHaveBeenCalledTimes(1);
    expect(resizeObserverMock.ResizeObserver).toHaveBeenCalledTimes(2);
  });

  describe('data-layout attribute', () => {
    describe('superNarrow (width <= 400)', () => {
      it('sets data-layout="superNarrow" at the boundary (400)', () => {
        const { getByTestSubject } = render(<Component size="m" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(400)]);

        expect(element.getAttribute('data-layout')).toBe('superNarrow');
      });

      it('sets data-layout="superNarrow" below the boundary', () => {
        const { getByTestSubject } = render(<Component size="m" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(200)]);

        expect(element.getAttribute('data-layout')).toBe('superNarrow');
      });
    });

    describe('wide breakpoint for size "s" (width >= 800)', () => {
      it('sets data-layout="wide" at the boundary (800)', () => {
        const { getByTestSubject } = render(<Component size="s" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(800)]);

        expect(element.getAttribute('data-layout')).toBe('wide');
      });

      it('sets data-layout="wide" above the boundary', () => {
        const { getByTestSubject } = render(<Component size="s" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(1200)]);

        expect(element.getAttribute('data-layout')).toBe('wide');
      });

      it('removes data-layout for intermediate widths (401–799)', () => {
        const { getByTestSubject } = render(<Component size="s" />);
        const element = getByTestSubject('element');

        act(() => {
          element.setAttribute('data-layout', 'wide');
        });

        resizeObserverMock.triggerCallback([createMockEntry(600)]);

        expect(element.hasAttribute('data-layout')).toBe(false);
      });
    });

    describe('wide breakpoint for size "m" (width >= 1000)', () => {
      it('sets data-layout="wide" at the boundary (1000)', () => {
        const { getByTestSubject } = render(<Component size="m" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(1000)]);

        expect(element.getAttribute('data-layout')).toBe('wide');
      });

      it('sets data-layout="wide" above the boundary', () => {
        const { getByTestSubject } = render(<Component size="m" />);
        const element = getByTestSubject('element');

        resizeObserverMock.triggerCallback([createMockEntry(1400)]);

        expect(element.getAttribute('data-layout')).toBe('wide');
      });

      it('removes data-layout for intermediate widths (401–999)', () => {
        const { getByTestSubject } = render(<Component size="m" />);
        const element = getByTestSubject('element');

        act(() => {
          element.setAttribute('data-layout', 'wide');
        });

        resizeObserverMock.triggerCallback([createMockEntry(700)]);

        expect(element.hasAttribute('data-layout')).toBe(false);
      });
    });
  });
});
