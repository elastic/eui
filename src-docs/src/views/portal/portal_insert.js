import React, { useState } from 'react';

import { EuiPortal, EuiButton } from '../../../../src/components';
import { EuiSpacer } from '../../../../src/components/spacer/spacer';

let buttonRef = null;

export const PortalInsert = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const setButtonRef = node => (buttonRef = node);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <EuiPortal insert={{ sibling: buttonRef, position: 'after' }}>
        <EuiSpacer />
        <p>This element is appended immediately after the button.</p>
      </EuiPortal>
    );
  }
  return (
    <div>
      <EuiButton onClick={togglePortal} buttonRef={setButtonRef}>
        Toggle portal
      </EuiButton>
      {portal}
    </div>
  );
};
