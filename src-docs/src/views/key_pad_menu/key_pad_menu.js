import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem label="Dashboard" href="#">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem label="Dashboard" href="#">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem label="Dashboard" href="#">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem isDisabled label="Dashboard" href="#">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
