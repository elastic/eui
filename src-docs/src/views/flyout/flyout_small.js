import React, { useState } from 'react';

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiButton,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const toggleFlyout = () => setIsFlyoutVisible((isVisible) => !isVisible);

  const flyoutID__title = htmlIdGenerator('flyout')();

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus={false}
        onClose={closeFlyout}
        aria-labelledby={flyoutID__title}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id={flyoutID__title}>A flyout without ownFocus</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              The page contents is still interactable though screenreader users
              will find themselves still within the bounds of the flyout.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiButton onClick={toggleFlyout}>Toggle flyout</EuiButton>

      {flyout}
    </div>
  );
};
