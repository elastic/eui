import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiSpacer,
  EuiTitle,
  EuiFocusTrap,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [maskWithClickOpen, changeMaskWithClick] = useState(false);

  const modal = (
    <>
      <EuiOverlayMask>
        <EuiFocusTrap onClickOutside={() => changeMask(false)}>
          <EuiTitle>
            <h2> Click anywhere to close overlay. </h2>
          </EuiTitle>
        </EuiFocusTrap>
      </EuiOverlayMask>
    </>
  );

  const maskWithClick = (
    <EuiOverlayMask data-test-subj="yolo">
      <EuiButton onClick={() => changeMaskWithClick(false)}>
        Click this button to close
      </EuiButton>
    </EuiOverlayMask>
  );

  return (
    <>
      <EuiButton onClick={() => changeMaskWithClick(true)}>
        Overlay with button
      </EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => changeMask(true)}>
        Overlay with EuiFocusTrap click-to-close
      </EuiButton>
      {maskOpen ? modal : undefined}
      {maskWithClickOpen ? maskWithClick : undefined}
    </>
  );
};
