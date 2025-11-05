/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type Listener = () => void;

const listeners: Set<Listener> = new Set();

/**
 * Subscribes a listener function to be called whenever focus trap updates are published.
 *
 * @param listener The function to be called on updates.
 * @returns A function that, when called, will unsubscribe the listener. Please remember
 * to call this function for proper cleanup.
 * @example
 * ```tsx
 * useEffect(() => {
 *   const unsubscribe = focusTrapPubSub.subscribe(() => {
 *     console.log('focus trap updated');
 *   });
 *
 *   return () => unsubscribe();
 * }, []);
 * ```
 */
const subscribe = (listener: Listener) => {
  listeners.add(listener);

  return () => unsubscribe(listener);
};

/**
 * Unsubscribes a listener from the focus trap PubSub service.
 *
 * @param listener The function to unsubscribe.
 */
const unsubscribe = (listener: Listener) => {
  listeners.delete(listener);
};

/**
 * Publishes an event to all subscribed listeners, signaling that
 * components managing focus traps should re-evaluate their tracked elements.
 */
const publish = () => {
  listeners.forEach((listener) => listener());
};

/**
 * A lightweight, global PubSub service for loose coupling of components
 * that need to interact with the same focus trap.
 *
 * This allows a component (like `EuiPopover`) to be rendered in a React Portal
 * and still be included in the focus trap of another component (like `EuiFlyout`)
 * without either component needing a direct reference to the other.
 *
 * How it works:
 *
 * 1. A container component (e.g., `EuiFlyout`) `subscribe`s to this service on mount.
 * 2. An ephemeral component (e.g., `EuiPopover`) calls `publish` when its state
 *    changes in a way that affects the DOM (e.g., opening, closing, unmounting).
 * 3. The container component's subscribed callback fires, causing it to re-query
 *    the DOM for any elements it should include in its focus trap.
 */
export const focusTrapPubSub = {
  subscribe,
  unsubscribe,
  publish,
};
