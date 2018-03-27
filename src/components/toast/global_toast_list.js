import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Timer } from '../../services/time';
import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast } from './toast';

export const TOAST_FADE_OUT_MS = 250;

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
  }

  static propTypes = {
    className: PropTypes.string,
    toasts: PropTypes.array,
    dismissToast: PropTypes.func.isRequired,
    toastLifeTimeMs: PropTypes.number.isRequired,
  };

  static defaultProps = {
    toasts: [],
  };

  startScrollingToBottom() {
    this.isScrollingToBottom = true;

    const scrollToBottom = () => {
      const position = this.listElement.scrollTop;
      const destination = this.listElement.scrollHeight - this.listElement.clientHeight;
      const distanceToDestination = destination - position;

      if (distanceToDestination < 5) {
        this.listElement.scrollTop = destination;
        this.isScrollingToBottom = false;
        this.isScrolledToBottom = true;
        return;
      }

      this.listElement.scrollTop = position + distanceToDestination * 0.25;

      if (this.isScrollingToBottom) {
        window.requestAnimationFrame(scrollToBottom);
      }
    };

    window.requestAnimationFrame(scrollToBottom);
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
      this.listElement.scrollHeight - this.listElement.scrollTop === this.listElement.clientHeight;
  };

  scheduleAllToastsForDismissal = () => {
    this.props.toasts.forEach(toast => {
      if (!this.toastIdToTimerMap[toast.id]) {
        this.scheduleToastForDismissal(toast);
      }
    });
  };

  scheduleToastForDismissal = (toast) => {
    // Start fading the toast out once its lifetime elapses.
    this.toastIdToTimerMap[toast.id] =
      new Timer(this.dismissToast.bind(this, toast), this.props.toastLifeTimeMs);
  };

  dismissToast = (toast) => {
    // Remove the toast after it's done fading out.
    this.dismissTimeoutIds.push(setTimeout(() => {
      this.props.dismissToast(toast);
      this.toastIdToTimerMap[toast.id].clear();
      delete this.toastIdToTimerMap[toast.id];

      this.setState(prevState => {
        const toastIdToDismissedMap = { ...prevState.toastIdToDismissedMap };
        delete toastIdToDismissedMap[toast.id];

        return {
          toastIdToDismissedMap,
        };
      });
    }, TOAST_FADE_OUT_MS));

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
      dismissToast, // eslint-disable-line no-unused-vars
      toastLifeTimeMs, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const renderedToasts = toasts.map(toast => {
      const {
        text,
        ...rest
      } = toast;

      return (
        <EuiGlobalToastListItem
          key={toast.id}
          isDismissed={this.state.toastIdToDismissedMap[toast.id]}
        >
          <EuiToast
            onClose={this.dismissToast.bind(this, toast)}
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
        ref={element => { this.listElement = element; }}
        className={classes}
        {...rest}
      >
        {renderedToasts}
      </div>
    );
  }
}
