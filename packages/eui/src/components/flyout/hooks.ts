/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RefObject, useLayoutEffect, useRef } from 'react';
import { useIsWithinMinBreakpoint, useEuiTheme } from '../../services';
import type { EuiFocusTrapProps } from '../focus_trap';
import { EuiFlyoutProps } from './flyout';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { DEFAULT_PUSH_MIN_BREAKPOINT, DEFAULT_TYPE } from './const';

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

export interface UsePushedFlyoutReturnFocusParams {
  isPushed: boolean;
  returnFocus: EuiFocusTrapProps['returnFocus'];
  /** The element that was focused when the flyout mounted. */
  triggerRef: RefObject<Element | null>;
  flyoutRef: RefObject<HTMLElement | null>;
  /** The `id` of the managed child flyout in this flyout's session, if any. */
  childFlyoutId?: string | null;
}

/**
 * Returns focus to the trigger element when a pushed flyout unmounts.
 *
 * Pushed flyouts disable their `EuiFocusTrap`, so nothing else returns focus
 * for them. Overlay flyouts are skipped because their active trap already
 * does, and `returnFocus` is interpreted the same way the trap does.
 */
export const usePushedFlyoutReturnFocus = ({
  isPushed,
  returnFocus = true,
  triggerRef,
  flyoutRef,
  childFlyoutId,
}: UsePushedFlyoutReturnFocusParams) => {
  const latest = useRef({ isPushed, returnFocus, childFlyoutId });
  latest.current.isPushed = isPushed;
  latest.current.returnFocus = returnFocus;
  // Closing a session removes it from the manager before the flyouts
  // unmount, so keep the last known child to recognize focus left inside it.
  if (childFlyoutId) {
    latest.current.childFlyoutId = childFlyoutId;
  }

  // Layout cleanup runs before the flyout's DOM nodes are removed, while
  // focus can still be found inside them.
  useLayoutEffect(
    () => () => {
      const { isPushed, returnFocus, childFlyoutId } = latest.current;
      const trigger = triggerRef.current;

      if (!isPushed || !returnFocus) return;
      if (
        !(trigger instanceof HTMLElement) ||
        !trigger.isConnected ||
        trigger === document.body
      ) {
        return;
      }

      // Pushed flyouts don't trap focus, so leave it alone if the user moved
      // it elsewhere on the page.
      const active = document.activeElement;
      const isFocusStranded = !active || active === document.body;
      const isFocusInFlyout =
        !!active &&
        (!!flyoutRef.current?.contains(active) ||
          (!!childFlyoutId &&
            !!document.getElementById(childFlyoutId)?.contains(active)));
      if (!isFocusStranded && !isFocusInFlyout) return;

      const howToReturnFocus =
        typeof returnFocus === 'function' ? returnFocus(trigger) : returnFocus;
      if (!howToReturnFocus) return;

      // A child flyout's focus trap unmounting in the same commit would pull
      // focus back into itself, then asynchronously return it to an element
      // that has been removed. Wait until both have settled.
      setTimeout(() => {
        const active = document.activeElement;
        const isStillStranded =
          !active || active === document.body || !active.isConnected;
        if (!isStillStranded || !trigger.isConnected) return;

        trigger.focus(
          typeof howToReturnFocus === 'object' ? howToReturnFocus : undefined
        );
      });
    },
    [triggerRef, flyoutRef]
  );
};
