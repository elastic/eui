/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

import { euiDisabledSelector } from '../../../global_styling';

const BUTTON_SELECTOR = '.euiButton, .euiButtonIcon, .euiButtonGroupButton';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

interface HoverHighlight {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  visible: boolean;
  /** False for the first button and after leaving, so the pill fades instead of sliding in from the corner. */
  animate: boolean;
}

const HIDDEN_HIGHLIGHT: HoverHighlight = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  visible: false,
  animate: false,
};

const hoverHighlightAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER_QUERY).matches &&
  !window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * Slides one hover highlight across a button group.
 * Measures only when the button under the pointer changes.
 */
export const useButtonGroupHoverHighlight = (enabled: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLElement | null>(null);
  const [highlight, setHighlight] = useState<HoverHighlight>(HIDDEN_HIGHLIGHT);

  const place = useCallback((button: HTMLElement, animate: boolean) => {
    const container = containerRef.current;
    if (!container) return;

    const containerBox = container.getBoundingClientRect();
    const buttonBox = button.getBoundingClientRect();
    const radius =
      parseFloat(window.getComputedStyle(button).borderTopLeftRadius) || 0;

    setHighlight({
      x:
        buttonBox.left -
        containerBox.left -
        container.clientLeft +
        container.scrollLeft,
      y:
        buttonBox.top -
        containerBox.top -
        container.clientTop +
        container.scrollTop,
      width: buttonBox.width,
      height: buttonBox.height,
      radius,
      visible: true,
      animate,
    });
  }, []);

  const hide = useCallback(() => {
    buttonRef.current = null;
    setHighlight((current) =>
      current.visible ? { ...current, visible: false, animate: true } : current
    );
  }, []);

  const onPointerOver = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enabled || !hoverHighlightAllowed()) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const button = target.closest(BUTTON_SELECTOR);
      const container = containerRef.current;
      if (!(button instanceof HTMLElement) || !container?.contains(button)) {
        return;
      }

      if (button.matches(euiDisabledSelector)) {
        hide();
        return;
      }

      if (button === buttonRef.current) return;

      const animate = buttonRef.current !== null;
      buttonRef.current = button;
      place(button, animate);
    },
    [enabled, hide, place]
  );

  const onPointerLeave = useCallback(() => {
    if (!enabled) return;
    hide();
  }, [enabled, hide]);

  useEffect(() => {
    if (!highlight.visible || highlight.animate) return;
    const frame = window.requestAnimationFrame(() => {
      setHighlight((current) =>
        current.visible ? { ...current, animate: true } : current
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [highlight.visible, highlight.animate]);

  useEffect(() => {
    if (!highlight.visible) return;
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const current = buttonRef.current;
      const container = containerRef.current;
      if (!current || !container) return;
      const containerBox = container.getBoundingClientRect();
      const buttonBox = current.getBoundingClientRect();
      const radius =
        parseFloat(window.getComputedStyle(current).borderTopLeftRadius) || 0;
      setHighlight((highlight) =>
        highlight.visible
          ? {
              ...highlight,
              x:
                buttonBox.left -
                containerBox.left -
                container.clientLeft +
                container.scrollLeft,
              y:
                buttonBox.top -
                containerBox.top -
                container.clientTop +
                container.scrollTop,
              width: buttonBox.width,
              height: buttonBox.height,
              radius,
            }
          : highlight
      );
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [highlight.visible, place]);

  return {
    containerRef,
    highlight,
    onPointerOver,
    onPointerLeave,
  };
};
