import React, { useState } from 'react';

import { EuiOverlayMask, EuiButton } from '../../../../src/components';

export default () => {
  const [modalOpen, changeModal] = useState(false);

  const toggleModal = () => {
    changeModal(!modalOpen);
  };

  if (modalOpen) {
    return (
      <EuiOverlayMask>
        <EuiButton onClick={() => toggleModal()}> Close Overlay </EuiButton>
      </EuiOverlayMask>
    );
  }

  return <EuiButton onClick={() => toggleModal()}> Open Overlay </EuiButton>;
};
