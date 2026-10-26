/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RefObject, useCallback, useLayoutEffect, useRef } from 'react';
import { useIsWithinMinBreakpoint, useEuiTheme } from '../../services';
import type { EuiFocusTrapProps } from '../focus_trap';
import { EuiFlyoutProps } from './flyout';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { DEFAULT_PUSH_MIN_BREAKPOINT, DEFAULT_TYPE } from './const';
import { PROPERTY_FLYOUT } from './manager/const';
import { getFlyoutManagerStore } from './manager/store';

/**
 * Determines if a flyout should be rendered in a "pushed" state based on its
 * configuration and the current window or container size.
 */
export const useIsPushed = (
  props: Pick<EuiFlyoutProps, 'type' | 'pushMinBreakpoint'> & {
    containerWidth?: number;
  }
) => {
  const {
    type = DEFAULT_TYPE,
    pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
  } = usePropsWithComponentDefaults('EuiFlyout', props);

  const {
    euiTheme: { breakpoint: breakpoints },
  } = useEuiTheme();

  // Always called to satisfy React hook rules; used as fallback
  // when no container width is provided or the breakpoint key is
  // not present on the theme.
  const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(pushMinBreakpoint);

  const minWidth = breakpoints[pushMinBreakpoint];
  const isLargeEnoughToPush =
    props.containerWidth != null && minWidth != null
      ? props.containerWidth >= minWidth
      : windowIsLargeEnoughToPush;

  return type === 'push' && isLargeEnoughToPush;
};

/**
 * Whether the element is inside a managed flyout that isn't part of the
 * current session. Those flyouts stay mounted but are moved off-screen, so
 * focusing inside one leaves keyboard focus invisible.
 */
const isInInactiveSession = (element: Element) => {
  const owner = element.closest(`[${PROPERTY_FLYOUT}]`);
  if (!owner) return false;

  const { sessions } = getFlyoutManagerStore().getState();
  const currentSession = sessions[sessions.length - 1];
  return (
    currentSession?.mainFlyoutId !== owner.id &&
    currentSession?.childFlyoutId !== owner.id
  );
};

export interface UsePushedFlyoutReturnFocusParams {
  isPushed: boolean;
  returnFocus: EuiFocusTrapProps['returnFocus'];
  /** The element that was focused when the flyout mounted. */
  triggerRef: RefObject<Element | null>;
}

/**
 * Returns focus to the trigger element when a pushed flyout unmounts.
 *
 * Pushed flyouts disable their `EuiFocusTrap`, so nothing else returns focus
 * for them. Overlay flyouts are skipped because their active trap already
 * does, and `returnFocus` is interpreted the same way the trap does.
 *
 * Returns focus handlers to put on the flyout element.
 */
export const usePushedFlyoutReturnFocus = ({
  isPushed,
  returnFocus = true,
  triggerRef,
}: UsePushedFlyoutReturnFocusParams) => {
  const latest = useRef({ isPushed, returnFocus });
  latest.current.isPushed = isPushed;
  latest.current.returnFocus = returnFocus;

  // React focus events bubble through portals, so this also covers focus in
  // content the flyout renders elsewhere in the DOM, such as popovers and
  // child flyouts.
  const isFocusOwnedRef = useRef(false);
  const onFocus = useCallback(() => {
    isFocusOwnedRef.current = true;
  }, []);
  const onBlur = useCallback(() => {
    isFocusOwnedRef.current = false;
  }, []);

  // Layout cleanup runs before the DOM is removed, while focus still shows
  // where the user left it.
  useLayoutEffect(
    () => () => {
      const { isPushed, returnFocus } = latest.current;
      const trigger = triggerRef.current;

      if (!isPushed || !returnFocus || !trigger) return;

      // Pushed flyouts don't trap focus, so leave it alone if the user moved
      // it elsewhere on the page. Focus in another flyout is allowed through:
      // that flyout may be closing too, and the check below catches it if not.
      const active = document.activeElement;
      const mayReturnFocus =
        isFocusOwnedRef.current ||
        !active ||
        active === document.body ||
        !!active.closest('.euiFlyout');
      if (!mayReturnFocus) return;

      // Decide once everything closing alongside the flyout has unmounted:
      // sibling flyouts in the same history group, portalled content, and
      // child flyout focus traps that pull focus back to themselves before
      // releasing it.
      setTimeout(() => {
        const active = document.activeElement;
        if (active && active !== document.body && active.isConnected) return;

        const howToReturnFocus =
          typeof returnFocus === 'function'
            ? returnFocus(trigger)
            : returnFocus;
        if (
          !howToReturnFocus ||
          !(trigger instanceof HTMLElement) ||
          !trigger.isConnected ||
          trigger === document.body ||
          isInInactiveSession(trigger)
        ) {
          return;
        }

        trigger.focus(
          typeof howToReturnFocus === 'object' ? howToReturnFocus : undefined
        );
      });
    },
    [triggerRef]
  );

  return { onFocus, onBlur };
};
