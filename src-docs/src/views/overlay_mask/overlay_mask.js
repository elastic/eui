import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiSpacer,
  EuiFlyout,
  EuiTitle,
  EuiFlyoutHeader,
} from '../../../../src/components';

export default () => {
  const [modalOpen, changeModal] = useState(false);
  const [selectedModal, selectModal] = useState(1);
  const [flyOut, changeFlyOut] = useState(false);

  const openModal = modal => {
    selectModal(modal);
    changeModal(!modalOpen);
  };

  const closeModal = () => {
    changeModal(!modalOpen);
  };

  const toggleFlyOut = () => {
    changeFlyOut(!flyOut);
  };

  if (modalOpen) {
    if (selectedModal === 1) {
      return (
        <React.Fragment>
          <EuiOverlayMask onClick={closeModal}>
            <EuiTitle>
              <h2> Click anywhere to close overlay. </h2>
            </EuiTitle>
          </EuiOverlayMask>
        </React.Fragment>
      );
    }

    return (
      <EuiOverlayMask>
        <EuiButton onClick={closeModal}>Click this button to close</EuiButton>
      </EuiOverlayMask>
    );
  }

  if (flyOut) {
    return (
      <React.Fragment>
        <EuiOverlayMask onClick={toggleFlyOut} />
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
      <EuiButton onClick={() => openModal(1)}>Overlay with onClick</EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => openModal(2)}>Overlay with button</EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => toggleFlyOut()}>
        Overlay as a sibling of a flyout
      </EuiButton>
    </React.Fragment>
  );
};
