import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItemButton,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItemButton
      label="Dashboard"
      onClick={() => window.alert('Clicked')}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItemButton>
    <EuiKeyPadMenuItemButton
      label="Dashboard"
      isDisabled
      onClick={() => window.alert('Clicked')}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItemButton>
  </EuiKeyPadMenu>
);
