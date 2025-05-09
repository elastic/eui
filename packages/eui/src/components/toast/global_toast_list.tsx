/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { useEuiMemoizedStyles } from '../../services';
import { Timer } from '../../services/time';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast, EuiToastProps } from './toast';
import { euiGlobalToastListStyles } from './global_toast_list.styles';
import { EuiButton } from '../button';
import { EuiI18n } from '../i18n';

type ToastSide = 'right' | 'left';

const sideToClassNameMap: { [side in ToastSide]: string } = {
  left: 'euiGlobalToastList--left',
  right: 'euiGlobalToastList--right',
};

export const SIDES = keysOf(sideToClassNameMap);

export const TOAST_FADE_OUT_MS = 250;

export const CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT = 3;

export interface Toast extends EuiToastProps {
  id: string;
  text?: ReactNode;
  toastLifeTimeMs?: number;
}

export interface EuiGlobalToastListProps extends CommonProps {
  toasts?: Toast[];
  dismissToast: (toast: Toast) => void;
  toastLifeTimeMs: number;
  /**
   * Determines which side of the browser window the toasts should appear
   */
  side?: ToastSide;
  /**
   * At this threshold, a "Clear all" button will display at the bottom of the toast list
   * that allows users to dismiss all toasts in a single click.
   *
   * Defaults to `3`. Set to `0` to disable the button entirely.
   */
  showClearAllButtonAt?: number;
  /**
   * Optional callback that fires when a user clicks the "Clear all" button.
   */
  onClearAllToasts?: () => void;
  /**
   * Defaults to the [log role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/log_role).
   *
   * The [alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role)
   * can be considered only if *all* toasts in this list will require immediate user attention.
   * Several alerts at once, and unnecessary alerts, will a create bad screen reader user experience.
   *
   * @default log
   */
  role?: HTMLAttributes<HTMLElement>['role'];
}

