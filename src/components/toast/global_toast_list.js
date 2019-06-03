import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Timer } from '../../services/time';
import { IconPropType } from '../icon';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast } from './toast';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

export const TOAST_FADE_OUT_MS = 250;
export const TOAST_LOGGER_TIMEOUT_MS = 57000;

export class EuiGlobalToastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toastIdToDismissedMap: {},
    };

    this.dismissTimeoutIds = [];
    this.toastIdToTimerMap = {};

    this.isScrollingToBottom = false;
    this.isScrolledToBottom = true;

    // See [Return Value](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#Return_value)
    // for information on initial value of 0
    this.isScrollingAnimationFrame = 0;
    this.startScrollingAnimationFrame = 0;

    this.renderedForScreenReaderToasts = [];
    this.clearScreenReaderToastStorageID = null;
  }

  static propTypes = {
    className: PropTypes.string,
    toasts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.node,
        text: PropTypes.node,
        color: PropTypes.string,
        iconType: IconPropType,
        toastLifeTimeMs: PropTypes.number,
      }).isRequired
    ),
    dismissToast: PropTypes.func.isRequired,
    toastLifeTimeMs: PropTypes.number.isRequired,
  };

  static defaultProps = {
    toasts: [],
  };

  startScrollingToBottom() {
    this.isScrollingToBottom = true;

    const scrollToBottom = () => {
      // Although we cancel the requestAnimationFrame in componentWillUnmount,
      // it's possible for this.listElement to become null in the meantime
      if (!this.listElement) return;

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
    this.isScrolledToBottom =
      this.listElement.scrollHeight - this.listElement.scrollTop ===
      this.listElement.clientHeight;
  };

  scheduleAllToastsForDismissal = () => {
    this.props.toasts.forEach(toast => {
      if (!this.toastIdToTimerMap[toast.id]) {
        this.scheduleToastForDismissal(toast);
      }
    });
  };

  scheduleToastForDismissal = toast => {
    // Start fading the toast out once its lifetime elapses.
    this.toastIdToTimerMap[toast.id] = new Timer(
      this.dismissToast.bind(this, toast),
      toast.toastLifeTimeMs != null
        ? toast.toastLifeTimeMs
        : this.props.toastLifeTimeMs
    );
  };

  dismissToast = toast => {
    // Remove the toast after it's done fading out.
    this.dismissTimeoutIds.push(
      setTimeout(() => {
        // Because this is wrapped in a setTimeout, and because React does not guarantee when
        // state updates happen, it is possible to double-dismiss a toast
        // including by double-clicking the "x" button on the toast
        // so, first check to make sure we haven't already dismissed this toast
        if (this.toastIdToTimerMap.hasOwnProperty(toast.id)) {
          this.props.dismissToast(toast);
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

  clearScreenReaderToastStorage = () => {
    this.renderedForScreenReaderToasts = [];
    this.forceUpdate();
  };

  getRenderedForScreenReaderToasts = () => {
    return this.renderedForScreenReaderToasts.map(toast => toast.reactElement);
  };

  filterNewOnlyToasts = toasts => {
    return toasts.filter(toastFromProp => {
      const withTheSameID = this.renderedForScreenReaderToasts.some(
        existToast => existToast.id === toastFromProp.id
      );
      return !withTheSameID;
    });
  };

  logSetOfToasts = toasts => {
    // map and filter incoming toasts to get only new ones
    const newToasts = this.filterNewOnlyToasts(toasts).map(newToast => ({
      id: newToast.id,
      reactElement: (
        <Fragment key={newToast.id}>
          <p>
            <EuiI18n
              token="euiGlobalToastList.newNotification"
              default="A new notification appears"
            />
          </p>
          <p>{newToast.title}</p>
          {newToast.text}
        </Fragment>
      ),
    })); // returns element, if element is false, then it excludes the one

    // add new incoming toasts to the stack
    this.renderedForScreenReaderToasts.push(...newToasts);
    // skip previous stack clearing
    clearTimeout(this.clearScreenReaderToastStorageID);
    // Set it to wait 57 seconds after the last notification before clear the stack
    // 27s is the time chosen approx. That time is that Screen Reader needs to finish reading
    // at least the last one notifications.
    // It strictly depends on how long that notifications is.
    this.clearScreenReaderToastStorageID = setTimeout(
      this.clearScreenReaderToastStorage,
      TOAST_LOGGER_TIMEOUT_MS
    );
  };

  componentDidMount() {
    this.listElement.addEventListener('scroll', this.onScroll);
    this.listElement.addEventListener('mouseenter', this.onMouseEnter);
    this.listElement.addEventListener('mouseleave', this.onMouseLeave);
    this.scheduleAllToastsForDismissal();
  }

  componentDidUpdate(prevProps) {
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
    this.listElement.removeEventListener('scroll', this.onScroll);
    this.listElement.removeEventListener('mouseenter', this.onMouseEnter);
    this.listElement.removeEventListener('mouseleave', this.onMouseLeave);
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

    this.logSetOfToasts(toasts);

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
        <EuiScreenReaderOnly>
          <div role="region" aria-live="polite">
            {this.getRenderedForScreenReaderToasts()}
          </div>
        </EuiScreenReaderOnly>
      </div>
    );
  }
}
