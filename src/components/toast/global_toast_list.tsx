/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactChild,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { useEuiTheme } from '../../services';
import { Timer } from '../../services/time';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast, EuiToastProps } from './toast';
import { euiGlobalToastListStyles } from './global_toast_list.styles';

type ToastSide = 'right' | 'left';

const sideToClassNameMap: { [side in ToastSide]: string } = {
  left: 'euiGlobalToastList--left',
  right: 'euiGlobalToastList--right',
};

export const SIDES = keysOf(sideToClassNameMap);

export const TOAST_FADE_OUT_MS = 250;

export interface Toast extends EuiToastProps {
  id: string;
  text?: ReactChild;
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
}

export const EuiGlobalToastList: FunctionComponent<EuiGlobalToastListProps> = ({
  className,
  toasts = [],
  dismissToast: dismissToastProp,
  toastLifeTimeMs,
  side = 'right',
  ...rest
}) => {
  const [toastIdToDismissedMap, setToastIdToDismissedMap] = useState<{
    [toastId: string]: boolean;
  }>({});
  const [toastToDismiss, setToastToDismiss] = useState<Toast>();

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

  const euiTheme = useEuiTheme();
  const styles = euiGlobalToastListStyles(euiTheme);
  const cssStyles = [styles.euiGlobalToastList, styles[side]];

  const startScrollingToBottom = () => {
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
        isScrollingAnimationFrame.current = window.requestAnimationFrame(
          scrollToBottom
        );
      }
    };

    startScrollingAnimationFrame.current = window.requestAnimationFrame(
      scrollToBottom
    );
  };

  const onMouseEnter = () => {
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
  };

  const onMouseLeave = () => {
    isUserInteracting.current = false;
    for (const toastId in toastIdToTimerMap.current) {
      if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
        const timer = toastIdToTimerMap.current[toastId];
        timer.resume();
      }
    }
  };

  const onScroll = () => {
    if (listElement.current) {
      isScrolledToBottom.current =
        listElement.current.scrollHeight - listElement.current.scrollTop ===
        listElement.current.clientHeight;
    }
  };

  const dismissToast = useCallback((toast: Toast) => {
    // Remove the toast after it's done fading out.
    dismissTimeoutIds.current.push(
      window.setTimeout(() => {
        setToastToDismiss(toast);
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

  const addListeners = () => {
    if (listElement.current) {
      listElement.current.addEventListener('scroll', onScroll);
      listElement.current.addEventListener('mouseenter', onMouseEnter);
      listElement.current.addEventListener('mouseleave', onMouseLeave);
    }
  };

  const removeListeners = () => {
    if (listElement.current) {
      listElement.current.removeEventListener('scroll', onScroll);
      listElement.current.removeEventListener('mouseenter', onMouseEnter);
      listElement.current.removeEventListener('mouseleave', onMouseLeave);
    }
  };

  // componentDidMount
  useEffect(() => {
    addListeners();

    // componentWillUnmount
    return () => {
      if (isScrollingAnimationFrame.current !== 0) {
        window.cancelAnimationFrame(isScrollingAnimationFrame.current);
      }
      if (startScrollingAnimationFrame.current !== 0) {
        window.cancelAnimationFrame(startScrollingAnimationFrame.current);
      }
      removeListeners();
      dismissTimeoutIds.current.forEach(clearTimeout); // eslint-disable-line react-hooks/exhaustive-deps
      for (const toastId in toastIdToTimerMap.current) {
        if (toastIdToTimerMap.current.hasOwnProperty(toastId)) {
          const timer = toastIdToTimerMap.current[toastId]; // eslint-disable-line react-hooks/exhaustive-deps
          timer.clear();
        }
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [toasts, scheduleAllToastsForDismissal]);

  // Toast dismissal side effect
  // Ensure the callback has correct state by not enclosing it in `setTimeout`
  useEffect(() => {
    const toast = toastToDismiss;
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
  }, [toastToDismiss, dismissToastProp]);

  const renderedToasts = toasts.map((toast) => {
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
  });

  const classes = classNames('euiGlobalToastList', className);

  return (
    <div
      aria-live="polite"
      role="region"
      ref={listElement}
      css={cssStyles}
      className={classes}
      {...rest}
    >
      {renderedToasts}
    </div>
  );
};