export const EuiGlobalToastList: FunctionComponent<EuiGlobalToastListProps> = ({
  className,
  toasts = [],
  dismissToast: dismissToastProp,
  toastLifeTimeMs,
  onClearAllToasts,
  side = 'right',
  showClearAllButtonAt = CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT,
  ...rest
}) => {
  const [toastIdToDismissedMap, setToastIdToDismissedMap] = useState<{
    [toastId: string]: boolean;
  }>({});
  const [toastsToDismiss, setToastsToDismiss] = useState<Toast[]>([]);

  const prevToasts = useRef<Toast[]>([]);

  const dismissTimeoutIds = useRef<number[]>([]);
  const toastIdToTimerMap = useRef<{ [toastId: string]: Timer }>({});

  const isScrollingToBottom = useRef(false);
  const isScrolledToBottom = useRef(true);
  const isUserInteracting = useRef(false);

  // See [Return Value](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#Return_value)
  // for information on initial value of 0
  const isScrollingAnimationFrame = useRef(0);
  const startScrollingAnimationFrame = useRef(0);

  const listElement = useRef<HTMLDivElement | null>(null);

  const styles = useEuiMemoizedStyles(euiGlobalToastListStyles);
  const cssStyles = [styles.euiGlobalToastList, styles[side]];

  const startScrollingToBottom = useCallback(() => {
    isScrollingToBottom.current = true;

    const scrollToBottom = () => {
      // Although we cancel the requestAnimationFrame in componentWillUnmount,
      // it's possible for this.listElement to become null in the meantime
      if (!listElement.current) {
        return;
      }

      const position = listElement.current.scrollTop;
      const destination =
        listElement.current.scrollHeight - listElement.current.clientHeight;
      const distanceToDestination = destination - position;

      if (distanceToDestination < 5) {
        listElement.current.scrollTop = destination;
        isScrollingToBottom.current = false;
        isScrolledToBottom.current = true;
        return;
      }

      listElement.current.scrollTop = position + distanceToDestination * 0.25;

      if (isScrollingToBottom) {
        isScrollingAnimationFrame.current =
          window.requestAnimationFrame(scrollToBottom);
      }
    };

    startScrollingAnimationFrame.current =
      window.requestAnimationFrame(scrollToBottom);
  }, []);

  const onMouseEnter = useCallback(() => {
    // Stop scrolling to bottom if we're in mid-scroll, because the user wants to interact with
    // the list.
    isScrollingToBottom.current = false;
    isUserInteracting.current = true;

    // Don't let toasts dismiss themselves while the user is interacting with them.
    for (const toastId in toastIdToTimerMap.current) {
      if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
        const timer = toastIdToTimerMap.current[toastId];
        timer.pause();
      }
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    isUserInteracting.current = false;
    for (const toastId in toastIdToTimerMap.current) {
      if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
        const timer = toastIdToTimerMap.current[toastId];
        timer.resume();
      }
    }
  }, []);

  const onScroll = useCallback(() => {
    // Given that this method also gets invoked by the synthetic scroll that happens when a new toast gets added,
    // we want to evaluate if the scroll bottom has been reached only when the user is interacting with the toast,
    // this way we always retain the scroll position the user has set despite adding in new toasts.
    // User interaction is determined through the handler registered for mouseEnter and mouseLeave events.
    if (listElement.current && isUserInteracting.current) {
      isScrolledToBottom.current =
        listElement.current.scrollHeight - listElement.current.scrollTop ===
        listElement.current.clientHeight;
    }
  }, []);

  const dismissToast = useCallback((toast: Toast) => {
    // Remove the toast after it's done fading out.
    dismissTimeoutIds.current.push(
      window.setTimeout(() => {
        setToastsToDismiss((toasts) => [...toasts, toast]);
      }, TOAST_FADE_OUT_MS)
    );

    setToastIdToDismissedMap((prev) => ({
      ...prev,
      [toast.id]: true,
    }));
  }, []);

  const scheduleToastForDismissal = useCallback(
    (toast: Toast) => {
      // Start fading the toast out once its lifetime elapses.
      toastIdToTimerMap.current[toast.id] = new Timer(
        () => dismissToast(toast),
        toast.toastLifeTimeMs != null ? toast.toastLifeTimeMs : toastLifeTimeMs
      );
    },
    [dismissToast, toastLifeTimeMs]
  );

  const scheduleAllToastsForDismissal = useCallback(() => {
    toasts.forEach((toast) => {
      if (!toastIdToTimerMap.current[toast.id]) {
        scheduleToastForDismissal(toast);
      }
    });
  }, [scheduleToastForDismissal, toasts]);

  // componentDidMount
  useEffect(() => {
    const listenerEl = listElement.current;
    if (listenerEl) {
      listenerEl.addEventListener('scroll', onScroll);
      listenerEl.addEventListener('mouseenter', onMouseEnter);
      listenerEl.addEventListener('mouseleave', onMouseLeave);
    }

    // componentWillUnmount
    return () => {
      if (listenerEl) {
        listenerEl.removeEventListener('scroll', onScroll);
        listenerEl.removeEventListener('mouseenter', onMouseEnter);
        listenerEl.removeEventListener('mouseleave', onMouseLeave);
      }
      if (isScrollingAnimationFrame.current !== 0) {
        window.cancelAnimationFrame(isScrollingAnimationFrame.current);
      }
      if (startScrollingAnimationFrame.current !== 0) {
        window.cancelAnimationFrame(startScrollingAnimationFrame.current);
      }
      dismissTimeoutIds.current.forEach(clearTimeout); // eslint-disable-line react-hooks/exhaustive-deps
      for (const toastId in toastIdToTimerMap.current) {
        if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
          const timer = toastIdToTimerMap.current[toastId]; // eslint-disable-line react-hooks/exhaustive-deps
          timer.clear();
        }
      }
    };
  }, [onMouseEnter, onMouseLeave, onScroll]);

  // componentDidUpdate
  useEffect(() => {
    scheduleAllToastsForDismissal();

    if (!isUserInteracting.current) {
      // If the user has scrolled up the toast list then we don't want to annoy them by scrolling
      // all the way back to the bottom.
      if (isScrolledToBottom.current) {
        if (prevToasts.current.length < toasts.length) {
          startScrollingToBottom();
        }
      }
    }
    prevToasts.current = toasts;
  }, [toasts, scheduleAllToastsForDismissal, startScrollingToBottom]);

  // Toast dismissal side effect
  // Ensure the callback has correct state by not enclosing it in `setTimeout`
  useEffect(() => {
    toastsToDismiss.forEach((toast) => {
      // Because this is triggered by a setTimeout, and because React does not guarantee when
      // state updates happen, it is possible to double-dismiss a toast
      // including by double-clicking the "x" button on the toast
      // so, first check to make sure we haven't already dismissed this toast
      if (toast && toastIdToTimerMap.current.hasOwnProperty(toast.id)) {
        dismissToastProp(toast);
        toastIdToTimerMap.current[toast.id].clear();
        delete toastIdToTimerMap.current[toast.id];

        setToastIdToDismissedMap((prev) => {
          const toastIdToDismissedMap = {
            ...prev,
          };
          delete toastIdToDismissedMap[toast.id];

          return toastIdToDismissedMap;
        });
      }
    });
  }, [toastsToDismiss, dismissToastProp]);

  const renderedToasts = useMemo(
    () =>
      toasts.map((toast) => {
        const { text, toastLifeTimeMs, ...rest } = toast;
        const onClose = () => dismissToast(toast);

        return (
          <EuiGlobalToastListItem
            key={toast.id}
            isDismissed={toastIdToDismissedMap[toast.id]}
          >
            <EuiToast
              onClose={onClose}
              onFocus={onMouseEnter}
              onBlur={onMouseLeave}
              {...rest}
            >
              {text}
            </EuiToast>
          </EuiGlobalToastListItem>
        );
      }),
    [toasts, toastIdToDismissedMap, dismissToast, onMouseEnter, onMouseLeave]
  );

  const clearAllButton = useMemo(() => {
    if (
      toasts.length &&
      showClearAllButtonAt &&
      toasts.length >= showClearAllButtonAt
    ) {
      return (
        <EuiI18n
          key="euiClearAllToasts"
          tokens={[
            'euiGlobalToastList.clearAllToastsButtonAriaLabel',
            'euiGlobalToastList.clearAllToastsButtonDisplayText',
          ]}
          defaults={['Clear all toast notifications', 'Clear all']}
        >
          {([
            clearAllToastsButtonAriaLabel,
            clearAllToastsButtonDisplayText,
          ]: string[]) => (
            <EuiGlobalToastListItem isDismissed={false}>
              <EuiButton
                fill
                color="text"
                onClick={() => {
                  toasts.forEach((toast) => dismissToastProp(toast));
                  onClearAllToasts?.();
                }}
                css={styles.euiGlobalToastListDismissButton}
                aria-label={clearAllToastsButtonAriaLabel}
                data-test-subj="euiClearAllToastsButton"
              >
                {clearAllToastsButtonDisplayText}
              </EuiButton>
            </EuiGlobalToastListItem>
          )}
        </EuiI18n>
      );
    }
  }, [
    showClearAllButtonAt,
    onClearAllToasts,
    toasts,
    dismissToastProp,
    styles,
  ]);

  const classes = classNames('euiGlobalToastList', className);

  return (
    <div
      aria-live="polite"
      role="log"
      ref={listElement}
      css={cssStyles}
      className={classes}
      {...rest}
    >
      {renderedToasts}
      {clearAllButton}
    </div>
  );
};
