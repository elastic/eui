import React from 'react';

import { EuiPanel, EuiCode, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiPanel hasShadow={true}>
      <EuiCode>{'hasShadow={true}'}</EuiCode>
    </EuiPanel>

    <EuiSpacer />

    <EuiPanel hasShadow={false}>
      <EuiCode>{'hasShadow={false}'}</EuiCode>
    </EuiPanel>
  </div>
);
