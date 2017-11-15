import React, {
  cloneElement,
  Component,
} from 'react';

import {
  EuiGlobalToastList,
  EuiGlobalToastListItem,
  EuiLink,
  EuiToast,
} from '../../../../src/components';

const TOAST_LIFE_TIME_MS = 4000;
const TOAST_FADE_OUT_MS = 250;
let toastIdCounter = 0;
const timeoutIds = [];

let addToastHandler;
let removeAllToastsHandler;

export function addToast() {
  addToastHandler();
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };

    addToastHandler = this.addToast;
    removeAllToastsHandler = this.removeAllToasts;
  }

  addToast = () => {
    const {
      toast,
      toastId,
    } = this.renderRandomToast();

    this.setState({
      toasts: this.state.toasts.concat(toast),
    });

    this.scheduleToastForDismissal(toastId);
  };

  scheduleToastForDismissal = (toastId, isImmediate = false) => {
    const lifeTime = isImmediate ? TOAST_FADE_OUT_MS : TOAST_LIFE_TIME_MS;

    timeoutIds.push(setTimeout(() => {
      this.dismissToast(toastId);
    }, lifeTime));

    timeoutIds.push(setTimeout(() => {
      this.startDismissingToast(toastId);
    }, lifeTime - TOAST_FADE_OUT_MS));
  };

  startDismissingToast(toastId) {
    this.setState({
      toasts: this.state.toasts.map(toast => {
        if (toast.key === toastId) {
          return cloneElement(toast, {
            isDismissed: true,
          });
        }

        return toast;
      }),
    });
  }

  dismissToast(toastId) {
    this.setState({
      toasts: this.state.toasts.filter(toast => toast.key !== toastId),
    });
  }

  removeAllToasts = () => {
    this.setState({
      toasts: [],
    });
  };

  componentWillUnmount() {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }

  renderRandomToast = () => {
    const toastId = (toastIdCounter++).toString();
    const dismissToast = () => this.scheduleToastForDismissal(toastId, true);

    const toasts = [
      (
        <EuiToast
          title="Check it out, here's a really long title that will wrap within a narrower browser"
          onClose={dismissToast}
        >
          <p>
            Here&rsquo;s some stuff that you need to know. We can make this text really long so that,
            when viewed within a browser that&rsquo;s fairly narrow, it will wrap, too.
          </p>
          <p>
            And some other stuff on another line, just for kicks. And <EuiLink href="#">here&rsquo;s a link</EuiLink>.
          </p>
        </EuiToast>
      ), (
        <EuiToast
          title="Download complete!"
          color="success"
          onClose={dismissToast}
        >
          <p>
            Thanks for your patience!
          </p>
        </EuiToast>
      ), (
        <EuiToast
          title="Logging you out soon, due to inactivity"
          color="warning"
          iconType="user"
          onClose={dismissToast}
        >
          <p>
            This is a security measure.
          </p>
          <p>
            Please move your mouse to show that you&rsquo;re still using Kibana.
          </p>
        </EuiToast>
      ), (
        <EuiToast
          title="Oops, there was an error"
          color="danger"
          iconType="help"
          onClose={dismissToast}
        >
          <p>
            Sorry. We&rsquo;ll try not to let it happen it again.
          </p>
        </EuiToast>
      ),
    ];

    const toast = (
      <EuiGlobalToastListItem key={toastId}>
        {toasts[Math.floor(Math.random() * toasts.length)]}
      </EuiGlobalToastListItem>
    );

    return { toast, toastId };
  };

  render() {
    return (
      <EuiGlobalToastList>
        {this.state.toasts}
      </EuiGlobalToastList>
    );
  }
}
