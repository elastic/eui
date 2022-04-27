import { Fragment, useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [maskWithClickOpen, changeMaskWithClick] = useState(false);

  const modal = (
    <Fragment>
      <EuiOverlayMask
        onClick={() => {
          changeMask(false);
        }}
      >
        <EuiTitle>
          <h2> Click anywhere to close overlay. </h2>
        </EuiTitle>
      </EuiOverlayMask>
    </Fragment>
  );

  const maskWithClick = (
    <EuiOverlayMask>
      <EuiButton
        onClick={() => {
          changeMaskWithClick(false);
        }}
      >
        Click this button to close
      </EuiButton>
    </EuiOverlayMask>
  );

  return (
    <Fragment>
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
    </Fragment>
  );
};
