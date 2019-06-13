import React, { Component, ReactChild } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { Timer } from '../../services/time';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast, EuiToastProps } from './toast';

export const TOAST_FADE_OUT_MS = 250;

export interface Toast extends EuiToastProps {
  id: string;
  text?: ReactChild;
  toastLifeTimeMs?: number;
}

export interface EuiGlobalToastListProps extends CommonProps {
  toasts: Toast[];
  dismissToast: (this: EuiGlobalToastList, toast: Toast) => void;
  toastLifeTimeMs: number;
}

interface State {
  toastIdToDismissedMap: {
    [toastId: string]: boolean;
  };
}

export class EuiGlobalToastList extends Component<
  EuiGlobalToastListProps,
  State
> {
  state: State = {
    toastIdToDismissedMap: {},
  };

  dismissTimeoutIds: number[] = [];
  toastIdToTimerMap: { [toastId: string]: Timer } = {};

  isScrollingToBottom = false;
  isScrolledToBottom = true;
  isUserInteracting = false;

  // See [Return Value](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#Return_value)
  // for information on initial value of 0
  isScrollingAnimationFrame = 0;
  startScrollingAnimationFrame = 0;

  listElement: Element | null = null;

  static defaultProps = {
    toasts: [],
  };

  startScrollingToBottom() {
    this.isScrollingToBottom = true;

    const scrollToBottom = () => {
      // Although we cancel the requestAnimationFrame in componentWillUnmount,
      // it's possible for this.listElement to become null in the meantime
      if (!this.listElement) {
        return;
      }

      const position = this.listElement.scrollTop;
      const destination =
        this.listElement.scrollHeight - this.listElement.clientHeight;
      const distanceToDestination = destination - position;

      if (distanceToDestination < 5) {
        this.listElement.scrollTop = destination;
        this.isScrollingToBottom = false;
        this.isScrolledToBottom = true;
        return;
      }

      this.listElement.scrollTop = position + distanceToDestination * 0.25;

      if (this.isScrollingToBottom) {
        this.isScrollingAnimationFrame = window.requestAnimationFrame(
          scrollToBottom
        );
      }
    };

    this.startScrollingAnimationFrame = window.requestAnimationFrame(
      scrollToBottom
    );
  }

  onMouseEnter = () => {
    // Stop scrolling to bottom if we're in mid-scroll, because the user wants to interact with
    // the list.
    this.isScrollingToBottom = false;
    this.isUserInteracting = true;

    // Don't let toasts dismiss themselves while the user is interacting with them.
    for (const toastId in this.toastIdToTimerMap) {
      if (this.toastIdToTimerMap.hasOwnProperty(toastId)) {
        const timer = this.toastIdToTimerMap[toastId];
        timer.pause();
      }
    }
  };

  onMouseLeave = () => {
    this.isUserInteracting = false;
    for (const toastId in this.toastIdToTimerMap) {
      if (this.toastIdToTimerMap.hasOwnProperty(toastId)) {
        const timer = this.toastIdToTimerMap[toastId];
        timer.resume();
      }
    }
  };

  onScroll = () => {
    if (this.listElement) {
      this.isScrolledToBottom =
        this.listElement.scrollHeight - this.listElement.scrollTop ===
        this.listElement.clientHeight;
    }
  };

  scheduleAllToastsForDismissal = () => {
    this.props.toasts.forEach(toast => {
      if (!this.toastIdToTimerMap[toast.id]) {
        this.scheduleToastForDismissal(toast);
      }
    });
  };

  scheduleToastForDismissal = (toast: Toast) => {
    // Start fading the toast out once its lifetime elapses.
    this.toastIdToTimerMap[toast.id] = new Timer(
      this.dismissToast.bind(this, toast),
      toast.toastLifeTimeMs != null
        ? toast.toastLifeTimeMs
        : this.props.toastLifeTimeMs
    );
  };

  dismissToast = (toast: Toast) => {
    // Remove the toast after it's done fading out.
    this.dismissTimeoutIds.push(
      window.setTimeout(() => {
        // Because this is wrapped in a setTimeout, and because React does not guarantee when
        // state updates happen, it is possible to double-dismiss a toast
        // including by double-clicking the "x" button on the toast
        // so, first check to make sure we haven't already dismissed this toast
        if (this.toastIdToTimerMap.hasOwnProperty(toast.id)) {
          this.props.dismissToast.apply(this, [toast]);
          this.toastIdToTimerMap[toast.id].clear();
          delete this.toastIdToTimerMap[toast.id];

          this.setState(prevState => {
            const toastIdToDismissedMap = {
              ...prevState.toastIdToDismissedMap,
            };
            delete toastIdToDismissedMap[toast.id];

            return {
              toastIdToDismissedMap,
            };
          });
        }
      }, TOAST_FADE_OUT_MS)
    );

    this.setState(prevState => {
      const toastIdToDismissedMap = {
        ...prevState.toastIdToDismissedMap,
        [toast.id]: true,
      };

      return {
        toastIdToDismissedMap,
      };
    });
  };

  componentDidMount() {
    if (this.listElement) {
      this.listElement.addEventListener('scroll', this.onScroll);
      this.listElement.addEventListener('mouseenter', this.onMouseEnter);
      this.listElement.addEventListener('mouseleave', this.onMouseLeave);
    }
    this.scheduleAllToastsForDismissal();
  }

  componentDidUpdate(prevProps: EuiGlobalToastListProps) {
    this.scheduleAllToastsForDismissal();

    if (!this.isUserInteracting) {
      // If the user has scrolled up the toast list then we don't want to annoy them by scrolling
      // all the way back to the bottom.
      if (this.isScrolledToBottom) {
        if (prevProps.toasts.length < this.props.toasts.length) {
          this.startScrollingToBottom();
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.isScrollingAnimationFrame !== 0) {
      window.cancelAnimationFrame(this.isScrollingAnimationFrame);
    }
    if (this.startScrollingAnimationFrame !== 0) {
      window.cancelAnimationFrame(this.startScrollingAnimationFrame);
    }
    if (this.listElement) {
      this.listElement.removeEventListener('scroll', this.onScroll);
      this.listElement.removeEventListener('mouseenter', this.onMouseEnter);
      this.listElement.removeEventListener('mouseleave', this.onMouseLeave);
    }
    this.dismissTimeoutIds.forEach(clearTimeout);
    for (const toastId in this.toastIdToTimerMap) {
      if (this.toastIdToTimerMap.hasOwnProperty(toastId)) {
        const timer = this.toastIdToTimerMap[toastId];
        timer.clear();
      }
    }
  }

  render() {
    const {
      className,
      toasts,
      dismissToast,
      toastLifeTimeMs,
      ...rest
    } = this.props;

    const renderedToasts = toasts.map(toast => {
      const { text, toastLifeTimeMs, ...rest } = toast;

      return (
        <EuiGlobalToastListItem
          key={toast.id}
          isDismissed={this.state.toastIdToDismissedMap[toast.id]}>
          <EuiToast
            onClose={this.dismissToast.bind(this, toast)}
            onFocus={this.onMouseEnter}
            onBlur={this.onMouseLeave}
            {...rest}>
            {text}
          </EuiToast>
        </EuiGlobalToastListItem>
      );
    });

    const classes = classNames('euiGlobalToastList', className);

    return (
      <div
        ref={element => {
          this.listElement = element;
        }}
        className={classes}
        {...rest}>
        {renderedToasts}
      </div>
    );
  }
}
