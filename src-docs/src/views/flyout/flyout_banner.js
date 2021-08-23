import React, { useState } from 'react';

import {
  EuiCallOut,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiLink,
  EuiButton,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;

  const callOut = (
    <EuiCallOut iconType="help">
      <p>
        Here&rsquo;s some stuff that you need to know. This banner helps
        highlight important information. <EuiLink href="#">View docs</EuiLink>
      </p>
    </EuiCallOut>
  );

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        aria-labelledby="flyoutWithBannerTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutWithBannerTitle">A flyout with a banner</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={callOut}>
          <EuiText>
            <p>
              This flyout is using the banner prop in{' '}
              <strong>EuiFlyoutBody</strong>.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiButton onClick={showFlyout}>Show flyout with banner</EuiButton>
      {flyout}
    </div>
  );
};
