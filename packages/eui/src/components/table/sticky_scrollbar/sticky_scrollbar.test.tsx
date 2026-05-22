/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render, screen } from '../../../test/rtl';
import {
  createResizeObserverMock,
  createMockResizeObserverEntry,
  createIntersectionObserverMock,
  createMockIntersectionObserverEntry,
} from '../../../test/internal';

import { EuiTableStickyScrollbar } from './sticky_scrollbar';

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

const renderComponent = (overrides?: {
  clientWidth?: number;
  scrollWidth?: number;
  scrollLeft?: number;
}) => {
  const wrapperElement = createMockTableWrapper(overrides);

  const Component = () => {
    const tableWrapperRef = useRef<HTMLDivElement>(wrapperElement);
    return <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />;
  };

  const { unmount } = render(<Component />);

  return { wrapperElement, unmount };
};

describe('EuiTableStickyScrollbar', () => {
  let resizeObserverMock: ReturnType<typeof createResizeObserverMock>;
  let intersectionObserverMock: ReturnType<
    typeof createIntersectionObserverMock
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    resizeObserverMock = createResizeObserverMock();
    intersectionObserverMock = createIntersectionObserverMock();

    global.ResizeObserver = resizeObserverMock.ResizeObserver;
    global.IntersectionObserver = intersectionObserverMock.IntersectionObserver;

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the scrollbar when content is scrollable', () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).toBeInTheDocument();
    });
  });

  it('does not render when content does not need scrolling', () => {
    const { wrapperElement } = renderComponent({
      clientWidth: 1000,
      scrollWidth: 1000,
    });

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    expect(
      screen.queryByTestSubject('euiTableStickyScrollbar')
    ).not.toBeInTheDocument();
  });

  it('returns null early if tableWrapperRef.current is null', () => {
    const Component = () => {
      const tableWrapperRef = useRef<HTMLDivElement>(null);
      return <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />;
    };

    const { container } = render(<Component />);

    expect(container.firstChild).toBeNull();
  });

  it('updates track position on scroll', () => {
    const { wrapperElement } = renderComponent({});

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    wrapperElement.scrollLeft = 250;
    fireEvent.scroll(wrapperElement);

    waitFor(() => {
      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '50%',
        marginInlineStart: '25%',
      });
    });
  });

  it('updates track size on resize', () => {
    const { wrapperElement } = renderComponent();

    // clientWidth is readonly
    Object.defineProperty(wrapperElement, 'clientWidth', {
      configurable: true,
      value: 400,
    });

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    waitFor(() => {
      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '40%',
      });
    });
  });

  it('hides scrollbar when not intersecting', () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    intersectionObserverMock.triggerCallback([
      createMockIntersectionObserverEntry(wrapperElement, false),
    ]);

    waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).toHaveAttribute('hidden');
    });
  });

  it('shows scrollbar when intersecting', () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    intersectionObserverMock.triggerCallback([
      createMockIntersectionObserverEntry(wrapperElement, true),
    ]);

    waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).not.toHaveAttribute('hidden');
    });
  });

  describe('track dragging', () => {
    it('handles pointer down event', () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      waitFor(() => {
        const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
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
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      waitFor(() => {
        const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerDown(track, {
          clientX: 100,
          pointerId: 1,
          currentTarget: { setPointerCapture: jest.fn() },
        });

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(wrapperElement.scrollLeft).toBe(100);
      });
    });

    it('does not scroll when pointer not captured', () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      waitFor(() => {
        const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(wrapperElement.scrollLeft).toBe(0);
      });
    });

    it('handles pointer up to release capture', () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      waitFor(() => {
        const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');

        fireEvent.pointerDown(track, {
          clientX: 100,
          pointerId: 1,
          currentTarget: { setPointerCapture: jest.fn() },
        });

        fireEvent.pointerUp(track);

        fireEvent.pointerMove(track, {
          clientX: 150,
        });

        expect(wrapperElement.scrollLeft).toBe(0);
      });
    });
  });

  describe('cleanup', () => {
    it('removes event listeners on unmount', () => {
      const { wrapperElement, unmount } = renderComponent();
      const removeEventListenerSpy = jest.spyOn(
        wrapperElement,
        'removeEventListener'
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('disconnects observers on unmount', () => {
      const { unmount } = renderComponent();

      const resizeObserver =
        resizeObserverMock.ResizeObserver.mock.results[0].value;
      const intersectionObserver =
        intersectionObserverMock.IntersectionObserver.mock.results[0].value;

      unmount();

      expect(resizeObserver.disconnect).toHaveBeenCalled();
      expect(intersectionObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('requestAnimationFrame throttling', () => {
    it('throttles multiple scroll updates happening during a single frame', () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      const rafSpy = window.requestAnimationFrame as jest.Mock;
      rafSpy.mockClear();
      rafSpy.mockImplementation(() => 0);

      fireEvent.scroll(wrapperElement);
      fireEvent.scroll(wrapperElement);
      fireEvent.scroll(wrapperElement);

      expect(rafSpy).toHaveBeenCalledTimes(1);
    });
  });
});
