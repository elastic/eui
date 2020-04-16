import React, { useState } from 'react';

import { EuiPortal, EuiButton, EuiBottomBar } from '../../../../src/components';

export const Portal = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <EuiPortal>
        <EuiBottomBar>
          <p>This element is appended to the body in the DOM if you inspect</p>
        </EuiBottomBar>
      </EuiPortal>
    );
  }
  return (
    <div>
      <EuiButton onClick={togglePortal}>Toggle portal</EuiButton>

      {portal}
    </div>
  );
};
