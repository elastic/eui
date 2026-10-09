/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';

/**
 * Container name that breakpoint mixins query when `EuiProvider` `breakpointContainer` is set
 */
export const EUI_BREAKPOINT_CONTAINER = 'euiBreakpointContainer';

/**
 * Marks an element as a breakpoint container for the JS breakpoint hooks, which measure it for content rendered inside it.
 * Pair it with the `euiBreakpointContainer` style mixin, which makes the element a CSS container.
 */
export const EUI_BREAKPOINT_CONTAINER_ATTRIBUTE =
  'data-eui-breakpoint-container';

/**
 * Nearest breakpoint container of the current React root or portal.
 * `undefined` when `EuiProvider` `breakpointContainer` isn't set, in which case breakpoints follow the viewport.
 * `null` when only CSS follows containers, in which case the JS hooks follow the viewport.
 */
export const EuiBreakpointContainerContext = createContext<
  HTMLElement | null | undefined
>(undefined);

// `body` is always a container when the option is on, so every element resolves to one.
export const getEuiBreakpointContainer = (
  element?: Element | null
): HTMLElement =>
  element?.closest<HTMLElement>(`[${EUI_BREAKPOINT_CONTAINER_ATTRIBUTE}]`) ??
  document.body;

// Container queries measure the content box, so the JS side does too.
export const getContentInlineSize = (element: HTMLElement) => {
  const { paddingLeft, paddingRight } = getComputedStyle(element);
  return (
    element.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
  );
};

type InlineSizeListener = (inlineSize: number) => void;

const listeners = new Map<Element, Set<InlineSizeListener>>();
let resizeObserver: ResizeObserver | undefined;

// One observer for all breakpoint providers; portals and roots usually share a container.
export const observeInlineSize = (
  element: HTMLElement,
  listener: InlineSizeListener
) => {
  resizeObserver ??= new ResizeObserver((entries) => {
    entries.forEach(({ target, contentBoxSize }) => {
      const inlineSize = contentBoxSize[0].inlineSize;
      listeners.get(target)?.forEach((callback) => callback(inlineSize));
    });
  });

  let elementListeners = listeners.get(element);
  if (!elementListeners) {
    elementListeners = new Set();
    listeners.set(element, elementListeners);
    resizeObserver.observe(element);
  }
  elementListeners.add(listener);

  return () => {
    elementListeners.delete(listener);
    if (!elementListeners.size) {
      listeners.delete(element);
      resizeObserver?.unobserve(element);
    }
  };
};
