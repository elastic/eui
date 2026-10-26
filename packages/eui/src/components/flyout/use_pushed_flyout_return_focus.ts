/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  FocusEvent,
  FocusEventHandler,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import type { EuiFocusTrapProps } from '../focus_trap';
import { PROPERTY_FLYOUT } from './manager/const';
import { isFlyoutInCurrentSession } from './manager/selectors';
import { getFlyoutManagerStore } from './manager/store';

type ReturnFocus = NonNullable<EuiFocusTrapProps['returnFocus']>;

/**
 * Focus returns scheduled by pushed flyouts that just unmounted, keyed by
 * timeout. A flyout mounting before they run (e.g. one remounted by a changed
 * `key`) cancels them, so focus isn't pulled away from a flyout that is open.
 */
const pendingReturnFocus = new Map<ReturnType<typeof setTimeout>, Element>();

/**
 * Step 1, at unmount, before the DOM is removed: whether the user left focus
 * somewhere a return is appropriate. Focus in another flyout passes because
 * that flyout may be closing too; step 2 catches it if not.
 */
const mayReturnFocusOnUnmount = (isFocusOwned: boolean) => {
  const active = document.activeElement;
  return (
    isFocusOwned ||
    !active ||
    active === document.body ||
    !!active.closest('.euiFlyout')
  );
};

/** Step 2, once everything closing alongside the flyout has unmounted. */
const isFocusStranded = () => {
  const active = document.activeElement;
  return !active || active === document.body || !active.isConnected;
};

/**
 * Inactive managed sessions stay mounted but are moved off-screen, so focus
 * inside one would be invisible.
 */
const isInInactiveSession = (element: Element) => {
  const owner = element.closest(`[${PROPERTY_FLYOUT}]`);
  return (
    !!owner &&
    !isFlyoutInCurrentSession(getFlyoutManagerStore().getState(), owner.id)
  );
};

/**
 * A flyout opened while nothing was focused captures `<body>`, which isn't
 * a trigger worth returning to.
 */
const isUsableTrigger = (element: Element | null): element is Element =>
  !!element && element.isConnected && element !== document.body;

/** Step 3: apply `returnFocus` the way `react-focus-lock` does. */
const returnFocusToTrigger = (trigger: Element, returnFocus: ReturnFocus) => {
  const howToReturnFocus =
    typeof returnFocus === 'function' ? returnFocus(trigger) : returnFocus;
  if (
    !howToReturnFocus ||
    !(trigger instanceof HTMLElement) ||
    !isUsableTrigger(trigger) ||
    isInInactiveSession(trigger)
  ) {
    return;
  }

  trigger.focus(
    typeof howToReturnFocus === 'object' ? howToReturnFocus : undefined
  );
};

export interface UsePushedFlyoutReturnFocusParams {
  isPushed: boolean;
  returnFocus: EuiFocusTrapProps['returnFocus'];
  /** The element that was focused when the flyout mounted. */
  triggerRef: MutableRefObject<Element | null>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
}

/**
 * Returns focus to the trigger element when a pushed flyout unmounts.
 *
 * Pushed flyouts disable their `EuiFocusTrap`, so nothing else returns focus
 * for them. Overlay flyouts are skipped because their active trap already
 * does. Focus is returned only when:
 * - the flyout owned focus, or focus was on `<body>` or in another flyout,
 *   when it unmounted, and
 * - after everything closing with it has unmounted, focus is on `<body>` or
 *   a removed element, and
 * - `returnFocus` allows it, and the trigger is connected and not in an
 *   inactive managed session.
 *
 * Returns `onFocus` and `onBlur` handlers for the flyout element, composed
 * with the ones passed in.
 */
export const usePushedFlyoutReturnFocus = ({
  isPushed,
  returnFocus = true,
  triggerRef,
  onFocus: _onFocus,
  onBlur: _onBlur,
}: UsePushedFlyoutReturnFocusParams) => {
  const latest = useRef({ isPushed, returnFocus });
  latest.current.isPushed = isPushed;
  latest.current.returnFocus = returnFocus;

  // React focus events bubble through portals, so this also covers focus in
  // content the flyout renders elsewhere in the DOM, such as popovers and
  // child flyouts.
  const isFocusOwnedRef = useRef(false);
  const onFocus = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      isFocusOwnedRef.current = true;
      _onFocus?.(event);
    },
    [_onFocus]
  );
  const onBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      isFocusOwnedRef.current = false;
      _onBlur?.(event);
    },
    [_onBlur]
  );

  useLayoutEffect(() => {
    // A flyout replacing one that just closed captured its trigger after the
    // closing flyout's DOM was removed, which is `<body>` or a removed
    // element, so take over the closing flyout's trigger.
    pendingReturnFocus.forEach((pendingTrigger, timeout) => {
      clearTimeout(timeout);
      if (
        !isUsableTrigger(triggerRef.current) &&
        isUsableTrigger(pendingTrigger)
      ) {
        triggerRef.current = pendingTrigger;
      }
    });
    pendingReturnFocus.clear();
  }, [triggerRef]);

  // Layout cleanup runs before the DOM is removed, while focus still shows
  // where the user left it.
  useLayoutEffect(
    () => () => {
      const { isPushed, returnFocus } = latest.current;
      const trigger = triggerRef.current;
      if (!isPushed || !returnFocus || !trigger) return;
      if (!mayReturnFocusOnUnmount(isFocusOwnedRef.current)) return;

      // Wait for sibling flyouts in the same history group, portalled
      // content, and child flyout focus traps that pull focus back to
      // themselves before releasing it.
      const timeout = setTimeout(() => {
        pendingReturnFocus.delete(timeout);
        if (isFocusStranded()) returnFocusToTrigger(trigger, returnFocus);
      });
      pendingReturnFocus.set(timeout, trigger);
    },
    [triggerRef]
  );

  return { onFocus, onBlur };
};
