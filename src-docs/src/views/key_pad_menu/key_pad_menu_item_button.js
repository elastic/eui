import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem label="Dashboard" onClick={() => {}}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem label="Dashboard" isDisabled onClick={() => {}}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
