import React, { Fragment, PureComponent } from 'react';
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

export class EuiGlobalToastList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toastIdToDismissedMap: {},
      lastRenderedForScreenReaderToast: { id: -1, timestamp: -1 },
    };

    this.dismissTimeoutIds = [];
    this.toastIdToTimerMap = {};

    this.isScrollingToBottom = false;
    this.isScrolledToBottom = true;

    // See [Return Value](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#Return_value)
    // for information on initial value of 0
    this.isScrollingAnimationFrame = 0;
    this.startScrollingAnimationFrame = 0;

    // this.state.lastRenderedForScreenReaderToast = { id: -1 };
    this._ariaLiveToastTempStorage = [];
    // 'keep' or 'update'
    this._updatingLiveRegionStrategy = 'update';
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

  logToastsForScreenReader = toasts => {
    if (!toasts.length) {
      // return what we have now to avoid node re-rendering
      return;
    }

    const toastStorage = this._ariaLiveToastTempStorage;

    //  1: we should filter new toasts
    const notStoredPassedToasts = toasts
      .filter(
        passedToast =>
          !toastStorage.some(storedToast => storedToast.id === passedToast.id)
      )
      // 2: We should update each with a timestamp
      .map(newToast => ({
        ...newToast,
        timestamp: Date.now(),
      }));

    // console.info('notStoredPassedToasts', notStoredPassedToasts);

    // 3: We should store everything in the private storage
    this._ariaLiveToastTempStorage.push(...notStoredPassedToasts);

    // // Clear the storage from unpassed (and already deleted toasts)
    // this._ariaLiveToastTempStorage = this._ariaLiveToastTempStorage.filter(
    //   storedToast =>
    //     toasts.some(passedToast => passedToast.id === storedToast.id)
    // );

    // console.log('_ariaLiveToastTempStorage', this._ariaLiveToastTempStorage);

    // 4: We should store the latest in the state
    const theLatestCameToasts = this._ariaLiveToastTempStorage
      .map(x => x)
      .sort((prev, next) => next.timestamp - prev.timestamp);

    // console.info('theLatestCameToasts', theLatestCameToasts.map(x => x.timestamp));

    const theLatest = theLatestCameToasts[0];

    console.info(theLatest.timestamp > this.state.lastRenderedForScreenReaderToast.timestamp ? 'update' : 'keep');

    if (
      theLatest &&
      theLatest.timestamp >
        this.state.lastRenderedForScreenReaderToast.timestamp
    ) {
      this._updatingLiveRegionStrategy = 'update';
      this.setState({
        lastRenderedForScreenReaderToast: { ...theLatest },
      });
    } else {
      this._updatingLiveRegionStrategy = 'keep';
    }
  };

  renderScreenReaderLogArea() {
    const toastNotification = (
      <Fragment key={this.state.lastRenderedForScreenReaderToast.timestamp}>
        <p>
          <EuiI18n
            token="euiGlobalToastList.newNotification"
            default="A new notification appears"
          />
        </p>
        <p>{this.state.lastRenderedForScreenReaderToast.title}</p>
        <div>{this.state.lastRenderedForScreenReaderToast.text}</div>
      </Fragment>
    );

    switch (this._updatingLiveRegionStrategy) {
      case 'update': // with delay
        return (
          <EuiDelayRender>
            {toastNotification}
          </EuiDelayRender>
        );
        break;
      case 'keep': // without delay
        // return null;
        return toastNotification;
        break;
      default:
        return null;
    }
  }

  componentDidMount() {
    this.listElement.addEventListener('scroll', this.onScroll);
    this.listElement.addEventListener('mouseenter', this.onMouseEnter);
    this.listElement.addEventListener('mouseleave', this.onMouseLeave);
    this.scheduleAllToastsForDismissal();
  }

  componentDidUpdate(prevProps, prevState) {
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
    if (this.props.toasts.length) {
      console.info('didUpdate()');
      this.logToastsForScreenReader(this.props.toasts, prevState);
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
        {...rest}>
        {renderedToasts}
        <EuiScreenReaderOnly>
          <div role="region" aria-live="polite">
            {this.renderScreenReaderLogArea()}
          </div>
        </EuiScreenReaderOnly>
      </div>
    );
  }
}
