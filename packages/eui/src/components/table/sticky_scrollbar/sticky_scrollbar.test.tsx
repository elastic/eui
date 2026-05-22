/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createRef } from 'react';
import { render } from '../../../test/rtl';
import { act, fireEvent, waitFor } from '@testing-library/react';

import { EuiTableStickyScrollbar } from './sticky_scrollbar';

describe('EuiTableStickyScrollbar', () => {
  let mockResizeObserver: jest.Mock;
  let mockIntersectionObserver: jest.Mock;
  let resizeObserverCallback: ResizeObserverCallback;
  let intersectionObserverCallback: IntersectionObserverCallback;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResizeObserver = jest.fn((callback) => {
      resizeObserverCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
      };
    });

    mockIntersectionObserver = jest.fn((callback) => {
      intersectionObserverCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: jest.fn(),
      };
    });

    global.ResizeObserver = mockResizeObserver as any;
    global.IntersectionObserver = mockIntersectionObserver as any;

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createMockTableWrapper = (overrides?: {
    clientWidth?: number;
    scrollWidth?: number;
    scrollLeft?: number;
  }): HTMLDivElement => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', {
      configurable: true,
      value: overrides?.clientWidth ?? 500,
    });
    Object.defineProperty(div, 'scrollWidth', {
      configurable: true,
      value: overrides?.scrollWidth ?? 1000,
    });
    Object.defineProperty(div, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: overrides?.scrollLeft ?? 0,
    });
    return div;
  };

  const createMockResizeObserverEntry = (
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

  const createMockIntersectionObserverEntry = (
    target: Element,
    isIntersecting: boolean
  ): IntersectionObserverEntry => {
    const boundingClientRect = {
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
      isIntersecting,
      boundingClientRect,
      intersectionRect: boundingClientRect,
      rootBounds: null,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: Date.now(),
    };
  };

  it('renders the scrollbar when content is scrollable', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper();

    (tableWrapperRef as any).current = mockElement;

    const { getByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;
    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    waitFor(() => {
      expect(getByTestSubject('euiTableStickyScrollbar')).toBeInTheDocument();
    });
  });

  it('does not render when content does not need scrolling', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper({
      clientWidth: 1000,
      scrollWidth: 1000,
    });

    (tableWrapperRef as any).current = mockElement;

    const { queryByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;
    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    expect(
      queryByTestSubject('euiTableStickyScrollbar')
    ).not.toBeInTheDocument();
  });

  it('returns null early if tableWrapperRef.current is null', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();

    const { container } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('updates track position on scroll', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper();

    (tableWrapperRef as any).current = mockElement;

    const { getByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;
    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    Object.defineProperty(mockElement, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: 250,
    });

    fireEvent.scroll(mockElement);

    waitFor(() => {
      const track = getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '50%',
        marginInlineStart: '25%',
      });
    });
  });

  it('updates track size on resize', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper();

    (tableWrapperRef as any).current = mockElement;

    const { getByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;

    Object.defineProperty(mockElement, 'clientWidth', {
      configurable: true,
      value: 400,
    });

    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    waitFor(() => {
      const track = getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '40%',
      });
    });
  });

  it('hides scrollbar when not intersecting', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper();

    (tableWrapperRef as any).current = mockElement;

    const { getByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;
    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    const intersectionObserver = mockIntersectionObserver.mock.results[0].value;
    act(() => {
      intersectionObserverCallback(
        [createMockIntersectionObserverEntry(mockElement, false)],
        intersectionObserver
      );
    });

    waitFor(() => {
      expect(getByTestSubject('euiTableStickyScrollbar')).toHaveAttribute(
        'hidden'
      );
    });
  });

  it('shows scrollbar when intersecting', () => {
    const tableWrapperRef = createRef<HTMLDivElement>();
    const mockElement = createMockTableWrapper();

    (tableWrapperRef as any).current = mockElement;

    const { getByTestSubject } = render(
      <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
    );

    const resizeObserver = mockResizeObserver.mock.results[0].value;
    act(() => {
      resizeObserverCallback(
        [createMockResizeObserverEntry(mockElement)],
        resizeObserver
      );
    });

    const intersectionObserver = mockIntersectionObserver.mock.results[0].value;
    act(() => {
      intersectionObserverCallback(
        [createMockIntersectionObserverEntry(mockElement, true)],
        intersectionObserver
      );
    });

    waitFor(() => {
      expect(getByTestSubject('euiTableStickyScrollbar')).not.toHaveAttribute(
        'hidden'
      );
    });
  });

  describe('pointer drag functionality', () => {
    it('handles pointer down event', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      const { getByTestSubject } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      const resizeObserver = mockResizeObserver.mock.results[0].value;
      act(() => {
        resizeObserverCallback(
          [createMockResizeObserverEntry(mockElement)],
          resizeObserver
        );
      });

      waitFor(() => {
        const track = getByTestSubject('euiTableStickyScrollbarTrack');
        const mockPointerEvent = {
          clientX: 100,
          pointerId: 1,
          currentTarget: {
            setPointerCapture: jest.fn(),
          },
        };

        fireEvent.pointerDown(track, mockPointerEvent);

        expect(
          mockPointerEvent.currentTarget.setPointerCapture
        ).toHaveBeenCalledWith(1);
      });
    });

    it('handles pointer move to scroll table', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      const { getByTestSubject } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      const resizeObserver = mockResizeObserver.mock.results[0].value;
      act(() => {
        resizeObserverCallback(
          [createMockResizeObserverEntry(mockElement)],
          resizeObserver
        );
      });

      waitFor(() => {
        const track = getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerDown(track, {
          clientX: 100,
          pointerId: 1,
          currentTarget: { setPointerCapture: jest.fn() },
        });

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(mockElement.scrollLeft).toBe(100);
      });
    });

    it('does not scroll when pointer not captured', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      const { getByTestSubject } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      const resizeObserver = mockResizeObserver.mock.results[0].value;
      act(() => {
        resizeObserverCallback(
          [createMockResizeObserverEntry(mockElement)],
          resizeObserver
        );
      });

      waitFor(() => {
        const track = getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(mockElement.scrollLeft).toBe(0);
      });
    });

    it('handles pointer up to release capture', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      const { getByTestSubject } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      const resizeObserver = mockResizeObserver.mock.results[0].value;
      act(() => {
        resizeObserverCallback(
          [createMockResizeObserverEntry(mockElement)],
          resizeObserver
        );
      });

      waitFor(() => {
        const track = getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerDown(track, {
          clientX: 100,
          pointerId: 1,
          currentTarget: { setPointerCapture: jest.fn() },
        });

        fireEvent.pointerUp(track);

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(mockElement.scrollLeft).toBe(0);
      });
    });
  });

  describe('cleanup', () => {
    it('removes event listeners on unmount', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();
      const removeEventListenerSpy = jest.spyOn(
        mockElement,
        'removeEventListener'
      );

      (tableWrapperRef as any).current = mockElement;

      const { unmount } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('disconnects observers on unmount', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      const { unmount } = render(
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      );

      const resizeObserver = mockResizeObserver.mock.results[0].value;
      const intersectionObserver =
        mockIntersectionObserver.mock.results[0].value;

      unmount();

      expect(resizeObserver.disconnect).toHaveBeenCalled();
      expect(intersectionObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('requestAnimationFrame throttling', () => {
    it('throttles multiple scroll updates using RAF', () => {
      const tableWrapperRef = createRef<HTMLDivElement>();
      const mockElement = createMockTableWrapper();

      (tableWrapperRef as any).current = mockElement;

      render(<EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />);

      const resizeObserver = mockResizeObserver.mock.results[0].value;

      act(() => {
        resizeObserverCallback(
          [createMockResizeObserverEntry(mockElement)],
          resizeObserver
        );
      });

      const rafSpy = window.requestAnimationFrame as jest.Mock;
      rafSpy.mockClear();
      rafSpy.mockImplementation(() => 0);

      fireEvent.scroll(mockElement);
      fireEvent.scroll(mockElement);
      fireEvent.scroll(mockElement);

      expect(rafSpy).toHaveBeenCalledTimes(1);
    });
  });
});
