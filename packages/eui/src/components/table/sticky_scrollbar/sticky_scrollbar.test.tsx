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

  it('renders the scrollbar when content is scrollable', async () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
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

  it('updates track position on scroll', async () => {
    const { wrapperElement } = renderComponent({});

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbarTrack')
      ).toBeInTheDocument();
    });

    wrapperElement.scrollLeft = 250;
    fireEvent.scroll(wrapperElement);

    await waitFor(() => {
      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '50%',
        marginInlineStart: '25%',
      });
    });
  });

  it('updates track size on resize', async () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbarTrack')
      ).toBeInTheDocument();
    });

    // clientWidth is readonly
    Object.defineProperty(wrapperElement, 'clientWidth', {
      configurable: true,
      value: 400,
    });

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      expect(track).toHaveStyle({
        inlineSize: '40%',
      });
    });
  });

  it('hides scrollbar when not intersecting', async () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).toBeInTheDocument();
    });

    intersectionObserverMock.triggerCallback([
      createMockIntersectionObserverEntry(wrapperElement, false),
    ]);

    await waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).not.toBeVisible();
    });
  });

  it('shows scrollbar when intersecting', async () => {
    const { wrapperElement } = renderComponent();

    resizeObserverMock.triggerCallback([
      createMockResizeObserverEntry(wrapperElement),
    ]);

    await waitFor(() => {
      expect(
        screen.getByTestSubject('euiTableStickyScrollbar')
      ).toBeInTheDocument();
    });

    intersectionObserverMock.triggerCallback([
      createMockIntersectionObserverEntry(wrapperElement, true),
    ]);

    await waitFor(() => {
      expect(screen.getByTestSubject('euiTableStickyScrollbar')).toBeVisible();
    });
  });

  describe('track dragging', () => {
    it('handles pointer down event', async () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      await waitFor(() => {
        expect(
          screen.getByTestSubject('euiTableStickyScrollbarTrack')
        ).toBeInTheDocument();
      });

      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      const setPointerCaptureSpy = jest.fn();
      track.setPointerCapture = setPointerCaptureSpy;

      const pointerEvent = new MouseEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
      });
      Object.defineProperty(pointerEvent, 'pointerId', {
        value: 1,
        writable: false,
      });

      fireEvent(track, pointerEvent);

      expect(setPointerCaptureSpy).toHaveBeenCalledWith(1);
    });

    it('handles pointer move to scroll table', async () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      await waitFor(() => {
        expect(
          screen.getByTestSubject('euiTableStickyScrollbarTrack')
        ).toBeInTheDocument();
      });

      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      track.setPointerCapture = jest.fn();

      const pointerDownEvent = new MouseEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
      });
      Object.defineProperty(pointerDownEvent, 'pointerId', {
        value: 1,
        writable: false,
      });

      fireEvent(track, pointerDownEvent);

      const pointerMoveEvent = new MouseEvent('pointermove', {
        bubbles: true,
        cancelable: true,
        clientX: 150,
      });

      fireEvent(track, pointerMoveEvent);

      expect(wrapperElement.scrollLeft).toBe(100);
    });

    it('does not scroll when pointer not captured', async () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      await waitFor(() => {
        expect(
          screen.getByTestSubject('euiTableStickyScrollbarTrack')
        ).toBeInTheDocument();
      });

      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');

      fireEvent.pointerMove(track, {
        clientX: 150,
      });

      expect(wrapperElement.scrollLeft).toBe(0);
    });

    it('handles pointer up to release capture', async () => {
      const { wrapperElement } = renderComponent();

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(wrapperElement),
      ]);

      await waitFor(() => {
        expect(
          screen.getByTestSubject('euiTableStickyScrollbarTrack')
        ).toBeInTheDocument();
      });

      const track = screen.getByTestSubject('euiTableStickyScrollbarTrack');
      track.setPointerCapture = jest.fn();

      const pointerDownEvent = new MouseEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
      });
      Object.defineProperty(pointerDownEvent, 'pointerId', {
        value: 1,
        writable: false,
      });

      fireEvent(track, pointerDownEvent);

      const pointerUpEvent = new MouseEvent('pointerup', {
        bubbles: true,
        cancelable: true,
      });

      fireEvent(track, pointerUpEvent);

      const pointerMoveEvent = new MouseEvent('pointermove', {
        bubbles: true,
        cancelable: true,
        clientX: 150,
      });

      fireEvent(track, pointerMoveEvent);

      expect(wrapperElement.scrollLeft).toBe(0);
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
