/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { Timer } from '../../services/time';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast, EuiToastProps } from './toast';
import { euiGlobalToastListStyles } from './global_toast_list.styles';
import { EuiButton } from '../button';
import { EuiI18n } from '../i18n';
import { EuiNotificationBadge } from '../badge';

type ToastSide = 'right' | 'left';

const sideToClassNameMap: { [side in ToastSide]: string } = {
  left: 'euiGlobalToastList--left',
  right: 'euiGlobalToastList--right',
};

export const SIDES = keysOf(sideToClassNameMap);

export const TOAST_FADE_OUT_MS = 250;

export const CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT = 3;

/** How many toasts stay visible in the collapsed stack. The rest appear on hover. */
export const STACK_VISIBLE_TOASTS = 3;

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
  /**
   * Renders a notification badge indicating the amount of toasts in the list.
   *
   * @default false
   */
  showNotificationBadge?: boolean;
  /**
   * Collapses the list into a stack of the three newest toasts at the bottom
   * corner. The newest sits in front and carries the notification badge with
   * the full count. Hovering or focusing the list expands every toast so each
   * one can be dismissed. Clear all stays below the stack.
   *
   * Set to `false` for a vertical list of every toast.
   *
   * @default true
   */
  stacked?: boolean;
}

/**
 * @see {@link https://eui.elastic.co/docs/components/display/toast/|EuiGlobalToastList documentation}
 */
