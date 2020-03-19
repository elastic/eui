import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem
      label="Dashboard"
      onClick={() => window.alert('Clicked')}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem
      label="Dashboard"
      isDisabled
      onClick={() => window.alert('Clicked')}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
