import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiSpacer,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [showFlyout, changeFlyout] = useState(false);

  const mask = (
    <EuiOverlayMask headerZindexLocation="below">
      <EuiButton onClick={() => changeMask(false)}>
        Click this button to close
      </EuiButton>
    </EuiOverlayMask>
  );

  const flyout = (
    <EuiFlyout size="s" onClose={() => changeFlyout(false)}>
      <EuiFlyoutHeader>
        <EuiTitle>
          <h1>Click outside this flyout to close overlay. </h1>
        </EuiTitle>
      </EuiFlyoutHeader>
    </EuiFlyout>
  );

  return (
    <>
      <EuiButton onClick={() => changeMask(true)}>
        Overlay below header
      </EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => changeFlyout(true)}>
        EuiFlyout defaults to below
      </EuiButton>
      {maskOpen ? mask : null}
      {showFlyout ? flyout : null}
    </>
  );
};
