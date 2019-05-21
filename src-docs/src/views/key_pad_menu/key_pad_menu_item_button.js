import React from 'react';

import { EuiIcon, EuiKeyPadMenuItemButton } from '../../../../src/components';

export default () => (
  <EuiKeyPadMenuItemButton
    label="Dashboard"
    onClick={() => window.alert('Clicked')}>
    <EuiIcon type="dashboardApp" size="l" />
  </EuiKeyPadMenuItemButton>
);
