import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Timer } from '../../services/time';
import { IconPropType } from '../icon';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast } from './toast';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiDelayRender } from '../delay_render';
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

    this.lastRenderedForScreenReaderToast = { id: -1 };
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
        screenReaderOnly: PropTypes.bool,
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

  handleScreenReaderToastLoggerUpdating = toasts => {

    if (!toasts.length) {
      // show what we have now to avoid node re-rendering
      return this.lastRenderedForScreenReaderToast.reactElement;
    }

    // get the highest (latest) ID
    // TODO: should we update the docs for using only numberic IDs?
    // Numberic IDs are used all across the Kibana
    // Otherwise, it's hard to decide between too toasts
    // where one of them has number ID while the other -- string
    // Also, documentation example uses numberic IDs
    const toastIDS = toasts.filter(({id}) => typeof id === 'number').map(({id}) => id);
    const latestToastID = Math.max(...toastIDS);
    const lastToast = this.lastRenderedForScreenReaderToast;

    // check the local toast
    const locallyStored = lastToast.id >= latestToastID;

    if (locallyStored) {
      // if locally stored, then render without delay
      return lastToast.reactElement || null;
    }

    // if not locally stored, then
    // update local copy
    // and render with delay
    const newLastToasts = toasts
      .filter(toast => toast.id === latestToastID)
      .map(toast => ({
        id: toast.id,
        reactElement: (
          <Fragment key={toast.id}>
            <p>
              <EuiI18n
                token="euiGlobalToastList.newNotification"
                default="A new notification appears"
              />
            </p>
            <p>{toast.title}</p>
            <div>{toast.text}</div>
          </Fragment>
        ),
      }));

    this.lastRenderedForScreenReaderToast = newLastToasts.slice(-1)[0];

    return (
      <EuiDelayRender>
        {this.lastRenderedForScreenReaderToast.reactElement}
      </EuiDelayRender>
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

    const renderedToasts = toasts.map(toast => {
      const { text, toastLifeTimeMs, ...rest } = toast;

      return toast.screenReaderOnly ? null : (
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
        {...rest}
      >
        {renderedToasts}
        <EuiScreenReaderOnly>
          <div role="region" aria-live="polite">
            {this.handleScreenReaderToastLoggerUpdating(toasts)}
          </div>
        </EuiScreenReaderOnly>
      </div>
    );
  }
}
