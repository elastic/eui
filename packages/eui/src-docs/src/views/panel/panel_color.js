import React from 'react';

import { EuiPanel, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiPanel color="subdued" borderRadius="none" hasShadow={false}>
      <p>I am a simple shaded box</p>
    </EuiPanel>

    <EuiSpacer />

    <EuiPanel color="transparent" hasBorder={false}>
      <p>I am a transparent box simply for padding</p>
    </EuiPanel>
  </div>
);
