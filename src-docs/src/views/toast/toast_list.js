import React, { useState, Fragment } from 'react';

import {
  EuiCode,
  EuiGlobalToastList,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components';

let addToastHandler;
let removeAllToastsHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

export default () => {
  const [toasts, setToasts] = useState([]);

  addToastHandler = () => {
    const toast = getRandomToast();
    setToasts(toasts.concat(toast));
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  removeAllToastsHandler = () => {
    setToasts([]);
  };

  const getRandomToast = () => {
    const toasts = [
      {
        title:
          "Check it out, here's a really long title that will wrap within a narrower browser",
        text: (
          <Fragment>
            <p>
              Here&rsquo;s some stuff that you need to know. We can make this
              text really long so that, when viewed within a browser
              that&rsquo;s fairly narrow, it will wrap, too.
            </p>
            <p>
              And some other stuff on another line, just for kicks. And{' '}
              <EuiLink href="#">here&rsquo;s a link</EuiLink>.
            </p>
          </Fragment>
        ),
      },
      {
        title: 'Download complete!',
        color: 'success',
        text: <p>Thanks for your patience!</p>,
      },
      {
        title: 'Logging you out soon, due to inactivity',
        color: 'warning',
        iconType: 'user',
        text: (
          <Fragment>
            <p>This is a security measure.</p>
            <p>
              Please move your mouse to show that you&rsquo;re still using
              Kibana.
            </p>
          </Fragment>
        ),
      },
      {
        title: 'Oops, there was an error',
        color: 'danger',
        iconType: 'help',
        text: <p>Sorry. We&rsquo;ll try not to let it happen it again.</p>,
      },
      {
        title: 'Long toast',
        color: 'warning',
        iconType: 'clock',
        toastLifeTimeMs: 15000,
        text: (
          <p>
            This toast overrides the default <EuiCode>toastLifeTimeMs</EuiCode>{' '}
            value and will be around for 15 seconds.
          </p>
        ),
      },
    ];

    return {
      id: `toast${toastId++}`,
      ...toasts[Math.floor(Math.random() * toasts.length)],
    };
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiButton onClick={addToast}>
            Add toast to global toast list
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={removeAllToasts} color="danger">
            Remove all toasts
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};
