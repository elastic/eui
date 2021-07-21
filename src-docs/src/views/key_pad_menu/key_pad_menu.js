import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <nav aria-label="Nav title">
    <EuiKeyPadMenu>
      <EuiKeyPadMenuItem label="Dashboard">
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>

      <EuiKeyPadMenuItem label="Canvas">
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>

      <EuiKeyPadMenuItem isSelected label="Lens">
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>

      <EuiKeyPadMenuItem isDisabled label="Visualize">
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>

      <EuiKeyPadMenuItem label="Graph">
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>

      <EuiKeyPadMenuItem label="Advanced Settings">
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  </nav>
);
