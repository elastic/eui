import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiFlyout,
  EuiTitle,
  EuiFlyoutHeader,
} from '../../../../src/components';

export default () => {
  const [flyOut, changeFlyOut] = useState(false);

  const toggleFlyOut = () => {
    changeFlyOut(!flyOut);
  };

  let flyout;
  if (flyOut) {
    flyout = (
      <React.Fragment>
        <EuiOverlayMask onClick={toggleFlyOut} headerZindexLocation="below" />
        <EuiFlyout size="s" onClose={toggleFlyOut}>
          <EuiFlyoutHeader>
            <EuiTitle>
              <h1>Click outside this flyout to close overlay. </h1>
            </EuiTitle>
          </EuiFlyoutHeader>
        </EuiFlyout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <EuiButton onClick={() => toggleFlyOut()}>
        Overlay as a sibling of a flyout
      </EuiButton>
      {flyout}
    </React.Fragment>
  );
};
