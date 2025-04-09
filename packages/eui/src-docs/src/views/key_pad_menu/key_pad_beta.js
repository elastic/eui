import React from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem label="No beta">
      <EuiIcon type="editorStrike" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem
      label="Icon"
      betaBadgeLabel="Beta"
      betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs."
      betaBadgeIconType="beta"
    >
      <EuiIcon type="editorBold" size="l" />
    </EuiKeyPadMenuItem>

    <EuiKeyPadMenuItem
      label="Icon"
      betaBadgeLabel="External"
      betaBadgeTooltipContent="This module is an external app."
      betaBadgeIconType="popout"
    >
      <EuiIcon type="code" size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
);
