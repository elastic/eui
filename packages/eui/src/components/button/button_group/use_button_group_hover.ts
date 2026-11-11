/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useEuiTheme } from '../../../services';
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

const measureButton = (container: HTMLElement, button: HTMLElement) => {
  const containerBox = container.getBoundingClientRect();
  const buttonBox = button.getBoundingClientRect();
  const radius =
    parseFloat(window.getComputedStyle(button).borderTopLeftRadius) || 0;

  return {
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
  };
};

const hoverHighlightAllowed = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
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

    setHighlight({
      ...measureButton(container, button),
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
      const box = measureButton(container, current);
      setHighlight((highlight) =>
        highlight.visible ? { ...highlight, ...box } : highlight
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

interface SelectionPill extends HoverHighlight {
  id: string;
}

const buttonSelectionId = (button: HTMLElement, index: number) =>
  button.id || button.getAttribute('data-test-subj') || `selected-${index}`;

const pillCenter = (
  pill: Pick<SelectionPill, 'x' | 'y' | 'width' | 'height'>
) => ({
  x: pill.x + pill.width / 2,
  y: pill.y + pill.height / 2,
});

const nearestPill = (target: SelectionPill, pills: SelectionPill[]) => {
  const targetCenter = pillCenter(target);
  return pills.reduce<SelectionPill | undefined>((nearest, pill) => {
    if (!nearest) return pill;
    const candidate = pillCenter(pill);
    const current = pillCenter(nearest);
    const candidateDistance =
      (candidate.x - targetCenter.x) ** 2 + (candidate.y - targetCenter.y) ** 2;
    const currentDistance =
      (current.x - targetCenter.x) ** 2 + (current.y - targetCenter.y) ** 2;
    return candidateDistance < currentDistance ? pill : nearest;
  }, undefined);
};

/**
 * Selected pills sit on the pressed buttons. A new selection travels from the
 * nearest selected pill. The first placement does not travel. Hover is not involved.
 */
export const useButtonGroupSelectionTravel = (
  enabled: boolean,
  selectionKey: string
) => {
  const { euiTheme } = useEuiTheme();
  const hideAfter = Math.round(parseFloat(euiTheme.animation.slow ?? ''));
  const containerRef = useRef<HTMLDivElement>(null);
  const placed = useRef(false);
  const pillsRef = useRef<SelectionPill[]>([]);
  const [pills, setPills] = useState<SelectionPill[]>([]);

  const commit = useCallback((next: SelectionPill[]) => {
    pillsRef.current = next;
    setPills(next);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) {
      placed.current = false;
      commit([]);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const previous = pillsRef.current.filter((pill) => pill.visible);
    const buttons = [
      ...container.querySelectorAll<HTMLElement>('[aria-pressed="true"]'),
    ];

    if (!buttons.length) {
      placed.current = false;
      commit(
        previous.map((pill) => ({ ...pill, visible: false, animate: true }))
      );
      return;
    }

    const next = buttons.map((button, index) => ({
      id: buttonSelectionId(button, index),
      ...measureButton(container, button),
      visible: true,
      animate: false,
    }));
    const nextIds = new Set(next.map((pill) => pill.id));
    const previousById = new Map(previous.map((pill) => [pill.id, pill]));
    const staying = previous.filter((pill) => nextIds.has(pill.id));
    const added = next.filter((pill) => !previousById.has(pill.id));
    const removed = previous.filter((pill) => !nextIds.has(pill.id));
    const isFirst = !placed.current;
    const anchors = staying.length ? staying : previous;
    const replacesSingleSelection =
      added.length === 1 && removed.length === 1 && next.length === 1;

    const placedNext = next.map((pill) => {
      if (isFirst || previousById.has(pill.id)) {
        return { ...pill, animate: !isFirst };
      }
      const origin = nearestPill(pill, anchors);
      if (!origin) return pill;
      return {
        ...pill,
        x: origin.x,
        y: origin.y,
        width: origin.width,
        height: origin.height,
        radius: origin.radius,
        animate: true,
      };
    });
    const fading = replacesSingleSelection
      ? []
      : removed.map((pill) => ({ ...pill, visible: false, animate: true }));
    const frame = placedNext.some((pill, index) => {
      const target = next[index];
      return (
        pill.x !== target.x ||
        pill.y !== target.y ||
        pill.width !== target.width ||
        pill.height !== target.height
      );
    })
      ? window.requestAnimationFrame(() => {
          commit([
            ...next.map((pill) => ({ ...pill, animate: true })),
            ...pillsRef.current.filter((pill) => !pill.visible),
          ]);
        })
      : undefined;

    commit([...placedNext, ...fading]);
    placed.current = true;
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [commit, enabled, selectionKey]);

  useEffect(() => {
    if (!pills.some((pill) => pill.visible && !pill.animate)) return;
    const frame = window.requestAnimationFrame(() => {
      setPills((current) => {
        const next = current.map((pill) =>
          pill.visible ? { ...pill, animate: true } : pill
        );
        pillsRef.current = next;
        return next;
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pills]);

  useEffect(() => {
    if (!pills.some((pill) => !pill.visible)) return;
    const timeout = window.setTimeout(() => {
      setPills((current) => {
        const next = current.filter((pill) => pill.visible);
        pillsRef.current = next;
        return next;
      });
    }, hideAfter);
    return () => window.clearTimeout(timeout);
  }, [hideAfter, pills]);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const host = containerRef.current;
      if (!host) return;
      const boxes = new Map(
        [...host.querySelectorAll<HTMLElement>('[aria-pressed="true"]')].map(
          (button, index) => [
            buttonSelectionId(button, index),
            measureButton(host, button),
          ]
        )
      );
      setPills((current) => {
        let changed = false;
        const next = current.map((pill) => {
          const box = boxes.get(pill.id);
          if (!pill.visible || !box) return pill;
          if (
            pill.x === box.x &&
            pill.y === box.y &&
            pill.width === box.width &&
            pill.height === box.height &&
            pill.radius === box.radius
          ) {
            return pill;
          }
          changed = true;
          return { ...pill, ...box };
        });
        if (!changed) return current;
        pillsRef.current = next;
        return next;
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [enabled]);

  return { containerRef, pills };
};
