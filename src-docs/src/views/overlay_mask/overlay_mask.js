import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [maskWithClickOpen, changeMaskWithClick] = useState(false);

  const modal = (
    <React.Fragment>
      <EuiOverlayMask
        onClick={() => {
          changeMask(false);
        }}
      >
        <EuiPanel grow={false}>
          <EuiTitle>
            <h2> Click anywhere to close overlay. </h2>
          </EuiTitle>
        </EuiPanel>
      </EuiOverlayMask>
    </React.Fragment>
  );

  const maskWithClick = (
    <EuiOverlayMask>
      <EuiPanel grow={false}>
        <EuiButton
          onClick={() => {
            changeMaskWithClick(false);
          }}
        >
          Click this button to close
        </EuiButton>
      </EuiPanel>
    </EuiOverlayMask>
  );

  return (
    <React.Fragment>
      <EuiButton
        onClick={() => {
          changeMask(true);
        }}
      >
        Overlay with onClick
      </EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => changeMaskWithClick(true)}>
        Overlay with button
      </EuiButton>
      {maskOpen ? modal : undefined}
      {maskWithClickOpen ? maskWithClick : undefined}
    </React.Fragment>
  );
};
