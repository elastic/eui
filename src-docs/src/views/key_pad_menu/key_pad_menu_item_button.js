import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem label="Button" onClick={() => {}}>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem label="Disabled" isDisabled>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem label="Link">
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem label="Selected" isSelected>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem label="Selected link" href="#" isSelected>
      <EuiIcon type="dashboardApp" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
