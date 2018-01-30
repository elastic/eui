import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiGlobalToastListItem } from './global_toast_list_item';
import { EuiToast } from './toast';

export const TOAST_FADE_OUT_MS = 250;

export class EuiGlobalToastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toastIdToDismissedMap: {},
    };

    this.timeoutIds = [];
    this.toastIdToScheduledForDismissalMap = {};

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
  };

  onMouseLeave = () => {
    this.isUserInteracting = false;
  };

  onScroll = () => {
    this.isScrolledToBottom =
      this.listElement.scrollHeight - this.listElement.scrollTop === this.listElement.clientHeight;
  };

  scheduleAllToastsForDismissal = () => {
    this.props.toasts.forEach(toast => {
      if (!this.toastIdToScheduledForDismissalMap[toast.id]) {
        this.scheduleToastForDismissal(toast);
      }
    });
  };

  scheduleToastForDismissal = (toast, isImmediate = false) => {
    this.toastIdToScheduledForDismissalMap[toast.id] = true;
    const toastLifeTimeMs = isImmediate ? 0 : this.props.toastLifeTimeMs;

    // Start fading the toast out once its lifetime elapses.
    this.timeoutIds.push(setTimeout(() => {
      this.startDismissingToast(toast);
    }, toastLifeTimeMs));

    // Remove the toast after it's done fading out.
    this.timeoutIds.push(setTimeout(() => {
      this.props.dismissToast(toast);
      this.setState(prevState => {
        const toastIdToDismissedMap = { ...prevState.toastIdToDismissedMap };
        delete toastIdToDismissedMap[toast.id];
        delete this.toastIdToScheduledForDismissalMap[toast.id];

        return {
          toastIdToDismissedMap,
        };
      });
    }, toastLifeTimeMs + TOAST_FADE_OUT_MS));
  };

  startDismissingToast(toast) {
    this.setState(prevState => {
      const toastIdToDismissedMap = {
        ...prevState.toastIdToDismissedMap,
        [toast.id]: true,
      };

      return {
        toastIdToDismissedMap,
      };
    });
  }

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
    this.timeoutIds.forEach(clearTimeout);
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
            onClose={this.scheduleToastForDismissal.bind(toast, true)}
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
