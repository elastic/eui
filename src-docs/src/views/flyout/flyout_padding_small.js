import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiTextColor,
  EuiIcon,
  EuiButton,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  const callOut = (
    <EuiCallOut>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiIcon type="help" />
        </EuiFlexItem>
        <EuiFlexItem>
          {' '}
          <EuiTextColor color="subdued">
            The banner left and right padding is small.
          </EuiTextColor>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiCallOut>
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        paddingSize="s"
        aria-labelledby="flyoutSmallPaddingTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutSmallPaddingTitle">A flyout with a small padding</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={callOut}>
          <EuiText>
            <p>The padding around the content is small.</p>
          </EuiText>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left">
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={closeFlyout} fill>
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiButton onClick={showFlyout}>Show flyout with small padding</EuiButton>
      {flyout}
    </div>
  );
};
