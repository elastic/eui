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

    <EuiKeyPadMenuItem
      label="Dashboard"
      href="#"
      betaBadgeLabel="Beta"
      betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs.">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem
      label="Dashboard"
      href="#"
      betaBadgeLabel="Lab"
      betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs."
      betaBadgeIconType="bolt">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