export const EuiGlobalToastList: FunctionComponent<EuiGlobalToastListProps> = ({
  className,
  toasts = [],
  dismissToast: dismissToastProp,
  toastLifeTimeMs,
  onClearAllToasts,
  side = 'right',
  showClearAllButtonAt = CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT,
  showNotificationBadge = false,
  stacked = true,
  ...rest
}) => {
  const [toastIdToDismissedMap, setToastIdToDismissedMap] = useState<{
    [toastId: string]: boolean;
  }>({});
  const [toastsToDismiss, setToastsToDismiss] = useState<Toast[]>([]);
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const stackElement = useRef<HTMLDivElement | null>(null);
  const toastHeightsRef = useRef<Record<string, number>>({});
  const [toastHeights, setToastHeights] = useState<Record<string, number>>({});

  const prevToasts = useRef<Toast[]>([]);

  const dismissTimeoutIds = useRef<number[]>([]);
  const toastIdToTimerMap = useRef<{ [toastId: string]: Timer }>({});

  const isScrollingToBottom = useRef(false);
  const isScrolledToBottom = useRef(true);
  const isPinningScroll = useRef(false);
  const isUserInteracting = useRef(false);

  // See [Return Value](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#Return_value)
  // for information on initial value of 0
  const isScrollingAnimationFrame = useRef(0);
  const startScrollingAnimationFrame = useRef(0);

  const listElement = useRef<HTMLDivElement | null>(null);

  const { euiTheme } = useEuiTheme();
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
    // Opening a long stack starts at the newest toast. Scrolling up opts out.
    isScrolledToBottom.current = true;

    // Don't let toasts dismiss themselves while the user is interacting with them.
    for (const toastId in toastIdToTimerMap.current) {
      if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
        const timer = toastIdToTimerMap.current[toastId];
        timer.pause();
      }
    }

    setIsStackExpanded(true);
  }, []);

  const resumeDismissTimers = useCallback(() => {
    isUserInteracting.current = false;
    for (const toastId in toastIdToTimerMap.current) {
      if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
        const timer = toastIdToTimerMap.current[toastId];
        timer.resume();
      }
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    resumeDismissTimers();

    if (listElement.current?.contains(document.activeElement)) {
      return;
    }
    setIsStackExpanded(false);
  }, [resumeDismissTimers]);

  // Blurring a toast also resumes its timer. Don't collapse the stack when
  // the pointer is still over the list.
  const onToastBlur = useCallback(() => {
    resumeDismissTimers();

    const list = listElement.current;
    if (list?.matches(':hover') || list?.contains(document.activeElement)) {
      return;
    }
    setIsStackExpanded(false);
  }, [resumeDismissTimers]);

  const onFocusIn = useCallback(() => {
    isScrolledToBottom.current = true;
    setIsStackExpanded(true);
  }, []);

  const onFocusOut = useCallback((event: FocusEvent) => {
    const next = event.relatedTarget;
    if (next instanceof Node && listElement.current?.contains(next)) {
      return;
    }
    if (listElement.current?.matches(':hover')) {
      return;
    }
    setIsStackExpanded(false);
  }, []);

  const onScroll = useCallback(() => {
    // The open stack pins itself to the bottom while its height eases open.
    // That write fires this handler and must not count as the user scrolling away.
    if (isPinningScroll.current) {
      isPinningScroll.current = false;
      return;
    }
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
      listenerEl.addEventListener('focusin', onFocusIn);
      listenerEl.addEventListener('focusout', onFocusOut);
    }

    // componentWillUnmount
    return () => {
      if (listenerEl) {
        listenerEl.removeEventListener('scroll', onScroll);
        listenerEl.removeEventListener('mouseenter', onMouseEnter);
        listenerEl.removeEventListener('mouseleave', onMouseLeave);
        listenerEl.removeEventListener('focusin', onFocusIn);
        listenerEl.removeEventListener('focusout', onFocusOut);
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
  }, [onMouseEnter, onMouseLeave, onFocusIn, onFocusOut, onScroll]);

  // Read each toast's natural height. The stack shell is clipped, so this
  // node is what reports the full card size.
  useLayoutEffect(() => {
    if (!stacked) {
      return;
    }
    const stack = stackElement.current;
    if (!stack) {
      return;
    }

    const read = () => {
      const next = { ...toastHeightsRef.current };
      const seen = new Set<string>();
      let changed = false;
      stack
        .querySelectorAll<HTMLElement>('[data-toast-measure]')
        .forEach((node) => {
          const id = node.dataset.toastMeasure;
          if (!id) {
            return;
          }
          seen.add(id);
          // Layout height, so the scale on the cards behind the front one
          // does not shrink the number we animate back to.
          const height = node.offsetHeight;
          if (height > 0 && next[id] !== height) {
            next[id] = height;
            changed = true;
          }
        });
      for (const id of Object.keys(next)) {
        if (!seen.has(id)) {
          delete next[id];
          changed = true;
        }
      }
      if (!changed) {
        return;
      }
      toastHeightsRef.current = next;
      setToastHeights(next);
    };

    read();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(read);
    stack
      .querySelectorAll<HTMLElement>('[data-toast-measure]')
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stacked, toasts]);

  // While the pile is open, keep a list taller than the screen on the newest
  // toast. The observer only runs when the stack box actually changes size,
  // which is the open and close. Scrolling up opts out until the pointer returns.
  useLayoutEffect(() => {
    if (!stacked || !isStackExpanded) {
      return;
    }
    const list = listElement.current;
    const stack = stackElement.current;
    if (!list || !stack) {
      return;
    }

    const pinToBottom = () => {
      if (!isScrolledToBottom.current) {
        return;
      }
      const maxScroll = list.scrollHeight - list.clientHeight;
      if (list.scrollTop === maxScroll) {
        return;
      }
      isPinningScroll.current = true;
      list.scrollTop = maxScroll;
    };

    pinToBottom();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(pinToBottom);
    observer.observe(stack);
    return () => observer.disconnect();
  }, [stacked, isStackExpanded]);

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

  const notificationBadge = useMemo(() => {
    const badgeToast = stacked ? toasts[toasts.length - 1] : toasts[0];
    const toastWasDismissed = toastIdToDismissedMap[badgeToast?.id] ?? false;
    const isListEmpty = toasts.every((t) => toastIdToDismissedMap[t.id]);

    return (
      showNotificationBadge &&
      toasts.length > 0 && (
        <EuiNotificationBadge
          className="euiGlobalToastList__countBadge"
          css={[
            styles.notificationBadge.notificationBadge,
            toastWasDismissed && styles.notificationBadge.hasFadeOut,
            isListEmpty && styles.notificationBadge.hasFadeOut,
          ]}
          size="m"
          color="subdued"
          data-test-subj="euiGlobalToastListNotificationBadge"
        >
          {toasts.length}
        </EuiNotificationBadge>
      )
    );
  }, [showNotificationBadge, stacked, toasts, toastIdToDismissedMap, styles]);

  const renderedToasts = useMemo(() => {
    const renderToast = (toast: Toast) => {
      const { text, toastLifeTimeMs: perToastLifeTimeMs, ...toastRest } = toast;
      const effectiveLifeTimeMs = perToastLifeTimeMs ?? toastLifeTimeMs;

      return (
        <EuiToast
          onClose={() => dismissToast(toast)}
          onFocus={onMouseEnter}
          onBlur={onToastBlur}
          {...toastRest}
          animationMs={effectiveLifeTimeMs}
          text={text}
        />
      );
    };

    if (!stacked) {
      return toasts.map((toast) => (
        <EuiGlobalToastListItem
          key={toast.id}
          isDismissed={toastIdToDismissedMap[toast.id]}
        >
          {renderToast(toast)}
        </EuiGlobalToastListItem>
      ));
    }

    const peek = Number.parseFloat(euiTheme.size.m);
    const gap = Number.parseFloat(euiTheme.size.base);
    const heights = toasts.map((toast) => toastHeights[toast.id] ?? 0);
    const count = heights.length;
    if (count === 0) {
      return [];
    }
    const frontHeight = heights[count - 1] ?? 0;
    const expandedOffsets = new Array<number>(count);
    let cursor = 0;
    for (let index = count - 1; index >= 0; index--) {
      expandedOffsets[index] = cursor;
      cursor += (heights[index] || frontHeight) + gap;
    }
    const expandedHeight = count > 0 ? cursor - gap : 0;
    const collapsedHeight =
      count > 0
        ? frontHeight + peek * Math.min(STACK_VISIBLE_TOASTS - 1, count - 1)
        : 0;
    const stackHeight = isStackExpanded ? expandedHeight : collapsedHeight;

    return [
      <div
        key="euiGlobalToastListStack"
        ref={stackElement}
        css={styles.stack}
        data-test-subj="euiGlobalToastListStack"
        data-expanded={isStackExpanded || undefined}
        style={stackHeight > 0 ? { height: stackHeight } : undefined}
      >
        {toasts.map((toast, index) => {
          // Newest toast is the front of the pile, sitting on the bottom edge.
          const depth = count - 1 - index;
          const isFront = depth === 0;
          const isHidden = !isStackExpanded && depth >= STACK_VISIBLE_TOASTS;
          const clampedDepth = Math.min(depth, STACK_VISIBLE_TOASTS - 1);
          const lift = isStackExpanded
            ? expandedOffsets[index]
            : peek * clampedDepth;
          const scale = isStackExpanded ? 1 : 1 - clampedDepth * 0.05;
          const height =
            isFront || isStackExpanded ? heights[index] : frontHeight;

          return (
            <EuiGlobalToastListItem
              key={toast.id}
              isDismissed={toastIdToDismissedMap[toast.id]}
              animateIn={false}
            >
              <div
                css={[styles.stackItem.item, isFront && styles.stackItem.front]}
                style={
                  {
                    zIndex: count - depth,
                    transform: `translateY(${-lift}px) scale(${scale})`,
                    height: height > 0 ? height : undefined,
                    opacity: isHidden ? 0 : 1,
                    pointerEvents:
                      !isFront && !isStackExpanded ? 'none' : 'auto',
                  } as CSSProperties
                }
                data-test-subj="euiGlobalToastListStackItem"
                data-stack-front={isFront || undefined}
                data-stack-hidden={isHidden || undefined}
                aria-hidden={(!isFront && !isStackExpanded) || undefined}
                // @ts-expect-error - inert is not in the React TS defs yet
                inert={!isFront && !isStackExpanded ? '' : undefined}
              >
                {isFront ? notificationBadge : null}
                <div
                  css={styles.stackItem.measure}
                  data-toast-measure={toast.id}
                >
                  {renderToast(toast)}
                </div>
              </div>
            </EuiGlobalToastListItem>
          );
        })}
      </div>,
    ];
  }, [
    stacked,
    isStackExpanded,
    toasts,
    toastIdToDismissedMap,
    dismissToast,
    onMouseEnter,
    onToastBlur,
    toastLifeTimeMs,
    styles,
    notificationBadge,
    euiTheme,
    toastHeights,
  ]);

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
                fullWidth
                size="s"
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

  const hasContent = renderedToasts.length > 0 || clearAllButton != null;

  return (
    <div
      aria-live="polite"
      role="log"
      ref={listElement}
      css={cssStyles}
      className={classes}
      {...rest}
    >
      {hasContent && (
        <div css={styles.content}>
          {!stacked && notificationBadge}
          {renderedToasts}
          {clearAllButton}
        </div>
      )}
    </div>
  );
};
