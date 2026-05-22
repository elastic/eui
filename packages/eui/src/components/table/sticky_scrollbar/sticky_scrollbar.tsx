/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PointerEventHandler,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { euiTableStickyScrollbarStyles } from './sticky_scrollbar.styles';

export interface EuiTableStickyScrollbarProps {
  tableWrapperRef: RefObject<HTMLDivElement>;
}

export const EuiTableStickyScrollbar = ({
  tableWrapperRef,
}: EuiTableStickyScrollbarProps) => {
  const styles = useEuiMemoizedStyles(euiTableStickyScrollbarStyles);

  const trackElementRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const requestAnimationFramePendingRef = useRef(false);
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const updateTrack = useCallback((element: Element) => {
    const { clientWidth, scrollWidth, scrollLeft } = element;

    if (!requestAnimationFramePendingRef.current) {
      requestAnimationFramePendingRef.current = true;

      requestAnimationFrame(() => {
        const el = trackElementRef.current;
        if (el) {
          el.style.inlineSize = `${(clientWidth / scrollWidth) * 100}%`;
          el.style.marginInlineStart = `${(scrollLeft / scrollWidth) * 100}%`;
        }

        requestAnimationFramePendingRef.current = false;
      });
    }
  }, []);

  const handleScroll = useCallback(
    (event: Event) => {
      if (event.target) {
        updateTrack(event.target as Element);
      }
    },
    [updateTrack]
  );

  const handleResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const element = entries[0].target;
      if (!element) {
        return;
      }

      updateTrack(element);
      setIsActive(element.clientWidth < element.scrollWidth);
    },
    [updateTrack]
  );

  const handleBottomCornerIntersection =
    useCallback<IntersectionObserverCallback>((entries) => {
      const entry = entries[0];
      const element = entry.target;
      if (!element) {
        return;
      }

      setIsHidden(!entry.isIntersecting);
    }, []);

  const handlePointerDown = useCallback<PointerEventHandler<HTMLDivElement>>(
    (event) => {
      const el = tableWrapperRef.current;
      dragStartRef.current = {
        x: event.clientX,
        scrollLeft: el?.scrollLeft ?? 0,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [tableWrapperRef]
  );

  const handlePointerUp = useCallback(() => {
    dragStartRef.current = null;
  }, [dragStartRef]);

  const handlePointerMove = useCallback<PointerEventHandler<HTMLDivElement>>(
    (event) => {
      const el = tableWrapperRef.current;

      if (!dragStartRef.current || !el) {
        return;
      }

      const diff = event.clientX - dragStartRef.current.x;
      const ratio = el.scrollWidth / el.clientWidth;

      el.scrollLeft = dragStartRef.current.scrollLeft + diff * ratio;
    },
    [tableWrapperRef]
  );

  useEffect(() => {
    const element = tableWrapperRef.current;
    if (!element) {
      return;
    }

    updateTrack(element);

    element.addEventListener('scroll', handleScroll, { passive: true });

    // ResizeObserver is available in all supported browsers,
    // but jsdom and jest don't provide a polyfill for it.
    let resizeObserver: ResizeObserver | undefined;
    if (typeof window.ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(element);
    }

    // IntersectionOserver is available in all supported browsers,
    // but jsdom and jest don't provide a polyfill for it.
    let intersectionObserver: IntersectionObserver | undefined;
    if (typeof window.IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        handleBottomCornerIntersection,
        {
          threshold: 0,
          rootMargin: '-100% 0px 0px 0px',
        }
      );
      intersectionObserver.observe(element);
    }

    return () => {
      element.removeEventListener('scroll', handleScroll);

      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [
    tableWrapperRef,
    updateTrack,
    handleResize,
    handleScroll,
    handleBottomCornerIntersection,
  ]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      css={styles.wrapper}
      hidden={isHidden}
      data-test-subj="euiTableStickyScrollbar"
      aria-hidden
    >
      <div
        css={styles.track}
        ref={trackElementRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        data-test-subj="euiTableStickyScrollbarTrack"
      />
    </div>
  );
};
